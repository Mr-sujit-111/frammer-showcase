"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export default function FormSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      form.reset()
    }, 3000)
  }

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  }

  return (
    <section id="form" className="py-20 bg-accent/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Animated Form Interactions
          <TooltipProvider>
            <Tooltip content="Forms with validation and animations">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </TooltipProvider>
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-green-100 dark:bg-green-900/30 p-8 rounded-xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 10 }}
                  className="flex justify-center mb-4"
                >
                  <CheckCircle size={60} className="text-green-600 dark:text-green-400" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for your message. We'll get back to you soon.</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial="hidden" animate="visible" exit="hidden" variants={formVariants}>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                              />
                            </FormControl>
                            <AnimatePresence>
                              {form.formState.errors.name && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                  <FormMessage />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                type="email"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                              />
                            </FormControl>
                            <AnimatePresence>
                              {form.formState.errors.email && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                  <FormMessage />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Message subject"
                                {...field}
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                              />
                            </FormControl>
                            <AnimatePresence>
                              {form.formState.errors.subject && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                  <FormMessage />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message"
                                {...field}
                                className="min-h-[120px] transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                              />
                            </FormControl>
                            <FormDescription>Share your thoughts or questions with us.</FormDescription>
                            <AnimatePresence>
                              {form.formState.errors.message && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                >
                                  <FormMessage />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                      <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                        <motion.span
                          animate={form.formState.isSubmitting ? { rotate: 360 } : {}}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                          className="mr-2"
                        >
                          {form.formState.isSubmitting ? (
                            <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full" />
                          ) : (
                            <AlertCircle size={16} />
                          )}
                        </motion.span>
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

