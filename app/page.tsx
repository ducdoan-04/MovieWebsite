"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu, User, Heart, History, ChevronLeft, ChevronRight, Radius } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MovieCard } from "@/components/movie-card"
import { GenreList } from "@/components/genre-list"
import { MovieSchedule } from "@/components/movie-schedule"
import { Footer } from "@/components/footer"
import { MovieSlider } from "@/components/movie-slider"

// Mock data - in real app, this would come from your Java Spring backend
const movies = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung Phần 5-6",
    views: "150/157",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: true,
  },
  {
    id: 2,
    title: "Tiên Nghịch",
    views: "92/...",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K TM-VS",
    isNew: true,
  },
  {
    id: 3,
    title: "Mục Thần Ký",
    views: "34/78",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K TM-VS",
    isNew: false,
  },
  {
    id: 4,
    title: "Thế Giới Hoàn Mỹ",
    views: "218/234",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: false,
  },
  {
    id: 5,
    title: "Đấu La Đại Lục 2 - Tuyệt Thế Đường Môn",
    views: "104/156",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K TM-VS",
    isNew: false,
  },
  {
    id: 6,
    title: "Phàm Nhân Tu Tiên [Full]",
    views: "146/...",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: false,
    isFullMovie: true,
  },
  {
    id: 7,
    title: "Gia Thiên",
    views: "112/156",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: false,
  },
  {
    id: 8,
    title: "Thần Ấn Vương Tọa",
    views: "162/208",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: false,
  },
  {
    id: 9,
    title: "Thôn Phệ Tinh Không",
    views: "Trailer 175/208 Tối T2",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K TM-VS",
    isNew: false,
    isTrailer: true,
  },
  {
    id: 10,
    title: "Kiếm Lai",
    views: "Trailer P2 Mới - Chưa có lịch chiếu",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: false,
    isTrailer: true,
  },
  {
    id: 11,
    title: "Tây Hành Kỷ: Đại Viễn Trình",
    views: "03/12 Trưa T2",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K TM",
    isNew: true,
  },
  {
    id: 12,
    title: "Tinh Thần Biến Phần 5",
    views: "15/28 Tối T2",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K TM-VS Phần 5",
    isNew: true,
  },
]

const categories = ["3D", "2D", "4K", "Anime", "Lịch phim"]

const rankings = [
  { rank: 1, title: "Đấu Phá Thương Khung Phần 5-6", views: "150/157 [4K]" },
  { rank: 2, title: "Tiên Nghịch", views: "92/... [4K]" },
  { rank: 3, title: "Mục Thần Ký", views: "34/78 [4K]" },
  { rank: 4, title: "Thế Giới Hoàn Mỹ", views: "218/234 [4K]" },
  { rank: 5, title: "Đấu La Đại Lục 2", views: "104/156 [4K]" },
  { rank: 6, title: "Phàm Nhân Tu Tiên", views: "146/... [4K]" },
  { rank: 7, title: "Gia Thiên", views: "112/156 [4K]" },
  { rank: 8, title: "Thần Ấn Vương Tọa", views: "162/208 [4K]" },
  { rank: 9, title: "Thôn Phệ Tinh Không", views: "Trailer 175/208 Tối T2" },
  { rank: 10, title: "Kiếm Lai", views: "Trailer P2 Mới - Chưa có lịch" },
]

const genres = [
  { name: "Huyền Huyễn", count: 120 },
  { name: "Xuyên Không", count: 85 },
  { name: "Trùng Sinh", count: 64 },
  { name: "Tiên Hiệp", count: 92 },
  { name: "Cổ Trang", count: 78 },
  { name: "Kiếm Hiệp", count: 56 },
  { name: "Hài Hước", count: 43 },
  { name: "Hiện Đại", count: 37 },
]

const fullMovies = [
  {
    id: 101,
    title: "Bạch Xà 3: Phù Sinh",
    part: "Phần 3",
    image: "/placeholder.svg?height=300&width=200",
    isFullMovie: true,
  },
  {
    id: 102,
    title: "Bạch Xà 2: Thanh Xà Kiếp Khởi",
    part: "Phần 2",
    image: "/placeholder.svg?height=300&width=200",
    isFullMovie: true,
  },
  {
    id: 103,
    title: "Bạch Xà 1: Duyên Khởi",
    part: "Phần 1",
    image: "/placeholder.svg?height=300&width=200",
    isFullMovie: true,
  },
]

