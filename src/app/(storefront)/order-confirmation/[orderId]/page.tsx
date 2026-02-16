"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { medusa } from '@/lib/medusa'
import { OrderConfirmation } from '@/components/storefront'
import { downloadInvoice } from '@/lib/invoice-generator'
import type { OrderConfirmation as OrderConfirmationType, RelatedProduct } from '@/components/storefront/types'

interface PageProps {
  params: Promise<{ orderId: string }>
}

export default function OrderConfirmationPage({ params }: PageProps) {
  const router = useRouter()
  const [orderId, setOrderId] = useState<string>('')
  const [orderData, setOrderData] = useState<OrderConfirmationType | null>(null)
  const [medusaOrder, setMedusaOrder] = useState<any>(null) // Store full Medusa order for invoice
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    params.then(p => setOrderId(p.orderId))
  }, [params])

  useEffect(() => {
    if (!orderId) return

    async function fetchOrderData() {
      try {
        // Fetch real order from Medusa
        const { order } = await medusa.store.order.retrieve(orderId)

        if (!order) {
          setLoading(false)
          return
        }

        // Format shipping address
        const shippingAddr = order.shipping_address
        const shippingAddress = shippingAddr
          ? `${shippingAddr.address_1}${shippingAddr.address_2 ? ', ' + shippingAddr.address_2 : ''}, ${shippingAddr.city}, ${shippingAddr.province} - ${shippingAddr.postal_code}`
          : 'Address not provided'

        // Calculate estimated delivery (7 days from now)
        const estimatedDeliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        const orderConfirmation: OrderConfirmationType = {
          orderId: order.display_id?.toString() || order.id,
          orderDate: new Date(order.created_at).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          estimatedDelivery: estimatedDeliveryDate.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
          paymentMethod: order.payments?.[0]?.provider_id === 'stripe' ? 'Stripe' : 'Razorpay',
          totalPaid: Math.round((order.total || 0) / 100), // Convert from smallest unit
          currency: order.currency_code?.toUpperCase() || 'INR',
          email: order.email || order.customer?.email || '',
          phone: shippingAddr?.phone || '',
          shippingAddress,
        }

        setOrderData(orderConfirmation)
        setMedusaOrder(order) // Store full order for invoice

        // Fetch related products (from same categories as ordered products)
        // For now, set empty array - can enhance later
        const relatedProducts: RelatedProduct[] = []
        setRelatedProducts(relatedProducts)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching order:', error)
        setLoading(false)
      }
    }

    fetchOrderData()
  }, [orderId])

  const handleDownloadInvoice = () => {
    if (!orderData || !medusaOrder) return

    // Get customer name from shipping address
    const shippingAddr = medusaOrder.shipping_address
    const customerName = shippingAddr
      ? `${shippingAddr.first_name} ${shippingAddr.last_name}`.trim()
      : 'Customer'

    // Transform order items
    const items = (medusaOrder.items || []).map((item: any) => ({
      name: item.title || item.description || 'Product',
      quantity: item.quantity,
      price: Math.round((item.unit_price || 0) / 100),
      total: Math.round((item.total || 0) / 100),
    }))

    // Calculate breakdown
    const subtotal = Math.round((medusaOrder.subtotal || 0) / 100)
    const shippingFee = Math.round((medusaOrder.shipping_total || 0) / 100)
    const taxAmount = Math.round((medusaOrder.tax_total || 0) / 100)
    const grandTotal = Math.round((medusaOrder.total || 0) / 100)

    // For Indian orders, split tax into CGST/SGST or IGST
    const isIndia = medusaOrder.shipping_address?.country_code === 'IN'
    const cgst = isIndia ? Math.round(taxAmount / 2) : 0
    const sgst = isIndia ? Math.round(taxAmount / 2) : 0
    const igst = 0 // TODO: Check if inter-state order

    downloadInvoice({
      invoiceNumber: `INV-${orderData.orderId}`,
      orderNumber: orderData.orderId,
      orderDate: orderData.orderDate,
      customerName,
      customerEmail: orderData.email,
      customerPhone: orderData.phone,
      shippingAddress: orderData.shippingAddress,
      items,
      subtotal,
      shippingFee,
      codFee: 0, // TODO: Extract from order if COD
      couponDiscount: 0, // TODO: Extract from order discounts
      giftCardDiscount: 0, // TODO: Extract from order if gift card applied
      prepaidDiscount: 0, // TODO: Extract from order if prepaid discount applied
      taxableAmount: subtotal + shippingFee,
      cgst,
      sgst,
      igst,
      totalTax: taxAmount,
      grandTotal,
      currency: orderData.currency,
      paymentMethod: orderData.paymentMethod,
    })
  }

  const handleContinueShopping = () => {
    router.push('/')
  }

  const handleProductClick = (slug: string) => {
    router.push(`/product/${slug}`)
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

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#433b35] mb-4">Order not found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#013f47] text-white rounded-xl hover:opacity-90"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <OrderConfirmation
      confirmation={orderData}
      relatedProducts={relatedProducts}
      onDownloadInvoice={handleDownloadInvoice}
      onContinueShopping={handleContinueShopping}
      onProductClick={handleProductClick}
    />
  )
}
