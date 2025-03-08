"use client"
import Navbar from "@/components/sections/Navbar"
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams"
import { CommandsSection } from "@/components/sections/CommandsSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { Footer } from "@/components/sections/Footer"
import { HeroSection } from "@/components/sections/HeroSection"

import { StepsSection } from "@/components/sections/StepsSection"
import { CompanySection } from "@/components/sections/CompanySection"
import { VideoSection } from "@/components/sections/VideoSection"
import { IOSNotice } from "@/components/ui/ios-notice"
import {
  PriceIncreaseBanner,
  BANNER_DISMISSED_KEY
} from "@/components/sections/PriceIncreaseBanner"
import { useEffect, useState } from "react"
import UndetectabilitySection from "@/components/sections/UndetectabilitySection"

export default function Home() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
    if (!isDismissed) {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, "true")
    setShowBanner(false)
  }

  return (
    <div className="relative overflow-x-hidden hero-gradient">
      {/* <PriceIncreaseBanner isVisible={showBanner} onDismiss={handleDismiss} /> */}
      <Navbar showBanner={showBanner} />
      <HeroSection />
      <CompanySection />
      <div id="proof">
        <VideoSection />
      </div>
      <div id="undetectability">
        <UndetectabilitySection />
      </div>

      <div id="how-to-use">
        <StepsSection />
      </div>
      <CommandsSection />

      <div id="faq">
        <FaqSection />
      </div>
      <Footer />
      <IOSNotice />
    </div>
  )
}
