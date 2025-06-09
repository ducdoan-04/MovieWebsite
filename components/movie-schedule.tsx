"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const days = [
  { id: 2, name: "Thứ 2", day: "Monday" },
  { id: 3, name: "Thứ 3", day: "Tuesday" },
  { id: 4, name: "Thứ 4", day: "Wednesday" },
  { id: 5, name: "Thứ 5", day: "Thursday" },
  { id: 6, name: "Thứ 6", day: "Friday" },
  { id: 7, name: "Thứ 7", day: "Saturday" },
  { id: 8, name: "Chủ nhật", day: "Sunday" },
]

// Mock schedule data
const scheduleData = {
  2: [
    {
      id: 101,
      title: "Tây Hành Kỷ: Đại Viễn Trình",
      views: "03/12 Trưa T2",
      image: "/placeholder.svg?height=300&width=200",
      quality: "4K TM",
    },
    {
      id: 102,
      title: "Tinh Thần Biến Phần 5",
      views: "15/28 Tối T2",
      image: "/placeholder.svg?height=300&width=200",
      quality: "4K TM-VS Phần 5",
    },
    {
      id: 103,
      title: "Thôn Phệ Tinh Không",
      views: "Trailer 175/208 Tối T2",
      image: "/placeholder.svg?height=300&width=200",
      quality: "4K TM-VS",
    },
  ],
  3: [
    {
      id: 201,
      title: "Tinh Thần Biến Phần 5",
      views: "15/28 Tối T3",
      image: "/placeholder.svg?height=300&width=200",
      quality: "4K TM-VS Phần 5",
    },
  ],
  4: [
    {
      id: 301,
      title: "Thôn Phệ Tinh Không",
      views: "Trailer 175/208 Tối T2",
      image: "/placeholder.svg?height=300&width=200",
      quality: "4K TM-VS",
    },
  ],
  5: [
    {
      id: 401,
      title: "Trong Tòng Môn Trường Sinh",
      views: "73/100",
      image: "/placeholder.svg?height=300&width=200",
      quality: "1080P TM",
    },
  ],
  6: [
    {
      id: 501,
      title: "Nghịch Thiên Chí Tôn",
      views: "416/460",
      image: "/placeholder.svg?height=300&width=200",
      quality: "1080P TM",
    },
  ],
  7: [
    {
      id: 601,
      title: "Đại Lục Linh Võ",
      views: "80/...",
      image: "/placeholder.svg?height=300&width=200",
      quality: "1080P TM",
    },
  ],
  8: [],
}

export function MovieSchedule() {
  const [activeDay, setActiveDay] = useState(2)
  const today = new Date().getDay() || 7 // Convert Sunday from 0 to 7

  return (
    <div className=" rounded-lg p-1 mb-1" >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent
        ">Lịch Phim</h2>
        <div className="text-sm text-gray-400 bg-[#613559] p-1 rounded ">Hôm nay: Thứ hai, ngày 09/06/2025</div>
      </div>

      {/* Days of week */}
      <div className="bg-darkGray p-4 rounded ">
        <div className="flex overflow-x-auto space-x-2 mb-6 pb-2 ">
          {days.map((day) => (
            <Button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`min-w-[100px] ${
                activeDay === day.id
                  ? "bg-blue-600 text-white"
                  : day.id === today
                    ? "bg-gray-700 text-white"
                    : "bg-gray-700 text-gray-300"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-sm">{day.name}</span>
                <span className="text-xs text-gray-400">{day.day}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Schedule content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 ">
          {scheduleData[activeDay as keyof typeof scheduleData]?.map((movie) => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <Card className="bg-gray-700 border-gray-600 hover:bg-gray-650 transition-colors cursor-pointer group">
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
                      <Badge className="bg-orange-500 text-white text-xs">{movie.views}</Badge>
                    </div>
                    {movie.quality && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-600 text-white text-xs">{movie.quality}</Badge>
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
