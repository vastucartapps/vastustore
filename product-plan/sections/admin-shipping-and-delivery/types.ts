/** Shipping zone */
export interface ShippingZone {
  id: string
  name: string
  rate: number
  currency: 'INR' | 'USD'
  isEnabled: boolean
}

/** Free shipping config */
export interface FreeShippingConfig {
  enabled: boolean
  thresholdINR: number
  thresholdUSD: number
}

/** COD config */
export interface CODConfig {
  enabled: boolean
  fee: number
  minOrder: number
  maxOrder: number
}

/** Delivery estimate rule */
export interface DeliveryEstimate {
  id: string
  region: string
  pincodePrefix: string
  minDays: number
  maxDays: number
}

/** Props for the Admin Shipping & Delivery section */
export interface AdminShippingProps {
  zones: ShippingZone[]
  freeShipping: FreeShippingConfig
  cod: CODConfig
  deliveryEstimates: DeliveryEstimate[]
  shippingPolicy: string

  onSaveZones?: (zones: ShippingZone[]) => void
  onSaveFreeShipping?: (config: FreeShippingConfig) => void
  onSaveCOD?: (config: CODConfig) => void
  onSaveDeliveryEstimates?: (estimates: DeliveryEstimate[]) => void
  onSaveShippingPolicy?: (content: string) => void
}
