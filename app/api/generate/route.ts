// app/api/generate/route.ts
import { NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { withTimeout, type ProblemInfo } from "../config"
import { z } from "zod"
import { verifyAuth } from "../auth"

export const maxDuration = 300

const SolutionResponse = z.object({
  thoughts: z.array(z.string()),
  code: z.string(),
  time_complexity: z.string(),
  space_complexity: z.string()
})

export async function POST(request: Request) {
  try {
    console.log("Starting POST request processing...")

    // Verify authentication first
    const authResult = await verifyAuth()
    if (authResult.error) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      )
    }

    const problemInfo = (await request.json()) as ProblemInfo
    console.log("Received problem info:", {
      hasStatement: !!problemInfo.problem_statement,
      numTestCases: problemInfo.test_cases?.length
    })

    const anthropicApiKey = process.env.ANTHROPIC_API_KEY
    if (!anthropicApiKey) {
      console.log("Anthropic API key is not configured")
      return NextResponse.json(
        { error: "Anthropic API key is not configured" },
        { status: 500 }
      )
    }

    try {
      console.log(`Generating ${problemInfo.language} solution and analysis...`)

      const anthropic = new Anthropic({
        apiKey: anthropicApiKey
      })

      const systemPrompt = `You are a coding assistant that generates solutions and analyzes them. For each field in your response:
- thoughts: Provide 3 short, conversational thoughts about your solution approach, as if explaining to a teacher. Explain your thought process progressively, as if arriving at the solution step by step. Focus on the code and logic only.
- code: Write the complete ${
        problemInfo.language ?? "python"
      } solution. Make it optimal, legible, and include inline comments after every line. Only write the function, not test cases.
- time_complexity: Start with big-O notation (e.g., O(n)) followed by a brief explanation of why
- space_complexity: Start with big-O notation (e.g., O(n)) followed by a brief explanation of why

Your response must be in the following JSON format:
{
  "thoughts": ["thought1", "thought2", "thought3"],
  "code": "your complete code solution",
  "time_complexity": "O(X) followed by explanation",
  "space_complexity": "O(X) followed by explanation"
}
Make sure your response is valid JSON.`

      const userPrompt = `Generate a solution and analysis for this problem:

Problem Statement: ${problemInfo.problem_statement ?? "None"}
Input Format: ${problemInfo.input_format?.description ?? "None"}
Output Format: ${problemInfo.output_format?.description ?? "None"}
Test Cases: ${JSON.stringify(problemInfo.test_cases ?? [], null, 2)}`

      const response = await withTimeout(
        anthropic.messages.create({
          model: "claude-3-7-sonnet-20250219",
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }]
        })
      )

      // Parse the JSON response from the content
      const content =
        response.content[0].type === "text" ? response.content[0].text : ""
      const result = JSON.parse(content) as z.infer<typeof SolutionResponse>

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
