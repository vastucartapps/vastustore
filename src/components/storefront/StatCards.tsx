import { ReactElement } from 'react'
import type { DashboardStat } from './types'

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

interface StatCardsProps {
  stats: DashboardStat[]
  onStatClick?: (linkTo: string) => void
}

function getIcon(iconName: string) {
  const iconMap: Record<string, ReactElement> = {
    currency: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    cart: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    users: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    box: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    star: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
    chart: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  }
  return iconMap[iconName] || iconMap.chart
}

function formatValue(value: number, format: 'number' | 'currency', currency?: string): string {
  if (format === 'currency') {
    const symbol = currency === 'USD' ? '$' : '₹'
    return `${symbol}${value.toLocaleString('en-IN')}`
  }
  return value.toLocaleString('en-IN')
}

function calculateDelta(current: number, previous: number): { percent: number; isPositive: boolean } {
  if (previous === 0) return { percent: 0, isPositive: current > 0 }
  const percent = ((current - previous) / previous) * 100
  return { percent: Math.abs(percent), isPositive: percent >= 0 }
}

export function StatCards({ stats, onStatClick }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {stats.map((stat) => {
        const delta = calculateDelta(stat.value, stat.previousValue)
        return (
          <button
            key={stat.id}
            onClick={() => onStatClick?.(stat.linkTo)}
            className="group rounded-lg text-left transition-all duration-200"
            style={{
              backgroundColor: c.card,
              boxShadow: c.shadow,
              borderTop: `3px solid transparent`,
              borderImage: c.gradient,
              borderImageSlice: 1,
            }}
          >
            <div
              className="p-5 sm:p-6"
              style={{
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.parentElement!.style.boxShadow = c.shadowHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.parentElement!.style.boxShadow = c.shadow
              }}
            >
              {/* Icon and Delta */}
              <div className="mb-4 flex items-start justify-between">
                <div className="rounded-lg p-2" style={{ backgroundColor: c.primary50, color: c.primary500 }}>
                  {getIcon(stat.icon)}
                </div>
                <div
                  className="rounded-full px-2 py-1 text-xs font-semibold"
                  style={{
                    fontFamily: fonts.mono,
                    backgroundColor: delta.isPositive ? c.successLight : c.errorLight,
                    color: delta.isPositive ? c.success : c.error,
                  }}
                >
                  {delta.isPositive ? '↑' : '↓'} {delta.percent.toFixed(1)}%
                </div>
              </div>

              {/* Label */}
              <div
                className="mb-1 text-sm font-medium"
                style={{
                  fontFamily: fonts.body,
                  color: c.earth500,
                }}
              >
                {stat.label}
              </div>

              {/* Value */}
              <div
                className="text-2xl font-bold sm:text-3xl"
                style={{
                  fontFamily: fonts.heading,
                  color: c.earth700,
                }}
              >
                {formatValue(stat.value, stat.format, stat.currency)}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
