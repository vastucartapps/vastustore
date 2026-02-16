"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useCartStore } from '@/lib/store'
import { medusa } from '@/lib/medusa'
import { DashboardHome } from '@/components/storefront'
import type {
  UserProfile,
  DashboardStats,
  Order,
  NewArrival,
  DashboardOffer,
} from '@/components/storefront/types'

// Helper to map Medusa order status to display status
function mapOrderStatus(fulfillmentStatus: string): 'processing' | 'shipped' | 'delivered' | 'cancelled' {
  const statusMap: Record<string, 'processing' | 'shipped' | 'delivered' | 'cancelled'> = {
    'not_fulfilled': 'processing',
    'partially_fulfilled': 'processing',
    'fulfilled': 'delivered',
    'shipped': 'shipped',
    'partially_shipped': 'shipped',
    'canceled': 'cancelled',
    'requires_action': 'processing',
  }
  return statusMap[fulfillmentStatus] || 'processing'
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { items: cartItems } = useCartStore()

  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalOrders: 0,
    loyaltyPoints: 0,
    wishlistItems: 0,
    activeCoupons: 0,
  })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [newArrivals, setNewArrivals] = useState<NewArrival[]>([])
  const [offers, setOffers] = useState<DashboardOffer[]>([])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Fetch dashboard data
  useEffect(() => {
    if (!user) return

    async function fetchDashboardData() {
      try {
        // Fetch user profile from AstroEngine auth
        const profileRes = await fetch('/api/auth')
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setUserProfile({
            id: profileData.user.id,
            name: profileData.user.fullName || profileData.user.email,
            email: profileData.user.email,
            emailVerified: profileData.user.emailVerified,
            phone: profileData.user.phoneNumber || '',
            avatarUrl: profileData.user.photoUrl || '',
            memberSince: new Date(profileData.user.createdAt).toLocaleDateString('en-IN', {
              month: 'long',
              year: 'numeric',
            }),
            currency: 'INR', // Default to INR, TODO: get from user preferences
          })
        }

        // Fetch stats in parallel
        const [ordersData, loyaltyRes, wishlistRes, couponsRes, newArrivalsData] = await Promise.all([
          // Fetch orders count from Medusa
          medusa.store.order.list({ limit: 100 }).catch(() => ({ orders: [] })),
          // Fetch loyalty points from Supabase
          fetch('/api/loyalty/balance').then(r => r.ok ? r.json() : { points: 0 }),
          // Fetch wishlist count from Supabase
          fetch('/api/wishlist').then(r => r.ok ? r.json() : { wishlist: [] }),
          // Fetch active coupons from Supabase
          fetch('/api/coupons/active').then(r => r.ok ? r.json() : { coupons: [] }),
          // Fetch new arrivals from Medusa
          medusa.store.product.list({
            limit: 4,
            order: '-created_at',
          }).catch(() => ({ products: [] })),
        ])

        const totalOrders = ordersData.orders?.length || 0

        setDashboardStats({
          totalOrders,
          loyaltyPoints: loyaltyRes.points || 0,
          wishlistItems: wishlistRes.wishlist?.length || 0,
          activeCoupons: couponsRes.coupons?.length || 0,
        })

        // Transform recent orders from Medusa
        const orders = (ordersData.orders || []).slice(0, 5).map((order: any) => ({
          id: order.id,
          orderNumber: order.display_id?.toString() || order.id,
          date: new Date(order.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          status: mapOrderStatus(order.fulfillment_status || 'pending'),
          total: Math.round((order.total || 0) / 100),
          currency: order.currency_code?.toUpperCase() || 'INR',
          itemCount: order.items?.length || 0,
        }))
        setRecentOrders(orders)

        // Transform new arrivals from Medusa
        const arrivals = (newArrivalsData.products || []).map((product: any) => ({
          id: product.id,
          name: product.title,
          slug: product.handle,
          imageUrl: product.thumbnail || product.images?.[0]?.url || '',
          price: Math.round((product.variants?.[0]?.calculated_price?.calculated_amount || 0) / 100),
          mrp: Math.round((product.variants?.[0]?.calculated_price?.original_amount || 0) / 100),
          currency: 'INR',
          rating: 4.5, // TODO: Calculate from reviews when available
          isNew: true,
        }))
        setNewArrivals(arrivals)

        // Fetch promotional offers from Supabase
        const offersRes = await fetch('/api/dashboard/offers')
        if (offersRes.ok) {
          const offersData = await offersRes.json()
          setOffers(offersData.offers || [])
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, cartItems.length])

  const handleViewOrder = (orderId: string) => {
    router.push(`/account/orders/${orderId}`)
  }

  const handleNavigate = (section: string) => {
    router.push(`/account/${section}`)
  }

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`)
  }

  if (loading || !userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <DashboardHome
      userProfile={userProfile}
      stats={dashboardStats}
      recentOrders={recentOrders}
      newArrivals={newArrivals}
      offers={offers}
      onViewOrder={handleViewOrder}
      onNavigate={handleNavigate}
      onViewProduct={handleProductClick}
    />
  )
}
