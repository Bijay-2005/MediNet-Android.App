"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Activity, Shield, Zap } from "lucide-react"

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  
  const loadingTexts = [
    "Initializing MediNet...",
    "Loading healthcare services...",
    "Connecting to hospitals...",
    "Setting up your health profile...",
    "Almost ready..."
  ]

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2
      })
    }, 60)

    // Typing effect
    const textInterval = setInterval(() => {
      setCurrentText(prev => {
        const currentFullText = loadingTexts[textIndex]
        if (prev.length < currentFullText.length) {
          return currentFullText.slice(0, prev.length + 1)
        } else {
          setTimeout(() => {
            setTextIndex(prev => (prev + 1) % loadingTexts.length)
            setCurrentText("")
          }, 1000)
          return prev
        }
      })
    }, 100)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [textIndex])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center overflow-hidden max-w-md mx-auto"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * 400,
              y: Math.random() * 800,
            }}
            animate={{
              x: Math.random() * 400,
              y: Math.random() * 800,
            }}
            transition={{
              duration: Math.random() * 8 + 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 px-4">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
          className="relative"
        >
          {/* Pulsing Background Circle */}
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Main Logo - Constant (No Rotation) */}
          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <div className="text-3xl">
            ❤️
            </div>
          </div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-1">MediNet+</h1>
          <p className="text-white/80 text-sm">Your Health, Our Priority</p>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-white/90 text-base font-medium min-h-[24px]">
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "250px" }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="w-[250px] bg-white/20 rounded-full h-1.5 overflow-hidden"
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>

        {/* Progress Percentage */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="text-white/70 text-xs"
        >
          {progress}%
        </motion.div>

        {/* Animated Icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="flex space-x-4"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="text-white/60"
          >
            <Heart className="w-5 h-5" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="text-white/60"
          >
            <Activity className="w-5 h-5" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="text-white/60"
          >
            <Shield className="w-5 h-5" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            className="text-white/60"
          >
            <Zap className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Loading Dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-6 flex space-x-1.5"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen 