"use client"

import { motion } from "framer-motion"
import HeroSection from "@/components/sections/hero-section"
import ScrollAnimations from "@/components/sections/scroll-animations"
import InteractiveEffects from "@/components/sections/interactive-effects"
import DragDropSection from "@/components/sections/drag-drop-section"
import GestureAnimations from "@/components/sections/gesture-animations"
import CarouselSection from "@/components/sections/carousel-section"
import ModalSection from "@/components/sections/modal-section"
import SvgAnimations from "@/components/sections/svg-animations"
import FormSection from "@/components/sections/form-section"
import AboutDeveloper from "@/components/sections/about-developer"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Home() {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <HeroSection />
        <ScrollAnimations />
        <InteractiveEffects />
        <DragDropSection />
        <GestureAnimations />
        <CarouselSection />
        <FormSection />
        <ModalSection />
        <SvgAnimations />
        <AboutDeveloper />
      </motion.div>
    </TooltipProvider>
  )
}

