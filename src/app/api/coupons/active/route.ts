import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/coupons/active
 * Fetch active coupons for the user
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Get user ID from session/auth
    // For now, return empty array
    // const userId = await getCurrentUserId(request)

    // Fetch active coupons from Supabase
    // const { data: coupons, error } = await supabase
    //   .from('coupons')
    //   .select('*')
    //   .eq('is_active', true)
    //   .gte('valid_until', new Date().toISOString())
    //   .order('valid_until', { ascending: true })

    // if (error) throw error

    return NextResponse.json({
      coupons: [],
    })
  } catch (error: any) {
    console.error('Error fetching active coupons:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch coupons' },
      { status: 500 }
    )
  }
}
