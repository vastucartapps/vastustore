import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/questions/[productId]
 * Fetch all questions and answers for a product
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
      .from('product_questions')
      .select('*')
      .eq('product_id', productId)

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        query = query.order('asked_at', { ascending: false })
        break
      case 'oldest':
        query = query.order('asked_at', { ascending: true })
        break
      case 'answered':
        query = query.not('answer', 'is', null).order('answered_at', { ascending: false })
        break
      case 'unanswered':
        query = query.is('answer', null).order('asked_at', { ascending: false })
        break
    }

    query = query.range(offset, offset + limit - 1)

    const { data: questions, error } = await query

    if (error) throw error

    return NextResponse.json({
      questions: questions || [],
    })
  } catch (error) {
    console.error('Error fetching questions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch questions', questions: [] },
      { status: 500 }
    )
  }
}

/**
 * POST /api/questions/[productId]
 * Submit a new question
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const body = await request.json()

    const { data, error } = await supabase.from('product_questions').insert([
      {
        product_id: productId,
        question: body.question,
        asked_by: body.asked_by,
      },
    ]).select()

    if (error) throw error

    return NextResponse.json({ success: true, question: data[0] })
  } catch (error) {
    console.error('Error submitting question:', error)
    return NextResponse.json(
      { error: 'Failed to submit question', success: false },
      { status: 500 }
    )
  }
}
