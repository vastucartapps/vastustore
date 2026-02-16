import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/config/prepaid-discount
 * Fetch prepaid discount configuration
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('prepaid_discount_config')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      // Return default config if not found
      return NextResponse.json({
        config: {
          is_enabled: true,
          discount_percentage: 5,
          max_discount_amount: 500,
          min_order_value: 500,
          currency: 'INR',
          label: 'Save 5% on prepaid orders',
          description: 'Get instant discount on online payment',
        },
      })
    }

    return NextResponse.json({ config: data })
  } catch (error) {
    console.error('Error fetching prepaid discount config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch prepaid discount config' },
      { status: 500 }
    )
  }
}
