import Link from "next/link"

interface Genre {
  name: string
  count: number
}

interface GenreListProps {
  genres: Genre[]
}

export function GenreList({ genres }: GenreListProps) {
  return (
    <div className="rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">Thể Loại</h3>
      <div className="grid grid-cols-2 gap-2 bg-darkGray p-3 rounded ">
        {genres.map((genre) => (
          <Link
            key={genre.name}
            href={`/genre/${genre.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-gray-300 hover:text-blue-400 transition-colors flex justify-between items-center py-1"
          >
            <span>{genre.name}</span>
            <span className="text-xs text-gray-500">{genre.count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
