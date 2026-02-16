import { NextRequest, NextResponse } from 'next/server'
import { createRazorpayOrder, createStripePaymentIntent } from '@/lib/payment'

/**
 * POST /api/payment/create
 * Create a payment order (Razorpay or Stripe based on currency)
 */
export async function POST(request: NextRequest) {
  try {
    const { amount, currency, orderId, customerEmail, customerPhone } = await request.json()

    if (!amount || !currency || !orderId || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Route to appropriate payment provider based on currency
    let paymentOrder

    if (currency === 'INR') {
      // Use Razorpay for INR
      paymentOrder = await createRazorpayOrder({
        amount,
        currency,
        orderId,
        customerEmail,
        customerPhone,
      })
    } else if (currency === 'USD') {
      // Use Stripe for USD
      paymentOrder = await createStripePaymentIntent({
        amount,
        currency,
        orderId,
        customerEmail,
        customerPhone,
      })
    } else {
      return NextResponse.json(
        { error: 'Unsupported currency' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      ...paymentOrder,
    })
  } catch (error: any) {
    console.error('Error creating payment order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
