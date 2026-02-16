import type { QuickAction } from '../types'

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

interface QuickActionsProps {
  quickActions: QuickAction[]
  onQuickAction?: (href: string) => void
}

function getIcon(iconName: string) {
  const iconMap: Record<string, JSX.Element> = {
    plus: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    package: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    megaphone: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
    tag: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
    user: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    chart: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  }
  return iconMap[iconName] || iconMap.plus
}

export function QuickActions({ quickActions, onQuickAction }: QuickActionsProps) {
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
        className="mb-4 text-xl font-bold"
        style={{
          fontFamily: fonts.heading,
          color: c.earth700,
        }}
      >
        Quick Actions
      </h2>

      <div className="space-y-3">
        {quickActions.map((action) => {
          const isPrimary = action.color === 'primary'
          const bgColor = isPrimary ? c.primary500 : c.secondary500
          const bgHover = isPrimary ? c.primary400 : c.secondary300

          return (
            <button
              key={action.id}
              onClick={() => onQuickAction?.(action.href)}
              className="group flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-all duration-200"
              style={{
                backgroundColor: bgColor,
                color: c.card,
                fontFamily: fonts.body,
                boxShadow: c.shadow,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = bgHover
                e.currentTarget.style.boxShadow = c.shadowHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = bgColor
                e.currentTarget.style.boxShadow = c.shadow
              }}
            >
              {getIcon(action.icon)}
              <span>{action.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
