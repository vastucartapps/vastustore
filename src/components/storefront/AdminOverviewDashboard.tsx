import { useState } from 'react'
import type { AdminOverviewDashboardProps, TimePeriod } from './types'
import { StatCards } from './StatCards'
import { RevenueChart } from './RevenueChart'
import { RecentOrdersTable } from './RecentOrdersTable'
import { QuickActions } from './QuickActions'
import { AlertsSidebar } from './AlertsSidebar'

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

export function AdminOverviewDashboard({
  stats,
  revenueBars,
  recentOrders,
  quickActions,
  alerts,
  timePeriod: initialTimePeriod = 'today',
  onTimePeriodChange,
  onStatClick,
  onViewOrder,
  onUpdateOrderStatus,
  onQuickAction,
  onAlertClick,
  onDismissAlert,
}: AdminOverviewDashboardProps) {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(initialTimePeriod)

  const handleTimePeriodChange = (period: TimePeriod) => {
    setTimePeriod(period)
    onTimePeriodChange?.(period)
  }

  const periods: { value: TimePeriod; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ]

  return (
    <div className="w-full" style={{ fontFamily: fonts.body }}>
      {/* Time Period Toggle */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: fonts.heading, color: c.earth700 }}
        >
          Dashboard
        </h1>
        <div
          className="inline-flex rounded-lg p-1"
          style={{ backgroundColor: c.card, boxShadow: c.shadow }}
        >
          {periods.map((period) => (
            <button
              key={period.value}
              onClick={() => handleTimePeriodChange(period.value)}
              className="rounded-md px-5 py-2 text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: fonts.body,
                backgroundColor: timePeriod === period.value ? c.primary500 : 'transparent',
                color: timePeriod === period.value ? c.card : c.earth500,
              }}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <StatCards stats={stats} onStatClick={onStatClick} />

      {/* Chart + Quick Actions Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <RevenueChart revenueBars={revenueBars} />
        <QuickActions quickActions={quickActions} onQuickAction={onQuickAction} />
      </div>

      {/* Orders + Alerts Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <RecentOrdersTable
          recentOrders={recentOrders}
          onViewOrder={onViewOrder}
          onUpdateOrderStatus={onUpdateOrderStatus}
        />
        <AlertsSidebar
          alerts={alerts}
          onAlertClick={onAlertClick}
          onDismissAlert={onDismissAlert}
        />
      </div>
    </div>
  )
}
