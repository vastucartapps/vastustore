/** Announcement ribbon schedule */
export interface AnnouncementSchedule {
  startDate: string
  endDate: string
}

/** Announcement ribbon configuration */
export interface Announcement {
  message: string
  linkText: string
  linkUrl: string
  bgColor: string
  textColor: string
  isActive: boolean
  schedule: AnnouncementSchedule
}

/** Store branding settings */
export interface Branding {
  storeName: string
  tagline: string
  contactEmail: string
  contactPhone: string
  address: string
  logoUrl: string
  faviconUrl: string
}

/** Homepage section item */
export interface HomepageSection {
  id: string
  name: string
  type: string
  enabled: boolean
  order: number
}

/** Content page */
export interface ContentPage {
  id: string
  title: string
  slug: string
  lastUpdated: string
  isPublished: boolean
  excerpt: string
}

/** Footer link */
export interface FooterLink {
  label: string
  url: string
}

/** Footer column */
export interface FooterColumn {
  title: string
  links: FooterLink[]
}

/** Footer configuration */
export interface FooterConfig {
  columns: FooterColumn[]
  copyrightText: string
  showSocialLinks: boolean
}

/** Root props for AdminStorefront component */
export interface AdminStorefrontProps {
  announcement: Announcement
  branding: Branding
  homepageSections: HomepageSection[]
  contentPages: ContentPage[]
  footerConfig: FooterConfig
  onUpdateAnnouncement: (a: Announcement) => void
  onUpdateBranding: (b: Branding) => void
  onReorderSection: (id: string, direction: 'up' | 'down') => void
  onToggleSection: (id: string, enabled: boolean) => void
  onEditPage: (id: string, content: string) => void
  onTogglePagePublish: (id: string, published: boolean) => void
  onUpdateFooter: (f: FooterConfig) => void
}
