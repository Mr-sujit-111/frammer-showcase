"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation, type PanInfo, useMotionValue } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Designer",
    content:
      "The animations created with Framer Motion are incredibly smooth and professional. It's transformed our user experience completely.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Frontend Developer",
    content:
      "I've been using Framer Motion for all my projects now. The API is intuitive and the animations are butter-smooth.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "UX Researcher",
    content:
      "Our user engagement metrics improved significantly after implementing these animations. Framer Motion is a game-changer.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Creative Director",
    content:
      "The ability to create complex animations with simple code is what makes Framer Motion stand out. Highly recommended!",
  },
  {
    id: 5,
    name: "David Kim",
    role: "App Developer",
    content:
      "Implementing animations used to be a pain point in our development process. Framer Motion has made it enjoyable.",
  },
]

// Image slider data
const images = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
]

export default function SliderSection() {
  return (
    <section id="sliders" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          Motion-Powered Sliders & Carousels
        </motion.h2>

        <div className="space-y-20">
          {/* Infinite Image Slider */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center">Infinite Image Slider</h3>
            <InfiniteSlider images={images} />
          </div>

          {/* Testimonial Carousel */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-center">Testimonial Carousel</h3>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  )
}

// Infinite Image Slider Component
function InfiniteSlider({ images }: { images: string[] }) {
  const [width, setWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderRef.current) {
      setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth)
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <motion.div ref={sliderRef} className="cursor-grab active:cursor-grabbing" whileTap={{ cursor: "grabbing" }}>
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex">
          {images.concat(images).map((image, index) => (
            <motion.div key={index} className="min-w-[300px] h-[200px] p-2" whileHover={{ scale: 0.98 }}>
              <img
                src={image || "/placeholder.svg"}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

// Testimonial Carousel Component
function TestimonialCarousel({ testimonials }: { testimonials: any[] }) {
  const [current, setCurrent] = useState(0)
  const controls = useAnimation()
  const x = useMotionValue(0)

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100

    if (info.offset.x < -threshold && current < testimonials.length - 1) {
      setCurrent(current + 1)
    } else if (info.offset.x > threshold && current > 0) {
      setCurrent(current - 1)
    } else {
      // Snap back to current if threshold not reached
      controls.start({ x: 0 })
    }
  }

  useEffect(() => {
    controls.start({ x: -current * 100 + "%" })
  }, [current, controls])

  const nextSlide = () => {
    if (current < testimonials.length - 1) {
      setCurrent(current + 1)
    }
  }

  const prevSlide = () => {
    if (current > 0) {
      setCurrent(current - 1)
    }
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          animate={controls}
          style={{ x }}
          className="flex"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="min-w-full px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: current === index ? 1 : 0.5,
                scale: current === index ? 1 : 0.9,
              }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4 text-muted-foreground">"{testimonial.content}"</p>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <motion.button
          onClick={prevSlide}
          disabled={current === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full bg-primary/10 ${current === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${current === index ? "bg-primary" : "bg-primary/30"}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextSlide}
          disabled={current === testimonials.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full bg-primary/10 ${current === testimonials.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  )
}

