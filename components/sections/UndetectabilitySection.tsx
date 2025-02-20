"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "../ui/button"
import { BadgeCheck } from "lucide-react"

const GlowingLine = () => (
  <div className="relative w-full max-w-[400px] mx-auto h-[40px] mb-8">
    {/* Left line container */}
    <div className="absolute left-0 top-[25px] w-[40%] sm:w-[160px] overflow-hidden">
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-[2px] bg-gradient-to-l to-transparent from-[#FFFF00] to-90%"
      />
    </div>

    {/* Right line container */}
    <div className="absolute right-0 top-[25px] w-[40%] sm:w-[160px] overflow-hidden">
      <motion.div
        initial={{ x: "100%" }}
        whileInView={{ x: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-[2px] bg-gradient-to-r to-transparent from-[#FFFF00] to-90%"
      />
    </div>

    {/* Extra glow layer for center */}
    <div className="absolute left-1/2 -translate-x-1/2 top-[25px] w-[40px] h-[2px] bg-[#FFFF00] blur-[4px]" />

    {/* Undetectable text with glow */}
    <div className="absolute left-1/2 -translate-x-1/2 top-0">
      <div className="relative">
        <div className="absolute -inset-1 bg-[#FFFF00]/30 blur-[10px]" />
        <div
          className="relative text-lg sm:text-xl tracking-[0.2em] font-light text-[#FFFF00]"
          style={{
            textShadow: "0 0 10px #FFFF00, 0 0 20px rgba(255, 255, 0, 0.5)"
          }}
        >
          PRO
        </div>
      </div>
    </div>
  </div>
)

const UndetectabilitySection = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
        <GlowingLine />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight white-gradient sm:text-3xl">
            How is it undetectable?
          </h2>
          <p className="text-lg leading-8 text-[#999999] mb-8">
            Interview Coder has the most robust undetectability features on the
            planet.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="flex justify-center">
            <Button
              variant="highlight"
              className="w-full max-w-md h-12"
              asChild
            >
              <Link href="/help?section=undetectability">
                <div className="flex gap-2 items-center justify-center w-full text-base">
                  <BadgeCheck className="w-5 h-5" />
                  See how we do it
                </div>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UndetectabilitySection
