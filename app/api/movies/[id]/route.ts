import { NextResponse } from "next/server"

// This would be replaced with actual database queries in a real Java Spring backend
const movies = [
  {
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
      videoUrl: `/api/stream/${1}/${i + 1}`,
    })),
  },
  // More movies would be here
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const movie = movies.find((m) => m.id === id)

  if (!movie) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 })
  }

  return NextResponse.json(movie)
}
