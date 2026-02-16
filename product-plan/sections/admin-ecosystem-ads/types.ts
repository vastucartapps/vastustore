export type AdTab = 'banners' | 'placements' | 'analytics' | 'social'
export type BannerStatus = 'draft' | 'scheduled' | 'live' | 'expired'
export type AspectRatio = '1:1' | '16:9' | '9:16' | '16:3' | '4:3' | '2:3'
export type SocialPlatform = 'pinterest' | 'instagram' | 'facebook' | 'twitter' | 'threads'

export interface BannerCreative {
  ratio: AspectRatio
  imageUrl: string
  width: number
  height: number
}

export interface Banner {
  id: string
  name: string
  headline: string
  ctaText: string
  ctaUrl: string
  status: BannerStatus
  isActive: boolean
  startDate: string
  endDate: string
  priority: number
  productIds: string[]
  productNames: string[]
  creatives: BannerCreative[]
  placements: string[]
  impressions: number
  clicks: number
  createdAt: string
}

export interface PlacementSlot {
  id: string
  name: string
  ratio: AspectRatio
  isActive: boolean
  currentBannerId: string | null
  currentBannerName: string | null
}

export interface EcosystemSite {
  id: string
  subdomain: string
  displayName: string
  isActive: boolean
  slots: PlacementSlot[]
}

export interface BannerAnalytics {
  bannerId: string
  bannerName: string
  site: string
  impressions: number
  clicks: number
  ctr: number
  period: string
}

export interface AnalyticsSummary {
  totalImpressions: number
  totalClicks: number
  avgCtr: number
  activeBanners: number
}

export interface SocialAccount {
  platform: SocialPlatform
  isConnected: boolean
  username: string
  displayName: string
  preferredRatio: AspectRatio
}

export interface SocialPostMeta {
  title: string
  headline: string
  description: string
  linkUrl: string
  ctaText: string
  hashtags: string
  altText: string
}

export interface SocialPost {
  id: string
  bannerId: string
  bannerName: string
  platform: SocialPlatform
  postUrl: string
  status: 'published' | 'pending' | 'failed'
  publishedAt: string
  caption: string
  meta: SocialPostMeta
}

export interface AdminEcosystemAdsProps {
  activeTab: AdTab
  banners: Banner[]
  sites: EcosystemSite[]
  analytics: BannerAnalytics[]
  analyticsSummary: AnalyticsSummary
  socialAccounts: SocialAccount[]
  socialPosts: SocialPost[]

  onChangeTab?: (tab: AdTab) => void
  onCreateBanner?: (banner: Omit<Banner, 'id' | 'impressions' | 'clicks' | 'createdAt'>) => void
  onEditBanner?: (id: string, updates: Partial<Banner>) => void
  onDeleteBanner?: (id: string) => void
  onToggleBanner?: (id: string) => void
  onAssignPlacement?: (slotId: string, bannerId: string) => void
  onRemovePlacement?: (slotId: string) => void
  onToggleSite?: (siteId: string) => void
  onConnectSocial?: (platform: SocialPlatform) => void
  onDisconnectSocial?: (platform: SocialPlatform) => void
  onPublishToSocial?: (bannerId: string, platform: SocialPlatform, caption: string) => void
}
