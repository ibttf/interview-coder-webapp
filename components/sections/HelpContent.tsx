"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface HeaderProps {
  title: string
  description: string
}

function Header({ title, description }: HeaderProps) {
  return (
    <div className="border-b border-zinc-800 pb-8 mb-8">
      <h1 className="text-2xl font-medium tracking-tight">{title}</h1>
      <p className="mt-2 text-zinc-400 text-sm">{description}</p>
    </div>
  )
}

interface BoxProps {
  children: React.ReactNode
  variant?: "default" | "error"
  size?: "sm" | "lg"
  className?: string
}

function Box({
  children,
  variant = "default",
  size = "lg",
  className
}: BoxProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-gradient-to-r p-6",
        {
          "border-zinc-800/50 from-zinc-900/50 to-zinc-800/30":
            variant === "default",
          "border-red-500/20 from-red-500/5 to-red-500/10": variant === "error",
          "p-5": size === "sm",
          "p-6": size === "lg"
        },
        className
      )}
    >
      {children}
    </div>
  )
}

interface SectionHeadingProps {
  children: React.ReactNode
  variant?: "default" | "error"
}

function SectionHeading({
  children,
  variant = "default"
}: SectionHeadingProps) {
  return (
    <h2
      className={cn("text-base font-medium mt-0", {
        "text-zinc-200": variant === "default",
        "text-red-400": variant === "error"
      })}
    >
      {children}
    </h2>
  )
}

interface CardGridProps {
  children: React.ReactNode
  className?: string
}

function CardGrid({ children, className }: CardGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {children}
    </div>
  )
}

interface NavigationCardProps {
  href: string
  title: string
  description: string
}

function NavigationCard({ href, title, description }: NavigationCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-zinc-800/50 bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 p-5 transition-all duration-300 ease-in-out hover:border-zinc-600 hover:bg-gradient-to-r hover:from-zinc-800/50 hover:to-zinc-700/30 hover:shadow-lg"
    >
      <h3 className="text-sm font-medium text-zinc-200 transition-colors duration-300 group-hover:text-zinc-100">
        {title}
      </h3>
      <p className="mt-1 text-xs text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
        {description}
      </p>
    </Link>
  )
}

interface BulletListProps {
  items: string[]
  variant?: "default" | "error"
}

function BulletList({ items, variant = "default" }: BulletListProps) {
  return (
    <ul className="space-y-3 mt-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          {variant === "default" ? (
            <div className="w-5 h-5 rounded-full bg-green-500/10 flex-shrink-0 flex items-center justify-center mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
          ) : (
            <span className="text-red-400">•</span>
          )}
          <p className="text-sm text-zinc-300 mt-0">{item}</p>
        </li>
      ))}
    </ul>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
}

function Step({ number, title, description }: StepProps) {
  return (
    <div className="flex gap-4 items-start p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50">
      <div className="w-6 h-6 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center text-sm font-medium text-blue-400">
        {number}
      </div>
      <div>
        <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
        <p className="mt-1 text-xs text-zinc-400">{description}</p>
      </div>
    </div>
  )
}

export function HelpContent() {
  const searchParams = useSearchParams()
  const section = searchParams.get("section") || "getting-started"

  const renderContent = () => {
    switch (section) {
      case "getting-started":
        return (
          <div className="space-y-16">
            <div id="getting-started">
              <Header
                title="Getting Started"
                description="Welcome to Interview Coder. This guide will help you get up and running quickly."
              />

              <div className="prose prose-invert max-w-none">
                <Box>
                  <SectionHeading>Quick Start Steps</SectionHeading>
                  <ol className="mt-4 space-y-3 text-sm text-zinc-300">
                    <li>
                      Install the Interview Coder app in the download link below
                      (MacOS only)
                    </li>
                    <li>Move the app into your Applications folder</li>
                    <li>
                      Sign up for an account or log in on the InterviewCoder
                      website and subscribe.
                    </li>
                    <li>Open the app and log in with your account.</li>

                    <li>
                      Configure your language preferences (Python, Java,
                      Javascript, Golang, SQL, R, Ruby, C++, Kotlin, Swift) in
                      the{" "}
                      <Link href="/settings" className="underline">
                        settings
                      </Link>{" "}
                      page, or in the app.
                    </li>
                    <li>Start shitting on your technicals!</li>
                  </ol>
                  <div className="mt-4">
                    {" "}
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
                            Download for Mac
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <Link
                            href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview-Coder-arm64.dmg"
                            className="w-full"
                          >
                            Download for Mac (Apple Silicon)
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link
                            href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview-Coder-x64.dmg"
                            className="w-full"
                          >
                            Download for Mac (Intel)
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Box>

                <CardGrid className="mt-12">
                  <NavigationCard
                    href="/help?section=configuration"
                    title="Configuration"
                    description="Learn how to customize Interview Coder to your needs"
                  />
                  <NavigationCard
                    href="/help?section=undetectability"
                    title="Undetectability"
                    description="Understand how our stealth features work"
                  />
                  <NavigationCard
                    href="/help?section=out-of-credits"
                    title="Credits & Billing"
                    description="Manage your subscription and credits"
                  />
                  <NavigationCard
                    href="/help?section=cant-see-screen"
                    title="Troubleshooting"
                    description="Fix common issues and get help"
                  />
                </CardGrid>
              </div>
            </div>
          </div>
        )

      // Add other cases for different sections...
      default:
        return null
    }
  }

  return <div className="max-w-3xl mx-auto">{renderContent()}</div>
}
