"use client"

import Navbar from "@/components/sections/Navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "@/lib/hooks/use-user"
import {
  createClientComponentClient,
  Session
} from "@supabase/auth-helpers-nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function CheckoutPageContent() {
  const { user, loading: userLoading } = useUser()
  const router = useRouter()
  const [tokenData, setTokenData] = useState<{ user_id: string } | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient()

  const [loading, setLoading] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [validCoupon, setValidCoupon] = useState<{
    id: string
    percent_off?: number | null
    amount_off?: number | null
  } | null>(null)
  const [total, setTotal] = useState(60.0)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for session changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    async function validateToken() {
      setIsValidatingToken(true)
      try {
        const token = searchParams.get("token")
        if (!token) {
          setIsValidatingToken(false)
          return
        }

        // First check if we already have a valid session
        const {
          data: { session }
        } = await supabase.auth.getSession()

        const { data, error } = await supabase
          .from("auth_tokens")
          .select("user_id, used, expires_at")
          .eq("token", token)
          .single()

        if (error || !data) {
          throw new Error("Invalid token")
        }

        if (data.used) {
          throw new Error("Token has already been used")
        }

        if (new Date(data.expires_at) < new Date()) {
          throw new Error("Token has expired")
        }

        setTokenData(data)

        // If user is already authenticated with the correct account
        if (session?.user?.id === data.user_id) {
          // Mark token as used
          const response = await fetch("/api/auth/update-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
          })

          if (!response.ok) {
            throw new Error("Failed to process checkout link")
          }
          return
        }
      } catch (error) {
        console.error("Token error:", error)
        if (error instanceof Error) {
          if (error.message === "Invalid token") {
            setAuthError(
              "Invalid checkout link. Please try again or contact support."
            )
          } else if (error.message === "Token has already been used") {
            setAuthError(
              "This checkout link has already been used. Please request a new one."
            )
          } else if (error.message === "Token has expired") {
            setAuthError(
              "This checkout link has expired. Please request a new one."
            )
          } else {
            setAuthError(
              "Something went wrong. Please try again or contact support."
            )
          }
        } else {
          setAuthError(
            "Something went wrong. Please try again or contact support."
          )
        }
      } finally {
        setIsValidatingToken(false)
      }
    }

    validateToken()
  }, [searchParams, supabase])

  // Add this before other UI state checks
  if (!userLoading && !user && !searchParams.get("token")) {
    router.push("/signin")
    return null
  }

  if (isValidatingToken) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar showBanner={false} />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h2 className="text-xl mb-4">Validating your checkout link...</h2>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar showBanner={false} />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h2 className="text-xl mb-4 text-red-400">{authError}</h2>
            <Button
              onClick={() => router.push("/signin")}
              className="flex items-center gap-2"
            >
              Return to Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show sign in button if token is valid but user isn't authenticated
  if (tokenData && (!session || session.user.id !== tokenData.user_id)) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar showBanner={false} />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h2 className="text-xl mb-4">
              Please sign in to continue checkout
            </h2>
            <Button
              onClick={() => router.push("/signin")}
              className="flex items-center gap-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const validateCoupon = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code")
      return
    }

    try {
      setLoading(true)
      const response = await fetch("/api/stripe/validate-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ couponCode })
      })

      const data = await response.json()

      if (!response.ok) {
        setCouponError(data.error || "Invalid coupon code")
        setValidCoupon(null)
        setTotal(60.0)
        return
      }

      setValidCoupon(data.coupon)
      setCouponError("")

      // Calculate new total
      if (data.coupon.percent_off) {
        setTotal(60 * (1 - data.coupon.percent_off / 100))
      } else if (data.coupon.amount_off) {
        setTotal(Math.max(0, 60 - data.coupon.amount_off / 100))
      }
    } catch (error) {
      console.error("Error:", error)
      setCouponError("Failed to validate coupon")
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          couponId: validCoupon?.id
        })
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { url } = await response.json()
      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to start checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar showBanner={false} />
      <div className="max-w-3xl mx-auto px-4 pt-28 pb-12">
        <div className="space-y-8">
          {/* Pricing details */}
          <div>
            <div className="mb-8">
              <h2 className="text-base lg:text-lg font-medium text-[#999999] mb-2">
                Subscribe to Interview Coder
              </h2>
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                $60 / month
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center py-4 border-t border-white/10">
                <span className="text-sm lg:text-base">Subscription</span>
                <div className="text-right">
                  <div className="text-xs lg:text-sm text-[#999999]">
                    $60/month
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-white/10">
                <span className="text-sm lg:text-base">Subtotal</span>
                <span className="text-sm lg:text-base">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-white/10">
                <span className="text-sm lg:text-base">Tax</span>
                <span className="text-sm lg:text-base">$0.00</span>
              </div>
              {validCoupon && (
                <div className="flex justify-between items-center py-4 border-t border-white/10">
                  <span className="text-sm lg:text-base">Discount</span>
                  <div className="text-right text-emerald-400 text-sm lg:text-base">
                    {validCoupon.percent_off
                      ? `-${validCoupon.percent_off}%`
                      : validCoupon.amount_off
                      ? `-$${(validCoupon.amount_off / 100).toFixed(2)}`
                      : null}
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center py-4 border-t border-white/10">
                <span className="text-sm lg:text-base">Total due today</span>
                <span className="text-sm lg:text-base">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* Coupon section */}
              <div className="py-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.trim())}
                    placeholder="Have a coupon code?"
                    className="bg-black/50 border-gray-800 rounded-full h-[50px] text-sm lg:text-base placeholder:text-gray-500"
                  />
                  <Button
                    onClick={validateCoupon}
                    disabled={loading || !couponCode}
                    variant="outline"
                    className="whitespace-nowrap text-sm lg:text-base"
                  >
                    Apply
                  </Button>
                </div>
                {couponError && (
                  <p className="text-red-400 text-xs lg:text-sm mt-2">
                    {couponError}
                  </p>
                )}
                {validCoupon && (
                  <p className="text-emerald-400 text-xs lg:text-sm mt-2">
                    Coupon applied successfully!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Checkout button */}
          <div className="bg-transparent border border-gray-700 p-8 rounded-xl">
            <Button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-black transition-all px-4 py-3 text-sm lg:text-base font-semibold disabled:opacity-50"
            >
              {loading ? "Processing..." : "Subscribe with Stripe"}
            </Button>
            <p className="text-xs lg:text-sm text-gray-400 mt-4 text-center">
              You will be redirected to Stripe to complete your purchase
              securely.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
