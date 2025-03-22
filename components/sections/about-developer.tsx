"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

export default function AboutDeveloper() {
  return (
    <section id="about" className="py-20 bg-accent/50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About the Developer
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <div className="w-40 h-40 mx-auto md:mx-0 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          borderRadius: ["40%", "50%", "40%"],
                        }}
                        transition={{
                          duration: 5,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                        className="w-36 h-36 rounded-full overflow-hidden"
                      >
                        <img
                          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop"
                          alt="Sujit Bhanderi"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </div>
                  </motion.div>

                  <div className="flex-grow">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-2xl font-bold mb-2 gradient-text"
                    >
                      Sujit Bhanderi
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-muted-foreground mb-4"
                    >
                      Next.js, React.js, Tailwind CSS, Framer Motion Expert
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="mb-6"
                    >
                      Sujit is a frontend developer specializing in creating beautiful, interactive, and performant web
                      applications. With expertise in Next.js, React, and animation libraries like Framer Motion, he
                      builds engaging user experiences that delight users and drive business results.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="flex flex-wrap gap-3"
                    >
                      <TooltipProvider>
                        <Tooltip content="Visit GitHub profile">
                          <Button asChild variant="outline" size="sm">
                            <a href="https://github.com/Mr-sujit-111" target="_blank" rel="noopener noreferrer">
                              <Github size={16} className="mr-2" />
                              GitHub
                            </a>
                          </Button>
                        </Tooltip>
                        <Tooltip content="Connect on LinkedIn">
                          <Button asChild variant="outline" size="sm">
                            <a
                              href="https://linkedin.com/in/sujit-bhanderi331"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin size={16} className="mr-2" />
                              LinkedIn
                            </a>
                          </Button>
                        </Tooltip>
                        <Tooltip content="Send an email">
                          <Button asChild variant="outline" size="sm">
                            <a href="mailto:sujitbhanderi331@gmail.com">
                              <Mail size={16} className="mr-2" />
                              Email
                            </a>
                          </Button>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

