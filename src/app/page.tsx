"use client"

import { Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { lazy } from "react"
// Lazy load components
const Landing = lazy(() => import("@/pages/Landing"))
const DegreePage = lazy(() => import("@/pages/DegreePage"))
const ContactForm = lazy(() => import("@/pages/ContactFormPage"))
const FooterPage = lazy(() => import("@/pages/FooterPage"))

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <AnimatePresence mode="wait">
          <Landing key="landing" />
          <DegreePage key="degree" />
          <ContactForm key='contactform'/>
          <FooterPage key='footerpage'/>
        </AnimatePresence>
      </Suspense>
    </motion.div>
  )
}
