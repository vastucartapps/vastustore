import React from 'react'
import {
  LayoutDashboard,
  Package,
  MapPin,
  Heart,
  Tag,
  Award,
  Calendar,
  Gift,
  Bell,
  MessageCircle,
  LogOut,
} from 'lucide-react'
import type { UserProfile, DashboardSection } from '../types'

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

interface DashboardSidebarProps {
  userProfile: UserProfile
  activeSection: DashboardSection
  unreadNotifications: number
  onNavigate?: (section: DashboardSection) => void
  onLogout?: () => void
}

interface NavItem {
  id: DashboardSection
  label: string
  icon: React.ElementType
  badge?: number
}

export function DashboardSidebar({
  userProfile,
  activeSection,
  unreadNotifications,
  onNavigate,
  onLogout,
}: DashboardSidebarProps) {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'addresses', label: 'Address Book', icon: MapPin },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'coupons', label: 'Coupons', icon: Tag },
    { id: 'loyalty', label: 'Loyalty Points', icon: Award },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'gift-cards', label: 'Gift Cards', icon: Gift },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotifications,
    },
    { id: 'support', label: 'Support', icon: MessageCircle },
  ]

  const memberSinceDate = new Date(userProfile.memberSince).toLocaleDateString(
    'en-IN',
    {
      year: 'numeric',
      month: 'long',
    }
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex flex-col w-64 border-r"
        style={{
          backgroundColor: c.bgCard,
          borderColor: '#f0ebe4',
        }}
      >
        {/* Gradient accent strip */}
        <div className="h-1" style={{ background: c.gradientAccent }} />

        {/* User Profile Section */}
        <div className="p-6 border-b" style={{ borderColor: '#f0ebe4' }}>
          <div className="flex flex-col items-center text-center">
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-14 h-14 rounded-full object-cover mb-3"
            />
            <h3
              className="text-lg font-semibold mb-1"
              style={{
                fontFamily: 'Lora, serif',
                color: c.earth700,
              }}
            >
              {userProfile.name}
            </h3>
            <p
              className="text-xs"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                color: c.earth400,
              }}
            >
              Member since {memberSinceDate}
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate?.(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative"
                    style={{
                      backgroundColor: isActive ? c.primary50 : 'transparent',
                      color: isActive ? c.primary500 : c.earth600,
                      fontFamily: 'Open Sans, sans-serif',
                      borderLeft: isActive
                        ? `3px solid ${c.primary500}`
                        : '3px solid transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = c.bgPrimary
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <Icon size={20} />
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className="px-2 py-0.5 text-xs rounded-full font-semibold"
                        style={{
                          backgroundColor: c.secondary500,
                          color: c.bgCard,
                          fontFamily: 'Open Sans, sans-serif',
                        }}
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

        {/* Logout Button */}
        <div className="p-4 border-t" style={{ borderColor: '#f0ebe4' }}>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
            style={{
              color: c.earth600,
              fontFamily: 'Open Sans, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = c.bgPrimary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Horizontal Tab Bar */}
      <div
        className="lg:hidden overflow-x-auto border-b"
        style={{
          backgroundColor: c.bgCard,
          borderColor: '#f0ebe4',
        }}
      >
        {/* Gradient accent strip */}
        <div className="h-1" style={{ background: c.gradientAccent }} />

        <div className="flex gap-2 p-3 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <button
                key={item.id}
                onClick={() => onNavigate?.(item.id)}
                className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors relative min-w-[80px]"
                style={{
                  backgroundColor: isActive ? c.primary50 : 'transparent',
                  color: isActive ? c.primary500 : c.earth600,
                  fontFamily: 'Open Sans, sans-serif',
                  borderBottom: isActive
                    ? `3px solid ${c.primary500}`
                    : '3px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = c.bgPrimary
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <div className="relative">
                  <Icon size={20} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs rounded-full font-semibold"
                      style={{
                        backgroundColor: c.secondary500,
                        color: c.bgCard,
                        fontFamily: 'Open Sans, sans-serif',
                        fontSize: '10px',
                        minWidth: '18px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
