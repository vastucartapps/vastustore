import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // TODO: Implement email verification via AstroEngine API
    // For now, return success
    return NextResponse.json({ 
      message: "Verification email sent" 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    )
  }
}
