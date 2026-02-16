/** Status of an integration connection */
export type IntegrationStatus = 'active' | 'error' | 'inactive'

/** Tab within the Integrations & SEO section */
export type IntegrationTab = 'integrations' | 'seo'

/** A third-party integration */
export interface Integration {
  id: string
  name: string
  icon: string
  description: string
  isConnected: boolean
  status: IntegrationStatus
  configFields: Record<string, string>
  lastSynced: string | null
}

/** Site-wide SEO defaults */
export interface SEODefaults {
  siteTitleTemplate: string
  metaDescription: string
  robotsTxt: string
  sitemapEnabled: boolean
  sitemapLastGenerated: string
}

/** Open Graph and social card defaults */
export interface OpenGraphDefaults {
  defaultImage: string
  defaultTitle: string
  defaultDescription: string
  twitterHandle: string
}

/** A marketing/performance tag */
export interface MarketingTag {
  id: string
  name: string
  platform: string
  pixelId: string
  isActive: boolean
}

/** Props for the AdminIntegrations component */
export interface AdminIntegrationsProps {
  activeTab: IntegrationTab
  integrations: Integration[]
  seoDefaults: SEODefaults
  openGraph: OpenGraphDefaults
  marketingTags: MarketingTag[]
  onChangeTab?: (tab: IntegrationTab) => void
  onToggleConnection?: (integrationId: string) => void
  onTestConnection?: (integrationId: string) => void
  onSaveIntegrationConfig?: (integrationId: string, fields: Record<string, string>) => void
  onSaveSEO?: (seo: SEODefaults) => void
  onSaveOpenGraph?: (og: OpenGraphDefaults) => void
  onToggleTag?: (tagId: string) => void
  onAddTag?: (tag: Omit<MarketingTag, 'id'>) => void
  onRemoveTag?: (tagId: string) => void
}
