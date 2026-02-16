import { NextRequest, NextResponse } from 'next/server'
import { requestPasswordReset } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    await requestPasswordReset(email)

    // Always return success, don't reveal if email exists
    return NextResponse.json({ 
      message: "If an account exists with this email, you'll receive a reset link" 
    })
  } catch (error: any) {
    // Still return success to prevent email enumeration
    return NextResponse.json({ 
      message: "If an account exists with this email, you'll receive a reset link" 
    })
  }
}
