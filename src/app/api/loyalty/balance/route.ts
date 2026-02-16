import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/loyalty/balance
 * Fetch user's loyalty points balance
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get user ID from session/auth
    // For now, return zero balance
    // const userId = await getCurrentUserId(request)

    // const { data: balance, error } = await supabase
    //   .from('loyalty_balances')
    //   .select('points, equivalent_value, currency')
    //   .eq('user_id', userId)
    //   .single()

    // if (error) throw error

    return NextResponse.json({
      points: 0,
      equivalentValue: 0,
      currency: 'INR',
    })
  } catch (error: any) {
    console.error('Error fetching loyalty balance:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch loyalty balance' },
      { status: 500 }
    )
  }
}
