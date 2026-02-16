import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'

/**
 * GET /api/admin/orders/recent?limit=10
 * Fetch recent orders for dashboard
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')

    const { orders } = await medusa.admin.order.list({
      limit,
      order: '-created_at',
    }).catch(() => ({ orders: [] }))

    const recentOrders = orders?.map((order: any) => ({
      id: order.id,
      orderNumber: order.display_id?.toString() || order.id,
      customerName: order.customer?.first_name && order.customer?.last_name
        ? `${order.customer.first_name} ${order.customer.last_name}`
        : order.customer?.email || 'Guest',
      customerEmail: order.customer?.email || order.email || '',
      total: Math.round((order.total || 0) / 100), // Convert from smallest unit
      currency: order.currency_code?.toUpperCase() || 'INR',
      status: mapMedusaStatus(order.fulfillment_status || 'pending'),
      itemCount: order.items?.length || 0,
      date: order.created_at,
    })) || []

    return NextResponse.json({ orders: recentOrders })
  } catch (error: any) {
    console.error('Error fetching recent orders:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

function mapMedusaStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'not_fulfilled': 'processing',
    'partially_fulfilled': 'processing',
    'fulfilled': 'shipped',
    'partially_shipped': 'in_transit',
    'shipped': 'in_transit',
    'partially_returned': 'returned',
    'returned': 'returned',
    'canceled': 'cancelled',
    'requires_action': 'processing',
  }
  return statusMap[status] || 'processing'
}
