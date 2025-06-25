"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Play, Heart, Share2, Star, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { GenreList } from "@/components/genre-list"
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
  views: "150/157",
  quality: "4K",
  status: "Đang cập nhật",
  calendar: "Thứ 7, 18:00",
  image: "/image_movie/tiennghich.png?height=600&width=400",
  episodes: Array.from({ length: 157 }, (_, i) => ({
    number: i + 1,
    title: `Tập ${i + 1}`,
    duration: "24:00",
    isWatched: i < 150,
  })),
  relatedParts: [
    "Duyên Khởi", "Hẹn Ước 3N", "OVA 1", "OVA 2", "Phần 1", "Phần 2", "Phần 3", "Phần 4", "Phần 5-6"
  ],
}

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

export default function MovieDetail() {
  const [selectedEpisode, setSelectedEpisode] = useState(1)
  const [comment, setComment] = useState("")

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('https://yanhh3d.vip/storage/movies/dau-pha-thuong-khung-phan-5-6-1737297719.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      {/* Main content */}
      <div className="relative z-10">
        <header className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="container mx-auto flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-blue-400">Chi Tiết Phim</h1>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 anis-cover">
            {/* Movie Info */}
            <div className="lg:col-span-2">
              {/* Movie Details */}
              <div className="rounded-lg p-6 mb-6">
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
            {/* Phần liên quan */}
              <div className="rounded-lg p-4 block gap-2 items-center">
                 <div className="text-cyan-400 font-semibold mr-2">
                   Phần Liên Quan
                 </div>
                 <div className=" flex flex-wrap gap-2 items-center pt-4">
                 {movieDetail.relatedParts.map((part) => (
                  <Button key={part} size="sm"
                          variant={part === "Phần 5-6" ? "default" : "outline"} 
                          style={{margin: "10px",
                            width: "calc(15% - 1px)",
                            height: "50px",
                            float: "left",
                            borderRadius: "0.5rem",
                            position: "relative",
                            background: "#ffffff1a",
                            
                          }}
                          className={part === "Phần 5-6" ? "text-blue-500" : ""} >{part}</Button>
                ))}
                 </div>
              </div>
            </div>
            {/* Mo ta phim */}
            <div className="lg:col-span-1 pt-5">
              
              <div className=" rounded-lg p-4" style={{ backgroundColor: "#ffffff1a" }}>
                <h3 className="text-lg font-bold mb-4">Mô tả phim</h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  <div className="flex flex-col gap-4">
                     <div>
                        <span className="text-gray-400">Năm phát hành:</span>
                        <span className="ml-2">{movieDetail.year}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Thời lượng:</span>
                        <span className="ml-2">{movieDetail.views}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Trạng thái:</span>
                        <span className="ml-2">{movieDetail.status}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Lịch chiếu:</span>
                        <span className="ml-2">{movieDetail.calendar}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Thể loại:</span>
                         <a className="ml-2 gap-2 mb-4">
                          {movieDetail.genre.map((g) => (
                              <Badge key={g} 
                                variant="secondary" 
                                className="mr-2 cursor-pointer" 
                                style={{border: "1px solid #ffffff",
                                        borderRadius: "20px",
                                        padding: "5px 10px",
                                        backgroundColor: "#ffffff1a"}}>
                                {g}
                              </Badge>
                            ))}
                         </a>                   
                      </div>

                      <div className="flex items-center">
                        <span className="text-gray-400">Đánh giá:</span>
                        <div className="flex items-center ml-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{movieDetail.rating}</span>
                        </div>
                      </div>

                      <div className="w-full bg-#ffffff40]">
                        <Button variant="outline" className="w-full bg-#ffffff40]"
                          style={{border: "1px solid #ffffff",
                                  borderRadius: "20px",
                                  padding: "5px 10px",
                                  fontSize: "17px"}}>
                          <MessageCircle className="h-2 w-2 mr-1 text-blue-600" />
                          Xem bình luận (1349)
                        </Button>
                      </div>
                      

                  </div>
                </div>
              </div>

              {/*  */}
            </div>

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 anis-cover bg-darkBlack">
            {/* Comments Section */}
            <div className="lg:col-span-2 p-5 " style={{ backgroundColor: "#202125" }}  >
                  <h3 className="text-lg font-bold mb-4 flex items-center ">
                    <MessageCircle className="h-5 w-5 mr-2"/>
                    Bình Luận
                  </h3>

                  <div className="mb-4">
                    <Textarea
                      placeholder="Viết bình luận của bạn..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="bg-gray-700 border-gray-600"
                    />
                    <Button className="mt-2 bg-cyanBlue hover:bg-blue-700 text-white font-bold">Gửi Bình Luận</Button>
                  </div>

                  <div className="pt-1">
                    <div className="space-y-4 bg-bgCmt"
                          style={{
                            border: "1px solid #1d1c1c",
                            borderRadius: "20px",
                            padding: "5px 10px",
                          }}>
                      <div className="border-b border-gray-700 p-4">
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

              {/* Sidebar */}
              <div className="lg:col-span-1 rounded-lg p-6">
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
                <div>
                  <GenreList genres={genres}/>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
