import { ArrowLeft, Download, ExternalLink, Check, X } from 'lucide-react'
import type { Order } from './types'

interface OrderDetailProps {
  order: Order
  onBack?: () => void
  onDownloadInvoice?: (orderId: string) => void
  onTrackOrder?: (orderId: string) => void
}

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradientAccent: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
}

export function OrderDetail({
  order,
  onBack,
  onDownloadInvoice,
  onTrackOrder,
}: OrderDetailProps) {
  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatLongDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Determine timeline step states
  const getStepState = (stepKey: string): 'completed' | 'active' | 'upcoming' | 'cancelled' => {
    const timelineStep = order.timeline.find(t => t.step === stepKey)

    if (order.status === 'cancelled' && stepKey === 'cancelled') return 'cancelled'
    if (timelineStep && timelineStep.date) return 'completed'

    // Active step logic
    if (order.status === 'processing' && stepKey === 'processing') return 'active'
    if (order.status === 'shipped' && stepKey === 'shipped') return 'active'
    if (order.status === 'in_transit' && stepKey === 'in_transit') return 'active'
    if (order.status === 'delivered' && stepKey === 'delivered') return 'active'
    if (order.status === 'returned' && stepKey === 'returned') return 'active'

    return 'upcoming'
  }

  const timelineSteps = [
    { key: 'placed', label: 'Order Placed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'in_transit', label: 'In Transit' },
    { key: 'delivered', label: 'Delivered' },
    ...(order.status === 'cancelled' ? [{ key: 'cancelled', label: 'Cancelled' }] : []),
    ...(order.status === 'returned' ? [{ key: 'returned', label: 'Returned' }] : []),
  ]

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 transition-all duration-200"
          style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = c.primary400
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = c.primary500
          }}
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Orders</span>
        </button>
        <h2
          className="text-3xl font-bold"
          style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
        >
          Order {order.orderNumber}
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-1">
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: c.bgCard,
              border: '1px solid #f0ebe4',
            }}
          >
            <h3
              className="text-lg font-bold mb-6"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              Order Status
            </h3>
            <div className="relative">
              {timelineSteps.map((step, idx) => {
                const state = getStepState(step.key)
                const timelineStep = order.timeline.find(t => t.step === step.key)
                const stepDate = timelineStep?.date || null
                const isLast = idx === timelineSteps.length - 1

                return (
                  <div key={step.key} className="relative flex gap-4">
                    {/* Timeline Line */}
                    {!isLast && (
                      <div
                        className="absolute left-[15px] top-[32px] w-0.5 h-[calc(100%+8px)]"
                        style={{
                          backgroundColor: state === 'completed' ? '#16a34a' : c.earth300,
                          borderStyle: state === 'upcoming' ? 'dashed' : 'solid',
                        }}
                      />
                    )}

                    {/* Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      {state === 'completed' && (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#16a34a' }}
                        >
                          <Check size={16} style={{ color: '#ffffff' }} />
                        </div>
                      )}
                      {state === 'active' && (
                        <div className="relative">
                          <div
                            className="absolute inset-0 rounded-full animate-ping"
                            style={{ backgroundColor: c.primary500, opacity: 0.4 }}
                          />
                          <div
                            className="relative w-8 h-8 rounded-full"
                            style={{ backgroundColor: c.primary500 }}
                          />
                        </div>
                      )}
                      {state === 'upcoming' && (
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: c.earth300 }}
                        />
                      )}
                      {state === 'cancelled' && (
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#ef4444' }}
                        >
                          <X size={16} style={{ color: '#ffffff' }} />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-8 flex-grow">
                      <p
                        className="font-bold text-sm mb-1"
                        style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {step.label}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {formatDate(stepDate)}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Info + Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Info Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: c.bgCard,
              border: '1px solid #f0ebe4',
            }}
          >
            <div className="h-1" style={{ background: c.gradientAccent }} />
            <div className="p-6">
              <h3
                className="text-lg font-bold mb-4"
                style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
              >
                Order Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Order Date
                  </p>
                  <p
                    className="font-medium"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {formatLongDate(order.orderDate)}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Payment Method
                  </p>
                  <p
                    className="font-medium"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {order.paymentMethod}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Shipping Address
                  </p>
                  <p
                    className="font-medium"
                    style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {order.shippingAddress}
                  </p>
                </div>
                {order.estimatedDelivery && (
                  <div>
                    <p
                      className="text-xs mb-1"
                      style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Estimated Delivery
                    </p>
                    <p
                      className="font-medium"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {formatLongDate(order.estimatedDelivery)}
                    </p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="sm:col-span-2">
                    <p
                      className="text-xs mb-1"
                      style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Tracking Number
                    </p>
                    {order.trackingUrl ? (
                      <a
                        href={order.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium inline-flex items-center gap-1 transition-all duration-200"
                        style={{
                          color: c.primary500,
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = c.primary400
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = c.primary500
                        }}
                      >
                        {order.trackingNumber}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <p
                        className="font-medium"
                        style={{
                          color: c.earth700,
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        {order.trackingNumber}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div
            className="rounded-2xl p-6"
            style={{
              backgroundColor: c.bgCard,
              border: '1px solid #f0ebe4',
            }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p
                      className="font-medium mb-1"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {item.productName}
                    </p>
                    {item.variantLabel && (
                      <p
                        className="text-sm mb-1"
                        style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        {item.variantLabel}
                      </p>
                    )}
                    <p
                      className="text-sm"
                      style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p
                    className="font-bold"
                    style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                  >
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: '#f0ebe4' }}>
                <p
                  className="text-lg font-bold"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  Total
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  {formatPrice(order.total)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onDownloadInvoice?.(order.id)}
              className="px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200"
              style={{
                backgroundColor: c.primary500,
                color: '#ffffff',
                fontFamily: "'Open Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = c.primary400
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = c.primary500
              }}
            >
              <Download size={18} />
              Download Invoice
            </button>
            {order.trackingUrl && (
              <button
                onClick={() => onTrackOrder?.(order.id)}
                className="px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-200"
                style={{
                  backgroundColor: c.bgPrimary,
                  color: c.earth700,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = c.primary50
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = c.bgPrimary
                }}
              >
                <ExternalLink size={18} />
                Track Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
