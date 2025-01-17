// app/api/config.ts
export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://www.interviewcoder.co"

export const TIMEOUT_DURATION = 60000 // 1 minute in milliseconds

// Helper function for timeout wrapping
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = TIMEOUT_DURATION
): Promise<T> {
  let timeoutId: NodeJS.Timeout

  const timeoutPromise = new Promise<T>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error("Operation timed out after 1 minute. Please try again."))
    }, timeoutMs)
  })

  try {
    const result = await Promise.race([promise, timeoutPromise])
    clearTimeout(timeoutId!)
    return result
  } catch (error) {
    clearTimeout(timeoutId!)
    throw error
  }
}

export interface ProblemInfo {
  problem_statement?: string
  input_format?: {
    description?: string
    parameters?: Array<{
      name: string
      type: string
      subtype?: string
    }>
  }
  output_format?: {
    description?: string
    type?: string
    subtype?: string
  }
  constraints?: Array<{
    description: string
    parameter?: string
    range?: {
      min?: number
      max?: number
    }
  }>
  test_cases?: any
}

export interface DebugSolutionResponse {
  thoughts: string[]
  old_code: string
  new_code: string
  time_complexity: string
  space_complexity: string
}
