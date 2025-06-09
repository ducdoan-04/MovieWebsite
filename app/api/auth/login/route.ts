import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // In a real app, this would validate credentials against a database
    if (username === "demo" && password === "password") {
      return NextResponse.json({
        success: true,
        user: {
          id: 1,
          username: "demo",
          displayName: "Demo User",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        token: "mock-jwt-token",
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
      },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi server",
      },
      { status: 500 },
    )
  }
}
