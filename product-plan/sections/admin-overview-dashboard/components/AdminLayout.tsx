import { useState } from 'react'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  RotateCcw,
  Users,
  Star,
  Ticket,
  Calendar,
  Truck,
  CreditCard,
  FileText,
  Link2,
  Bell,
  Award,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary200: '#71c1ae',
  primary100: '#c5e8e2',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  bg: '#fffbf5',
  card: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
}
const fonts = {
  heading: "'Lora', serif",
  body: "'Open Sans', sans-serif",
}

export type AdminSection =
  | 'overview'
  | 'products'
  | 'categories'
  | 'orders'
  | 'returns'
  | 'customers'
  | 'reviews'
  | 'coupons'
  | 'bookings'
  | 'shipping'
  | 'payments'
  | 'content'
  | 'integrations'
  | 'notifications'
  | 'loyalty'

interface NavItem {
  id: AdminSection
  label: string
  icon: React.ElementType
  badge?: number
}

interface AdminLayoutProps {
  activeSection: AdminSection
  children: React.ReactNode
  onNavigate?: (section: AdminSection) => void
  onLogout?: () => void
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: FolderTree },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'reviews', label: 'Reviews & Q&A', icon: Star },
  { id: 'coupons', label: 'Coupons & Gift Cards', icon: Ticket },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'payments', label: 'Payments & Tax', icon: CreditCard },
  { id: 'content', label: 'Content & Storefront', icon: FileText },
  { id: 'integrations', label: 'Integrations & SEO', icon: Link2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'loyalty', label: 'Loyalty & Rewards', icon: Award },
]

export function AdminLayout({
  activeSection,
  children,
  onNavigate,
  onLogout,
}: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-80px)]" style={{ backgroundColor: c.bg }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 border-r transition-all duration-300"
        style={{
          width: collapsed ? 72 : 260,
          backgroundColor: c.card,
          borderColor: '#f0ebe4',
        }}
      >
        {/* Gradient accent strip */}
        <div className="h-1 flex-shrink-0" style={{ background: c.gradient }} />

        {/* Admin Header */}
        <div
          className="flex items-center justify-between px-4 py-4 border-b flex-shrink-0"
          style={{ borderColor: '#f0ebe4' }}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <img
                src="/VastuCartLogo.png"
                alt="VastuCart"
                className="h-8 w-auto object-contain"
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: fonts.body, color: c.earth400 }}
              >
                Admin
              </span>
            </div>
          )}
          {collapsed && (
            <img
              src="/VastuCartLFAV.png"
              alt="VastuCart"
              className="w-8 h-8 object-contain"
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md transition-colors"
            style={{ color: c.earth400 }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = c.bg }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 overflow-y-auto">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate?.(item.id)}
                    className="w-full flex items-center gap-3 rounded-lg transition-all duration-150"
                    style={{
                      padding: collapsed ? '10px' : '10px 14px',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      backgroundColor: isActive ? c.primary50 : 'transparent',
                      color: isActive ? c.primary500 : c.earth600,
                      fontFamily: fonts.body,
                      borderLeft: collapsed
                        ? 'none'
                        : isActive
                          ? `3px solid ${c.primary500}`
                          : '3px solid transparent',
                    }}
                    title={collapsed ? item.label : undefined}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = c.bg
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                    {!collapsed && (
                      <span className="flex-1 text-left text-sm font-medium truncate">
                        {item.label}
                      </span>
                    )}
                    {!collapsed && item.badge !== undefined && item.badge > 0 && (
                      <span
                        className="px-2 py-0.5 text-xs rounded-full font-semibold"
                        style={{ backgroundColor: c.secondary500, color: c.card }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-2 py-3 border-t flex-shrink-0" style={{ borderColor: '#f0ebe4' }}>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-lg transition-colors"
            style={{
              padding: collapsed ? '10px' : '10px 14px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: c.earth400,
              fontFamily: fonts.body,
            }}
            title={collapsed ? 'Logout' : undefined}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = c.bg }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <LogOut size={20} />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Top Nav — horizontal scrollable */}
      <div
        className="lg:hidden fixed top-[80px] left-0 right-0 z-30 border-b"
        style={{ backgroundColor: c.card, borderColor: '#f0ebe4' }}
      >
        <div className="h-0.5" style={{ background: c.gradient }} />
        <div className="flex gap-1 px-3 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors min-w-[64px] flex-shrink-0"
                style={{
                  backgroundColor: isActive ? c.primary50 : 'transparent',
                  color: isActive ? c.primary500 : c.earth400,
                  fontFamily: fonts.body,
                }}
              >
                <Icon size={18} />
                <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0 pt-[72px] lg:pt-0 overflow-x-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  )
}
