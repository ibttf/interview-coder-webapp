"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroVideo } from "@/components/ui/hero-video"
import { WingsBackground } from "@/components/ui/WingsBackground"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export const HeroSection = () => {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center pt-36">
      {/* <WingsBackground /> */}
      <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px]  mb-8">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFF00_0%,transparent_50%,#FFFF00_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          {t("misc.easyWorker")}
        </span>
      </button>
      <div className="container relative z-10 px-4 text-center max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.3]"
        >
          <span className="white-gradient pb-6  ">{t("hero.tagline")}</span>
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center text-md lg:text-[16px] lg:px-24 font-medium text-[#B3B3B3] font-['Inter']"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            fontWeight: 500
          }}
        >
          {t("hero.subtitle")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary w-full sm:w-auto px-6 py-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/apple.svg"
                    alt="Apple"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  {t("hero.downloadMac")}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link
                  href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview-Coder-arm64.dmg"
                  className="w-full"
                >
                  {t("hero.macSilicon")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview-Coder-x64.dmg"
                  className="w-full"
                >
                  {t("hero.macIntel")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="highlight" className="w-full sm:w-auto px-6 py-2">
            <Link
              href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview.Coder-Windows-1.0.18.exe"
              className="flex items-center gap-2"
            >
              <Image
                src="/windows.svg"
                alt="Windows"
                width={16}
                height={16}
                className="w-5 h-5"
              />
              {t("hero.downloadWindows")}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <HeroVideo />
        </motion.div>
      </div>
    </main>
  )
}
