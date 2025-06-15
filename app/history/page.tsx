"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, Search, User, Heart, History } from "lucide-react"

const mockHistory = [
  {
    id: 1,
    title: "Tuyệt Thế Võ Hồn (440/440 FullHD)",
    image: "/placeholder.svg?height=80&width=60",
    episode: "440/440",
    time: "2025-06-15 11:56:45",
    note: "Top 1 lục",
  },
  {
    id: 2,
    title: "Tiểu Tiên Chi Đạo (9/60)",
    image: "/placeholder.svg?height=80&width=60",
    episode: "9/60",
    time: "2025-06-15 11:52:40",
    note: "Top 10 lục",
  },
  // ... thêm các phim khác tương tự
]

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory)
  const [page, setPage] = useState(1)
  const totalPages = 5

  const handleDelete = () => {
    // Xử lý xóa lịch sử (gọi API hoặc setHistory([]))
    setHistory([])
  }

  return (
    <div className="min-h-screen bg-[#191c22] text-white">
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
          <span className="text-cyan-400 font-bold border-b-2 border-cyan-400">Lịch sử xem</span>
          <Link href="/favorites" className="text-cyan-400">Phim yêu thích</Link>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold flex-1">📜 Lịch sử xem</h2>
          <button
            className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
            onClick={handleDelete}
          >
            Xóa lịch sử xem
          </button>
        </div>
        <div className="bg-[#23252b] rounded-lg p-4">
          <div className="mb-2 text-cyan-400">Bạn đã xem {history.length} phim gần đây</div>
          <ul>
            {history.map((item) => (
              <li key={item.id} className="flex items-center border-b border-gray-700 py-3 last:border-b-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={80}
                  className="rounded mr-4"
                />
                <div className="flex-1">
                  <div className="text-blue-300 font-semibold">{item.title}</div>
                  <div className="text-xs text-gray-400">
                    Bạn đã xem {item.note} lúc {item.time}
                  </div>
                  <div className="text-xs text-gray-400">Số tập: {item.episode}</div>
                </div>
                <Link
                  href={`/movie/${item.id}`}
                  className="ml-4 bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded"
                >
                  Xem tiếp
                </Link>
              </li>
            ))}
          </ul>
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