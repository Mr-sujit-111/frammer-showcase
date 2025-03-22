"use client"

import type React from "react"

import { useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function InteractiveEffects() {
  const [isHovered, setIsHovered] = useState(false)

  // 3D Card tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  // Spring physics for smoother movement
  const springConfig = { damping: 15, stiffness: 150 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <TooltipProvider>
      <section id="interactive" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Interactive Hover & Tap Effects
            <Tooltip content="Animations triggered by user interactions">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* 3D Card Tilt Effect */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">3D Card Tilt Effect</h3>
              <Tooltip content="Move your mouse over the card to see the 3D effect">
                <motion.div
                  className="card-3d w-full max-w-md"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                    transformPerspective: 1200,
                  }}
                >
                  <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
                    <CardContent className="p-6 h-64 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-full h-32 mb-4 overflow-hidden rounded-md">
                          <img
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop"
                            alt="3D Card"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xl font-bold mb-2 gradient-text">3D Tilt Card</h4>
                        <p className="text-muted-foreground">
                          Move your mouse over this card to see the 3D tilt effect
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Tooltip>
            </div>

            {/* Button Hover Effects */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Button Hover & Tap Effects</h3>
              <div className="grid grid-cols-1 gap-6 w-full max-w-md">
                {/* Glow Effect Button */}
                <Tooltip content="Hover to see the glow effect">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className="absolute inset-0 bg-primary/20 blur-xl rounded-full"
                    />
                    <Button
                      className="w-full relative z-10"
                      size="lg"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Glow Effect
                    </Button>
                  </motion.div>
                </Tooltip>

                {/* Ripple Effect Button */}
                <Tooltip content="Click to see the ripple effect">
                  <div className="relative overflow-hidden">
                    <Button
                      className="w-full relative z-10"
                      size="lg"
                      onClick={(e) => {
                        const button = e.currentTarget
                        const rect = button.getBoundingClientRect()
                        const x = e.clientX - rect.left
                        const y = e.clientY - rect.top

                        const ripple = document.createElement("span")
                        ripple.style.position = "absolute"
                        ripple.style.width = "0px"
                        ripple.style.height = "0px"
                        ripple.style.left = `${x}px`
                        ripple.style.top = `${y}px`
                        ripple.style.backgroundColor = "rgba(255, 255, 255, 0.4)"
                        ripple.style.borderRadius = "50%"
                        ripple.style.transform = "translate(-50%, -50%)"
                        ripple.style.animation = "ripple 0.6s linear"

                        button.appendChild(ripple)

                        setTimeout(() => {
                          ripple.remove()
                        }, 600)
                      }}
                    >
                      Ripple Effect (Click Me)
                    </Button>
                    <style jsx>{`
                      @keyframes ripple {
                        0% {
                          width: 0px;
                          height: 0px;
                          opacity: 0.5;
                        }
                        100% {
                          width: 500px;
                          height: 500px;
                          opacity: 0;
                        }
                      }
                    `}</style>
                  </div>
                </Tooltip>

                {/* Scale & Rotate Button */}
                <Tooltip content="Hover to see scale and rotation">
                  <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.9, rotate: -2 }}>
                    <Button className="w-full" size="lg" variant="outline">
                      Scale & Rotate
                    </Button>
                  </motion.div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

