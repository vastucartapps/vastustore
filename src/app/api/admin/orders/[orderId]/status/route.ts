import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'

/**
 * PATCH /api/admin/orders/[orderId]/status
 * Update order status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    const { status } = await request.json()

    // Update order fulfillment status based on the requested status
    if (status === 'cancelled') {
      // Cancel the order
      await medusa.admin.order.cancel(orderId)
    } else if (status === 'shipped' || status === 'in_transit') {
      // Create fulfillment for the order (marks as shipped)
      const { order } = await medusa.admin.order.retrieve(orderId)

      if (order && order.items) {
        const items = order.items.map((item: any) => ({
          item_id: item.id,
          quantity: item.quantity,
        }))

        await medusa.admin.order.createFulfillment(orderId, {
          items,
        })
      }
    }
    // Note: For other statuses (processing, accepted, delivered),
    // Medusa handles these through workflow states automatically

    return NextResponse.json({
      success: true,
      orderId,
      status,
    })
  } catch (error: any) {
    console.error('Error updating order status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update status' },
      { status: 500 }
    )
  }
}

function mapToMedusaStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'processing': 'not_fulfilled',
    'accepted': 'not_fulfilled',
    'shipped': 'fulfilled',
    'in_transit': 'shipped',
    'out_for_delivery': 'shipped',
    'delivered': 'fulfilled',
    'cancelled': 'canceled',
    'returned': 'returned',
  }
  return statusMap[status] || 'not_fulfilled'
}
