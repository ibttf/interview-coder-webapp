"use client"
import { AnimatedKeyboard } from "@/components/ui/AnimatedKeyboard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/LanguageContext"

function FaqItem({
  question,
  answer,
  isOpen,
  onClick
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      initial={false}
      className={cn(
        "border-b border-neutral-700/40 last:border-none",
        isOpen ? "bg-neutral-900/50" : ""
      )}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between py-4 px-5 text-left"
      >
        <span className="text-lg font-medium text-neutral-200">{question}</span>
        <span
          className={cn(
            "ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-700/50",
            isOpen ? "bg-neutral-700" : "bg-transparent"
          )}
        >
          <svg
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="pb-4 px-5 text-neutral-400"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { t } = useLanguage()

  const faqs = [
    {
      question: t("faq.questions.q1.question"),
      answer: t("faq.questions.q1.answer")
    },
    {
      question: t("faq.questions.q2.question"),
      answer: t("faq.questions.q2.answer")
    },
    {
      question: t("faq.questions.q3.question"),
      answer: t("faq.questions.q3.answer")
    },
    {
      question: t("faq.questions.q4.question"),
      answer: t("faq.questions.q4.answer")
    },
    {
      question: t("faq.questions.q5.question"),
      answer: t("faq.questions.q5.answer")
    }
  ]

  return (
    <section className="py-24 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            <span className="white-gradient font-inter">{t("faq.title")}</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="mx-auto rounded-2xl border border-neutral-700/40 divide-y divide-neutral-700/40 bg-neutral-900/20 backdrop-blur-sm">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Help Center Link */}
        <div className="text-center mt-8">
          <p className="text-neutral-500">
            {t("faq.helpCenterPrefix")}{" "}
            <Link href="/help" className="text-primary hover:underline">
              {t("faq.helpCenterLink")}
            </Link>{" "}
            {t("faq.helpCenterSuffix")}
          </p>
        </div>

        {/* Divider */}
        <div className="max-w-xs mx-auto my-24">
          <div className="h-px bg-neutral-800" />
        </div>

        {/* Call to Action */}
        <div className="text-center ">
          <div className="relative w-full h-[600px] lg:h-[800px]">
            <AnimatedKeyboard />
          </div>
          <div className="">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">
                {t("cta.title")}
              </h2>
              <p className="text-neutral-400">{t("cta.subtitle")}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-black gap-2 text-sm font-medium h-10 w-[280px] md:w-[320px] bg-primary hover:bg-primary/90">
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
              <Button
                variant="outline"
                className="gap-2 text-sm font-medium h-10 w-[280px] md:w-[320px] border-neutral-700 hover:bg-neutral-800"
              >
                <Link
                  href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview.Coder-Windows-1.0.18.exe"
                  className="flex items-center gap-2"
                >
                  <Image
                    src="/windows.svg"
                    alt="Windows"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  {t("hero.downloadWindows")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
