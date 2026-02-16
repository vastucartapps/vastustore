"use client"

import { useRouter } from 'next/navigation'
import { useState, useMemo, useEffect } from 'react'
import { useCartStore, useAuthStore } from '@/lib/store'
import { medusa } from '@/lib/medusa'
import { Checkout } from '@/components/storefront'
import { transformToComponentCartItem, calculateSubtotal, calculateTotalSavings, getDefaultCurrency } from '@/lib/cart-utils'
import type {
  OrderSummary,
  CheckoutStep,
  Address,
  ShippingMethod,
  CodConfig,
  PrepaidDiscount,
  AppliedCoupon,
  GiftCardBalance,
  ContactInfo,
} from '@/components/storefront/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { items: storeItems, medusaCartId } = useCartStore()
  const { user } = useAuthStore()

  // Redirect to cart if empty
  useEffect(() => {
    if (storeItems.length === 0) {
      router.push('/cart')
    }
  }, [storeItems, router])

  // Step management
  const [currentStepId, setCurrentStepId] = useState<'contact' | 'address' | 'shipping' | 'payment'>('contact')
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  // Contact info
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)

  // Address management
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([])

  // Shipping
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(null)
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Delivery in 5-7 business days',
      price: 99,
      currency: 'INR',
      estimatedDays: '5-7 days',
      isFree: false,
      freeAbove: 999,
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Delivery in 2-3 business days',
      price: 199,
      currency: 'INR',
      estimatedDays: '2-3 days',
      isFree: false,
      freeAbove: null,
    },
  ])

  // Payment
  const [codEnabled, setCodEnabled] = useState(false)

  // Config from Supabase
  const [codConfigData, setCodConfigData] = useState<any>(null)
  const [prepaidDiscountData, setPrepaidDiscountData] = useState<any>(null)

  // Coupons & gift cards (from cart, passed through)
  const [appliedCoupon] = useState<AppliedCoupon | null>(null)
  const [giftCardBalance] = useState<GiftCardBalance | null>(null)

  // Fetch payment configs
  useEffect(() => {
    async function fetchConfigs() {
      try {
        const [codRes, prepaidRes] = await Promise.all([
          fetch('/api/config/cod'),
          fetch('/api/config/prepaid-discount'),
        ])

        if (codRes.ok) {
          const data = await codRes.json()
          setCodConfigData(data.config)
        }

        if (prepaidRes.ok) {
          const data = await prepaidRes.json()
          setPrepaidDiscountData(data.config)
        }
      } catch (error) {
        console.error('Error fetching payment configs:', error)
      }
    }

    fetchConfigs()
  }, [])

  const componentItems = storeItems.map(item => transformToComponentCartItem(item))
  const currency = getDefaultCurrency()

  // Calculate order summary
  const orderSummary: OrderSummary = useMemo(() => {
    const subtotal = calculateSubtotal(storeItems)
    const mrpTotal = componentItems.reduce((total, item) => total + item.mrp * item.quantity, 0)
    const totalSavings = calculateTotalSavings(componentItems)
    const couponDiscount = appliedCoupon?.discountAmount || 0
    const giftCardApplied = giftCardBalance?.appliedAmount || 0

    // Shipping fee
    const selectedShipping = shippingMethods.find(m => m.id === selectedShippingId)
    let shippingFee = selectedShipping?.price || 0
    if (selectedShipping?.isFree || (selectedShipping?.freeAbove && subtotal >= selectedShipping.freeAbove)) {
      shippingFee = 0
    }

    // COD fee (from config)
    const codFee = codEnabled ? (codConfigData?.fee || 50) : 0

    // Prepaid discount (from config)
    let prepaidDiscountAmount = 0
    if (!codEnabled && prepaidDiscountData?.is_enabled) {
      const minOrderValue = prepaidDiscountData.min_order_value || 0
      if (subtotal >= minOrderValue) {
        const percentage = prepaidDiscountData.discount_percentage || 0
        const maxDiscount = prepaidDiscountData.max_discount_amount || 0
        prepaidDiscountAmount = Math.min(Math.round(subtotal * (percentage / 100)), maxDiscount)
      }
    }

    // Tax (18% GST)
    const taxableAmount = subtotal + shippingFee + codFee - prepaidDiscountAmount
    const taxAmount = Math.round(taxableAmount * 0.18)

    const grandTotal = Math.max(
      0,
      subtotal - couponDiscount - giftCardApplied + shippingFee + codFee - prepaidDiscountAmount + taxAmount
    )

    return {
      subtotal,
      mrpTotal,
      totalSavings,
      couponDiscount,
      giftCardApplied,
      prepaidDiscount: prepaidDiscountAmount,
      shippingFee,
      codFee,
      taxAmount,
      grandTotal,
      currency,
      itemCount: storeItems.length,
    }
  }, [
    storeItems,
    componentItems,
    appliedCoupon,
    giftCardBalance,
    selectedShippingId,
    shippingMethods,
    codEnabled,
    codConfigData,
    prepaidDiscountData,
    currency,
  ])

  // Checkout steps
  const checkoutSteps: CheckoutStep[] = useMemo(() => {
    return [
      {
        id: 'contact',
        label: 'Contact',
        status: completedSteps.has('contact')
          ? 'completed'
          : currentStepId === 'contact'
          ? 'active'
          : 'upcoming',
      },
      {
        id: 'address',
        label: 'Address',
        status: completedSteps.has('address')
          ? 'completed'
          : currentStepId === 'address'
          ? 'active'
          : 'upcoming',
      },
      {
        id: 'shipping',
        label: 'Shipping',
        status: completedSteps.has('shipping')
          ? 'completed'
          : currentStepId === 'shipping'
          ? 'active'
          : 'upcoming',
      },
      {
        id: 'payment',
        label: 'Payment',
        status: currentStepId === 'payment' ? 'active' : 'upcoming',
      },
    ]
  }, [currentStepId, completedSteps])

  // COD config (India only, logged-in users only)
  const codConfig: CodConfig = useMemo(() => {
    if (!codConfigData) {
      // Default fallback
      return {
        available: false,
        fee: 50,
        currency: 'INR',
        minOrder: 500,
        maxOrder: 50000,
        label: 'Cash on Delivery',
        feeLabel: 'COD Charges',
      }
    }

    const isCountryAvailable = codConfigData.available_for_countries?.includes('IN')
    const isUserEligible = codConfigData.requires_authentication ? user !== null : true
    const isRegionEligible = contactInfo?.isIndian === true

    return {
      available: codConfigData.is_enabled && isCountryAvailable && isUserEligible && isRegionEligible,
      fee: codConfigData.fee,
      currency: codConfigData.currency,
      minOrder: codConfigData.min_order_value,
      maxOrder: codConfigData.max_order_value,
      label: codConfigData.label,
      feeLabel: codConfigData.fee_label,
    }
  }, [codConfigData, user, contactInfo])

  const prepaidDiscount: PrepaidDiscount = useMemo(() => {
    if (!prepaidDiscountData) {
      // Default fallback
      return {
        enabled: true,
        percentage: 5,
        maxDiscount: 500,
        label: 'Save 5% on prepaid orders',
      }
    }

    return {
      enabled: prepaidDiscountData.is_enabled,
      percentage: prepaidDiscountData.discount_percentage,
      maxDiscount: prepaidDiscountData.max_discount_amount,
      label: prepaidDiscountData.label,
    }
  }, [prepaidDiscountData])

  // Handlers
  const handleSubmitContact = async (email: string, phone: string, countryCode: string) => {
    const isIndian = countryCode === '+91'
    setContactInfo({ email, phone, countryCode, isIndian })

    // Save email to Medusa cart for abandoned cart recovery
    if (medusaCartId) {
      try {
        await medusa.store.cart.update(medusaCartId, {
          email,
        })
      } catch (error) {
        console.error('Error updating cart with email:', error)
        // Don't block checkout if this fails
      }
    }

    setCompletedSteps(prev => new Set(prev).add('contact'))
    setCurrentStepId('address')
  }

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId)
  }

  const handleAddAddress = async (address: Omit<Address, 'id' | 'isDefault'>) => {
    const newAddress: Address = {
      ...address,
      id: `addr_${Date.now()}`,
      isDefault: savedAddresses.length === 0,
    }

    // Save address to Medusa cart
    if (medusaCartId) {
      try {
        await medusa.store.cart.update(medusaCartId, {
          shipping_address: {
            first_name: newAddress.name.split(' ')[0] || newAddress.name,
            last_name: newAddress.name.split(' ').slice(1).join(' ') || '',
            address_1: newAddress.street,
            address_2: '',
            city: newAddress.city,
            province: newAddress.state,
            postal_code: newAddress.pincode,
            country_code: newAddress.country === 'India' ? 'IN' : 'US',
            phone: newAddress.phone,
          },
          // Use same address for billing by default
          billing_address: {
            first_name: newAddress.name.split(' ')[0] || newAddress.name,
            last_name: newAddress.name.split(' ').slice(1).join(' ') || '',
            address_1: newAddress.street,
            address_2: '',
            city: newAddress.city,
            province: newAddress.state,
            postal_code: newAddress.pincode,
            country_code: newAddress.country === 'India' ? 'IN' : 'US',
            phone: newAddress.phone,
          },
        })
      } catch (error) {
        console.error('Error updating cart with address:', error)
        // Don't block checkout if this fails
      }
    }

    setSavedAddresses(prev => [...prev, newAddress])
    setSelectedAddressId(newAddress.id)
    setCompletedSteps(prev => new Set(prev).add('address'))
    setCurrentStepId('shipping')
  }

  const handleSelectShipping = (methodId: string) => {
    setSelectedShippingId(methodId)
    setCompletedSteps(prev => new Set(prev).add('shipping'))
    setCurrentStepId('payment')
  }

  const handleToggleCod = (enabled: boolean) => {
    setCodEnabled(enabled)
  }

  const handlePlaceOrder = async () => {
    if (!contactInfo || !selectedAddressId || !selectedShippingId) {
      alert('Please complete all steps before placing order')
      return
    }

    try {
      const selectedAddress = savedAddresses.find(a => a.id === selectedAddressId)

      // Ensure we have a Medusa cart ID
      if (!medusaCartId) {
        alert('Cart session expired. Please refresh and try again.')
        return
      }

      // Prepare payment params
      const paymentParams = {
        amount: orderSummary.grandTotal,
        currency,
        orderId: `order_${Date.now()}`, // Temporary ID for payment gateway
        customerEmail: contactInfo.email,
        customerPhone: contactInfo.phone,
        customerName: selectedAddress?.name || 'Customer',
        medusaCartId, // Real Medusa cart ID from store
        giftCardCode: giftCardBalance?.code,
        giftCardAmount: giftCardBalance?.appliedAmount,
      }

      let result

      if (codEnabled) {
        // COD order - no payment gateway
        const { processCODOrder } = await import('@/lib/payment-client')
        result = await processCODOrder(paymentParams)
      } else {
        // Online payment - Razorpay or Stripe
        const { processPayment } = await import('@/lib/payment-client')
        result = await processPayment(paymentParams)
      }

      if (result.success) {
        // Redirect to order confirmation
        router.push(`/order-confirmation/${result.orderId}`)
      } else {
        alert(result.error || 'Payment failed. Please try again.')
      }
    } catch (error: any) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    }
  }

  const handleBack = () => {
    const steps: Array<'contact' | 'address' | 'shipping' | 'payment'> = [
      'contact',
      'address',
      'shipping',
      'payment',
    ]
    const currentIndex = steps.indexOf(currentStepId)
    if (currentIndex > 0) {
      setCurrentStepId(steps[currentIndex - 1])
    }
  }

  const handleGoToStep = (stepId: string) => {
    if (completedSteps.has(stepId) || stepId === currentStepId) {
      setCurrentStepId(stepId as 'contact' | 'address' | 'shipping' | 'payment')
    }
  }

  if (storeItems.length === 0) {
    return null // Will redirect
  }

  return (
    <Checkout
      items={componentItems}
      orderSummary={orderSummary}
      checkoutSteps={checkoutSteps}
      savedAddresses={savedAddresses}
      shippingMethods={shippingMethods}
      codConfig={codConfig}
      prepaidDiscount={prepaidDiscount}
      appliedCoupon={appliedCoupon}
      giftCardBalance={giftCardBalance}
      contactInfo={contactInfo}
      onSubmitContact={handleSubmitContact}
      onSelectAddress={handleSelectAddress}
      onAddAddress={handleAddAddress}
      onSelectShipping={handleSelectShipping}
      onToggleCod={handleToggleCod}
      onPlaceOrder={handlePlaceOrder}
      onBack={handleBack}
      onGoToStep={handleGoToStep}
    />
  )
}
