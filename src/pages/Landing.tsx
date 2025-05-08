"use client"

import Image from "next/image"
import Link from "next/link"
import { Linkedin } from "lucide-react"
import Supreme_logo from '../assests/Supreme_logo .png'
import linkdin from '../assests/linkdin.png'
import englang from '../assests/englang.png'

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="w-full py-4 px-4 md:px-6 flex flex-wrap justify-between items-center bg-[#F9FBFF] backdrop-filter-blur-[94px]">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image 
              src={Supreme_logo} 
              alt="Supreme Group Logo" 
              width={120}
              height={34}
              className="h-8 md:h-10 w-auto"
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`w-6 h-0.5 bg-gray-700 mb-1 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 mb-1 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
          <div className={`w-6 h-0.5 bg-gray-700 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>

        {/* Navigation Links */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 mt-4 md:mt-0`}>
          <Link
            href="/"
            className="w-full md:w-auto bg-[#5CD6FF] text-[#000000] px-6 py-2 rounded-full hover:bg-[#5CD6FF] transition-colors text-center text-base"
          >
            Contact Us
          </Link>

          <Link href="/" className="text-gray-700 hover:text-[#38b6ff] py-2 md:py-0">
          <Image 
              src={linkdin} 
              alt="linkdin" 
              width={24}
              height={24}
              className="w-auto"
            />
          </Link>

          

          <button className="flex items-center text-gray-700 font-medium py-2 md:py-0 gap-5">  <Image 
              src={englang} 
              alt="englang" 
              width={52.000244140625}
              height={22.000244140625}
              className="w-auto"
            /></button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center bg-[#00000099]">
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-base md:text-lg mb-4 font-manrope font-bold"
          >
            Performance in motion
          </motion.p>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4"
          >
            Soft Trims and NVH Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-xl md:text-2xl lg:text-3xl"
          >
            for seamless rides
          </motion.p>
        </div>
      </section>
    </main>
  )
}
