"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Play, Heart, Share2, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

// Mock movie detail data
const movieDetail = {
  id: 1,
  title: "Đấu Phá Thương Khung Phần 5-6",
  englishTitle: "Battle Through the Heavens Season 5-6",
  description:
    "Câu chuyện kể về Tiêu Viêm, một thiên tài tu luyện trẻ tuổi, sau khi bị mất đi sức mạnh đã phải trải qua nhiều thử thách để lấy lại sức mạnh và trở thành một cao thủ mạnh mẽ.",
  year: 2024,
  genre: ["Hoạt Hình", "Hành Động", "Phiêu Lưu"],
  rating: 8.5,
  views: "150/157",
  quality: "4K",
  status: "Đang cập nhật",
  image: "/placeholder.svg?height=600&width=400",
  episodes: Array.from({ length: 157 }, (_, i) => ({
    number: i + 1,
    title: `Tập ${i + 1}`,
    duration: "24:00",
    isWatched: i < 150,
  })),
}

export default function MovieDetail() {
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [comment, setComment] = useState("")

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-blue-400">Chi Tiết Phim</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Movie Info */}
          <div className="lg:col-span-2">
            {/* Video Player Placeholder */}
            <div className="bg-black rounded-lg mb-6 aspect-video flex items-center justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Play className="h-6 w-6 mr-2" />
                Phát Tập {selectedEpisode}
              </Button>
            </div>

            {/* Movie Details */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Image
                  src={movieDetail.image || "/placeholder.svg"}
                  alt={movieDetail.title}
                  width={200}
                  height={300}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{movieDetail.title}</h1>
                  <p className="text-gray-400 mb-4">{movieDetail.englishTitle}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {movieDetail.genre.map((g) => (
                      <Badge key={g} variant="secondary">
                        {g}
                      </Badge>
                    ))}
                    <Badge className="bg-blue-600">{movieDetail.quality}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-400">Năm phát hành:</span>
                      <span className="ml-2">{movieDetail.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Trạng thái:</span>
                      <span className="ml-2">{movieDetail.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Số tập:</span>
                      <span className="ml-2">{movieDetail.views}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-400">Đánh giá:</span>
                      <div className="flex items-center ml-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{movieDetail.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4">{movieDetail.description}</p>

                  <div className="flex space-x-2">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Play className="h-4 w-4 mr-2" />
                      Xem Ngay
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      Yêu Thích
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia Sẻ
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Bình Luận
              </h3>

              <div className="mb-4">
                <Textarea
                  placeholder="Viết bình luận của bạn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
                <Button className="mt-2 bg-blue-600 hover:bg-blue-700">Gửi Bình Luận</Button>
              </div>

              <div className="space-y-4">
                <div className="border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">U</div>
                    <span className="font-medium">User123</span>
                    <span className="text-gray-400 text-sm">2 giờ trước</span>
                  </div>
                  <p className="text-gray-300">Phim hay quá! Đang chờ tập tiếp theo.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes List */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4">Danh Sách Tập</h3>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {movieDetail.episodes.map((episode) => (
                  <Card
                    key={episode.number}
                    className={`cursor-pointer transition-colors ${
                      selectedEpisode === episode.number
                        ? "bg-blue-600 border-blue-500"
                        : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    }`}
                    onClick={() => setSelectedEpisode(episode.number)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{episode.title}</p>
                          <p className="text-sm text-gray-400">{episode.duration}</p>
                        </div>
                        {episode.isWatched && (
                          <Badge variant="secondary" className="text-xs">
                            Đã xem
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
