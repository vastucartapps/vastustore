/**
 * Payment utilities for Razorpay and Stripe integration
 */

import Razorpay from 'razorpay'
import Stripe from 'stripe'

// Razorpay instance (India/INR)
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || ''
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || ''

export const razorpay = razorpayKeyId && razorpayKeySecret
  ? new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    })
  : null

// Stripe instance (International/USD)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || ''

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2026-01-28.clover',
    })
  : null

// Payment method type
export type PaymentMethod = 'razorpay' | 'stripe' | 'cod'

export interface CreatePaymentOrderParams {
  amount: number
  currency: 'INR' | 'USD'
  orderId: string
  customerEmail: string
  customerPhone?: string
}

export interface PaymentOrderResponse {
  paymentOrderId: string
  amount: number
  currency: string
  provider: 'razorpay' | 'stripe'
}

/**
 * Create a Razorpay order
 */
export async function createRazorpayOrder(
  params: CreatePaymentOrderParams
): Promise<PaymentOrderResponse> {
  if (!razorpay) {
    throw new Error('Razorpay not configured')
  }

  // Amount in paise (smallest currency unit)
  const amountInPaise = Math.round(params.amount * 100)

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: params.currency,
    receipt: params.orderId,
    notes: {
      email: params.customerEmail,
      phone: params.customerPhone || '',
    },
  })

  return {
    paymentOrderId: order.id,
    amount: params.amount,
    currency: params.currency,
    provider: 'razorpay',
  }
}

/**
 * Create a Stripe Payment Intent
 */
export async function createStripePaymentIntent(
  params: CreatePaymentOrderParams
): Promise<PaymentOrderResponse> {
  if (!stripe) {
    throw new Error('Stripe not configured')
  }

  // Amount in cents (smallest currency unit)
  const amountInCents = Math.round(params.amount * 100)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: params.currency.toLowerCase(),
    receipt_email: params.customerEmail,
    metadata: {
      orderId: params.orderId,
    },
  })

  return {
    paymentOrderId: paymentIntent.id,
    amount: params.amount,
    currency: params.currency,
    provider: 'stripe',
  }
}

/**
 * Verify Razorpay payment signature
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!razorpay) return false

  const crypto = require('crypto')
  const text = `${orderId}|${paymentId}`
  const generated_signature = crypto
    .createHmac('sha256', razorpayKeySecret)
    .update(text)
    .digest('hex')

  return generated_signature === signature
}
