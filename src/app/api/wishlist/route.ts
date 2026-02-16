import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { requireAuth } from '@/lib/auth-helpers'

/**
 * GET /api/wishlist
 * Fetch user's wishlist items
 */
export async function GET() {
  try {
    const user = await requireAuth()

    const { data: wishlist, error } = await supabase
      .from('wishlists')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      wishlist: wishlist || [],
    })
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required', wishlist: [] },
        { status: 401 }
      )
    }

    console.error('Error fetching wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wishlist', wishlist: [] },
      { status: 500 }
    )
  }
}

/**
 * POST /api/wishlist
 * Add item to wishlist
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    const { data, error } = await supabase
      .from('wishlists')
      .insert([
        {
          user_id: user.id,
          product_id: body.product_id,
        },
      ])
      .select()

    if (error) {
      // Handle duplicate entry (product already in wishlist)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Product already in wishlist', success: false },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true, item: data[0] })
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required', success: false },
        { status: 401 }
      )
    }

    console.error('Error adding to wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to add to wishlist', success: false },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/wishlist
 * Remove item from wishlist
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await requireAuth()
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('product_id')

    if (!productId) {
      return NextResponse.json(
        { error: 'product_id is required', success: false },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required', success: false },
        { status: 401 }
      )
    }

    console.error('Error removing from wishlist:', error)
    return NextResponse.json(
      { error: 'Failed to remove from wishlist', success: false },
      { status: 500 }
    )
  }
}
