"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CircleAnimation, RectangleAnimation, SquareAnimation, TriangleAnimation } from "./shape-animations"

// OOP CLASSES
class Shape {
  getArea() {
    return 0
  }
  getPerimeter() {
    return 0
  }
}

class Circle extends Shape {
  constructor(radius) {
    super()
    this.radius = radius
  }
  getArea() {
    return Math.PI * this.radius * this.radius
  }
  getPerimeter() {
    return 2 * Math.PI * this.radius
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super()
    this.length = length
    this.width = width
  }
  getArea() {
    return this.length * this.width
  }
  getPerimeter() {
    return 2 * (this.length + this.width)
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side)
  }
}

class Triangle extends Shape {
  constructor(base, height, sideA, sideB, sideC) {
    super()
    this.base = base
    this.height = height
    this.sideA = sideA
    this.sideB = sideB
    this.sideC = sideC
  }
  getArea() {
    return 0.5 * this.base * this.height
  }
  getPerimeter() {
    return this.sideA + this.sideB + this.sideC
  }
}

const shapeOptions = ["Circle", "Rectangle", "Square", "Triangle"]

export default function ShapeCalculator() {
  const [shape, setShape] = useState("Circle")
  const [dimensions, setDimensions] = useState({})
  const [result, setResult] = useState({ area: null, perimeter: null })
  const [isCalculated, setIsCalculated] = useState(false)

  const handleChange = (e) => {
    setDimensions({ ...dimensions, [e.target.name]: Number.parseFloat(e.target.value) })
  }

  const handleSelectChange = (value) => {
    setShape(value)
    setDimensions({})
    setResult({ area: null, perimeter: null })
    setIsCalculated(false)
  }

  const handleInputChange = (name, value) => {
    setDimensions({ ...dimensions, [name]: Number.parseFloat(value) })
  }

  const calculate = () => {
    let shapeObj
    switch (shape) {
      case "Circle":
        shapeObj = new Circle(dimensions.radius)
        break
      case "Rectangle":
        shapeObj = new Rectangle(dimensions.length, dimensions.width)
        break
      case "Square":
        shapeObj = new Square(dimensions.side)
        break
      case "Triangle":
        shapeObj = new Triangle(
          dimensions.base,
          dimensions.height,
          dimensions.sideA,
          dimensions.sideB,
          dimensions.sideC,
        )
        break
      default:
        return
    }
    const area = shapeObj.getArea()
    const perimeter = shapeObj.getPerimeter()
    setResult({ area, perimeter })
    setIsCalculated(true)
  }

  const renderInputs = () => {
    switch (shape) {
      case "Circle":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="radius">Radius</Label>
              <Input
                id="radius"
                name="radius"
                type="number"
                onChange={(e) => handleInputChange("radius", e.target.value)}
                placeholder="Enter radius"
              />
            </div>
          </div>
        )
      case "Rectangle":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="length">Length</Label>
              <Input
                id="length"
                name="length"
                type="number"
                onChange={(e) => handleInputChange("length", e.target.value)}
                placeholder="Enter length"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                name="width"
                type="number"
                onChange={(e) => handleInputChange("width", e.target.value)}
                placeholder="Enter width"
              />
            </div>
          </div>
        )
      case "Square":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="side">Side</Label>
              <Input
                id="side"
                name="side"
                type="number"
                onChange={(e) => handleInputChange("side", e.target.value)}
                placeholder="Enter side length"
              />
            </div>
          </div>
        )
      case "Triangle":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="base">Base</Label>
              <Input
                id="base"
                name="base"
                type="number"
                onChange={(e) => handleInputChange("base", e.target.value)}
                placeholder="Enter base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                name="height"
                type="number"
                onChange={(e) => handleInputChange("height", e.target.value)}
                placeholder="Enter height"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sideA">Side A</Label>
              <Input
                id="sideA"
                name="sideA"
                type="number"
                onChange={(e) => handleInputChange("sideA", e.target.value)}
                placeholder="Enter side A"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sideB">Side B</Label>
              <Input
                id="sideB"
                name="sideB"
                type="number"
                onChange={(e) => handleInputChange("sideB", e.target.value)}
                placeholder="Enter side B"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sideC">Side C</Label>
              <Input
                id="sideC"
                name="sideC"
                type="number"
                onChange={(e) => handleInputChange("sideC", e.target.value)}
                placeholder="Enter side C"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderShapeAnimation = () => {
    switch (shape) {
      case "Circle":
        return <CircleAnimation dimensions={dimensions} isCalculated={isCalculated} />
      case "Rectangle":
        return <RectangleAnimation dimensions={dimensions} isCalculated={isCalculated} />
      case "Square":
        return <SquareAnimation dimensions={dimensions} isCalculated={isCalculated} />
      case "Triangle":
        return <TriangleAnimation dimensions={dimensions} isCalculated={isCalculated} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Shape Calculator</h1>
          <p className="text-gray-600">Calculate area and perimeter of different shapes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Select Shape</CardTitle>
              <CardDescription>Choose a shape and enter its dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shape">Shape</Label>
                  <Select value={shape} onValueChange={handleSelectChange}>
                    <SelectTrigger id="shape">
                      <SelectValue placeholder="Select a shape" />
                    </SelectTrigger>
                    <SelectContent>
                      {shapeOptions.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {renderInputs()}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={calculate}>
                Calculate
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
              <CardDescription>Shape animation and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-6 flex items-center justify-center bg-gray-50 rounded-md">
                {renderShapeAnimation()}
              </div>

              {result.area !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white p-4 rounded-md border border-gray-200"
                >
                  <h3 className="font-semibold text-lg mb-2 text-purple-700">Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Area</p>
                      <p className="text-xl font-bold text-purple-800">{result.area.toFixed(2)}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-md">
                      <p className="text-sm text-gray-500">Perimeter</p>
                      <p className="text-xl font-bold text-blue-800">{result.perimeter.toFixed(2)}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
