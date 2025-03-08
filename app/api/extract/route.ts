// app/api/extract/route.ts
import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { z } from "zod"
import { withTimeout } from "../config"
import { verifyAuth } from "../auth"

export const maxDuration = 300

const ExtractResponse = z.object({
  problem_statement: z.string(),
  test_cases: z.array(z.any()).default([])
})

// Helper function to detect image type from base64 data
function detectImageType(
  base64Data: string
): "image/jpeg" | "image/png" | "image/gif" | "image/webp" {
  // Get the first few characters of the data to determine format
  const prefix = base64Data.substring(0, 30).toLowerCase()

  if (prefix.startsWith("/9j/")) {
    return "image/jpeg"
  } else if (prefix.includes("png")) {
    return "image/png"
  } else if (prefix.includes("gif")) {
    return "image/gif"
  } else if (prefix.includes("webp")) {
    return "image/webp"
  }

  // Default to PNG if we can't determine the type
  return "image/png"
}

export async function POST(request: Request) {
  try {
    // Verify authentication first
    const authResult = await verifyAuth()
    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const { imageDataList } = await request.json()

    if (!imageDataList || !Array.isArray(imageDataList)) {
      return NextResponse.json(
        {
          error:
            "Invalid request: imageDataList is required and must be an array"
        },
        { status: 400 }
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Anthropic API key not found in environment variables" },
        { status: 500 }
      )
    }

    // Prepare the image contents for the message with proper typing
    const imageContents = imageDataList.map((imageData) => ({
      type: "image" as const,
      source: {
        type: "base64" as const,
        media_type: detectImageType(imageData), // Use detected media type
        data: imageData
      }
    }))

    const anthropic = new Anthropic({ apiKey })

    try {
      const response = await withTimeout(
        anthropic.messages.create({
          model: "claude-3-5-sonnet-20241022",
          max_tokens: 4096,
          system: `You are a coding problem extractor that analyzes images of coding problems. You must return a JSON object with exactly these fields:
{
  "problem_statement": "The complete problem description of what needs to be solved",
  "test_cases": [
    {
      "input": { "args": [arg1, arg2, ...] },
      "output": { "result": expectedResult }
    },
    ...more test cases if available...
  ]
}

If no test cases are visible in the image, return an empty array for test_cases. When test cases are present, try to format them with input args and output result, but any reasonable test case format is acceptable.`,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract the complete problem statement and any test cases from this image. Format the response exactly as specified."
                },
                ...imageContents
              ]
            }
          ]
        })
      )

      // Check if response has content and is in the expected format
      if (
        !response.content ||
        !Array.isArray(response.content) ||
        response.content.length === 0
      ) {
        throw new Error("Invalid response from Anthropic API")
      }

      // Find the text block in the response
      const textBlock = response.content.find((block) => block.type === "text")
      if (!textBlock || typeof textBlock.text !== "string") {
        throw new Error("No text content in Anthropic API response")
      }

      const contentText = textBlock.text
      // Find JSON in the response
      const jsonMatch = contentText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("Could not extract JSON from Claude's response")
      }

      const result = ExtractResponse.parse(JSON.parse(jsonMatch[0]))
      return NextResponse.json(result)
    } catch (error: any) {
      console.error("Error in API request:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      })

      if (error.response?.status === 401) {
        return NextResponse.json(
          {
            error:
              error.message === "Authentication required"
                ? "Authentication required"
                : "Please close this window and re-enter a valid Anthropic API key."
          },
          { status: 401 }
        )
      }
      if (error.response?.status === 429) {
        return NextResponse.json(
          {
            error:
              "API Key rate limit exceeded. Please try again in a few minutes."
          },
          { status: 429 }
        )
      }
      return NextResponse.json(
        { error: error.message || "An unknown error occurred" },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Outer error handler:", {
      message: error.message,
      stack: error.stack
    })

    // Handle auth errors in the outer catch block as well
    if (
      error.message === "No token provided" ||
      error.message === "Invalid token"
    ) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500 }
    )
  }
}
