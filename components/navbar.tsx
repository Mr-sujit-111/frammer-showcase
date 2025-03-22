"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Scroll", href: "#scroll" },
  { name: "Interactive", href: "#interactive" },
  { name: "Drag & Drop", href: "#drag-drop" },
  { name: "Gestures", href: "#gestures" },
  { name: "Sliders", href: "#sliders" },
  { name: "Modals", href: "#modals" },
  { name: "SVG", href: "#svg" },
  { name: "About", href: "#about" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="font-bold text-xl">
          <span className="gradient-text">Sujit Bhanderi</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-2 text-sm rounded-md hover:bg-accent"
            >
              {item.name}
            </motion.a>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="ml-2">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background border-b"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm rounded-md hover:bg-accent"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

