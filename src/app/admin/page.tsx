"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AdminOverviewDashboard } from '@/components/storefront'
import type {
  DashboardStat,
  RevenueBar,
  RecentOrder,
  QuickAction,
  Alert,
  TimePeriod,
  OrderStatus,
} from '@/components/storefront/types'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('today')
  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState<DashboardStat[]>([])
  const [revenueBars, setRevenueBars] = useState<RevenueBar[]>([])
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])

  // Quick actions (static)
  const quickActions: QuickAction[] = [
    {
      id: 'add-product',
      label: 'Add Product',
      icon: 'plus-circle',
      href: '/admin/products/new',
      color: 'primary',
    },
    {
      id: 'new-order',
      label: 'New Order',
      icon: 'shopping-cart',
      href: '/admin/orders/new',
      color: 'secondary',
    },
    {
      id: 'new-coupon',
      label: 'New Coupon',
      icon: 'ticket',
      href: '/admin/coupons/new',
      color: 'primary',
    },
  ]

  // Fetch dashboard data based on time period
  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true)
      try {
        // Fetch all dashboard data in parallel
        const [statsRes, revenueRes, ordersRes, alertsRes] = await Promise.all([
          fetch(`/api/admin/analytics/stats?period=${timePeriod}`),
          fetch(`/api/admin/analytics/revenue?period=${timePeriod}`),
          fetch('/api/admin/orders/recent?limit=10'),
          fetch('/api/admin/analytics/alerts'),
        ])

        if (statsRes.ok) {
          const { stats: fetchedStats } = await statsRes.json()
          setStats(fetchedStats)
        }

        if (revenueRes.ok) {
          const { revenueBars: fetchedBars } = await revenueRes.json()
          setRevenueBars(fetchedBars)
        }

        if (ordersRes.ok) {
          const { orders: fetchedOrders } = await ordersRes.json()
          setRecentOrders(fetchedOrders)
        }

        if (alertsRes.ok) {
          const { alerts: fetchedAlerts } = await alertsRes.json()
          setAlerts(fetchedAlerts)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [timePeriod])

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period)
  }

  const handleStatClick = (linkTo: string) => {
    router.push(linkTo)
  }

  const handleViewOrder = (orderId: string) => {
    router.push(`/admin/orders/${orderId}`)
  }

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        // Update local state optimistically
        setRecentOrders(prev =>
          prev.map(order => (order.id === orderId ? { ...order, status } : order))
        )
      } else {
        throw new Error('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status. Please try again.')
    }
  }

  const handleQuickAction = (href: string) => {
    router.push(href)
  }

  const handleAlertClick = (linkTo: string) => {
    router.push(linkTo)
  }

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminOverviewDashboard
      stats={stats}
      revenueBars={revenueBars}
      recentOrders={recentOrders}
      quickActions={quickActions}
      alerts={alerts}
      timePeriod={timePeriod}
      onTimePeriodChange={handleTimePeriodChange}
      onStatClick={handleStatClick}
      onViewOrder={handleViewOrder}
      onUpdateOrderStatus={handleUpdateOrderStatus}
      onQuickAction={handleQuickAction}
      onAlertClick={handleAlertClick}
      onDismissAlert={handleDismissAlert}
    />
  )
}
