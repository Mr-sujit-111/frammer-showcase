"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

// Sample data for different carousel types
const imageSlides = [
  {
    id: 1,
    title: "Mountain Landscape",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
    description: "Beautiful mountain landscape with snow-capped peaks",
  },
  {
    id: 2,
    title: "Ocean View",
    image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop",
    description: "Serene ocean view with waves crashing on the shore",
  },
  {
    id: 3,
    title: "Forest Trail",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop",
    description: "Lush green forest trail with sunlight filtering through trees",
  },
  {
    id: 4,
    title: "Desert Sunset",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600&auto=format&fit=crop",
    description: "Stunning sunset over desert dunes with vibrant colors",
  },
  {
    id: 5,
    title: "City Skyline",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
    description: "Modern city skyline with skyscrapers at night",
  },
]

const cardSlides = [
  {
    id: 1,
    title: "Product Design",
    icon: "🎨",
    description: "Creating intuitive and beautiful user interfaces",
  },
  {
    id: 2,
    title: "Web Development",
    icon: "💻",
    description: "Building responsive and performant web applications",
  },
  {
    id: 3,
    title: "Mobile Apps",
    icon: "📱",
    description: "Developing cross-platform mobile applications",
  },
  {
    id: 4,
    title: "Animation",
    icon: "✨",
    description: "Adding life to interfaces with smooth animations",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Product Designer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
    content:
      "The animations created with Framer Motion are incredibly smooth and professional. It's transformed our user experience completely.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    content:
      "I've been using Framer Motion for all my projects now. The API is intuitive and the animations are butter-smooth.",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "UX Researcher",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    content:
      "Our user engagement metrics improved significantly after implementing these animations. Framer Motion is a game-changer.",
  },
]

export default function CarouselSection() {
  return (
    <TooltipProvider>
      <section id="carousels" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Advanced Carousel Animations
          </motion.h2>

          <Tabs defaultValue="fade" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="fade">Fade Transition</TabsTrigger>
              <TabsTrigger value="slide">Slide Transition</TabsTrigger>
              <TabsTrigger value="3d">3D Carousel</TabsTrigger>
            </TabsList>

            <TabsContent value="fade" className="mt-6">
              <FadeCarousel slides={imageSlides} />
            </TabsContent>

            <TabsContent value="slide" className="mt-6">
              <SlideCarousel slides={cardSlides} />
            </TabsContent>

            <TabsContent value="3d" className="mt-6">
              <ThreeDCarousel slides={testimonials} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </TooltipProvider>
  )
}

// Fade Transition Carousel
function FadeCarousel({ slides }: { slides: any[] }) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-accent/20 p-6">
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-semibold">Fade Transition Carousel</h3>
        <div className="flex space-x-2">
          <Tooltip content="Previous slide">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Next slide">
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="relative h-[400px] overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].image || "/placeholder.svg"}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h4 className="text-xl font-bold mb-2">{slides[current].title}</h4>
              <p>{slides[current].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-white/30"}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Slide Transition Carousel
function SlideCarousel({ slides }: { slides: any[] }) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    nextSlide()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevSlide()
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-accent/20 p-6">
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-semibold">Slide Transition Carousel</h3>
        <div className="flex space-x-2">
          <Tooltip content="Previous slide">
            <Button variant="outline" size="icon" onClick={handlePrev}>
              <ChevronLeft size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Next slide">
            <Button variant="outline" size="icon" onClick={handleNext}>
              <ChevronRight size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="relative h-[300px] overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[0, 1].map((offset) => {
              const index = (current + offset) % slides.length
              return (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 flex flex-col h-full justify-center items-center text-center">
                    <div className="text-4xl mb-4">{slides[index].icon}</div>
                    <h4 className="text-xl font-bold mb-2">{slides[index].title}</h4>
                    <p className="text-muted-foreground">{slides[index].description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center space-x-2 mt-6">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`w-3 h-3 rounded-full ${current === index || current + 1 === index || (current === slides.length - 1 && index === 0) ? "bg-primary" : "bg-primary/30"}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  )
}

// 3D Carousel
function ThreeDCarousel({ slides }: { slides: any[] }) {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-accent/20 p-6">
      <div className="flex justify-between mb-6">
        <h3 className="text-xl font-semibold">3D Carousel</h3>
        <div className="flex space-x-2">
          <Tooltip content="Previous testimonial">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft size={18} />
            </Button>
          </Tooltip>
          <Tooltip content="Next testimonial">
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="relative h-[400px] perspective">
        {slides.map((slide, index) => {
          // Calculate position in the carousel
          let position = index - current
          if (position >= slides.length / 2) position -= slides.length
          if (position < -slides.length / 2) position += slides.length

          return (
            <motion.div
              key={slide.id}
              animate={{
                x: `${position * 50}%`,
                scale: position === 0 ? 1 : 0.8,
                opacity: Math.abs(position) > 1 ? 0.3 : 1,
                zIndex: slides.length - Math.abs(position),
                rotateY: `${position * 45}deg`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full preserve-3d"
              style={{ transformStyle: "preserve-3d" }}
              onClick={() => setCurrent(index)}
            >
              <Card className="h-full w-full cursor-pointer overflow-hidden">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={slide.avatar || "/placeholder.svg"}
                        alt={slide.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{slide.name}</h4>
                      <p className="text-sm text-muted-foreground">{slide.role}</p>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="italic">"{slide.content}"</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

