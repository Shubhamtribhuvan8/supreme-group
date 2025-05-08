"use client"

import { motion } from "framer-motion"

interface VehicleSectionProps {
  title: string
  description: string
  imagePath: string
  isActive: boolean
}

export default function VehicleSection({ title, description, imagePath, isActive }: VehicleSectionProps) {
  return (
    <motion.div
      className="w-full flex flex-col md:flex-row items-center justify-between gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Text */}
      <motion.div
        className="md:w-1/3 text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute left-0 top-0 w-0.5 h-full bg-white/30" />
          <div className="ml-8">
            <h2 className="text-white text-2xl font-medium mb-2">{title}</h2>
            <p className="text-white/70 text-sm">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
