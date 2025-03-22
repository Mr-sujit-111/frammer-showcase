"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { X, Info } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

export default function ModalSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index)
  }

  const accordionItems = [
    {
      title: "What is Framer Motion?",
      content:
        "Framer Motion is a production-ready motion library for React that powers animations and gestures in Framer, and is now available for React developers.",
      image: "/placeholder.svg?height=100&width=200&text=Framer+Motion",
    },
    {
      title: "How does it compare to other animation libraries?",
      content:
        "Framer Motion provides a declarative API that makes creating complex animations and gestures simple and intuitive, with features like layout animations and gestures built-in.",
      image: "/placeholder.svg?height=100&width=200&text=Comparison",
    },
    {
      title: "Is it difficult to learn?",
      content:
        "Framer Motion has a simple and consistent API that makes it easy to get started. If you know React, you can learn Framer Motion quickly.",
      image: "/placeholder.svg?height=100&width=200&text=Learning+Curve",
    },
  ]

  return (
    <TooltipProvider>
      <section id="modals" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Animated Modals & Overlays
            <Tooltip content="Animated UI components that appear on top of the main content">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Modal with Backdrop */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Modal with Backdrop</h3>
              <Tooltip content="Click to open a modal with backdrop blur">
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
              </Tooltip>

              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-md mx-4"
                    >
                      <Card>
                        <CardHeader className="relative">
                          <CardTitle>Animated Modal</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2"
                          >
                            <X size={18} />
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4 overflow-hidden rounded-md">
                            <img
                              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=400&auto=format&fit=crop"
                              alt="Modal content"
                              className="w-full h-auto"
                            />
                          </div>
                          <p className="text-muted-foreground">
                            This modal animates in with a spring effect and has a backdrop blur. Click outside or the X
                            to close.
                          </p>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown Menu */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Dropdown Menu</h3>
              <div className="relative">
                <Tooltip content="Click to toggle the dropdown menu">
                  <Button onClick={() => setIsDropdownOpen(!isDropdownOpen)} variant="outline">
                    Toggle Dropdown
                  </Button>
                </Tooltip>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-card rounded-md shadow-lg border z-10"
                    >
                      <div className="py-1">
                        {["Profile", "Settings", "Help", "Logout"].map((item, index) => (
                          <motion.button
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {item}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Accordion */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Accordion</h3>
              <div className="w-full">
                {accordionItems.map((item, index) => (
                  <div key={index} className="mb-2 border rounded-md overflow-hidden">
                    <Tooltip content={`Click to ${activeAccordion === index ? "collapse" : "expand"}`}>
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full px-4 py-3 text-left font-medium flex justify-between items-center hover:bg-accent/50"
                      >
                        {item.title}
                        <motion.span
                          animate={{ rotate: activeAccordion === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          ▼
                        </motion.span>
                      </button>
                    </Tooltip>
                    <AnimatePresence>
                      {activeAccordion === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-4 py-3 text-sm text-muted-foreground border-t">
                            <div className="mb-3 overflow-hidden rounded-md">
                              <img
                                src={
                                  index === 0
                                    ? "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?q=80&w=200&auto=format&fit=crop"
                                    : index === 1
                                      ? "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?q=80&w=200&auto=format&fit=crop"
                                      : "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=200&auto=format&fit=crop"
                                }
                                alt={item.title}
                                className="w-full h-auto"
                              />
                            </div>
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

