import { NextResponse } from "next/server"

// This would be replaced with actual database queries in a real Java Spring backend
const movies = [
  {
    id: 1,
    title: "Đấu Phá Thương Khung Phần 5-6",
    englishTitle: "Battle Through the Heavens Season 5-6",
    views: "150/157",
    image: "/placeholder.svg?height=300&width=200",
    quality: "4K",
    isNew: true,
    description:
      "Câu chuyện kể về Tiêu Viêm, một thiên tài tu luyện trẻ tuổi, sau khi bị mất đi sức mạnh đã phải trải qua nhiều thử thách để lấy lại sức mạnh và trở thành một cao thủ mạnh mẽ.",
    year: 2024,
    genre: ["Hoạt Hình", "Hành Động", "Phiêu Lưu"],
    rating: 8.5,
    status: "Đang cập nhật",
  },
  // More movies would be here
]

export async function GET() {
  // In a real app, this would fetch from a database
  return NextResponse.json(movies)
}
