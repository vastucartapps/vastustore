"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import {
  Package, MapPin, Heart, Tag, Star, Gift, Calendar,
  MessageCircle, Settings, LogOut, ChevronDown,
} from 'lucide-react'
import { primary, secondary, earth, gradients } from '@/lib/theme'
import { useAuthStore } from '@/lib/store'

interface UserMenuProps {
  variant?: 'storefront' | 'admin' | 'sidebar'
}

const customerMenuItems = [
  { label: 'My Orders', href: '/account/orders', icon: Package },
  { label: 'Track Order', href: '/account/track', icon: MapPin },
  { label: 'Addresses', href: '/account/addresses', icon: MapPin },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Coupons', href: '/account/coupons', icon: Tag },
  { label: 'Loyalty Points', href: '/account/loyalty', icon: Star },
  { label: 'Gift Cards', href: '/account/gift-cards', icon: Gift },
  { label: 'My Bookings', href: '/account/bookings', icon: Calendar },
  { label: 'Support', href: '/account/support', icon: MessageCircle },
  { label: 'Account Settings', href: '/account/settings', icon: Settings },
]

export function UserMenu({ variant = 'storefront' }: UserMenuProps) {
  const router = useRouter()
  const pathname = usePathname()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch {}
    logout()
    setOpen(false)
    router.push('/')
  }

  if (!user) return null

  const initials = user.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Sidebar variant — full vertical list
  if (variant === 'sidebar') {
    return (
      <div className="h-full overflow-y-auto" style={{ width: 240, background: 'white', borderRight: `1px solid ${primary[500]}14` }}>
        {/* User Info */}
        <div className="p-4 pb-3" style={{ borderBottom: `1px solid ${primary[500]}0f` }}>
          <div className="flex items-center gap-3">
            {user.avatar_url ? (
              <Image src={user.avatar_url} alt={user.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                style={{ background: gradients.primaryButton }}
              >
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: primary[900] }}>{user.name}</div>
              {user.email && (
                <div className="text-xs truncate" style={{ color: earth[400] }}>{user.email}</div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-3 space-y-0.5">
          {customerMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative"
                style={{
                  color: isActive ? primary[500] : earth[600],
                  background: isActive ? `${primary[500]}0f` : 'transparent',
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
                {isActive && (
                  <div
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full"
                    style={{ background: gradients.accentBorder }}
                  />
                )}
                <span style={{ opacity: isActive ? 1 : 0.7 }}>
                  <Icon className="w-4 h-4" />
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}

          {/* Logout */}
          <div className="pt-2 mt-2" style={{ borderTop: `1px solid ${primary[500]}0f` }}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-colors"
              style={{ color: secondary[500] }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${secondary[500]}0f`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Dropdown variant — for storefront header and admin header
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 p-1.5 rounded-lg transition-colors"
        style={{ color: variant === 'admin' ? 'rgba(255,255,255,0.9)' : primary[500] }}
        onMouseEnter={(e) => (e.currentTarget.style.background = variant === 'admin' ? 'rgba(255,255,255,0.1)' : `${primary[500]}0d`)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {user.avatar_url ? (
          <Image src={user.avatar_url} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            style={{ background: variant === 'admin' ? 'rgba(255,255,255,0.2)' : gradients.primaryButton }}
          >
            {initials}
          </div>
        )}
        <ChevronDown className="w-3.5 h-3.5" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 200ms' }} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden shadow-lg z-50"
          style={{ background: 'white', border: `1px solid ${primary[500]}1a` }}
        >
          {/* Gradient top border */}
          <div className="h-0.5" style={{ background: gradients.accentBorder }} />

          {/* User Info */}
          <div className="px-4 py-3" style={{ borderBottom: `1px solid ${primary[500]}0f` }}>
            <div className="text-sm font-semibold" style={{ color: primary[900] }}>{user.name}</div>
            {user.email && <div className="text-xs" style={{ color: earth[400] }}>{user.email}</div>}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {(variant === 'admin'
              ? [{ label: 'Profile', href: '/admin/profile', icon: Settings }]
              : customerMenuItems.slice(0, 4)
            ).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                  style={{ color: earth[600] }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${primary[500]}0a`; e.currentTarget.style.color = primary[500] }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = earth[600] }}
                >
                  <span style={{ opacity: 0.7 }}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Logout */}
          <div style={{ borderTop: `1px solid ${primary[500]}0f` }}>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium w-full transition-colors"
              style={{ color: secondary[500] }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${secondary[500]}0a`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
