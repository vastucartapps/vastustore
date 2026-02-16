import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getCurrentUser } from '@/lib/auth-helpers'

/**
 * POST /api/gift-cards/apply
 * Apply gift card to an order (deducts balance, records usage)
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    const { code, amount, orderId } = await request.json()

    if (!code || !amount || !orderId) {
      return NextResponse.json(
        { error: 'Gift card code, amount, and order ID are required' },
        { status: 400 }
      )
    }

    // Call the Supabase function to apply gift card
    const { data, error } = await supabase.rpc('apply_gift_card', {
      p_code: code.toUpperCase(),
      p_amount: amount,
      p_order_id: orderId,
      p_user_id: user?.id || null,
    })

    if (error) {
      console.error('Error applying gift card:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to apply gift card' },
        { status: 500 }
      )
    }

    // Check if application was successful
    if (!data.success) {
      return NextResponse.json(
        { success: false, error: data.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      code: data.code,
      appliedAmount: data.applied_amount,
      remainingBalance: data.remaining_balance,
      currency: data.currency,
    })
  } catch (error) {
    console.error('Error applying gift card:', error)
    return NextResponse.json(
      { error: 'Failed to apply gift card' },
      { status: 500 }
    )
  }
}
