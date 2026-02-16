import { NextRequest, NextResponse } from "next/server"

const AUTH_API = process.env.ASTROENGINE_API_URL || "https://api.vastucart.in"

export async function POST(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const apiPath = `/api/v1/auth/${path.join("/")}`
  const body = await req.json()

  const res = await fetch(`${AUTH_API}${apiPath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status })
  }

  // Set tokens as httpOnly cookies if login/register
  const response = NextResponse.json(data)
  if (data.access_token) {
    response.cookies.set("vc_access_token", data.access_token, {
      httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 30, path: "/",
    })
    response.cookies.set("vc_refresh_token", data.refresh_token, {
      httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 7, path: "/",
    })
  }

  return response
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("vc_access_token")?.value
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

  const res = await fetch(`${AUTH_API}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()

  if (data.ecom_role) {
    const response = NextResponse.json(data)
    response.cookies.set("vc_ecom_role", data.ecom_role, {
      httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 30, path: "/",
    })
    return response
  }

  return NextResponse.json(data, { status: res.status })
}
