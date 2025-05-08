"use client"

import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { useEffect, useState, useRef } from "react"

interface PlayPauseButtonProps {
  isPlaying: boolean
  onToggle: (e: React.MouseEvent) => void  
  size?: "sm" | "md" | "lg"
  className?: string
  videoDuration: number
  currentTime: number
}

export default function PlayPauseButton({ 
  isPlaying, 
  onToggle, 
  size = "md", 
  className = "",
  videoDuration = 0,
  currentTime = 0
}: PlayPauseButtonProps) {
  const [progress, setProgress] = useState(0)
  const lastTabRef = useRef<string>("")
  
  // Size mappings for responsive design
  const sizeMap = {
    sm: {
      button: "w-8 h-8",
      icon: "w-3 h-3", 
      innerCircle: "w-7 h-7",
      outerCircle: "w-8 h-8",
    },
    md: {
      button: "w-12 h-12",
      icon: "w-4 h-4",
      innerCircle: "w-10 h-10", 
      outerCircle: "w-12 h-12",
    },
    lg: {
      button: "w-16 h-16",
      icon: "w-5 h-5",
      innerCircle: "w-14 h-14",
      outerCircle: "w-16 h-16",
    },
  }

  // Calculate progress based on current time and duration
  useEffect(() => {
    if (videoDuration > 0) {
      setProgress(currentTime / videoDuration)
    } else {
      setProgress(0)
    }
  }, [currentTime, videoDuration])

  return (
    <motion.div
      className={`relative flex items-center justify-center ${sizeMap[size].button} ${className} cursor-pointer`}
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {/* Outer circle with progress animation */}
      <svg className={`absolute ${sizeMap[size].outerCircle}`}>
        <motion.circle
          cx="50%"
          cy="50%"
          r="48%"
          fill="transparent"
          strokeWidth="2"
          stroke="white"
          initial={{ pathLength: 0 }}
          animate={{ 
            pathLength: progress,
            fill: progress === 1 ? "rgba(255, 255, 255, 0.2)" : "transparent"
          }}
          transition={{ 
            pathLength: { duration: 0.1, ease: "linear" },
            fill: { duration: 0.3 }
          }}
        />
      </svg>

      {/* Inner circle */}
      <motion.div
        className={`absolute bg-black rounded-full flex items-center justify-center ${sizeMap[size].innerCircle}`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isPlaying ? (
            <Pause className={`text-white ${sizeMap[size].icon}`} />
          ) : (
            <Play className={`text-white ${sizeMap[size].icon} ml-0.5`} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}