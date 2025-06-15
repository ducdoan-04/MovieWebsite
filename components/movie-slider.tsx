"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { MovieCard } from "@/components/movie-card"

interface MovieSliderProps {
  title: string
  movies: Array<{
    id: number
    title: string
    views: string
    image: string
    quality?: string
    isNew?: boolean
    isFullMovie?: boolean
    isTrailer?: boolean
  }>
}

const CARD_WIDTH = 230; // px
const VISIBLE_CARDS = 6;

export function MovieSlider({ title, movies }: MovieSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const maxIndex = movies.length > VISIBLE_CARDS ? movies.length - VISIBLE_CARDS : 0;

  // Auto-scroll
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev >= maxIndex) return 0;
          return prev + 1;
        })
      }, 2000)
    }
    return () => clearInterval(interval)
  }, [isHovered, maxIndex])

  // Nút phải
  const handleScrollRight = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    })
  }
  // Nút trái
  const handleScrollLeft = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    })
  }

  return (
    <div
      className="mb-8 relative overflow-hidden group"
      style={{ border: "1px solid #333", padding: "10px 30px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <button
        className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2"
        onClick={handleScrollLeft}
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2"
        onClick={handleScrollRight}
        aria-label="Scroll right"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div
        className="flex gap-4 pb-4 transition-transform duration-500"
        style={{
          width: `${CARD_WIDTH * VISIBLE_CARDS + 20 * (VISIBLE_CARDS - 1)}px`, // 20px gap-4
          transform: `translateX(-${currentIndex * (CARD_WIDTH + 16)}px)`, // 16px = 1rem = gap-4
        }}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-none w-[230px] h-[340px]">
            <MovieCard {...movie} />
          </div>
        ))}
      </div>
    </div>
  )
}
