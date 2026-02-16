import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/faqs/[productId]
 * Fetch all active FAQs for a product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params

    const { data: faqs, error } = await supabase
      .from('product_faqs')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .order('order', { ascending: true })

    if (error) throw error

    return NextResponse.json({
      faqs: faqs || [],
    })
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch FAQs', faqs: [] },
      { status: 500 }
    )
  }
}
