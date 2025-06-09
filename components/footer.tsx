import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-darkBlack text-gray-400 py-8 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <div className="text-xl font-bold text-blue-300 mb-4">
            DevTuTien<span className="text-orange-400"></span>
            <span className="text-red-400">.com</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="https://devtutien.net"
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm transition-colors"
            >
              DevTuTien.net
            </Link>
            <Link
              href="https://devtutien.vip"
              className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm transition-colors"
            >
              DevTuTien.vip
            </Link>
          </div>
        </div>

        <div className="text-xs text-gray-500 mb-4">Liên hệ Telegram: @devtutien2025</div>

        <div className="text-xs text-gray-500 flex flex-wrap gap-x-2">
          <Link href="#" className="hover:text-blue-400">
            1.ju98
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            33wn
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            hb83
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            77be
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            hb83
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            77be
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            123B
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            suwin
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            789club
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            jun 88
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            789club
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            https://789club.cc/
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            188bet
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            w88
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            188bet
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            fun88
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            fb88
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            w88
          </Link>
          <span>|</span>
          <Link href="#" className="hover:text-blue-400">
            PBET
          </Link>
        </div>
      </div>
    </footer>
  )
}
