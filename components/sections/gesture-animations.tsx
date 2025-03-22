"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Info } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

export default function GestureAnimations() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  // Mouse follower
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Transform mouse position to element rotation
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10])
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  // Shake animation for error message
  const startShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  return (
    <TooltipProvider>
      <section id="gestures" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Gesture-Based Animations
            <Tooltip content="Animations that respond to user gestures">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Mouse Movement Animation */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Mouse Movement</h3>
              <Tooltip content="Move your mouse inside this area">
                <div
                  ref={containerRef}
                  className="w-full h-64 bg-accent/50 rounded-xl flex items-center justify-center overflow-hidden"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    mouseX.set(0)
                    mouseY.set(0)
                  }}
                >
                  <motion.div
                    style={{
                      rotateX,
                      rotateY,
                      transformPerspective: 1000,
                    }}
                    className="w-32 h-32 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=150&auto=format&fit=crop"
                      alt="Move mouse"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>
                </div>
              </Tooltip>
            </div>

            {/* Shake Effect */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Shake Effect</h3>
              <Tooltip content="Click to trigger shake animation">
                <motion.div
                  animate={
                    isShaking
                      ? {
                          x: [0, -10, 10, -10, 10, 0],
                          transition: { duration: 0.5 },
                        }
                      : {}
                  }
                  className="w-full"
                  onClick={startShake}
                >
                  <Card className="border-destructive">
                    <CardContent className="p-6 flex items-center text-destructive">
                      <AlertCircle className="mr-2" size={20} />
                      <p>Click me to see shake effect</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </Tooltip>
              <Button
                onClick={startShake}
                className="mt-4 bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Trigger Shake
              </Button>
            </div>

            {/* Flip Card */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Flip Card</h3>
              <Tooltip content="Click to flip the card">
                <div className="w-full h-64 perspective">
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="w-full h-full relative preserve-3d cursor-pointer"
                  >
                    {/* Front of card */}
                    <motion.div
                      style={{ backfaceVisibility: "hidden" }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-card rounded-xl border shadow-md"
                    >
                      <div className="text-center">
                        <img
                          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=150&auto=format&fit=crop"
                          alt="Card front"
                          className="w-24 h-24 mx-auto mb-4 rounded-md"
                        />
                        <p className="text-lg font-medium">Click to Flip</p>
                      </div>
                    </motion.div>

                    {/* Back of card */}
                    <motion.div
                      style={{
                        backfaceVisibility: "hidden",
                        rotateY: 180,
                      }}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-primary text-primary-foreground rounded-xl border shadow-md"
                    >
                      <div className="text-center">
                        <img
                          src="https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=150&auto=format&fit=crop"
                          alt="Card back"
                          className="w-24 h-24 mx-auto mb-4 rounded-md"
                        />
                        <p className="text-lg font-medium">Back of Card</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

// Custom button component for this section
function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-primary text-primary-foreground ${className}`}
    >
      {children}
    </motion.button>
  )
}

// Add these styles to your CSS
const styles = `
.perspective {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
`

