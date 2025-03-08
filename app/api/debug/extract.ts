import { Anthropic } from "@anthropic-ai/sdk"
import { withTimeout } from "../config"
import { verifyAuth } from "../auth"
import { NextResponse } from "next/server"

// Define types based on Anthropic's SDK structure
type ImageContentBlock = {
  type: "image"
  source: {
    type: "base64"
    media_type: "image/jpeg" | "image/png" | "image/gif" | "image/webp"
    data: string
  }
}

type TextContentBlock = {
  type: "text"
  text: string
}

type ContentBlock = ImageContentBlock | TextContentBlock

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

export async function extractCodeFromImages(
  imageDataList: string[],
  apiKey: string,
  language:
    | "python"
    | "javascript"
    | "golang"
    | "r"
    | "ruby"
    | "java"
    | "cpp"
    | "kotlin"
    | "sql"
    | "swift" = "python"
) {
  // Verify authentication first
  const authResult = await verifyAuth()
  if (authResult.error) {
    throw new Error(authResult.error)
  }

  console.log("Starting code extraction from images...")

  if (!imageDataList || !Array.isArray(imageDataList)) {
    throw new Error("Invalid imageDataList: must be an array")
  }

  // Process images for inclusion in prompt
  const imageContents: ContentBlock[] = imageDataList.map((imageData) => ({
    type: "image",
    source: {
      type: "base64",
      media_type: detectImageType(imageData),
      data: imageData
    }
  }))

  const anthropic = new Anthropic({ apiKey })

  try {
    const completion = await withTimeout(
      anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4000,
        system: `Extract all relevant information from the provided images. Important notes:
1. Extract all visible ${language} code, maintaining exact indentation and formatting
2. Combine code from multiple images if present 
3. Include all visible comments
4. If there are any visible problem statements or question text, include those as well
5. Do not add any improvements or modifications
6. Do not add any markdown formatting
7. Return only the exact code and text seen in the images`,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract the code and any relevant text from these images."
              },
              ...imageContents
            ]
          }
        ]
      })
    )

    console.log("Received extraction response")

    if (
      !completion.content ||
      !Array.isArray(completion.content) ||
      completion.content.length === 0
    ) {
      throw new Error("Invalid response from Anthropic API")
    }

    // Extract the content - Claude typically doesn't use markdown by default
    // but we'll keep the cleaning logic just in case
    const textContent = completion.content.find((item) => item.type === "text")
    if (!textContent || typeof textContent.text !== "string") {
      throw new Error("No text content in Anthropic API response")
    }

    const extractedCode =
      textContent.text?.replace(/^```[\w]*\n/, "").replace(/\n```$/, "") || ""

    return extractedCode
  } catch (error: any) {
    console.error("Error in code extraction:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })

    if (
      error.message === "No token provided" ||
      error.message === "Invalid token"
    ) {
      throw new Error("Authentication required")
    }

    if (error.response?.status === 401) {
      throw new Error("Please provide a valid Anthropic API key")
    }
    if (error.response?.status === 429) {
      throw new Error(
        "API Key out of credits. Please check your Anthropic API limits and try again."
      )
    }
    throw error
  }
}
