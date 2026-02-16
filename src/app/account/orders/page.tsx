"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { medusa } from '@/lib/medusa'
import { OrdersList } from '@/components/storefront/OrdersList'
import { downloadInvoice } from '@/lib/invoice-generator'
import type { Order } from '@/components/storefront/types'

export default function MyOrdersPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Fetch orders from Medusa
  useEffect(() => {
    if (!user) return

    async function fetchOrders() {
      try {
        const { orders: medusaOrders } = await medusa.store.order.list({
          limit: 100,
        })

        const transformedOrders: Order[] = (medusaOrders || []).map((order: any) => ({
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

        setOrders(transformedOrders)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching orders:', error)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const handleViewOrder = (orderId: string) => {
    router.push(`/account/orders/${orderId}`)
  }

  const handleDownloadInvoice = async (orderId: string) => {
    try {
      // Fetch full order details from Medusa
      const { order } = await medusa.store.order.retrieve(orderId)

      if (!order) {
        alert('Order not found')
        return
      }

      // Get customer name from shipping address
      const shippingAddr = order.shipping_address
      const customerName = shippingAddr
        ? `${shippingAddr.first_name} ${shippingAddr.last_name}`.trim()
        : 'Customer'

      // Format shipping address
      const shippingAddress = shippingAddr
        ? `${shippingAddr.address_1}${shippingAddr.address_2 ? ', ' + shippingAddr.address_2 : ''}, ${shippingAddr.city}, ${shippingAddr.province} - ${shippingAddr.postal_code}`
        : 'Address not provided'

      // Transform order items
      const items = (order.items || []).map((item: any) => ({
        name: item.title || item.description || 'Product',
        quantity: item.quantity,
        price: Math.round((item.unit_price || 0) / 100),
        total: Math.round((item.total || 0) / 100),
      }))

      // Calculate breakdown
      const subtotal = Math.round((order.subtotal || 0) / 100)
      const shippingFee = Math.round((order.shipping_total || 0) / 100)
      const taxAmount = Math.round((order.tax_total || 0) / 100)
      const grandTotal = Math.round((order.total || 0) / 100)

      // For Indian orders, split tax into CGST/SGST
      const isIndia = order.shipping_address?.country_code === 'IN'
      const cgst = isIndia ? Math.round(taxAmount / 2) : 0
      const sgst = isIndia ? Math.round(taxAmount / 2) : 0

      downloadInvoice({
        invoiceNumber: `INV-${order.display_id || order.id}`,
        orderNumber: order.display_id?.toString() || order.id,
        orderDate: new Date(order.created_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        customerName,
        customerEmail: order.email || order.customer?.email || '',
        customerPhone: shippingAddr?.phone || '',
        shippingAddress,
        items,
        subtotal,
        shippingFee,
        codFee: 0,
        couponDiscount: 0,
        giftCardDiscount: 0,
        prepaidDiscount: 0,
        taxableAmount: subtotal + shippingFee,
        cgst,
        sgst,
        igst: 0,
        totalTax: taxAmount,
        grandTotal,
        currency: order.currency_code?.toUpperCase() || 'INR',
        paymentMethod: order.payments?.[0]?.provider_id === 'stripe' ? 'Stripe' : 'Razorpay',
      })
    } catch (error) {
      console.error('Error generating invoice:', error)
      alert('Failed to generate invoice. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <OrdersList
      orders={orders}
      onViewOrder={handleViewOrder}
      onDownloadInvoice={handleDownloadInvoice}
    />
  )
}

// Helper to map Medusa order status
function mapOrderStatus(fulfillmentStatus: string): 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled' | 'returned' {
  const statusMap: Record<string, 'processing' | 'shipped' | 'in_transit' | 'delivered' | 'cancelled' | 'returned'> = {
    'not_fulfilled': 'processing',
    'partially_fulfilled': 'processing',
    'fulfilled': 'delivered',
    'shipped': 'in_transit',
    'partially_shipped': 'in_transit',
    'canceled': 'cancelled',
    'requires_action': 'processing',
  }
  return statusMap[fulfillmentStatus] || 'processing'
}
