"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Play, Heart, Share2, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

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
  views: "152/157",
  quality: "4K",
  status: "Đang Chiếu",
  image: "/placeholder.svg?height=600&width=400",
  episodes: Array.from({ length: 157 }, (_, i) => ({
    number: i + 1,
    title: `Tập ${i + 1}`,
    duration: "18:22",
    isWatched: i < 150,
  })),
  relatedParts: [
    "OVA 1", "OVA 2", "Phần 1", "Phần 2", "Phần 3", "Phần 4", "Phần 5-6", "Duyên Khởi", "Hẹn Ước 3N"
  ],
}

const tabs = ["Thuyết Minh", "Vietsub"]
const episodeGroups = [
  [152, 151, 150, 149, 148],
  [147, 146, 145, 144, 143],
  [142, 141, 140, 139, 138],
  [137, 136, 135, 134, 133],
  [132, 131, 130, 129, 128],
  [127, 126, 125, 124, 123],
  [122, 121, 120, 119, 118],
  [117, 116, 115, 114, 113],
  [112, 111, 110, 109, 108],
  [107, 106, 105, 104, 103],
  [102, 101, 100, 99, 98],
  [97, 96, 95, 94, 93],
  [92, 91, 90, 89, 88],
  [87, 86, 85, 84, 83],
  [82, 81, 80, 79, 78],
  [77, 76, 75, 74, 73],
  [72, 71, 70, 69, 68],
  [67, 66, 65, 64, 63],
  [62, 61, 60, 59, 58],
  [57, 56, 55, 54, 53],
  [52, 51, 50, 49, 48],
  [47, 46, 45, 44, 43],
  [42, 41, 40, 39, 38],
  [37, 36, 35, 34, 33],
  [32, 31, 30, 29, 28],
  [27, 26, 25, 24, 23],
  [22, 21, 20, 19, 18],
  [17, 16, 15, 14, 13],
  [12, 11, 10, 9, 8],
  [7, 6, 5, 4, 3],
  [2, 1],
]

export default function MovieDetail() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedEpisode, setSelectedEpisode] = useState(152)
  const [comment, setComment] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center space-x-4">
          <Link href={`/movie/${movieDetail.id}`}>
            <Button variant="ghost" size="sm" >
              <ArrowLeft className="h-5 w-5"/>
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-blue-400">{movieDetail.title}</h1>
        </div>
      </header>

      <div className="container mx-auto px-2 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Danh sách tập */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex mb-4">
                {tabs.map((tab, idx) => (
                  <button
                    key={tab}
                    className={`flex-1 py-2 rounded-t-md font-semibold transition-colors ${selectedTab === idx ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                    onClick={() => setSelectedTab(idx)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2 max-h-[600px] overflow-y-auto">
                {episodeGroups.flat().map((ep) => (
                  <button
                    key={ep}
                    className={`py-2 rounded font-semibold text-sm border transition-colors ${selectedEpisode === ep ? "bg-blue-600 border-blue-400 text-white" : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"}`}
                    onClick={() => setSelectedEpisode(ep)}
                  >
                    {ep}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Player + info tập + phần liên quan + bình luận */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Player */}
            <div className="bg-black rounded-lg aspect-video flex items-center justify-center relative">
              {/* Fake video overlay */}
              <span className="absolute top-2 left-2 bg-blue-600 text-xs px-2 py-1 rounded">YanHH3D.NET</span>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 z-10">
                <Play className="h-6 w-6 mr-2" />
                Phát Tập {selectedEpisode}
              </Button>
            </div>
            {/* Info tập */}
            <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="text-sm text-gray-300">Bạn đang xem <span className="font-bold text-white">Tập {selectedEpisode}</span></div>
              <div className="flex gap-2 flex-wrap">
                <Button size="sm" className="bg-blue-500">HD+</Button>
                <Button size="sm" variant="outline">1080</Button>
                <Button size="sm" variant="outline">HD</Button>
                <Button size="sm" variant="outline">4K</Button>
                <Button size="sm" variant="outline">2K</Button>
                <Button size="sm" variant="outline">Link10</Button>
              </div>
            </div>
            {/* Phần liên quan */}
            <div className="bg-gray-800 rounded-lg p-4 flex flex-wrap gap-2 items-center">
              <span className="text-cyan-400 font-semibold mr-2">Phần Liên Quan</span>
              {movieDetail.relatedParts.map((part) => (
                <Button key={part} size="sm" variant={part === "Phần 5-6" ? "default" : "outline"} className={part === "Phần 5-6" ? "bg-blue-600" : ""}>{part}</Button>
              ))}
            </div>
            {/* Bình luận */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Bình Luận
              </h3>
              <div className="mb-4 flex gap-2">
                <Textarea
                  placeholder="Viết bình luận của bạn..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-gray-700 border-gray-600"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 self-start mt-2">Gửi</Button>
              </div>
              <div className="space-y-4 max-h-48 overflow-y-auto">
                <div className="border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm">U</div>
                    <span className="font-medium">User123</span>
                    <span className="text-gray-400 text-sm">2 giờ trước</span>
                  </div>
                  <p className="text-gray-300">Phim hay quá! Đang chờ tập tiếp theo.</p>
                </div>
                <div className="border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-sm">T</div>
                    <span className="font-medium">Thephoq</span>
                    <span className="text-gray-400 text-sm">2 ngày trước</span>
                  </div>
                  <p className="text-gray-300">152</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin phim */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-6 mb-4">
              <div className="flex flex-col items-center">
                <Image
                  src={movieDetail.image || "/placeholder.svg"}
                  alt={movieDetail.title}
                  width={200}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h1 className="text-2xl font-bold mb-2 text-center">{movieDetail.title}</h1>
                <p className="text-gray-400 mb-4 text-center">{movieDetail.englishTitle}</p>
                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {movieDetail.genre.map((g) => (
                    <Badge key={g} variant="secondary">{g}</Badge>
                  ))}
                  <Badge className="bg-blue-600">{movieDetail.quality}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm w-full">
                  <div>
                    <span className="text-gray-400">Năm:</span>
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
                <p className="text-gray-300 mb-4 text-center">{movieDetail.description}</p>
                <div className="flex space-x-2 mb-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Yêu Thích
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia Sẻ
                  </Button>
                </div>
                <div className="w-full">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Xem bình luận (1349)
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-xs text-gray-400">
              Xem theo thứ tự =&gt; Duyên Khởi =&gt; Phần 1 =&gt; Phần 2 (tập 1-12) =&gt; OVA 1 =&gt; Phần 2 (tập 13-12) =&gt; OVA 2 =&gt; Phần 3 =&gt; Phần 4 =&gt; Hẹn Ước 3N =&gt; Phần 5,6
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
