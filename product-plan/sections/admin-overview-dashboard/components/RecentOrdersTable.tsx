import type { RecentOrder, OrderStatus } from '../types'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary200: '#71c1ae',
  primary100: '#c5e8e2',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  secondary100: '#ffc187',
  secondary50: '#fff5ed',
  bg: '#fffbf5',
  card: '#ffffff',
  subtle: '#f5dfbb',
  earth500: '#71685b',
  earth400: '#75615a',
  earth700: '#433b35',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
  shadowHover: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
}
const fonts = {
  heading: "'Lora', serif",
  body: "'Open Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
}

interface RecentOrdersTableProps {
  recentOrders: RecentOrder[]
  onViewOrder?: (orderId: string) => void
  onUpdateOrderStatus?: (orderId: string, newStatus: OrderStatus) => void
}

function getStatusStyle(status: OrderStatus): { bg: string; text: string; label: string } {
  const statusMap: Record<OrderStatus, { bg: string; text: string; label: string }> = {
    processing: { bg: c.warningLight, text: c.warning, label: 'Processing' },
    accepted: { bg: c.primary50, text: c.primary500, label: 'Accepted' },
    shipped: { bg: c.primary100, text: c.primary500, label: 'Shipped' },
    in_transit: { bg: c.primary100, text: c.primary400, label: 'In Transit' },
    out_for_delivery: { bg: c.secondary50, text: c.secondary500, label: 'Out for Delivery' },
    delivered: { bg: c.successLight, text: c.success, label: 'Delivered' },
    cancelled: { bg: c.errorLight, text: c.error, label: 'Cancelled' },
    returned: { bg: c.errorLight, text: c.error, label: 'Returned' },
  }
  return statusMap[status]
}

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
}

export function RecentOrdersTable({ recentOrders, onViewOrder, onUpdateOrderStatus }: RecentOrdersTableProps) {
  const allStatuses: OrderStatus[] = [
    'processing',
    'accepted',
    'shipped',
    'in_transit',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'returned',
  ]

  return (
    <div
      className="rounded-lg"
      style={{
        backgroundColor: c.card,
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        borderImage: c.gradient,
        borderImageSlice: 1,
      }}
    >
      <div className="p-6">
        <h2
          className="mb-6 text-xl font-bold"
          style={{
            fontFamily: fonts.heading,
            color: c.earth700,
          }}
        >
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <div className="py-12 text-center" style={{ color: c.earth500, fontFamily: fonts.body }}>
            No recent orders
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: '800px' }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.earth400}20` }}>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Order #
                  </th>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Customer
                  </th>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Items
                  </th>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Total
                  </th>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Status
                  </th>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Date
                  </th>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ fontFamily: fonts.body, color: c.earth500 }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => {
                  const statusStyle = getStatusStyle(order.status)
                  return (
                    <tr
                      key={order.id}
                      className="group transition-colors"
                      style={{ borderBottom: `1px solid ${c.earth400}10` }}
                    >
                      <td className="py-4">
                        <button
                          onClick={() => onViewOrder?.(order.id)}
                          className="font-mono text-sm font-semibold hover:underline"
                          style={{ fontFamily: fonts.mono, color: c.primary500 }}
                        >
                          {order.orderNumber}
                        </button>
                      </td>
                      <td className="py-4">
                        <div>
                          <div
                            className="text-sm font-medium"
                            style={{ fontFamily: fonts.body, color: c.earth700 }}
                          >
                            {order.customerName}
                          </div>
                          <div className="text-xs" style={{ fontFamily: fonts.body, color: c.earth500 }}>
                            {order.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-sm" style={{ fontFamily: fonts.body, color: c.earth700 }}>
                          {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="font-semibold" style={{ fontFamily: fonts.mono, color: c.earth700 }}>
                          {order.currency === 'USD' ? '$' : '₹'}
                          {order.total.toLocaleString('en-IN')}
                        </span>
                      </td>
                      <td className="py-4">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus?.(order.id, e.target.value as OrderStatus)}
                          className="rounded px-2 py-1 text-xs font-semibold transition-all"
                          style={{
                            fontFamily: fonts.body,
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                          }}
                        >
                          {allStatuses.map((status) => {
                            const style = getStatusStyle(status)
                            return (
                              <option key={status} value={status}>
                                {style.label}
                              </option>
                            )
                          })}
                        </select>
                      </td>
                      <td className="py-4">
                        <span className="text-sm" style={{ fontFamily: fonts.body, color: c.earth500 }}>
                          {formatRelativeTime(order.date)}
                        </span>
                      </td>
                      <td className="py-4">
                        <button
                          onClick={() => onViewOrder?.(order.id)}
                          className="text-sm font-medium hover:underline"
                          style={{ fontFamily: fonts.body, color: c.primary500 }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
