'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Header from './Header'
import { useEffect } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Handle hash links on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Dynamic background shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-primary-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-secondary-500/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main content with page transitions */}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none z-20" />
    </div>
  )
} 