"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { track } from "@vercel/analytics"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedBookProps {
  title: string
  author: string
  category: string
  categoryColor?: string
  coverUrl: string
  description: string
  readingTimeHours: number
  url: string
}

function generateGradient(color: string | undefined): string {
  if (!color || color.length < 7) {
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }

  const r = Number.parseInt(color.slice(1, 3), 16)
  const g = Number.parseInt(color.slice(3, 5), 16)
  const b = Number.parseInt(color.slice(5, 7), 16)

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }

  const darkerColor = `rgba(${Math.max(0, r - 40)}, ${Math.max(0, g - 40)}, ${Math.max(0, b - 40)}, 1)`
  const lighterColor = `rgba(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)}, 0.9)`

  return `linear-gradient(135deg, ${color} 0%, ${darkerColor} 50%, ${lighterColor} 100%)`
}

export function FeaturedBook({
  title,
  author,
  category,
  categoryColor,
  coverUrl,
  description,
  readingTimeHours,
  url,
}: FeaturedBookProps) {
  const handleReadNow = () => {
    track("featured_book_read_click", {
      bookTitle: title,
      bookAuthor: author,
    })
    const fileId = extractGoogleDriveId(url)
    if (fileId) {
      window.open(`/read/${fileId}`, "_blank")
    } else {
      console.error("Invalid Google Drive URL")
    }
  }

  const extractGoogleDriveId = (url: string): string | null => {
    const match = url.match(/\/d\/(.+?)\//)
    return match ? match[1] : null
  }

  const gradient = generateGradient(categoryColor)

  return (
    <Card className="overflow-hidden h-full group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0 h-full">
        <div className="relative h-full flex flex-col min-h-[200px] sm:min-h-[240px]" style={{ background: gradient }}>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/10 rounded-full -translate-y-10 sm:-translate-y-16 translate-x-10 sm:translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full translate-y-8 sm:translate-y-12 -translate-x-8 sm:-translate-x-12"></div>

          <div className="relative z-10 p-4 sm:p-6 flex flex-col h-full">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="relative flex-shrink-0">
                <img
                  src={coverUrl || "/placeholder.svg"}
                  alt={title}
                  className="w-16 sm:w-24 h-20 sm:h-32 rounded-lg shadow-xl object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-yellow-400 text-black rounded-full p-0.5 sm:p-1">
                  <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-current" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs text-white/90 mb-1 sm:mb-2">
                  {category}
                </div>
                <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-lg lg:text-xl line-clamp-2 text-white leading-tight">
                  {title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mb-1 line-clamp-1 font-medium">{author}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 line-clamp-2 sm:line-clamp-3 mb-4 sm:mb-6 flex-grow leading-relaxed">
              {description}
            </p>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center">
                <span className="text-[10px] sm:text-xs text-white/60 flex items-center bg-white/10 px-2 py-1 rounded-full">
                  <Clock className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  {readingTimeHours} jam
                </span>
              </div>
              <Button
                onClick={handleReadNow}
                size="sm"
                className="bg-white text-black hover:bg-white/90 font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm"
              >
                Baca Sekarang
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface FeaturedBooksProps {
  books: FeaturedBookProps[]
}

export function FeaturedBooks({ books }: FeaturedBooksProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const itemsPerView = isMobile ? 1 : 3
  const maxIndex = Math.max(0, books.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }

    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  useEffect(() => {
    if (sliderRef.current) {
      const translateX = currentIndex * (100 / itemsPerView)
      sliderRef.current.style.transform = `translateX(-${translateX}%)`
    }
  }, [currentIndex, itemsPerView])

  useEffect(() => {
    setCurrentIndex(0)
  }, [isMobile])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl">
        <div
          ref={sliderRef}
          className="flex transition-transform duration-500 ease-out"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {books.map((book, index) => (
            <div key={index} className={`flex-shrink-0 px-2 ${isMobile ? "w-full" : "w-1/3"}`}>
              <FeaturedBook {...book} />
            </div>
          ))}
        </div>
      </div>

      {books.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-sm w-8 h-8 sm:w-10 sm:h-10"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </Button>
        </>
      )}

      <div className="flex justify-center mt-4 sm:mt-6">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full mx-1 transition-all duration-200 ${
              index === currentIndex ? "bg-primary w-4 sm:w-6" : "bg-gray-400 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
