import { useState } from 'react'
import type { RevenueBar } from './types'

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

interface RevenueChartProps {
  revenueBars: RevenueBar[]
}

export function RevenueChart({ revenueBars }: RevenueChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  if (revenueBars.length === 0) {
    return (
      <div
        className="rounded-lg p-6"
        style={{
          backgroundColor: c.card,
          boxShadow: c.shadow,
          borderTop: `3px solid transparent`,
          borderImage: c.gradient,
          borderImageSlice: 1,
        }}
      >
        <h2
          className="mb-6 text-xl font-bold"
          style={{
            fontFamily: fonts.heading,
            color: c.earth700,
          }}
        >
          Revenue Overview
        </h2>
        <div className="py-12 text-center" style={{ color: c.earth500, fontFamily: fonts.body }}>
          No revenue data available
        </div>
      </div>
    )
  }

  const maxAmount = Math.max(...revenueBars.map((bar) => bar.amount))
  const maxHeight = 200

  return (
    <div
      className="rounded-lg p-6"
      style={{
        backgroundColor: c.card,
        boxShadow: c.shadow,
        borderTop: `3px solid transparent`,
        borderImage: c.gradient,
        borderImageSlice: 1,
      }}
    >
      <h2
        className="mb-6 text-xl font-bold"
        style={{
          fontFamily: fonts.heading,
          color: c.earth700,
        }}
      >
        Revenue Overview
      </h2>

      <div className="relative">
        {/* Chart Container */}
        <div className="flex items-end justify-between gap-2 sm:gap-4" style={{ height: maxHeight + 60 }}>
          {revenueBars.map((bar, index) => {
            const heightPercent = (bar.amount / maxAmount) * 100
            const barHeight = (heightPercent / 100) * maxHeight

            return (
              <div key={bar.date} className="relative flex flex-1 flex-col items-center">
                {/* Hover Amount Tooltip */}
                {hoveredIndex === index && (
                  <div
                    className="absolute bottom-full mb-2 whitespace-nowrap rounded px-2 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: c.earth700,
                      color: c.card,
                      fontFamily: fonts.mono,
                    }}
                  >
                    ₹{bar.amount.toLocaleString('en-IN')}
                  </div>
                )}

                {/* Bar */}
                <div
                  className="w-full cursor-pointer rounded-t transition-all duration-300"
                  style={{
                    height: barHeight || 4,
                    background:
                      hoveredIndex === index
                        ? `linear-gradient(to top, ${c.primary500}, ${c.secondary500})`
                        : `linear-gradient(to top, ${c.primary500}, ${c.primary400})`,
                    minHeight: '4px',
                    opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />

                {/* Label */}
                <div
                  className="mt-3 text-center text-xs font-medium"
                  style={{
                    fontFamily: fonts.body,
                    color: hoveredIndex === index ? c.earth700 : c.earth500,
                  }}
                >
                  {bar.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Baseline */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '1px',
            backgroundColor: c.earth400,
            opacity: 0.2,
            bottom: '40px',
          }}
        />
      </div>
    </div>
  )
}
