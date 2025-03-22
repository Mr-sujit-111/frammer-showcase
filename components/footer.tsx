"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-background border-t py-8"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 md:mb-0"
          >
            <h3 className="text-xl font-bold gradient-text">Sujit Bhanderi</h3>
            <p className="text-muted-foreground">Next.js, React.js, Tailwind CSS, Framer Motion Expert</p>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-4"
          >
            <motion.a
              href="https://github.com/Mr-sujit-111"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/sujit-bhanderi331"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:sujitbhanderi331@gmail.com"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-accent"
            >
              <Mail size={20} />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          © {new Date().getFullYear()} Sujit Bhanderi. All rights reserved.
        </motion.div>
      </div>
    </motion.footer>
  )
}

