import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password, email } = body

    // In a real app, this would create a new user in the database
    // For now, we'll just validate the input
    if (!username || !password || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Vui lòng điền đầy đủ thông tin",
        },
        { status: 400 },
      )
    }

    // Check if username already exists (mock)
    if (username === "demo") {
      return NextResponse.json(
        {
          success: false,
          message: "Tên đăng nhập đã tồn tại",
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Đăng ký thành công",
      user: {
        id: 2,
        username,
        email,
        displayName: username,
        avatar: "/placeholder.svg?height=100&width=100",
      },
    })
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
