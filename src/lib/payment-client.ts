/**
 * Client-side payment utilities
 */

import { loadStripe } from '@stripe/stripe-js'

// Load Stripe publishable key
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

declare global {
  interface Window {
    Razorpay: any
  }
}

export interface PaymentParams {
  amount: number
  currency: 'INR' | 'USD'
  orderId: string
  customerEmail: string
  customerPhone?: string
  customerName?: string
  medusaCartId: string
  giftCardCode?: string
  giftCardAmount?: number
}

export interface PaymentResult {
  success: boolean
  orderId?: string
  orderNumber?: string
  error?: string
}

/**
 * Process payment (Razorpay for INR, Stripe for USD)
 */
export async function processPayment(params: PaymentParams): Promise<PaymentResult> {
  if (params.currency === 'INR') {
    return processRazorpayPayment(params)
  } else if (params.currency === 'USD') {
    return processStripePayment(params)
  } else {
    return { success: false, error: 'Unsupported currency' }
  }
}

/**
 * Process Razorpay payment (India/INR)
 */
async function processRazorpayPayment(params: PaymentParams): Promise<PaymentResult> {
  try {
    // Create payment order
    const response = await fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        orderId: params.orderId,
        customerEmail: params.customerEmail,
        customerPhone: params.customerPhone,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error }
    }

    // Load Razorpay SDK if not loaded
    if (!window.Razorpay) {
      await loadRazorpayScript()
    }

    // Open Razorpay checkout
    return new Promise((resolve) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount * 100, // Amount in paise
        currency: data.currency,
        name: 'VastuCart',
        description: `Order ${params.orderId}`,
        order_id: data.paymentOrderId,
        prefill: {
          email: params.customerEmail,
          contact: params.customerPhone,
          name: params.customerName,
        },
        theme: {
          color: '#013f47',
        },
        handler: async (response: any) => {
          // Verify payment
          const verifyResponse = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'razorpay',
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              medusaCartId: params.medusaCartId,
              giftCardCode: params.giftCardCode,
              giftCardAmount: params.giftCardAmount,
            }),
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            resolve({
              success: true,
              orderId: verifyData.orderId,
              orderNumber: verifyData.orderNumber,
            })
          } else {
            resolve({ success: false, error: 'Payment verification failed' })
          }
        },
        modal: {
          ondismiss: () => {
            resolve({ success: false, error: 'Payment cancelled by user' })
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    })
  } catch (error: any) {
    console.error('Razorpay payment error:', error)
    return { success: false, error: error.message || 'Payment failed' }
  }
}

/**
 * Process Stripe payment (International/USD)
 */
async function processStripePayment(params: PaymentParams): Promise<PaymentResult> {
  try {
    const stripe = await stripePromise

    if (!stripe) {
      return { success: false, error: 'Stripe not initialized' }
    }

    // Create payment intent
    const response = await fetch('/api/payment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: params.amount,
        currency: params.currency,
        orderId: params.orderId,
        customerEmail: params.customerEmail,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, error: data.error }
    }

    // For now, redirect to Stripe Checkout
    // In production, you'd use Stripe Elements for embedded checkout
    const { error } = await stripe.confirmPayment({
      clientSecret: data.paymentOrderId,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // If we reach here, payment succeeded
    // Verify and complete order
    const verifyResponse = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'stripe',
        stripe_payment_intent_id: data.paymentOrderId,
        medusaCartId: params.medusaCartId,
        giftCardCode: params.giftCardCode,
        giftCardAmount: params.giftCardAmount,
      }),
    })

    const verifyData = await verifyResponse.json()

    return verifyData.success
      ? {
          success: true,
          orderId: verifyData.orderId,
          orderNumber: verifyData.orderNumber,
        }
      : { success: false, error: 'Payment verification failed' }
  } catch (error: any) {
    console.error('Stripe payment error:', error)
    return { success: false, error: error.message || 'Payment failed' }
  }
}

/**
 * Load Razorpay SDK script
 */
function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'))
    document.body.appendChild(script)
  })
}

/**
 * Process COD order (no payment, just create order)
 */
export async function processCODOrder(params: PaymentParams): Promise<PaymentResult> {
  try {
    // Complete Medusa cart directly (no payment)
    const response = await fetch('/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        provider: 'cod',
        medusaCartId: params.medusaCartId,
        giftCardCode: params.giftCardCode,
        giftCardAmount: params.giftCardAmount,
      }),
    })

    const data = await response.json()

    return data.success
      ? {
          success: true,
          orderId: data.orderId,
          orderNumber: data.orderNumber,
        }
      : { success: false, error: data.error || 'Order creation failed' }
  } catch (error: any) {
    console.error('COD order error:', error)
    return { success: false, error: error.message || 'Order creation failed' }
  }
}
