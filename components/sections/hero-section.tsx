"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Animation variants for staggered text reveal
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  }

  return (
    <section id="hero" ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-900/20 dark:to-purple-900/20"
        style={{ y, opacity }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]), opacity }}
      >
        <div className="grid grid-cols-5 gap-4 opacity-10">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: i * 0.02,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
              className="w-16 h-16 rounded-full bg-primary/50"
            />
          ))}
        </div>
      </motion.div>

      {/* Hero image with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.1]),
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
          alt="Abstract technology background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.h1 variants={item} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Framer Motion</span> Showcase
          </motion.h1>

          <motion.p variants={item} className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Exploring the power of animations and interactions with React and Framer Motion
          </motion.p>

          <motion.div variants={item}>
            <TooltipProvider>
              <Tooltip content="Scroll down to explore animations">
                <Button size="lg" asChild className="rounded-full">
                  <a href="#scroll">
                    <motion.span
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      className="mr-2"
                    >
                      <ArrowDown size={20} />
                    </motion.span>
                    Explore Animations
                  </a>
                </Button>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

