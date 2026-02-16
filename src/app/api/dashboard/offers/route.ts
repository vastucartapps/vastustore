import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/dashboard/offers
 * Fetch promotional offers for dashboard
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Fetch from Supabase dashboard_offers table
    // For now, return empty array
    // const { data: offers, error } = await supabase
    //   .from('dashboard_offers')
    //   .select('*')
    //   .eq('is_active', true)
    //   .order('priority', { ascending: false })
    //   .limit(3)

    // if (error) throw error

    return NextResponse.json({
      offers: [],
    })
  } catch (error: any) {
    console.error('Error fetching dashboard offers:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}
