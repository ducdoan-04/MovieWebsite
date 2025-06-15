import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface MovieCardProps {
  id: number
  title: string
  views: string
  image: string
  quality?: string
  isNew?: boolean
  isFullMovie?: boolean
  isTrailer?: boolean
}

export function MovieCard({ id, title, views, image, quality, isNew, isFullMovie, isTrailer }: MovieCardProps) {
  return (
    <Link href={`/movie/${id}`}>
      <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors cursor-pointer group">
        <CardContent className="p-0">
          <div className="relative group/card">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={200}
              height={300}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute top-2 left-2">
              <Badge className="bg-orange-500 text-white text-xs">{views}</Badge>
            </div>
            {quality && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-blue-600 text-white text-xs">{quality}</Badge>
              </div>
            )}
            {isNew && (
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-red-500 text-white text-xs">Mới</Badge>
              </div>
            )}
            {isFullMovie && (
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-green-600 text-white text-xs">Full</Badge>
              </div>
            )}
            {isTrailer && (
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-purple-600 text-white text-xs">Trailer</Badge>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/card:bg-opacity-30 transition-all duration-200 rounded-t-lg" />
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 h-[2.8em] overflow-hidden">
              {title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
