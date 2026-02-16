import { useState } from 'react'
import { Search, Heart, ShoppingBag, User, Menu, X } from 'lucide-react'
import { primary, secondary, earth, bg, gradients, fonts } from '../theme'

interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
  children?: { label: string; href: string }[]
}

interface AppShellProps {
  children: React.ReactNode
  navigationItems?: NavigationItem[]
  categories?: { label: string; href: string }[]
  user?: { name: string; avatarUrl?: string }
  cartCount?: number
  wishlistCount?: number
  announcementText?: string
  announcementLink?: string
  onNavigate?: (href: string) => void
  onLogout?: () => void
  onSearch?: (query: string) => void
}

export default function AppShell({
  children,
  categories = [],
  user,
  cartCount = 0,
  wishlistCount = 0,
  announcementText,
  announcementLink,
  onNavigate,
  onLogout,
  onSearch,
}: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: fonts.body, background: bg.primary }}>
      {/* Announcement Ribbon */}
      {announcementText && announcementVisible && (
        <div className="relative" style={{ background: gradients.header }}>
          <div className="px-4 py-2 text-center text-sm text-white/90">
            {announcementLink ? (
              <a
                href={announcementLink}
                onClick={(e) => { e.preventDefault(); onNavigate?.(announcementLink) }}
                className="hover:text-white underline underline-offset-2"
              >
                {announcementText}
              </a>
            ) : (
              announcementText
            )}
          </div>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-white border-b" style={{ borderColor: `${primary[500]}14` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
              style={{ color: primary[500] }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate?.('/') }}
              className="flex items-center gap-2 shrink-0"
            >
              <img
                src="/VastuCartLogo.png"
                alt="VastuCart"
                className="h-8 w-auto object-contain"
              />
              <span
                className="text-xl font-semibold hidden sm:block"
                style={{ fontFamily: fonts.heading, color: primary[500] }}
              >
                VastuCart
              </span>
            </a>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: earth[400] }} />
                <input
                  type="text"
                  placeholder="Search crystals, yantras, rudraksha..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearch?.(searchQuery)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 text-sm transition-all focus:outline-none"
                  style={{
                    borderColor: `${primary[500]}26`,
                    fontFamily: fonts.body,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = primary[500])}
                  onBlur={(e) => (e.target.style.borderColor = `${primary[500]}26`)}
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search - Mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
                style={{ color: primary[500] }}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => onNavigate?.('/wishlist')}
                className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors"
                style={{ color: primary[500] }}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: secondary[500] }}
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate?.('/cart')}
                className="relative p-2 rounded-lg hover:bg-stone-100 transition-colors"
                style={{ color: primary[500] }}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: secondary[500] }}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account */}
              {user ? (
                <button
                  onClick={() => onNavigate?.('/account')}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-stone-100 transition-colors"
                  style={{ color: primary[500] }}
                >
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ background: gradients.primaryButton }}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden md:block text-sm font-medium" style={{ color: primary[900] }}>
                    {user.name.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => onNavigate?.('/login')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-stone-100"
                  style={{ color: primary[500] }}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:block">Login</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: earth[400] }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch?.(searchQuery)}
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 text-sm focus:outline-none"
                style={{ borderColor: primary[500], fontFamily: fonts.body }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Category Navigation Bar */}
      {categories.length > 0 && (
        <nav className="bg-white border-b hidden lg:block" style={{ borderColor: `${primary[500]}0f` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide -mx-2">
              {categories.map((cat) => (
                <a
                  key={cat.href}
                  href={cat.href}
                  onClick={(e) => { e.preventDefault(); onNavigate?.(cat.href) }}
                  className="px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors relative group"
                  style={{ color: earth[600] }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = primary[500])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = earth[600])}
                >
                  {cat.label}
                  <span
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    style={{ background: secondary[500] }}
                  />
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden shadow-xl overflow-y-auto">
            {/* Gradient top border */}
            <div className="h-1" style={{ background: gradients.accentBorder }} />

            <div className="p-4">
              {/* User section */}
              {user ? (
                <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: `1px solid ${primary[500]}14` }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ background: gradients.primaryButton }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-sm" style={{ color: primary[900] }}>{user.name}</div>
                    <button
                      onClick={() => { onNavigate?.('/account'); setMobileMenuOpen(false) }}
                      className="text-xs" style={{ color: secondary[500] }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { onNavigate?.('/login'); setMobileMenuOpen(false) }}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white mb-4"
                  style={{ background: gradients.primaryButton }}
                >
                  Login / Register
                </button>
              )}

              {/* Categories */}
              <div className="mb-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: earth[400] }}>
                  Categories
                </h3>
                {categories.map((cat) => (
                  <a
                    key={cat.href}
                    href={cat.href}
                    onClick={(e) => { e.preventDefault(); onNavigate?.(cat.href); setMobileMenuOpen(false) }}
                    className="block py-2 text-sm transition-colors"
                    style={{ color: earth[600] }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = primary[500])}
                    onMouseLeave={(e) => (e.currentTarget.style.color = earth[600])}
                  >
                    {cat.label}
                  </a>
                ))}
              </div>

              {/* Quick Links */}
              <div style={{ borderTop: `1px solid ${primary[500]}14` }} className="pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: earth[400] }}>
                  Quick Links
                </h3>
                {[
                  { label: 'My Orders', href: '/account/orders' },
                  { label: 'Wishlist', href: '/wishlist' },
                  { label: 'Track Order', href: '/account/track' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); onNavigate?.(link.href); setMobileMenuOpen(false) }}
                    className="block py-2 text-sm"
                    style={{ color: earth[600] }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Logout */}
              {user && (
                <button
                  onClick={() => { onLogout?.(); setMobileMenuOpen(false) }}
                  className="mt-4 text-sm font-medium"
                  style={{ color: secondary[500] }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Content Area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: gradients.footer }}>
        {/* Gradient accent border */}
        <div className="h-1" style={{ background: gradients.accentBorder }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  V
                </div>
                <span className="text-xl font-semibold text-white" style={{ fontFamily: fonts.heading }}>
                  VastuCart
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Your trusted destination for authentic spiritual products, crystals, yantras, and Vastu Shastra tools.
              </p>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'YouTube'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors"
                    style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = `${secondary[500]}4d`)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  >
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: fonts.heading }}>Quick Links</h4>
              {['About Us', 'Contact', 'Blog', 'Track Order'].map((link) => (
                <a key={link} href="#" className="block text-sm py-1.5 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: fonts.heading }}>Customer Service</h4>
              {['Shipping Policy', 'Return Policy', 'Privacy Policy', 'Terms & Conditions'].map((link) => (
                <a key={link} href="#" className="block text-sm py-1.5 transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.9)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: fonts.heading }}>Stay Connected</h4>
              <p className="text-sm mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Get updates on new products and spiritual insights.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'white',
                  }}
                />
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: gradients.secondaryButton }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              &copy; 2026 VastuCart. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {['Visa', 'Mastercard', 'UPI', 'Razorpay'].map((method) => (
                <span key={method} className="text-[10px] px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}>
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
