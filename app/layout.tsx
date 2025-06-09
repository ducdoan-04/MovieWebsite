import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevTuTien - Hoạt Hình Trung Quốc Thuyết Minh",
  description: "Website xem phim online chất lượng cao",
    generator: 'devtutien.com',
  icons: {
    icon: '/uploads/avatar/4.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
