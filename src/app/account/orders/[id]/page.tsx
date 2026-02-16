"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { medusa } from '@/lib/medusa'
import { OrderDetail } from '@/components/storefront/OrderDetail'
import { downloadInvoice } from '@/lib/invoice-generator'
import type { Order, OrderItem, OrderTimelineStep } from '@/components/storefront/types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function OrderDetailPage({ params }: PageProps) {
  const router = useRouter()
  const { user } = useAuthStore()
  const [orderId, setOrderId] = useState<string>('')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  // Resolve params
  useEffect(() => {
    params.then(p => setOrderId(p.id))
  }, [params])

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Fetch order from Medusa
  useEffect(() => {
    if (!user || !orderId) return

    async function fetchOrder() {
      try {
        const { order: medusaOrder } = await medusa.store.order.retrieve(orderId)

        if (!medusaOrder) {
          setLoading(false)
          return
        }

        // Format shipping address
        const shippingAddr = medusaOrder.shipping_address
        const shippingAddress = shippingAddr
          ? `${shippingAddr.address_1}${shippingAddr.address_2 ? ', ' + shippingAddr.address_2 : ''}, ${shippingAddr.city}, ${shippingAddr.province} - ${shippingAddr.postal_code}`
          : 'Address not provided'

        // Transform order items
        const items: OrderItem[] = (medusaOrder.items || []).map((item: any) => ({
          id: item.id,
          productName: item.title || 'Product',
          variantLabel: item.variant?.title || '',
          imageUrl: item.thumbnail || item.variant?.product?.thumbnail || '',
          quantity: item.quantity,
          price: Math.round((item.unit_price || 0) / 100),
          currency: medusaOrder.currency_code?.toUpperCase() || 'INR',
        }))

        // Build order timeline
        const timeline: OrderTimelineStep[] = []

        // Order placed
        timeline.push({
          step: 'Order Placed',
          status: 'completed',
          date: medusaOrder.created_at,
        })

        // Payment confirmed (if payment exists)
        if (medusaOrder.payments?.length > 0) {
          timeline.push({
            step: 'Payment Confirmed',
            status: 'completed',
            date: medusaOrder.payments[0].created_at,
          })
        }

        // Order processing
        const fulfillmentStatus = medusaOrder.fulfillment_status || 'not_fulfilled'
        timeline.push({
          step: 'Processing',
          status: fulfillmentStatus !== 'not_fulfilled' ? 'completed' : 'upcoming',
          date: null,
        })

        // Shipped
        if (medusaOrder.fulfillments?.length > 0) {
          timeline.push({
            step: 'Shipped',
            status: 'completed',
            date: medusaOrder.fulfillments[0].created_at,
          })
        } else {
          timeline.push({
            step: 'Shipped',
            status: 'upcoming',
            date: null,
          })
        }

        // Delivered
        timeline.push({
          step: 'Delivered',
          status: fulfillmentStatus === 'fulfilled' ? 'completed' : 'upcoming',
          date: null,
        })

        const transformedOrder: Order = {
          id: medusaOrder.id,
          orderNumber: medusaOrder.display_id?.toString() || medusaOrder.id,
          orderDate: medusaOrder.created_at,
          status: mapOrderStatus(fulfillmentStatus),
          itemCount: medusaOrder.items?.length || 0,
          total: Math.round((medusaOrder.total || 0) / 100),
          currency: medusaOrder.currency_code?.toUpperCase() || 'INR',
          paymentMethod: medusaOrder.payments?.[0]?.provider_id === 'stripe' ? 'Stripe' : 'Razorpay',
          shippingAddress,
          trackingNumber: medusaOrder.fulfillments?.[0]?.tracking_numbers?.[0] || null,
          trackingUrl: medusaOrder.fulfillments?.[0]?.tracking_links?.[0]?.url || null,
          estimatedDelivery: null, // TODO: Calculate estimated delivery
          items,
          timeline,
        }

        setOrder(transformedOrder)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching order:', error)
        setLoading(false)
      }
    }

    fetchOrder()
  }, [user, orderId])

  const handleBack = () => {
    router.push('/account/orders')
  }

  const handleDownloadInvoice = async (orderId: string) => {
    if (!order) return

    try {
      // Fetch full order details from Medusa for invoice
      const { order: medusaOrder } = await medusa.store.order.retrieve(orderId)

      if (!medusaOrder) return

      const shippingAddr = medusaOrder.shipping_address
      const customerName = shippingAddr
        ? `${shippingAddr.first_name} ${shippingAddr.last_name}`.trim()
        : 'Customer'

      const items = (medusaOrder.items || []).map((item: any) => ({
        name: item.title || 'Product',
        quantity: item.quantity,
        price: Math.round((item.unit_price || 0) / 100),
        total: Math.round((item.total || 0) / 100),
      }))

      const subtotal = Math.round((medusaOrder.subtotal || 0) / 100)
      const shippingFee = Math.round((medusaOrder.shipping_total || 0) / 100)
      const taxAmount = Math.round((medusaOrder.tax_total || 0) / 100)
      const grandTotal = Math.round((medusaOrder.total || 0) / 100)

      const isIndia = medusaOrder.shipping_address?.country_code === 'IN'
      const cgst = isIndia ? Math.round(taxAmount / 2) : 0
      const sgst = isIndia ? Math.round(taxAmount / 2) : 0

      downloadInvoice({
        invoiceNumber: `INV-${order.orderNumber}`,
        orderNumber: order.orderNumber,
        orderDate: new Date(order.orderDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        customerName,
        customerEmail: medusaOrder.email || '',
        customerPhone: shippingAddr?.phone || '',
        shippingAddress: order.shippingAddress,
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
        currency: order.currency,
        paymentMethod: order.paymentMethod,
      })
    } catch (error) {
      console.error('Error generating invoice:', error)
      alert('Failed to generate invoice')
    }
  }

  const handleTrackOrder = (orderId: string) => {
    if (order?.trackingUrl) {
      window.open(order.trackingUrl, '_blank')
    } else {
      alert('Tracking information not available yet')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#433b35] mb-4">Order not found</h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-[#013f47] text-white rounded-xl hover:opacity-90"
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  return (
    <OrderDetail
      order={order}
      onBack={handleBack}
      onDownloadInvoice={handleDownloadInvoice}
      onTrackOrder={handleTrackOrder}
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
