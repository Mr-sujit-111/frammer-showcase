"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function SvgAnimations() {
  return (
    <TooltipProvider>
      <section id="svg" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            SVG & Path Animations
            <Tooltip content="Animations applied to SVG elements and paths">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* SVG Path Drawing */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Path Drawing</h3>
              <div className="w-full h-64 flex items-center justify-center">
                <Tooltip content="SVG path drawing animation">
                  <motion.svg
                    width="150"
                    height="150"
                    viewBox="0 0 100 100"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="transparent"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: {
                            pathLength: { duration: 2, ease: "easeInOut" },
                            opacity: { duration: 0.3 },
                          },
                        },
                      }}
                    />
                    <motion.path
                      d="M25,50 L40,65 L75,30"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="transparent"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: {
                            pathLength: { delay: 0.5, duration: 1.5, ease: "easeInOut" },
                            opacity: { delay: 0.5, duration: 0.3 },
                          },
                        },
                      }}
                    />
                  </motion.svg>
                </Tooltip>
              </div>
            </div>

            {/* SVG Morphing */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">SVG Morphing</h3>
              <div className="w-full h-64 flex items-center justify-center">
                <Tooltip content="Click to toggle between shapes">
                  <MorphingSvg />
                </Tooltip>
              </div>
            </div>

            {/* Animated Icons */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Animated Icons</h3>
              <div className="w-full h-64 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-8">
                  <Tooltip content="Bouncing animation">
                    <BouncingIcon />
                  </Tooltip>
                  <Tooltip content="Spinning animation">
                    <SpinningIcon />
                  </Tooltip>
                  <Tooltip content="Pulsing animation">
                    <PulsingIcon />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

// Morphing SVG Component
function MorphingSvg() {
  const [isCircle, setIsCircle] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCircle(!isCircle)
    }, 2000)

    return () => clearInterval(interval)
  }, [isCircle])

  return (
    <motion.svg
      width="150"
      height="150"
      viewBox="0 0 100 100"
      onClick={() => setIsCircle(!isCircle)}
      className="cursor-pointer"
    >
      <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="currentColor"
        strokeLinecap="round"
        animate={{
          d: isCircle ? "M50,10 A40,40 0 1,1 49.9,10" : "M10,10 L90,10 L90,90 L10,90 Z",
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}

// Bouncing Icon Component
function BouncingIcon() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="flex items-center justify-center"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    </motion.div>
  )
}

// Spinning Icon Component
function SpinningIcon() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
        ease: "linear",
      }}
      className="flex items-center justify-center"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    </motion.div>
  )
}

// Pulsing Icon Component
function PulsingIcon() {
  return (
    <motion.div
      animate={{ scale: [1, 1.2, 1] }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
        ease: "easeInOut",
      }}
      className="flex items-center justify-center"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </motion.div>
  )
}

