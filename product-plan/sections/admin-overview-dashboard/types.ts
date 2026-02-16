/** Time period filter for dashboard data */
export type TimePeriod = 'today' | 'week' | 'month'

/** Display format for stat values */
export type StatFormat = 'number' | 'currency'

/** Icon identifier for stat cards and quick actions */
export type IconName =
  | 'shopping-bag'
  | 'indian-rupee'
  | 'clock'
  | 'alert-triangle'
  | 'users'
  | 'star'
  | 'plus-circle'
  | 'shopping-cart'
  | 'ticket'

/** A dashboard stat card */
export interface DashboardStat {
  id: string
  label: string
  value: number
  previousValue: number
  format: StatFormat
  currency?: 'INR' | 'USD'
  icon: IconName
  linkTo: string
}

/** A single bar in the revenue chart */
export interface RevenueBar {
  date: string
  label: string
  amount: number
}

/** Order status */
export type OrderStatus =
  | 'processing'
  | 'accepted'
  | 'shipped'
  | 'in_transit'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned'

/** A recent order row in the dashboard */
export interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  total: number
  currency: 'INR' | 'USD'
  status: OrderStatus
  itemCount: number
  date: string
}

/** Quick action button color */
export type QuickActionColor = 'primary' | 'secondary'

/** A quick-action shortcut */
export interface QuickAction {
  id: string
  label: string
  icon: IconName
  href: string
  color: QuickActionColor
}

/** Alert type */
export type AlertType = 'low_stock' | 'pending_review' | 'new_return'

/** Alert severity */
export type AlertSeverity = 'critical' | 'warning' | 'info'

/** A dashboard alert/warning item */
export interface Alert {
  id: string
  type: AlertType
  title: string
  message: string
  severity: AlertSeverity
  linkTo: string
  meta: Record<string, number>
}

/** Props for the Admin Overview Dashboard */
export interface AdminOverviewDashboardProps {
  stats: DashboardStat[]
  revenueBars: RevenueBar[]
  recentOrders: RecentOrder[]
  quickActions: QuickAction[]
  alerts: Alert[]
  timePeriod: TimePeriod

  /** Called when admin changes the time period filter */
  onTimePeriodChange?: (period: TimePeriod) => void
  /** Called when admin clicks a stat card */
  onStatClick?: (linkTo: string) => void
  /** Called when admin clicks an order row */
  onViewOrder?: (orderId: string) => void
  /** Called when admin updates an order's status inline */
  onUpdateOrderStatus?: (orderId: string, status: OrderStatus) => void
  /** Called when admin clicks a quick-action button */
  onQuickAction?: (href: string) => void
  /** Called when admin clicks an alert item */
  onAlertClick?: (linkTo: string) => void
  /** Called when admin dismisses an alert */
  onDismissAlert?: (alertId: string) => void
}
