import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/config/cod
 * Fetch COD configuration
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('cod_config')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      // Return default config if not found
      return NextResponse.json({
        config: {
          is_enabled: true,
          fee: 50,
          currency: 'INR',
          min_order_value: 500,
          max_order_value: 50000,
          available_for_countries: ['IN'],
          requires_authentication: true,
          label: 'Cash on Delivery',
          fee_label: 'COD Charges',
        },
      })
    }

    return NextResponse.json({ config: data })
  } catch (error) {
    console.error('Error fetching COD config:', error)
    return NextResponse.json(
      { error: 'Failed to fetch COD config' },
      { status: 500 }
    )
  }
}
