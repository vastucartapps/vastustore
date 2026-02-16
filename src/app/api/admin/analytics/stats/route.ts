import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'

/**
 * GET /api/admin/analytics/stats?period=today|week|month
 * Calculate dashboard statistics from Medusa
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today'

    // Calculate date range based on period
    const now = new Date()
    let startDate: Date
    let previousStartDate: Date
    let previousEndDate: Date

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - 1)
        previousEndDate = new Date(startDate)
        break
      case 'week':
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - 7)
        previousEndDate = new Date(startDate)
        break
      case 'month':
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 30)
        previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - 30)
        previousEndDate = new Date(startDate)
        break
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        previousStartDate = new Date(startDate)
        previousStartDate.setDate(previousStartDate.getDate() - 1)
        previousEndDate = new Date(startDate)
    }

    // Fetch orders for current and previous period
    const [currentOrders, previousOrders, products, customers, previousCustomers] = await Promise.all([
      medusa.admin.order.list({
        created_at: { gte: startDate.toISOString() },
        limit: 1000,
      }).catch(() => ({ orders: [], count: 0 })),

      medusa.admin.order.list({
        created_at: {
          gte: previousStartDate.toISOString(),
          lte: previousEndDate.toISOString(),
        },
        limit: 1000,
      }).catch(() => ({ orders: [], count: 0 })),

      medusa.admin.product.list({ limit: 1000 }).catch(() => ({ products: [], count: 0 })),

      medusa.admin.customer.list({
        created_at: { gte: startDate.toISOString() },
        limit: 1000,
      }).catch(() => ({ customers: [], count: 0 })),

      medusa.admin.customer.list({
        created_at: {
          gte: previousStartDate.toISOString(),
          lte: previousEndDate.toISOString(),
        },
        limit: 1000,
      }).catch(() => ({ customers: [], count: 0 })),
    ])

    // Calculate current period stats
    const totalOrders = currentOrders.orders?.length || 0
    const previousTotalOrders = previousOrders.orders?.length || 0

    const revenue = currentOrders.orders?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0
    const previousRevenue = previousOrders.orders?.reduce((sum: number, order: any) => sum + (order.total || 0), 0) || 0

    const pendingOrders = currentOrders.orders?.filter((o: any) =>
      ['pending', 'processing'].includes(o.fulfillment_status || '')
    ).length || 0
    const previousPendingOrders = previousOrders.orders?.filter((o: any) =>
      ['pending', 'processing'].includes(o.fulfillment_status || '')
    ).length || 0

    // Low stock products (inventory < 10)
    const lowStockProducts = products.products?.filter((p: any) => {
      const variant = p.variants?.[0]
      return variant && (variant.inventory_quantity || 0) < 10
    }).length || 0

    const newCustomers = customers.customers?.length || 0
    const previousNewCustomers = previousCustomers.customers?.length || 0

    // Recent reviews count from Supabase
    let recentReviews = 0
    let previousRecentReviews = 0
    try {
      const { supabase } = await import('@/lib/supabase')

      const { count: currentReviewCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startDate.toISOString())

      const { count: previousReviewCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', previousStartDate.toISOString())
        .lte('created_at', previousEndDate.toISOString())

      recentReviews = currentReviewCount || 0
      previousRecentReviews = previousReviewCount || 0
    } catch (error) {
      // Reviews table might not exist yet or Supabase not configured
      console.log('Reviews data not available:', error)
    }

    const stats = [
      {
        id: 'total-orders',
        label: 'Total Orders',
        value: totalOrders,
        previousValue: previousTotalOrders,
        format: 'number',
        icon: 'shopping-bag',
        linkTo: '/admin/orders',
      },
      {
        id: 'revenue',
        label: 'Revenue',
        value: Math.round(revenue / 100), // Convert from smallest unit
        previousValue: Math.round(previousRevenue / 100),
        format: 'currency',
        currency: 'INR',
        icon: 'indian-rupee',
        linkTo: '/admin/payments',
      },
      {
        id: 'pending-orders',
        label: 'Pending Orders',
        value: pendingOrders,
        previousValue: previousPendingOrders,
        format: 'number',
        icon: 'clock',
        linkTo: '/admin/orders?status=processing',
      },
      {
        id: 'low-stock',
        label: 'Low Stock Items',
        value: lowStockProducts,
        previousValue: lowStockProducts, // Same as current for now
        format: 'number',
        icon: 'alert-triangle',
        linkTo: '/admin/products?filter=low-stock',
      },
      {
        id: 'new-customers',
        label: 'New Customers',
        value: newCustomers,
        previousValue: previousNewCustomers,
        format: 'number',
        icon: 'users',
        linkTo: '/admin/customers',
      },
      {
        id: 'recent-reviews',
        label: 'Recent Reviews',
        value: recentReviews,
        previousValue: previousRecentReviews,
        format: 'number',
        icon: 'star',
        linkTo: '/admin/reviews',
      },
    ]

    return NextResponse.json({ stats })
  } catch (error: any) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
