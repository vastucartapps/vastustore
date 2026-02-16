import { NextResponse } from 'next/server'
import { getMe } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access_token')?.value

    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const user = await getMe(accessToken)

    return NextResponse.json({ user })
  } catch (error: any) {
    return NextResponse.json({ user: null }, { status: 401 })
  }
}
