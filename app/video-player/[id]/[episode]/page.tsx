"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize, Settings, RotateCcw, RotateCw, RotateCwSquare, RotateCcwSquare, RotateCcwSquareIcon } from "lucide-react"

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [volume, setVolume] = useState(1)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setMovieTitle("Đấu Phá Thương Khung Phần 5-6")
    setLoading(true)
  }, [id, episode])

  useEffect(() => {
    if (!mounted) return;
    const video = videoRef.current
    if (!video) return
    const onLoadedMetadata = () => {
      setDuration(video.duration)
      setLoading(false)
    }
    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [id, episode, mounted])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleMuteToggle = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const time = Number.parseInt(e.target.value)
    video.currentTime = time
    setCurrentTime(time)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const vol = Number(e.target.value)
    video.volume = vol
    setVolume(vol)
    if (vol === 0 && !isMuted) setIsMuted(true)
    if (vol > 0 && isMuted) setIsMuted(false)
  }

  const handlePlaybackRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const video = videoRef.current
    if (!video) return
    const rate = Number(e.target.value)
    video.playbackRate = rate
    setPlaybackRate(rate)
  }

  const handleFullscreen = () => {
    const container = videoContainerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  const handleSeekBarClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    const newTime = percent * duration;
    const video = videoRef.current;
    if (video) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleRewind10 = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.max(video.currentTime - 10, 0);
      setCurrentTime(video.currentTime);
    }
  };

  const handleForward10 = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = Math.min(video.currentTime + 10, duration);
      setCurrentTime(video.currentTime);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const video = videoRef.current
      if (!video) return
      switch (e.key) {
        case ' ': // Space: play/pause
          e.preventDefault()
          handlePlayPause()
          break
        case 'm': // Mute
        case 'M':
          handleMuteToggle()
          break
        case 'f': // Fullscreen
        case 'F':
          handleFullscreen()
          break
        case 'ArrowRight': // Seek forward 5s
          video.currentTime = Math.min(video.currentTime + 5, duration)
          setCurrentTime(video.currentTime)
          break
        case 'ArrowLeft': // Seek backward 5s
          video.currentTime = Math.max(video.currentTime - 5, 0)
          setCurrentTime(video.currentTime)
          break
        case 'ArrowUp': // Volume up
          video.volume = Math.min(video.volume + 0.1, 1)
          setVolume(video.volume)
          break
        case 'ArrowDown': // Volume down
          video.volume = Math.max(video.volume - 0.1, 0)
          setVolume(video.volume)
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isMuted, duration])

  const handlePreviousEpisode = () => {
    if (Number.parseInt(episode) > 1) {
      router.push(`/video-player/${id}/${Number.parseInt(episode) - 1}`)
    }
  }

  const handleNextEpisode = () => {
    router.push(`/video-player/${id}/${Number.parseInt(episode) + 1}`)
  }

  if (!mounted) return null;

  return (
    // <div className="min-h-screen bg-black flex flex-col">
         <div className="bg-black flex flex-col">
      {/* Header */}


      {/* Video Player */}
      <div className="flex items-center justify-center bg-black pt-5 pb-5">
        {/* <div ref={videoContainerRef} className="w-full max-w-6xl aspect-video relative"> */}
        <div ref={videoContainerRef} className="w-full max-w-6xl relative">
          
          <video
            key={episode}
            ref={videoRef}
            src="/video_movie/ost.mov"
            className="w-full h-full object-contain bg-black rounded-lg"
            controls={false}
            muted={isMuted}
            onClick={handlePlayPause}
            style={{ cursor: 'pointer' }}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          {!isPlaying && !loading && (
            <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
              <Button variant="ghost" size="icon" onClick={handleRewind10} title="Tua lùi 10s">
                <div className="flex flex-col items-center mr-8">
                  <RotateCcwSquareIcon className="h-5 w-5" />
                  <span className="text-xs -mt-1"></span>
                </div>
              </Button>
              <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={handleForward10} title="Tua nhanh 10s">
                <div className="flex flex-col items-center ml-8">
                  <RotateCwSquare className="h-5 w-5" />
                  <span className="text-xs -mt-1"></span>
                </div>
              </Button>
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
                onClick={handleSeekBarClick}
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
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                  title="Âm lượng"
                />
                <span className="text-sm text-gray-300">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={handleRewind10} title="Tua lùi 10s">
                  <div className="flex flex-col items-center">
                    <RotateCcwSquare className="h-5 w-5" />
                    <span className="text-xs -mt-1"></span>
                  </div>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleForward10} title="Tua nhanh 10s">
                  <div className="flex flex-col items-center">
                    <RotateCwSquare className="h-5 w-5" />
                    <span className="text-xs -mt-1"></span>
                  </div>
                </Button>
                <select
                  value={playbackRate}
                  onChange={handlePlaybackRateChange}
                  className="bg-gray-800 text-white rounded px-2 py-1 text-xs outline-none"
                  title="Tốc độ phát"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleFullscreen} title="Toàn màn hình (F)">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    </div>
  )
}
