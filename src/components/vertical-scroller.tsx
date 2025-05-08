"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Section {
  id: string
  title: string
  description: string
}

interface VerticalScrollerProps {
  activeSection: string
  onSectionChange: (section: any) => void
  sections: Section[]
}

export default function VerticalScroller({ activeSection, onSectionChange, sections }: VerticalScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isScrollComplete, setIsScrollComplete] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = (e: Event) => {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.top + containerRect.height / 2
      const scrollPosition = container.scrollTop
      const maxScroll = container.scrollHeight - container.clientHeight

      // Check if container scroll is complete
      if (scrollPosition >= maxScroll) {
        setIsScrollComplete(true)
      } else {
        setIsScrollComplete(false)
      }

      // Find the section closest to the center of the viewport
      let closestSection = sections[0]
      let minDistance = Infinity

      sections.forEach((section) => {
        const element = container.querySelector(`[data-section-id="${section.id}"]`)
        if (!element) return

        const rect = element.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - containerCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestSection = section
        }
      })

      if (closestSection.id !== activeSection) {
        onSectionChange(closestSection.id)
      }
    }

    // Handle body scroll
    const handleBodyScroll = () => {
      if (!isScrollComplete) return

      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      // You can use scrollPercent to trigger animations or update UI
    }

    container.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleBodyScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleBodyScroll)
    }
  }, [sections, activeSection, onSectionChange, isScrollComplete])

  return (
    <div 
      ref={containerRef} 
      className="relative h-[300px] md:h-[400px] overflow-auto"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      <div className="absolute left-0 top-0 w-0.5 h-full bg-white/30" />

      <div className="space-y-36">
        {sections.map((section) => {
          const isActive = activeSection === section.id

          return (
            <motion.div
              key={section.id}
              data-section-id={section.id}
              className={`ml-8 cursor-pointer transition-all duration-300 ${
                isActive ? "opacity-100" : "opacity-30 blur-[1px]"
              }`}
              style={{ scrollSnapAlign: 'center' }}
              onClick={() => onSectionChange(section.id)}
              whileHover={{ 
                opacity: 1,
                filter: "blur(0px)"
              }}
              animate={{
                opacity: isActive ? 1 : 0.3,
                filter: isActive ? "blur(0px)" : "blur(1px)",
                transition: { duration: 0.3 },
              }}
            >
              <h2 className="text-white text-2xl font-medium mb-2">{section.title}</h2>
              <p className="text-white/70 text-sm">{section.description}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
