export type PaymentMode = 'test' | 'live'

export interface GatewayConfig {
  razorpay: { keyId: string; keySecret: string; isConnected: boolean }
  stripe: { publishableKey: string; secretKey: string; isConnected: boolean }
}

export interface PaymentMethodToggle {
  id: string
  name: string
  icon: string
  enabled: boolean
  description: string
}

export type TaxTab = 'gst' | 'international' | 'per-product'

export interface GSTConfig {
  gstin: string
  defaultRate: number
  defaultHSN: string
}

export interface InternationalTaxConfig {
  taxExempt: boolean
  lutNumber: string
}

export interface ProductTaxOverride {
  productId: string
  productName: string
  sku: string
  gstRate: number
  hsnCode: string
}

export interface AdminPaymentsTaxProps {
  mode: PaymentMode
  gateways: GatewayConfig
  paymentMethods: PaymentMethodToggle[]
  gstConfig: GSTConfig
  internationalTax: InternationalTaxConfig
  productOverrides: ProductTaxOverride[]
  activeTaxTab: TaxTab

  onToggleMode?: (mode: PaymentMode) => void
  onSaveGateways?: (gateways: GatewayConfig) => void
  onTestConnection?: (gateway: 'razorpay' | 'stripe') => void
  onTogglePaymentMethod?: (methodId: string) => void
  onChangeTaxTab?: (tab: TaxTab) => void
  onSaveGST?: (config: GSTConfig) => void
  onSaveInternationalTax?: (config: InternationalTaxConfig) => void
  onSaveProductOverride?: (override: ProductTaxOverride) => void
}
