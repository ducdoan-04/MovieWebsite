"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, User, Heart, History } from "lucide-react"

const mockFavorites = [
  {
    id: 1,
    title: "Tiên Nghịch",
    image: "/image_movie/tiennghich.png",
    badge: "Trailer 93/... Tới CN",
    quality: "2D",
  },
  {
    id: 2,
    title: "Võ Luyện Đỉnh Phong",
    image: "/image_movie/tiennghich.png",
    badge: "48/48",
    quality: "2D",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites)
  const [history, setHistory] = useState(mockFavorites)
  const [page, setPage] = useState(1)
  const totalPages = 5

  const handleDelete = () => {
    // Xử lý xóa lịch sử (gọi API hoặc setHistory([]))
    setHistory([])
  }

  const handleRemove = (id: number) => {
    setFavorites(favorites.filter(f => f.id !== id))
  }

  const handleRemoveAll = () => {
    setFavorites([])
  }

  return (
    <div className="min-h-screen bg-[#23252b] text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700" style={{background: "#2a2c31"}}>
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

      {/* Main */}
      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-2xl font-bold text-center mb-2">Xin chào DEV Tu Ma</h1>
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="#" className="text-cyan-400">Thông tin tài khoản</Link>
          <Link href="/history" className="text-cyan-400">Lịch sử xem</Link>
          <span className="text-cyan-400 font-bold border-b-2 border-cyan-400">Phim yêu thích</span>
        </div>

        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold flex-1"> 🤍 Phim yêu thích </h2>
          <button
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 flex items-center"
            onClick={handleRemoveAll}
          >
            <span>🗑</span> Xóa phim yêu thích
          </button>
        </div>

        <div className="mb-4">
          <span className="bg-cyan-400 text-white px-3 py-1 rounded">Bạn có {favorites.length} phim yêu thích</span>
        </div>
        <div className="flex flex-wrap gap-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#23252b] rounded-lg shadow"
              style={{ width: 'calc(16.66% - 14px)', height: '200px', minWidth: 0 }}
            >
              <button
                className="absolute top-2 right-2 bg-black/70 rounded-full p-1 text-white hover:bg-red-600"
                onClick={() => handleRemove(item.id)}
                aria-label="Xóa"
              >
                <X size={18} />
              </button>
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={140}
                className="rounded-t-lg object-cover"
              />
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">{item.badge}</div>
              <div className="absolute bottom-16 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">{item.quality}</div>
              <div className="bg-[#23252b] rounded-b-lg p-2 text-center absolute bottom-0 left-0 w-full">
                <div className="text-white text-sm font-semibold truncate">{item.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                page === i + 1
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#23252b] text-gray-400 hover:bg-cyan-700'
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}