"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl"
      >
        <div className="relative">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
              }}
            >
              <span className="white-gradient">Proof</span>
            </h2>
            <p className="text-md sm:text-lg text-[#999999]">
              Watch me get an offer from Amazon using Interview Coder.
              Throughout this whole video, you'll see me use Interview Coder for
              both the OA and the final round.
              <br />
              <br />
              Skeptical? Watch the entire, uncut technical interview{" "}
              <a
                href="https://youtu.be/rcH813f5vCE"
                target="_blank"
                className="underline hover:text-gray-400 transition-colors"
              >
                here
              </a>
              .
            </p>
          </motion.div>

          <video
            ref={videoRef}
            className="w-full rounded-xl shadow-xl"
            controls
            playsInline
            preload="metadata"
            controlsList="nodownload"
            disablePictureInPicture
            disableRemotePlayback
          >
            <source src="/videos/amazon.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </motion.div>
    </section>
  )
}
