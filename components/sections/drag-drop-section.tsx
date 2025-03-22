"use client"

import { useState } from "react"
import { motion, Reorder, useDragControls } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Info } from "lucide-react"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"

interface Item {
  id: string
  text: string
  color: string
}

export default function DragDropSection() {
  // Initial items for the reorderable list
  const [items, setItems] = useState<Item[]>([
    { id: "1", text: "Drag me up or down", color: "bg-blue-100 dark:bg-blue-900/30" },
    { id: "2", text: "Reorder this list", color: "bg-purple-100 dark:bg-purple-900/30" },
    { id: "3", text: "Items animate smoothly", color: "bg-green-100 dark:bg-green-900/30" },
    { id: "4", text: "Try it yourself!", color: "bg-amber-100 dark:bg-amber-900/30" },
  ])

  // State for the draggable card
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const dragControls = useDragControls()

  return (
    <TooltipProvider>
      <section id="drag-drop" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Drag, Drop & Reorder Interactions
            <Tooltip content="Interactive elements that can be dragged and reordered">
              <motion.span whileHover={{ scale: 1.2 }} className="inline-flex ml-2 cursor-help">
                <Info size={20} className="text-muted-foreground" />
              </motion.span>
            </Tooltip>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Draggable Card with Constraints */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Draggable Card with Constraints</h3>
              <div className="relative w-full h-80 bg-accent/50 rounded-xl overflow-hidden">
                <motion.div
                  drag
                  dragControls={dragControls}
                  dragConstraints={{
                    top: -120,
                    left: -120,
                    right: 120,
                    bottom: 120,
                  }}
                  dragElastic={0.1}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                  animate={position}
                  onDragEnd={(_, info) => {
                    setPosition({
                      x: position.x + info.offset.x,
                      y: position.y + info.offset.y,
                    })
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                >
                  <Tooltip content="Drag me around within the boundaries">
                    <Card className="w-40 h-40">
                      <CardContent className="p-4 flex items-center justify-center h-full">
                        <div className="text-center">
                          <img
                            src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=150&auto=format&fit=crop"
                            alt="Draggable element"
                            className="w-16 h-16 mx-auto mb-2 rounded-md"
                          />
                          <p className="text-sm">Drag me around</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </motion.div>

                {/* Visual indicators for drag boundaries */}
                <div className="absolute inset-10 border-2 border-dashed border-primary/30 rounded-lg pointer-events-none" />
              </div>
              <Button onClick={() => setPosition({ x: 0, y: 0 })} variant="outline" className="mt-4">
                Reset Position
              </Button>
            </div>

            {/* Reorderable List */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-6 text-center">Reorderable List</h3>
              <div className="w-full max-w-md">
                <Tooltip content="Drag items to reorder the list">
                  <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
                    {items.map((item) => (
                      <Reorder.Item
                        key={item.id}
                        value={item}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        whileDrag={{
                          scale: 1.03,
                          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                          zIndex: 10,
                        }}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <Card className={item.color}>
                          <CardContent className="p-4 flex items-center">
                            <GripVertical className="mr-3 text-muted-foreground" size={18} />
                            <p>{item.text}</p>
                          </CardContent>
                        </Card>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  )
}

