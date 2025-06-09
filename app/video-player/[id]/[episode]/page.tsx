"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react"

interface VideoPlayerProps {
  params: {
    id: string
    episode: string
  }
}

export default function VideoPlayer({ params }: VideoPlayerProps) {
  const router = useRouter()
  const { id, episode } = params
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loading, setLoading] = useState(true)
  const [movieTitle, setMovieTitle] = useState("")

  useEffect(() => {
    // In a real app, fetch movie details from API
    setMovieTitle("Đấu Phá Thương Khung Phần 5-6")

    // Simulate video loading
    const timer = setTimeout(() => {
      setLoading(false)
      setDuration(1440) // 24 minutes in seconds
    }, 1500)

    return () => clearTimeout(timer)
  }, [id, episode])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number.parseInt(e.target.value))
  }

  const handlePreviousEpisode = () => {
    if (Number.parseInt(episode) > 1) {
      router.push(`/video-player/${id}/${Number.parseInt(episode) - 1}`)
    }
  }

  const handleNextEpisode = () => {
    router.push(`/video-player/${id}/${Number.parseInt(episode) + 1}`)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push(`/movie/${id}`)}>
            <ChevronLeft className="h-5 w-5 mr-2" />
            Quay lại
          </Button>
          <h1 className="text-lg font-medium text-white">
            {movieTitle} - Tập {episode}
          </h1>
          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="w-full max-w-6xl aspect-video relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-50" />
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center mb-2">
              <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={handleMuteToggle}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <span className="text-sm text-gray-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode Navigation */}
      <div className="bg-gray-900 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousEpisode}
            disabled={Number.parseInt(episode) <= 1}
            className="border-gray-700"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Tập trước
          </Button>
          <Card className="bg-gray-800 border-gray-700 px-4 py-2">
            <span className="text-sm text-gray-300">Đang xem: Tập {episode} / 157</span>
          </Card>
          <Button variant="outline" onClick={handleNextEpisode} className="border-gray-700">
            Tập sau
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
