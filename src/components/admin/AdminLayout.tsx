"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
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
import { primary, secondary, earth, bg, gradients, fonts } from '@/lib/theme'
import { useAuthStore } from '@/lib/store'

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
  href: string
  badge?: number
}

interface AdminLayoutProps {
  children: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { id: 'products', label: 'Products', icon: Package, href: '/admin/products' },
  { id: 'categories', label: 'Categories', icon: FolderTree, href: '/admin/categories' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, href: '/admin/orders' },
  { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw, href: '/admin/returns' },
  { id: 'customers', label: 'Customers', icon: Users, href: '/admin/customers' },
  { id: 'reviews', label: 'Reviews & Q&A', icon: Star, href: '/admin/reviews' },
  { id: 'coupons', label: 'Coupons & Gift Cards', icon: Ticket, href: '/admin/coupons' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, href: '/admin/bookings' },
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck, href: '/admin/shipping' },
  { id: 'payments', label: 'Payments & Tax', icon: CreditCard, href: '/admin/payments' },
  { id: 'content', label: 'Content & Storefront', icon: FileText, href: '/admin/content' },
  { id: 'integrations', label: 'Integrations & SEO', icon: Link2, href: '/admin/integrations' },
  { id: 'notifications', label: 'Notifications', icon: Bell, href: '/admin/notifications' },
  { id: 'loyalty', label: 'Loyalty & Rewards', icon: Award, href: '/admin/loyalty' },
]

export function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const logout = useAuthStore((s) => s.logout)
  const [collapsed, setCollapsed] = useState(false)

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    logout()
    router.push('/')
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)]" style={{ backgroundColor: bg.primary }}>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 border-r transition-all duration-300"
        style={{
          width: collapsed ? 72 : 260,
          backgroundColor: 'white',
          borderColor: '#f0ebe4',
        }}
      >
        {/* Gradient accent strip */}
        <div className="h-1 flex-shrink-0" style={{ background: gradients.accentBorder }} />

        {/* Admin Header */}
        <div
          className="flex items-center justify-between px-4 py-4 border-b flex-shrink-0"
          style={{ borderColor: '#f0ebe4' }}
        >
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Image
                src="/VastuCartLogo.png"
                alt="VastuCart"
                width={32}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ fontFamily: fonts.body, color: earth[400] }}
              >
                Admin
              </span>
            </div>
          )}
          {collapsed && (
            <Image
              src="/VastuCartLFAV.png"
              alt="VastuCart"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md transition-colors"
            style={{ color: earth[400] }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = bg.primary }}
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
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg transition-all duration-150"
                    style={{
                      padding: collapsed ? '10px' : '10px 14px',
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      backgroundColor: isActive ? primary[50] : 'transparent',
                      color: isActive ? primary[500] : earth[600],
                      fontFamily: fonts.body,
                      borderLeft: collapsed
                        ? 'none'
                        : isActive
                          ? `3px solid ${primary[500]}`
                          : '3px solid transparent',
                    }}
                    title={collapsed ? item.label : undefined}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = bg.primary
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
                        style={{ backgroundColor: secondary[500], color: 'white' }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-2 py-3 border-t flex-shrink-0" style={{ borderColor: '#f0ebe4' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-lg transition-colors"
            style={{
              padding: collapsed ? '10px' : '10px 14px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: earth[400],
              fontFamily: fonts.body,
            }}
            title={collapsed ? 'Logout' : undefined}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = bg.primary }}
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
        style={{ backgroundColor: 'white', borderColor: '#f0ebe4' }}
      >
        <div className="h-0.5" style={{ background: gradients.accentBorder }} />
        <div className="flex gap-1 px-3 py-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors min-w-[64px] flex-shrink-0"
                style={{
                  backgroundColor: isActive ? primary[50] : 'transparent',
                  color: isActive ? primary[500] : earth[400],
                  fontFamily: fonts.body,
                }}
              >
                <Icon size={18} />
                <span className="text-[10px] font-medium whitespace-nowrap">{item.label}</span>
              </Link>
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
