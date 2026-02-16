import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * POST /api/gift-cards/validate
 * Validate a gift card code and return balance
 */
export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json(
        { error: 'Gift card code is required' },
        { status: 400 }
      )
    }

    // Check if gift card exists and is valid
    const { data: giftCard, error } = await supabase
      .from('gift_cards')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single()

    if (error || !giftCard) {
      return NextResponse.json(
        { valid: false, error: 'Invalid gift card code' },
        { status: 404 }
      )
    }

    // Check if expired
    if (giftCard.expires_at && new Date(giftCard.expires_at) < new Date()) {
      return NextResponse.json(
        { valid: false, error: 'Gift card has expired' },
        { status: 400 }
      )
    }

    // Check if has balance
    if (giftCard.current_balance <= 0) {
      return NextResponse.json(
        { valid: false, error: 'Gift card has no remaining balance' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      valid: true,
      code: giftCard.code,
      balance: giftCard.current_balance,
      currency: giftCard.currency,
      expiresAt: giftCard.expires_at,
    })
  } catch (error) {
    console.error('Error validating gift card:', error)
    return NextResponse.json(
      { error: 'Failed to validate gift card' },
      { status: 500 }
    )
  }
}
