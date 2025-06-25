"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Play, Heart, Share2, Star, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { GenreList } from "@/components/genre-list"
import Link from "next/link"
import dynamic from "next/dynamic"
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
  image: "/image_movie/tiennghich.png?height=600&width=400",
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

const VideoPlayer = dynamic(() => import("@/app/video-player/[id]/[episode]/page"), { ssr: false })



export default function MovieDetail() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedEpisode, setSelectedEpisode] = useState(152)
  const [comment, setComment] = useState("")

  return (
    <div className="relative min-h-screen"
    style={{
      backgroundImage: "url('https://yanhh3d.vip/storage/movies/dau-pha-thuong-khung-phan-5-6-1737297719.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      {/* Overlay blur */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      <div className="relative z-10">
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

            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 lg:grid-cols-3 ">
                {/* Danh sách tập – chiếm 1/3 */}
                <div className="col-span-1 bg-darkBlack rounded-lg p-4">
                  <div className="flex mb-4">
                    {tabs.map((tab, idx) => (
                      <button
                        key={tab}
                        className={`flex-1 py-2 rounded-t-md font-semibold transition-colors ${selectedTab === idx ? "bg-cyanBlue text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
                        onClick={() => setSelectedTab(idx)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-5 gap-2 max-h-[550px] overflow-y-auto m-1">
                    {episodeGroups.flat().map((ep) => (
                      <button
                        key={ep}
                        className={`py-2 rounded font-semibold text-sm border transition-colors ${selectedEpisode === ep ? "bg-cyanBlue border-blue-400 text-white" : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 "}`}
                        onClick={() => setSelectedEpisode(ep)}
                      >
                        {ep}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Player + info tập + phần liên quan + bình luận – chiếm 2/3 */}
                <div className="col-span-1 lg:col-span-2 flex flex-col bg-black ">
                  {/* Player */}
                  {typeof window !== 'undefined' && (
                    <VideoPlayer params={{ id: String(movieDetail.id), episode: String(selectedEpisode) }} key={selectedEpisode} />
                  )}
                    {/* Episode Navigation */}
                <div className="p-0 bg-[#0c0c0c]">
                  <div className="container mx-auto flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedEpisode(selectedEpisode - 1)}
                      disabled={selectedEpisode <= 1}
                      className="bg-[#0c0c0c]"
                    >
                      <ChevronLeft className="h-2 w-2 mr-2" />
                      Tập trước
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setSelectedEpisode(selectedEpisode + 1)}
                      disabled={selectedEpisode >= 157}
                      className="bg-[#0c0c0c]"
                    >
                      Tập sau
                      <ChevronRight className="h-2 w-2 ml-2" />
                    </Button>
                  </div>
                </div>

                  {/* Info tập */}
                  <div className="bg-[#0c0c0c] pt-0">
                    <div className="bg-darkGray rounded-lg p-5 m-5 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                          style={{
                            border: "1px solid #333333",
                            borderRadius: "20px",
                          }}>
                      <div className="text-sm text-gray-300">
                        Bạn đang xem <span className="font-bold text-white">Tập {selectedEpisode}</span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" className="bg-blue-500">HD+</Button>
                        <Button size="sm" variant="outline">1080</Button>
                        <Button size="sm" variant="outline">HD</Button>
                        <Button size="sm" variant="outline">4K</Button>
                        <Button size="sm" variant="outline">2K</Button>
                        <Button size="sm" variant="outline">Link10</Button>
                      </div>
                    </div>
                    <div className="pt-0 p-5 flex flex-col items-center">
                      <span>Fanpage FB cập nhật tin tức <a href="/" className="text-orange-400 cursor-pointer">tại đây</a> </span>
                      <span>HD load nhanh, phù hợp khi xem trên điện thoại</span>
                      <span>1080 chất lượng FullHD 1080p</span>
                      <span>4K có chất lượng 4K siêu nét</span>             
                      </div>
                  </div>       
                </div>

                  {/* Phần liên quan */}
                  <div className="">

                  </div>
                  <div className="bg-[#ffffff1a] lg:col-span-2 rounded-lg p-4 flex flex-wrap float-end gap-2">
                      <span className="text-cyan-400 font-semibold mr-2">Phần Liên Quan</span>
                      <div className=" flex flex-wrap gap-2 items-center pt-4 ">
                        {movieDetail.relatedParts.map((part) => (
                          <Button key={part} size="sm" 
                           variant={part === "Phần 5-6" ? "default" : "outline"} 
                           style={{margin: "5px",
                            width: "calc(15% - 5px)",
                            height: "40px",
                            float: "left",
                            border: "1px solid #00000034",
                            borderRadius: "0.5rem",
                            position: "relative",
                            background: "#ffffff1a",
                          }}
                           className={part === "Phần 5-6" ? "text-cyanBlue" : ""}> {part}
                          </Button>
                        ))}
                      </div>
                  </div>   

              </div>              
            </div>

            {/* Thông tin phim */}
            <div className="lg:col-span-3">
              <div className="bg-[#ffffff1a] rounded-lg p-6">
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
                  <div className="flex space-x-2 mb-4">
                    <Button className="bg-cyanBlue hover:bg-blue-300">
                      <Heart className="h-4 w-4 mr-2" />
                      Yêu Thích
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia Sẻ
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center cursor-pointer">
                    {movieDetail.genre.map((g) => (
                      <Badge key={g} variant="secondary">{g}</Badge>
                    ))}
                    <Badge className="bg-blue-600">{movieDetail.quality}</Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mb-4 text-sm w-full">
                    <div>
                      <span className="text-gray-400">Năm:</span>
                      <span className="ml-2">{movieDetail.year}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Số tập:</span>
                      <span className="ml-2">{movieDetail.views}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Trạng thái:</span>
                      <span className="ml-2">{movieDetail.status}</span>
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

                  <div className="w-full">
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

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 anis-cover bg-darkBlack mt-5">
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

                  <div className="pt-1">
                    <div className="space-y-4 bg-bgCmt"
                          style={{
                            border: "1px solid #1d1c1c",
                            borderRadius: "20px",
                            padding: "5px 10px",
                          }}>
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
