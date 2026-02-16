import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/reviews/[productId]
 * Fetch all reviews for a product
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sortBy = searchParams.get('sortBy') || 'newest'

    let query = supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'oldest':
        query = query.order('created_at', { ascending: true })
        break
      case 'highest':
        query = query.order('rating', { ascending: false })
        break
      case 'lowest':
        query = query.order('rating', { ascending: true })
        break
    }

    query = query.range(offset, offset + limit - 1)

    const { data: reviews, error } = await query

    if (error) throw error

    // Also get rating breakdown
    const { data: ratingData } = await supabase.rpc('get_rating_breakdown', {
      p_product_id: productId,
    })

    return NextResponse.json({
      reviews: reviews || [],
      ratingBreakdown: ratingData || { average: 0, total: 0, distribution: {} },
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [], ratingBreakdown: { average: 0, total: 0, distribution: {} } },
      { status: 500 }
    )
  }
}

/**
 * POST /api/reviews/[productId]
 * Submit a new review
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const body = await request.json()

    const { data, error } = await supabase.from('product_reviews').insert([
      {
        product_id: productId,
        reviewer_name: body.reviewer_name,
        reviewer_location: body.reviewer_location,
        rating: body.rating,
        title: body.title,
        text: body.text,
        variant: body.variant || '',
        photos: body.photos || [],
        is_verified_purchase: body.is_verified_purchase || false,
      },
    ]).select()

    if (error) throw error

    return NextResponse.json({ success: true, review: data[0] })
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { error: 'Failed to submit review', success: false },
      { status: 500 }
    )
  }
}
