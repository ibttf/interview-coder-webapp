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
import { HelpNavbar } from "@/components/sections/HelpNavbar"

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
      className="block rounded-xl border border-zinc-800/50 bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 p-6 hover:border-zinc-700/50 hover:bg-zinc-900/50 transition-colors"
    >
      <h3 className="font-medium tracking-tight">{title}</h3>
      <p className="mt-2 text-zinc-400 text-sm">{description}</p>
    </Link>
  )
}

interface BulletListProps {
  items: string[]
}

function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <div className="mr-3 mt-1">
            <div className="h-2 w-2 rounded-full bg-zinc-500" />
          </div>
          <span className="text-sm text-zinc-300">{item}</span>
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
    <div className="flex items-start">
      <div className="flex-none">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 text-xs">
          {number}
        </div>
      </div>
      <div className="ml-4 flex-auto">
        <div className="font-medium">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{description}</div>
      </div>
    </div>
  )
}

export default function HelpCenterContent() {
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
                      Javascript, Golang, Ruby, C++, SQL, R, and Swift) in the{" "}
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

                <Box className="mt-8">
                  <SectionHeading>Getting Started Tutorial</SectionHeading>
                  <div className="mt-4 aspect-video w-full">
                    <iframe
                      className="w-full h-full rounded-lg"
                      src="https://www.youtube.com/embed/w5LYB2u9-ho"
                      title="Getting Started Tutorial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
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

      case "configuration":
        return (
          <div className="space-y-16">
            <div id="configuration">
              <Header
                title="Configuration"
                description="Customize Interview Coder to match your needs and preferences."
              />

              <div className="prose prose-invert max-w-none">
                <Box>
                  <SectionHeading>Application Settings</SectionHeading>
                  <div className="mt-6 space-y-3"></div>
                  You can manage your language preferences in the{" "}
                  <Link href="/settings" className="underline">
                    settings
                  </Link>{" "}
                  page.
                  <br></br>
                  <br></br> Currently, we offer support for Python, Java,
                  Javascript, Go, C++, Kotlin, and Swift.
                </Box>
              </div>
            </div>
          </div>
        )

      case "undetectability":
        return (
          <div className="space-y-16">
            <div id="undetectability">
              <Header
                title="Undetectability"
                description="Learn how Interview Coder remains completely undetectable during interviews."
              />

              <div className="prose prose-invert max-w-none space-y-8">
                <div className="space-y-4">
                  <p className="text-sm text-zinc-300">
                    Coding interview platforms employ various detection methods
                    to prevent cheating. Here's how they try to detect tools
                    like Interview Coder, and how we counter each measure.
                  </p>
                  <p className="text-sm font-medium text-emerald-400">
                    Interview Coder has never been detected in our real
                    interview tests by any coding platform.
                  </p>
                </div>

                <div className="border-t border-zinc-800 pt-8">
                  <div className="space-y-3">
                    <h2 className="text-lg font-medium text-zinc-200">
                      Detection Methods & Our Counter-Measures
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Below are the common methods platforms use to detect
                      cheating, and how Interview Coder makes each one
                      ineffective. Each red box shows a detection method, with
                      our counter-measure shown in green below it.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <Box>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex-shrink-0 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-400"
                          >
                            <path
                              d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028M13.9868 5L12.9934 8.70743M11.8891 6.91529C11.2327 7.10699 10.5911 7.35656 9.97193 7.66374M13.9868 19.6592L12.9934 15.9518M11.8891 17.7439C11.2327 17.5522 10.5911 17.3026 9.97193 16.9955M7.02045 9.35641L5.32397 7.82959C3.78147 6.44127 3.01022 5.74711 3.01022 4.85641C3.01022 3.96571 3.78147 3.27155 5.32397 1.88324M7.02045 15.3028L5.32397 16.8296C3.78147 18.2179 3.01022 18.9121 3.01022 19.8028C3.01022 20.6935 3.78147 21.3877 5.32397 22.776"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-zinc-200">
                            Screen Sharing Detection
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            Interviewers will ask you to share your screen on
                            platforms like Zoom, Google Meet, Hackerrank, and
                            Coderpad.
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-emerald-400"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-emerald-300">
                            App is invisible to screen sharing software and
                            screenshots
                          </p>
                        </div>
                      </div>
                    </div>
                  </Box>
                  <Box>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex-shrink-0 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-400"
                          >
                            <path
                              d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.25M8.25 22.25H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-zinc-200">
                            Asking for reasoning behind solutions
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            Interviewers will ask you to reason out your
                            solution and don't just want code.
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-emerald-400"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-emerald-300">
                            Interviewers will ask you to explain your solutions.
                            Interview Coder comes with every line of code
                            commented, as well as a few sentences of thoughts
                            that will naturally lead you to a solution.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Box>

                  <Box>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex-shrink-0 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-400"
                          >
                            <path
                              d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-zinc-200">
                            Webcam Monitoring
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            Platforms track eye movements and suspicious looking
                            away from screen
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-emerald-400"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-emerald-300">
                            Use ⌘ + the arrow keys to move the app with the
                            solutions over your coding area so that your eyes
                            never move from the code area.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Box>

                  <Box>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 flex-shrink-0 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-red-400"
                          >
                            <path
                              d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.25M8.25 22.25H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-zinc-200">
                            Active tab monitoring
                          </h3>
                          <p className="mt-1 text-sm text-zinc-400">
                            Platforms will check if your cursor becomes
                            inactive, or if you move from the active tab.
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-950/30 border border-emerald-900/50 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="text-emerald-400"
                            >
                              <path
                                d="M20 6L9 17L4 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <p className="text-sm text-emerald-300">
                            Interview Coder is designed so that when you toggle
                            visibility with ⌘ +B, your cursor will stay focused,
                            and your active tab will not change at all.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Box>
                </div>

                <Box variant="error">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM8 4v4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-400"
                        />
                        <path
                          d="M8 11.5v.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-red-400"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-red-400">
                        MacOS Screen Sharing Warning
                      </h3>
                      <p className="mt-2 text-sm text-zinc-300">
                        Due to an unresolved bug in Electron, some WebRTC-based
                        screen-sharing software may be able to see Interview
                        Coder on MacOS while sharing your full screen. To see if
                        you're affected, download the application and try to
                        screen-share. If it shows, then you're affected. Please
                        be careful to note this as we do not offer refunds.
                      </p>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )

      case "out-of-credits":
        return (
          <div className="space-y-16">
            <div id="out-of-credits">
              <Header
                title="Out of Credits"
                description="Troubleshoot and resolve credit-related issues."
              />

              <div className="prose prose-invert max-w-none space-y-4">
                <Box className="">
                  <SectionHeading>Quick Fix</SectionHeading>
                  <div className="mt-2">
                    <p className="text-sm  flex items-center gap-2">
                      Press
                      <kbd className="px-2 py-1 bg-zinc-800 rounded text-xs font-medium">
                        ⌘ Q
                      </kbd>
                      on the application to close the app, and reopen it.
                    </p>
                  </div>
                </Box>

                <Box>
                  <SectionHeading>Other Reasons</SectionHeading>
                  <BulletList
                    items={[
                      "Your subscription has expired",
                      "You've used all available credits for the month"
                    ]}
                  />
                  <div className="mt-6">
                    <Button size="sm">Upgrade Plan</Button>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )

      case "cant-see-screen":
        return (
          <div className="space-y-16">
            <div id="cant-see-screen">
              <Header
                title="Can't See Screen"
                description="Follow these steps to resolve screen visibility issues."
              />

              <div className="prose prose-invert max-w-none">
                <Box>
                  <SectionHeading>Troubleshooting Steps</SectionHeading>
                  <div className="mt-6 space-y-3">
                    <Step
                      number={1}
                      title="Press ⌘ + B to toggle visibility"
                      description="Your application might be hidden, press ⌘ + B to toggle visibility"
                    />
                    <Step
                      number={2}
                      title="Uninstall and reinstall the app using the link below."
                      description="Sometimes a simple refresh can fix display issues"
                    />
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )

      case "shows-when-sharing":
        return (
          <div className="space-y-16">
            <div id="shows-when-sharing">
              <Header
                title="Shows When Sharing Screen"
                description="Quick fixes for visibility issues during screen sharing."
              />

              <Box variant="error">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zM8 4v4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-400"
                      />
                      <path
                        d="M8 11.5v.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-400"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-400">
                      MacOS Screen Sharing Error
                    </h3>
                    <p className="mt-2 text-sm text-zinc-300">
                      Due to an unresolved bug in Electron, some WebRTC-based
                      screen-sharing software may be able to see Interview Coder
                      on MacOS while sharing your full screen. To see if you're
                      affected, download the application without subscribing and
                      try to screen-share. If it shows, then you're affected.
                      Please be careful to note this as we do not offer refunds.
                    </p>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        )

      case "cancel-subscription":
        return (
          <div className="space-y-16">
            <div id="cancel-subscription">
              <Header
                title="Cancel Subscription"
                description="Learn how to cancel your Interview Coder subscription."
              />

              <div className="prose prose-invert max-w-none space-y-8">
                <Box>
                  <div className="space-y-4">
                    <div>
                      <SectionHeading>How to Cancel</SectionHeading>
                      <p className="mt-2 text-sm text-zinc-300">
                        You can cancel your subscription anytime from the{" "}
                        <Link
                          href="/settings"
                          className="text-primary hover:text-primary/90 underline"
                        >
                          settings
                        </Link>{" "}
                        page. After cancellation:
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        </div>
                        <p className="text-sm text-zinc-300">
                          Your subscription will remain active until the end of
                          your current billing period
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        </div>
                        <p className="text-sm text-zinc-300">
                          You won't be charged again after cancellation
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        </div>
                        <p className="text-sm text-zinc-300">
                          You can continue using all features until your
                          subscription expires
                        </p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/settings">Go to Settings</Link>
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )

      case "refund-policy":
        return (
          <div className="space-y-16">
            <div id="refund-policy">
              <Header
                title="Refund Policy"
                description="Learn about our money-back guarantee and refund process."
              />

              <div className="prose prose-invert max-w-none space-y-8">
                <Box>
                  <div className="space-y-4">
                    <div>
                      <SectionHeading>Refund Policy</SectionHeading>
                      <p className="mt-2 text-sm text-zinc-300">
                        We offer a 24-hour refund policy for our software
                        subscription ONLY in the condition that you are able to
                        show video evidence that it is not working on your
                        computer. Concerns like{" "}
                        <a
                          href="/help?section=shows-when-sharing"
                          className="underline"
                        >
                          detection by screen-sharing software
                        </a>
                        , or slowness in solution generation are not refundable.
                      </p>
                    </div>

                    <div className="mt-6">
                      <SectionHeading>How to Request a Refund</SectionHeading>
                      <div className="space-y-3 mt-4">
                        <Step
                          number={1}
                          title="Contact Support"
                          description="Email us at churlee12@gmail.com or text 4709192464"
                        />
                        <Step
                          number={2}
                          title="Provide Details"
                          description="Include your purchase details and proof of the software not working on your machine"
                        />
                        <Step
                          number={3}
                          title="Processing Time"
                          description="Refunds will be processed within 5-7 business days"
                        />
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex">
      <HelpNavbar />
      <main className="flex-1 px-8 py-12 lg:px-12 lg:py-16">
        <div className="max-w-3xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  )
}
