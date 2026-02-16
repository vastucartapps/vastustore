import { useState } from 'react'
import { Download, Package } from 'lucide-react'
import type { Order } from '../types'

interface OrdersListProps {
  orders: Order[]
  onViewOrder?: (orderId: string) => void
  onDownloadInvoice?: (orderId: string) => void
}

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradientAccent: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
}

type FilterStatus = 'all' | 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled' | 'returned'

const statusConfig: Record<string, { bg: string; label: string }> = {
  delivered: { bg: '#16a34a', label: 'Delivered' },
  in_transit: { bg: c.primary500, label: 'In Transit' },
  shipped: { bg: c.primary400, label: 'Shipped' },
  processing: { bg: '#f59e0b', label: 'Processing' },
  cancelled: { bg: '#ef4444', label: 'Cancelled' },
  returned: { bg: c.secondary500, label: 'Returned' },
}

export function OrdersList({ orders, onViewOrder, onDownloadInvoice }: OrdersListProps) {
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all')

  const filters: { key: FilterStatus; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' },
    { key: 'cancelled', label: 'Cancelled' },
    { key: 'returned', label: 'Returned' },
  ]

  const filteredOrders = orders.filter((order) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'shipped') return order.status === 'shipped' || order.status === 'in_transit'
    return order.status === activeFilter
  })

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="h-px mb-4" style={{ background: c.gradientAccent }} />
        <h2
          className="text-3xl font-bold mb-1"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          My Orders
        </h2>
        <div className="h-px mt-4" style={{ background: c.gradientAccent }} />
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.key
          return (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: isActive ? c.primary500 : c.bgPrimary,
                color: isActive ? '#ffffff' : c.earth400,
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = c.primary50
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = c.bgPrimary
                }
              }}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} style={{ color: c.earth300 }} className="mx-auto mb-4" />
          <p className="text-lg" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
            No orders found
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = statusConfig[order.status] || statusConfig.processing
            const displayItems = order.items.slice(0, 2)
            const remainingCount = order.items.length - 2

            return (
              <div
                key={order.id}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: c.bgCard,
                  border: '1px solid #f0ebe4',
                }}
              >
                {/* Top Row: Order Number, Date, Status */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: c.primary500, fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      {order.orderNumber}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-bold rounded-full px-2.5 py-0.5"
                    style={{
                      backgroundColor: statusInfo.bg,
                      color: '#ffffff',
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                {/* Middle: Items */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {displayItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: c.bgPrimary }}
                      >
                        <span
                          className="text-sm"
                          style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: c.primary500,
                            color: '#ffffff',
                            fontFamily: "'Open Sans', sans-serif",
                          }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                    {remainingCount > 0 && (
                      <span
                        className="px-3 py-1.5 text-sm rounded-lg"
                        style={{
                          backgroundColor: c.bgPrimary,
                          color: c.earth400,
                          fontFamily: "'Open Sans', sans-serif",
                        }}
                      >
                        +{remainingCount} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Total, View Details, Invoice */}
                <div className="flex items-center justify-between">
                  <p
                    className="text-xl font-bold"
                    style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                  >
                    {formatPrice(order.total)}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewOrder?.(order.id)}
                      className="px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200"
                      style={{
                        backgroundColor: c.primary500,
                        color: '#ffffff',
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = c.primary400
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = c.primary500
                      }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onDownloadInvoice?.(order.id)}
                      className="p-2 rounded-lg transition-all duration-200"
                      style={{
                        backgroundColor: c.bgPrimary,
                        color: c.earth600,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = c.primary50
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = c.bgPrimary
                      }}
                      title="Download Invoice"
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
