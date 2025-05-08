"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'

const VehiclePage = dynamic(() => import('./VehiclePage'), {
  loading: () => <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
  </div>,
  ssr: false
})

export default function DegreePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true)

    // Initialize Intersection Observer
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsLoading(true)
        }
      })
    }, options)

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [])

  const handleClick = () => {
  }

  const handleScroll = () => {
    // Scroll handling now managed by Intersection Observer
  }

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center bg-black cursor-pointer"
      onClick={handleClick}
      onScroll={handleScroll}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          ref={observerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto my-20"
        >
          {isLoading && <VehiclePage />}
        </motion.div>

      </div>
    </main>
  )
}