export default function MovieStreamingHome() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("Mới Cập Nhật")

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{background:"#202125"}}>
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700" style={{background:"#2a2c31"}}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
              <div className="text-xl font-bold text-blue-300">
              DevTuTien<span className="text-orange-400"></span>
                <span className="text-red-400">.com</span>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Tìm kiếm phim"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                />
                <Button size="sm" className="absolute right-1 top-1 h-7 w-7 p-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <History className="h-5 w-5 mr-2" />
                Lịch sử xem
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-5 w-5 mr-2" />
                Phim yêu thích
              </Button>
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-4 rounded">
                <User className="h-4 w-4 mr-2" />
                Đăng Nhập
              </Button>
            </div>
          </div>
        </div>
      </header>


      <div className="container-body container mx-auto py-2 px-4">
          {/* Featured Movies Carousel */}
          <MovieSlider title="Phim Đề Cử" movies={movies.slice(0, 12)} />

        {/* Welcome Message */}
        <div className="container mx-auto py-2 px-4 rounded " style={{border: "1px solid #333", padding: "10px 30px"}}>
          <div className="bg-darkGray rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Hoan nghênh x hữu đã ghé thăm <span className="text-blue-300">DevTuTien<span className="text-red-400">.com</span></span> </h2>
                <p className="text-gray-400 text-sm">
                  Bảo danh tại đây{" "}
                  <Link href="/login" className="text-green-400 hover:underline">
                    Đăng nhập
                  </Link>{" "}
                  để sử dụng các chức năng: Bộ sưu tập, Phim yêu thích, Lịch sử xem, Bình luận...
                </p>
                <p className="text-gray-400 text-sm">
                  Chưa nhập môn?{" "}
                  <Link href="/register" className="text-green-400 hover:underline">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* MAIN */}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Tabs */}
              <div className="mb-0">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <h2 className="text-xl font-bold mb-0 bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">Mới Cập Nhật</h2>

                  <div className="flex flex-nowrap overflow-x-auto space-x-2 bg-darkGray p-2 rounded">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setActiveCategory(category)}
                        className={activeCategory === category ? "bg-blue-600" : "border-gray-600 text-gray-300"}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              

              {/* Movie Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8 bg-darkGray p-4 rounded">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} {...movie} />
                ))}
              </div>
              {/* Load More Button */}
              <div className="text-center">
                <Button variant="outline" className="px-10 border-gray-600 text-gray-300 hover:bg-gray-700  bg-[background-color: rgba(255,255,255,.1);]" style={{borderRadius: "30px",}}>
                  Xem thêm
                </Button>
                
              </div>


              {/* Full Movies Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">Phim Lẻ Đặc Sắc</h2>
                <div className="bg-darkGray p-4 rounded grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {fullMovies.map((movie) => (
                    <Card
                      key={movie.id}
                      className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <Image
                            src={movie.image || "/placeholder.svg"}
                            alt={movie.title}
                            width={200}
                            height={300}
                            className="w-full h-64 object-cover rounded-t-lg"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-red-500 text-white text-xs">Full Movie</Badge>
                          </div>
                          {movie.part && (
                            <div className="absolute bottom-2 left-2">
                              <Badge className="bg-green-600 text-white text-xs">{movie.part}</Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 rounded-t-lg" />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-400 transition-colors">
                            {movie.title}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Movie Schedule */}
              <MovieSchedule />

              {/* Load More Button */}
              <div className="text-center mt-2 mb-8">
              <Button variant="outline" className="px-10 border-gray-600 text-gray-300 hover:bg-gray-700  bg-[background-color: rgba(255,255,255,.1);]" style={{borderRadius: "30px",}}>
                  Xem thêm
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Rankings */}
              <div className="bg-darkBlack rounded-lg p-4 mb-6">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">Bảng Xếp Hạng</h3>
                <div className="space-y-3 bg-darkGray pt-1 pl-1">
                  {rankings.map((item) => (
                    <div
                      key={item.rank}
                      className="flex items-start space-x-3 hover:bg-gray-700 p-2 rounded cursor-pointer transition-colors"
                    >
                      <div
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                          item.rank <= 3 ? "bg-orange-500 text-white" : "bg-gray-600 text-gray-300"
                        }`}
                      >
                        {item.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Image
                            src="/placeholder.svg?height=40&width=30"
                            alt={item.title}
                            width={30}
                            height={40}
                            className="rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white line-clamp-2 hover:text-blue-400 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs text-gray-400">{item.views}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Genres */}
              <div className=""><GenreList genres={genres} /></div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
