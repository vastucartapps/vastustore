import { NextRequest, NextResponse } from 'next/server'
import { medusa } from '@/lib/medusa'

/**
 * GET /api/admin/analytics/revenue?period=today|week|month
 * Calculate daily revenue bars for the chart
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'today'

    const now = new Date()
    let days: number
    let startDate: Date

    switch (period) {
      case 'today':
        days = 1
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'week':
        days = 7
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 6) // Last 7 days
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        break
      case 'month':
        days = 30
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 29) // Last 30 days
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
        break
      default:
        days = 1
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    }

    // Fetch all orders for the period
    const { orders } = await medusa.admin.order.list({
      created_at: { gte: startDate.toISOString() },
      limit: 1000,
    }).catch(() => ({ orders: [] }))

    // Group orders by date
    const revenueByDate: Record<string, number> = {}
    
    // Initialize all dates with 0
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const dateKey = date.toISOString().split('T')[0]
      revenueByDate[dateKey] = 0
    }

    // Sum revenue by date
    orders?.forEach((order: any) => {
      const orderDate = new Date(order.created_at)
      const dateKey = orderDate.toISOString().split('T')[0]
      if (revenueByDate[dateKey] !== undefined) {
        revenueByDate[dateKey] += (order.total || 0) / 100 // Convert from smallest unit
      }
    })

    // Convert to array of bars
    const revenueBars = Object.entries(revenueByDate).map(([date, amount]) => {
      const d = new Date(date)
      let label: string
      
      if (period === 'today') {
        label = 'Today'
      } else if (period === 'week') {
        label = d.toLocaleDateString('en-US', { weekday: 'short' })
      } else {
        label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      }

      return {
        date,
        label,
        amount: Math.round(amount),
      }
    })

    return NextResponse.json({ revenueBars })
  } catch (error: any) {
    console.error('Error fetching revenue data:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch revenue' },
      { status: 500 }
    )
  }
}
