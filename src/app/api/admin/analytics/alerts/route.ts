import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'
import { supabase } from '@/lib/supabase'

/**
 * GET /api/admin/analytics/alerts
 * Generate alerts for low stock, pending reviews, new returns
 */
export async function GET(request: NextRequest) {
  try {
    const alerts = []

    // 1. Low Stock Alert
    const { products } = await medusa.admin.product.list({ limit: 1000 }).catch(() => ({ products: [] }))
    
    const lowStockProducts = products?.filter((p: any) => {
      const variant = p.variants?.[0]
      return variant && (variant.inventory_quantity || 0) < 10
    }) || []

    if (lowStockProducts.length > 0) {
      alerts.push({
        id: 'low-stock-alert',
        type: 'low_stock',
        title: 'Low Stock Items',
        message: `${lowStockProducts.length} product${lowStockProducts.length > 1 ? 's are' : ' is'} running low on stock`,
        severity: lowStockProducts.length > 5 ? 'critical' : 'warning',
        linkTo: '/admin/products?filter=low-stock',
        meta: { count: lowStockProducts.length },
      })
    }

    // 2. Pending Reviews Alert (from Supabase)
    let pendingReviewCount = 0
    try {
      const { count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      pendingReviewCount = count || 0
    } catch (error) {
      // Reviews table might not exist yet
      console.log('Reviews table not available:', error)
    }
    if (pendingReviewCount > 0) {
      alerts.push({
        id: 'pending-reviews-alert',
        type: 'pending_review',
        title: 'Pending Reviews',
        message: `${pendingReviewCount} review${pendingReviewCount > 1 ? 's need' : ' needs'} moderation`,
        severity: pendingReviewCount > 10 ? 'warning' : 'info',
        linkTo: '/admin/reviews?status=pending',
        meta: { count: pendingReviewCount },
      })
    }

    // 3. New Return Requests Alert
    // TODO: Wire to Medusa returns API when available
    // For now, check orders with return_status
    const { orders: returningOrders } = await medusa.admin.order.list({
      limit: 1000,
    }).catch(() => ({ orders: [] }))

    const newReturns = returningOrders?.filter((
      o: any) => o.return_status === 'requested'
    ) || []

    if (newReturns.length > 0) {
      alerts.push({
        id: 'new-returns-alert',
        type: 'new_return',
        title: 'New Return Requests',
        message: `${newReturns.length} new return request${newReturns.length > 1 ? 's' : ''}`,
        severity: 'info',
        linkTo: '/admin/returns?status=requested',
        meta: { count: newReturns.length },
      })
    }

    return NextResponse.json({ alerts })
  } catch (error: any) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}
