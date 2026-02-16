import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpaySignature } from '@/lib/payment'
import { medusa } from '@/lib/medusa'

/**
 * POST /api/payment/verify
 * Verify payment and complete order
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      provider,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      stripe_payment_intent_id,
      medusaCartId,
      giftCardCode,
      giftCardAmount,
    } = body

    let paymentVerified = false

    // Verify payment based on provider
    if (provider === 'razorpay') {
      paymentVerified = verifyRazorpaySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      )
    } else if (provider === 'stripe') {
      // For Stripe, verification happens via webhooks
      // Here we just check if payment intent ID is provided
      paymentVerified = !!stripe_payment_intent_id
    } else if (provider === 'cod') {
      // COD - no payment verification needed
      paymentVerified = true
    }

    if (!paymentVerified) {
      return NextResponse.json(
        { success: false, error: 'Payment verification failed' },
        { status: 400 }
      )
    }

    // Complete Medusa cart to create order
    const { order } = await medusa.store.cart.complete(medusaCartId)

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Apply gift card if provided
    if (giftCardCode && giftCardAmount) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/gift-cards/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code: giftCardCode,
            amount: giftCardAmount,
            orderId: order.id,
          }),
        })
      } catch (error) {
        console.error('Error applying gift card:', error)
        // Don't fail the order if gift card fails
      }
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.display_id,
    })
  } catch (error: any) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: error.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}
