import { useState } from 'react'
import {
  LayoutDashboard, Package, Grid3x3, MessageSquare, ShoppingCart,
  RotateCcw, Users, Calendar, Tag, Gift, Star, Truck, CreditCard,
  Layout, Plug, Bell, ChevronDown, ExternalLink,
} from 'lucide-react'
import { primary, secondary, earth, gradients, fonts } from '../theme'

interface NavGroup {
  label: string
  items: {
    label: string
    href: string
    icon: React.ReactNode
    isActive?: boolean
    badge?: number
  }[]
}

interface MainNavProps {
  variant: 'admin' | 'customer'
  groups?: NavGroup[]
  activeHref?: string
  collapsed?: boolean
  onNavigate?: (href: string) => void
}

const adminGroups: NavGroup[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Catalog',
    items: [
      { label: 'Products', href: '/admin/products', icon: <Package className="w-4 h-4" /> },
      { label: 'Categories', href: '/admin/categories', icon: <Grid3x3 className="w-4 h-4" /> },
      { label: 'Reviews & Q&A', href: '/admin/reviews', icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Sales',
    items: [
      { label: 'Orders', href: '/admin/orders', icon: <ShoppingCart className="w-4 h-4" />, badge: 5 },
      { label: 'Returns & Refunds', href: '/admin/returns', icon: <RotateCcw className="w-4 h-4" /> },
      { label: 'Customers', href: '/admin/customers', icon: <Users className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Bookings',
    items: [
      { label: 'Consultations', href: '/admin/bookings', icon: <Calendar className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Marketing',
    items: [
      { label: 'Coupons', href: '/admin/coupons', icon: <Tag className="w-4 h-4" /> },
      { label: 'Gift Cards', href: '/admin/gift-cards', icon: <Gift className="w-4 h-4" /> },
      { label: 'Loyalty & Rewards', href: '/admin/loyalty', icon: <Star className="w-4 h-4" /> },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Shipping & Delivery', href: '/admin/shipping', icon: <Truck className="w-4 h-4" /> },
      { label: 'Payments & Tax', href: '/admin/payments', icon: <CreditCard className="w-4 h-4" /> },
      { label: 'Storefront & Content', href: '/admin/storefront', icon: <Layout className="w-4 h-4" /> },
      { label: 'Integrations & SEO', href: '/admin/integrations', icon: <Plug className="w-4 h-4" /> },
      { label: 'Notifications', href: '/admin/notifications', icon: <Bell className="w-4 h-4" /> },
    ],
  },
]

export default function MainNav({
  variant,
  groups,
  activeHref = '',
  collapsed = false,
  onNavigate,
}: MainNavProps) {
  const navGroups = groups || (variant === 'admin' ? adminGroups : [])
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  const toggleGroup = (label: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <nav
      className="h-full overflow-y-auto py-4"
      style={{
        width: collapsed ? 64 : (variant === 'admin' ? 260 : 240),
        background: 'white',
        borderRight: `1px solid ${primary[500]}14`,
        transition: 'width 200ms ease',
      }}
    >
      {/* View Storefront link for admin */}
      {variant === 'admin' && !collapsed && (
        <div className="px-4 mb-4">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate?.('/') }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            style={{ color: primary[500], background: `${primary[500]}0a` }}
            onMouseEnter={(e) => (e.currentTarget.style.background = `${primary[500]}14`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = `${primary[500]}0a`)}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Storefront
          </a>
        </div>
      )}

      {navGroups.map((group) => {
        const isGroupCollapsed = collapsedGroups[group.label]
        return (
          <div key={group.label} className="mb-1">
            {/* Group Header */}
            {!collapsed && (
              <button
                onClick={() => toggleGroup(group.label)}
                className="w-full flex items-center justify-between px-6 py-1.5 text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: earth[300] }}
              >
                {group.label}
                <ChevronDown
                  className="w-3 h-3 transition-transform"
                  style={{ transform: isGroupCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
                />
              </button>
            )}

            {/* Group Items */}
            {!isGroupCollapsed && (
              <div className="mt-0.5 space-y-0.5 px-3">
                {group.items.map((item) => {
                  const isActive = activeHref === item.href
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); onNavigate?.(item.href) }}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all relative"
                      style={{
                        color: isActive ? primary[500] : earth[600],
                        background: isActive ? `${primary[500]}0f` : 'transparent',
                        fontFamily: fonts.body,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = `${primary[500]}0a`
                          e.currentTarget.style.color = primary[500]
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = earth[600]
                        }
                      }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <div
                          className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full"
                          style={{ background: gradients.accentBorder }}
                        />
                      )}
                      <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
                      {!collapsed && <span>{item.label}</span>}
                      {item.badge && !collapsed && (
                        <span
                          className="ml-auto text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full"
                          style={{ background: secondary[500] }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
