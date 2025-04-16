"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function CircleAnimation({ dimensions, isCalculated }) {
  // Increased radius by 4x
  const radius = dimensions.radius || 50
  const scaledRadius = Math.min(Math.max(radius, 40), 240) // 4x larger

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{
          scale: isCalculated ? 1 : 0.5,
          backgroundColor: isCalculated ? "#8b5cf6" : "#c4b5fd",
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 1,
        }}
        style={{
          width: scaledRadius * 2,
          height: scaledRadius * 2,
          borderRadius: "50%",
        }}
        className="bg-purple-400"
      />
    </div>
  )
}

export function RectangleAnimation({ dimensions, isCalculated }) {
  // Increased dimensions by 4x
  const length = dimensions.length || 100
  const width = dimensions.width || 60

  const scaledLength = Math.min(Math.max(length, 80), 480) // 4x larger
  const scaledWidth = Math.min(Math.max(width, 80), 320) // 4x larger

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: isCalculated ? 1 : 0.5,
          rotate: isCalculated ? 360 : 0,
          backgroundColor: isCalculated ? "#3b82f6" : "#93c5fd",
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 1,
        }}
        style={{
          width: scaledLength,
          height: scaledWidth,
        }}
        className="bg-blue-400"
      />
    </div>
  )
}

export function SquareAnimation({ dimensions, isCalculated }) {
  // Increased side by 4x
  const side = dimensions.side || 80
  const scaledSide = Math.min(Math.max(side, 80), 400) // 4x larger

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, borderRadius: "0%" }}
        animate={{
          scale: isCalculated ? 1 : 0.5,
          rotate: isCalculated ? 180 : 0,
          borderRadius: isCalculated ? ["0%", "10%", "0%"] : "0%",
          backgroundColor: isCalculated ? "#10b981" : "#6ee7b7",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          duration: 1.5,
          borderRadius: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
        }}
        style={{
          width: scaledSide,
          height: scaledSide,
        }}
        className="bg-green-400"
      />
    </div>
  )
}

export function TriangleAnimation({ dimensions, isCalculated }) {
  const canvasRef = useRef(null)
  // Increased dimensions by 4x
  const base = dimensions.base || 100
  const height = dimensions.height || 80

  const scaledBase = Math.min(Math.max(base, 120), 480) // 4x larger
  const scaledHeight = Math.min(Math.max(height, 120), 400) // 4x larger

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw triangle
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, canvas.height / 2 - scaledHeight / 2)
    ctx.lineTo(canvas.width / 2 - scaledBase / 2, canvas.height / 2 + scaledHeight / 2)
    ctx.lineTo(canvas.width / 2 + scaledBase / 2, canvas.height / 2 + scaledHeight / 2)
    ctx.closePath()

    ctx.fillStyle = isCalculated ? "#ec4899" : "#f9a8d4"
    ctx.fill()
  }, [dimensions, isCalculated, scaledBase, scaledHeight])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{
          scale: isCalculated ? 1 : 0.5,
          rotate: isCalculated ? 360 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 1,
        }}
        className="w-full h-full relative"
      >
        <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
      </motion.div>
    </div>
  )
}
