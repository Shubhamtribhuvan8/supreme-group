"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import compltebody from '../assests/compltebody.png'
import front from '../assests/front.png'
import trunk from '../assests/trunk.png'
import cabin from '../assests/cabin.png'
import exterior from '../assests/exterior.png'

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: "complete", label: "Complete Body", icon: compltebody },
    { id: "front", label: "Front", icon: front },
    { id: "cabin", label: "Cabin", icon: cabin },
    { id: "trunk", label: "Trunk", icon: trunk },
    { id: "exterior", label: "Exterior", icon: exterior },
  ]

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <motion.button
            key={tab.id}
            onClick={(e) => {
              e.stopPropagation()
              setActiveTab(tab.id)
            }}
            className="flex flex-col items-center justify-center"
            // whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="p-2"
            >
              <Image 
                src={tab.icon}
                alt={tab.label}
                width={69.6829833984375}
                height={69.6829833984375}
                className={`w-[70px] h-[70px] object-contain transition-transform duration-300 hover:scale-105 ${isActive ? "opacity-100" : "opacity-70"}`}
              />
            </motion.div>
            <motion.span
              className="text-base mt-1 text-white/70 font-mono font-medium text-center leading-[43.24px] tracking-[1%]"
              animate={{
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ duration: 0.3 }}
            >
              {tab.label}
            </motion.span>
          </motion.button>
        )
      })}
    </div>
  )
}