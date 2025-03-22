"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function ScrollAnimations() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  }

  // Sample text for word-by-word animation
  const text = "Animations that respond to scrolling create an engaging and interactive user experience."
  const words = text.split(" ")

  // Card animation variants
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: i * 0.1,
      },
    }),
  }

  return (
    <TooltipProvider>
      <section id="scroll" ref={containerRef} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Scroll-Based & Parallax Animations
            <Tooltip content="Animations triggered by scrolling position">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </motion.h2>

          {/* Parallax Background Elements */}
          <div className="relative h-[50vh] mb-20 overflow-hidden rounded-xl">
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
                opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]),
              }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/20 dark:to-purple-900/20"
            />

            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
                scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
              }}
              className="absolute inset-0 opacity-30"
            >
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
                alt="Parallax background with gradient"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 1], ["10%", "50%"]),
                scale: useTransform(scrollYProgress, [0, 1], [1, 1.2]),
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h3 className="text-4xl md:text-6xl font-bold text-center gradient-text">Parallax Effect</h3>
            </motion.div>
          </div>

          {/* Fade-in Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                custom={item}
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Tooltip content={`Fade-in animation with delay ${item * 0.1}s`}>
                  <Card className="overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <CardContent className="p-6">
                        <div className="w-full h-40 mb-4 overflow-hidden rounded-md">
                          <img
                            src={`https://images.unsplash.com/photo-${item === 1 ? "1633613286848-e6f43bbafb8d" : item === 2 ? "1580927752452-89d6a6072337" : "1614624532603-9e304bd7a3e1"}?q=80&w=500&auto=format&fit=crop`}
                            alt={`Fade-in Section ${item}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Fade-in Section {item}</h3>
                        <p className="text-muted-foreground">
                          This section fades in as it enters the viewport, creating a clean and engaging scrolling
                          experience.
                        </p>
                      </CardContent>
                    </motion.div>
                  </Card>
                </Tooltip>
              </motion.div>
            ))}
          </div>

          {/* Word-by-word Text Animation */}
          <div className="mb-20 text-center">
            <h3 className="text-2xl font-semibold mb-6">Word-by-Word Animation</h3>
            <div className="flex flex-wrap justify-center gap-2 text-xl md:text-2xl">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={textVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Scale Animation on Scroll */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-accent p-8 rounded-xl text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">Scale Animation on Scroll</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This element scales up as it enters the viewport, drawing attention to important content.
            </p>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  )
}

