import { NextRequest, NextResponse } from 'next/server'
import { confirmPasswordReset } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      )
    }

    await confirmPasswordReset(token, newPassword)

    return NextResponse.json({ 
      message: "Password reset successful. You can now log in with your new password." 
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Password reset failed' },
      { status: error.status || 400 }
    )
  }
}
