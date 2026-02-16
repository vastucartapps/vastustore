import { useState } from 'react'
import {
  Image,
  Layout,
  BarChart3,
  Share2,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Globe,
  MousePointerClick,
  TrendingUp,
  Zap,
  RefreshCw,
  Link2,
  Upload,
  Send,
} from 'lucide-react'
import type {
  AdminEcosystemAdsProps,
  AdTab,
  Banner,
  BannerStatus,
  AspectRatio,
  EcosystemSite,
  PlacementSlot,
  BannerAnalytics,
  SocialAccount,
  SocialPost,
  SocialPlatform,
} from '../types'

const c = {
  primary500: '#013f47', primary400: '#2a7a72', primary200: '#71c1ae',
  primary100: '#c5e8e2', primary50: '#e8f5f3',
  secondary500: '#c85103', secondary300: '#fd8630', secondary50: '#fff5ed',
  bg: '#fffbf5', card: '#ffffff', subtle: '#f5dfbb',
  earth300: '#a39585', earth400: '#75615a', earth500: '#71685b', earth600: '#5a4f47', earth700: '#433b35',
  success: '#10B981', successLight: '#D1FAE5',
  warning: '#F59E0B', warningLight: '#FEF3C7',
  error: '#EF4444', errorLight: '#FEE2E2',
  info: '#2a7a72', infoLight: '#e8f5f3',
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
}
const fonts = { heading: "'Lora', serif", body: "'Open Sans', sans-serif", mono: "'IBM Plex Mono', monospace" }

const tabItems: { id: AdTab; label: string; icon: typeof Image }[] = [
  { id: 'banners', label: 'Banners', icon: Image },
  { id: 'placements', label: 'Placements', icon: Layout },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'social', label: 'Social Publishing', icon: Share2 },
]

const statusColors: Record<BannerStatus, { bg: string; text: string }> = {
  draft: { bg: '#f3f4f6', text: c.earth600 },
  scheduled: { bg: c.infoLight, text: c.info },
  live: { bg: c.successLight, text: c.success },
  expired: { bg: c.errorLight, text: c.error },
}

const ratioLabels: Record<AspectRatio, { label: string; px: string }> = {
  '1:1': { label: 'Square', px: '1080×1080' },
  '16:9': { label: 'Landscape', px: '1920×1080' },
  '9:16': { label: 'Portrait', px: '1080×1920' },
  '16:3': { label: 'Strip', px: '1920×360' },
  '4:3': { label: 'Content', px: '1200×900' },
  '2:3': { label: 'Pinterest', px: '1000×1500' },
}

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle?: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0"
      style={{ backgroundColor: enabled ? c.success : c.earth300 }}
    >
      <span
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform"
        style={{ transform: enabled ? 'translateX(24px)' : 'translateX(4px)' }}
      />
    </button>
  )
}

/* ─── BANNERS TAB ─── */

function BannerCard({
  banner,
  onToggle,
  onEdit,
  onDelete,
}: {
  banner: Banner
  onToggle?: () => void
  onEdit?: () => void
  onDelete?: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const sc = statusColors[banner.status]
  const ctr = banner.impressions > 0 ? ((banner.clicks / banner.impressions) * 100).toFixed(1) : '0.0'

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
        boxShadow: c.shadow,
        borderTop: '4px solid transparent',
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold text-base">
                {banner.name}
              </h4>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                style={{ backgroundColor: sc.bg, color: sc.text }}
              >
                {banner.status}
              </span>
            </div>
            <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm">
              {banner.headline}
            </p>
          </div>
          <ToggleSwitch enabled={banner.isActive} onToggle={onToggle} />
        </div>

        {/* Creative ratio badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {banner.creatives.map((cr) => (
            <span
              key={cr.ratio}
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}
            >
              {cr.ratio}
            </span>
          ))}
          {(['1:1', '16:9', '9:16', '16:3', '4:3', '2:3'] as AspectRatio[])
            .filter((r) => !banner.creatives.find((cr) => cr.ratio === r))
            .map((r) => (
              <span
                key={r}
                className="text-xs px-2 py-1 rounded"
                style={{ backgroundColor: '#f3f4f6', color: c.earth400, fontFamily: fonts.mono, textDecoration: 'line-through' }}
              >
                {r}
              </span>
            ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <span style={{ color: c.earth500, fontFamily: fonts.mono }} className="text-xs flex items-center gap-1">
            <Eye size={12} /> {banner.impressions.toLocaleString()} impr
          </span>
          <span style={{ color: c.earth500, fontFamily: fonts.mono }} className="text-xs flex items-center gap-1">
            <MousePointerClick size={12} /> {banner.clicks.toLocaleString()} clicks
          </span>
          <span style={{ color: c.primary500, fontFamily: fonts.mono }} className="text-xs font-medium">
            {ctr}% CTR
          </span>
        </div>

        {/* Schedule */}
        <p style={{ color: c.earth400, fontFamily: fonts.mono }} className="text-xs mb-3">
          {banner.startDate} — {banner.endDate}
        </p>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs flex items-center gap-1 mb-2"
          style={{ color: c.primary500, fontFamily: fonts.body }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Less details' : 'More details'}
        </button>

        {expanded && (
          <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${c.earth300}` }}>
            {/* Products */}
            {banner.productNames.length > 0 && (
              <div className="mb-3">
                <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-xs font-medium mb-1">
                  Linked Products
                </p>
                <div className="flex flex-wrap gap-1">
                  {banner.productNames.map((name) => (
                    <span key={name} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: c.secondary50, color: c.secondary500 }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Placements */}
            <div className="mb-3">
              <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-xs font-medium mb-1">
                Active Placements
              </p>
              {banner.placements.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {banner.placements.map((p) => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}>
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <p style={{ color: c.earth400, fontFamily: fonts.body }} className="text-xs italic">No placements assigned</p>
              )}
            </div>

            {/* CTA */}
            <div className="mb-3">
              <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-xs font-medium mb-1">CTA</p>
              <p style={{ color: c.earth500, fontFamily: fonts.mono }} className="text-xs">
                "{banner.ctaText}" → {banner.ctaUrl}
              </p>
            </div>

            {/* Creative previews */}
            <div>
              <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-xs font-medium mb-2">Creatives</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {banner.creatives.map((cr) => {
                  const aspect = cr.width / cr.height
                  return (
                    <div key={cr.ratio} className="text-center">
                      <div
                        className="rounded border flex items-center justify-center mx-auto mb-1"
                        style={{
                          borderColor: c.earth300,
                          backgroundColor: c.bg,
                          width: '100%',
                          maxWidth: 80,
                          aspectRatio: String(aspect),
                        }}
                      >
                        <Image size={16} style={{ color: c.earth400 }} />
                      </div>
                      <span style={{ color: c.earth500, fontFamily: fonts.mono }} className="text-[10px]">{cr.ratio}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: `1px solid ${c.earth300}` }}>
          <button
            onClick={onEdit}
            className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            style={{ backgroundColor: c.primary50, color: c.primary500, border: `1px solid ${c.primary200}` }}
          >
            <Edit2 size={14} />Edit
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5"
            style={{ backgroundColor: c.errorLight, color: c.error }}
          >
            <Trash2 size={14} />Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function BannersTab({
  banners,
  onToggle,
  onEdit,
  onDelete,
  onCreate,
}: {
  banners: Banner[]
  onToggle?: (id: string) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onCreate?: () => void
}) {
  const [filter, setFilter] = useState<BannerStatus | 'all'>('all')
  const filtered = filter === 'all' ? banners : banners.filter((b) => b.status === filter)
  const statuses: (BannerStatus | 'all')[] = ['all', 'live', 'scheduled', 'draft', 'expired']

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => {
            const count = s === 'all' ? banners.length : banners.filter((b) => b.status === s).length
            const isActive = filter === s
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className="px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-all"
                style={{
                  backgroundColor: isActive ? c.primary500 : c.bg,
                  color: isActive ? c.card : c.earth500,
                  border: `1px solid ${isActive ? c.primary500 : c.earth300}`,
                }}
              >
                {s} ({count})
              </button>
            )
          })}
        </div>
        <button
          onClick={onCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5"
          style={{ backgroundColor: c.primary500, color: c.card }}
        >
          <Plus size={16} />New Banner
        </button>
      </div>

      {/* Banner grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((banner) => (
          <BannerCard
            key={banner.id}
            banner={banner}
            onToggle={() => onToggle?.(banner.id)}
            onEdit={() => onEdit?.(banner.id, {})}
            onDelete={() => onDelete?.(banner.id)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Image size={48} style={{ color: c.earth300 }} className="mx-auto mb-3" />
          <p style={{ color: c.earth500, fontFamily: fonts.body }}>No banners found</p>
        </div>
      )}
    </div>
  )
}

/* ─── PLACEMENTS TAB ─── */

function SiteCard({
  site,
  banners,
  onToggleSite,
  onAssign,
  onRemove,
}: {
  site: EcosystemSite
  banners: Banner[]
  onToggleSite?: () => void
  onAssign?: (slotId: string, bannerId: string) => void
  onRemove?: (slotId: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const activeSlots = site.slots.filter((s) => s.currentBannerId).length

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
        boxShadow: c.shadow,
        borderTop: '4px solid transparent',
      }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Globe size={18} style={{ color: c.primary500 }} />
            <div>
              <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold">
                {site.displayName}
              </h4>
              <p style={{ color: c.primary500, fontFamily: fonts.mono }} className="text-xs">
                {site.subdomain}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: c.earth500, fontFamily: fonts.mono }} className="text-xs">
              {activeSlots}/{site.slots.length} slots filled
            </span>
            <ToggleSwitch enabled={site.isActive} onToggle={onToggleSite} />
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs flex items-center gap-1 mt-2"
          style={{ color: c.primary500, fontFamily: fonts.body }}
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? 'Hide slots' : `Show ${site.slots.length} slots`}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2">
            {site.slots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg"
                style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p style={{ color: c.earth700, fontFamily: fonts.body }} className="font-medium text-sm">
                      {slot.name}
                    </p>
                    <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}>
                      {slot.ratio}
                    </span>
                  </div>
                  {slot.currentBannerName ? (
                    <div className="flex items-center gap-2 mt-1">
                      <Link2 size={10} style={{ color: c.success }} />
                      <span style={{ color: c.success, fontFamily: fonts.body }} className="text-xs">
                        {slot.currentBannerName}
                      </span>
                      <button
                        onClick={() => onRemove?.(slot.id)}
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ color: c.error, backgroundColor: c.errorLight }}
                      >
                        <X size={10} className="inline" />
                      </button>
                    </div>
                  ) : (
                    <select
                      onChange={(e) => { if (e.target.value) onAssign?.(slot.id, e.target.value) }}
                      defaultValue=""
                      className="mt-1 text-xs px-2 py-1 rounded border"
                      style={{ borderColor: c.earth300, color: c.earth600, fontFamily: fonts.body }}
                    >
                      <option value="">Assign banner...</option>
                      {banners
                        .filter((b) => b.isActive && b.creatives.some((cr) => cr.ratio === slot.ratio))
                        .map((b) => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                  )}
                </div>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: slot.isActive ? c.success : c.earth300 }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PlacementsTab({
  sites,
  banners,
  onToggleSite,
  onAssign,
  onRemove,
}: {
  sites: EcosystemSite[]
  banners: Banner[]
  onToggleSite?: (siteId: string) => void
  onAssign?: (slotId: string, bannerId: string) => void
  onRemove?: (slotId: string) => void
}) {
  const totalSlots = sites.reduce((sum, s) => sum + s.slots.length, 0)
  const filledSlots = sites.reduce((sum, s) => sum + s.slots.filter((sl) => sl.currentBannerId).length, 0)

  return (
    <div>
      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <span
          className="px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}
        >
          {sites.length} sites
        </span>
        <span
          className="px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ backgroundColor: c.successLight, color: c.success, fontFamily: fonts.mono }}
        >
          {filledSlots}/{totalSlots} slots filled
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sites.map((site) => (
          <SiteCard
            key={site.id}
            site={site}
            banners={banners}
            onToggleSite={() => onToggleSite?.(site.id)}
            onAssign={onAssign}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── ANALYTICS TAB ─── */

function AnalyticsTab({
  summary,
  analytics,
}: {
  summary: { totalImpressions: number; totalClicks: number; avgCtr: number; activeBanners: number }
  analytics: BannerAnalytics[]
}) {
  const statCards = [
    { label: 'Total Impressions', value: summary.totalImpressions.toLocaleString(), icon: Eye, color: c.primary500, bg: c.primary50 },
    { label: 'Total Clicks', value: summary.totalClicks.toLocaleString(), icon: MousePointerClick, color: c.secondary500, bg: c.secondary50 },
    { label: 'Avg. CTR', value: `${summary.avgCtr}%`, icon: TrendingUp, color: c.success, bg: c.successLight },
    { label: 'Active Banners', value: String(summary.activeBanners), icon: Zap, color: c.warning, bg: c.warningLight },
  ]

  return (
    <div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="rounded-lg p-4"
              style={{
                background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
                boxShadow: c.shadow,
                borderTop: '4px solid transparent',
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                  <Icon size={16} style={{ color: stat.color }} />
                </div>
              </div>
              <p style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold">
                {stat.value}
              </p>
              <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-xs mt-1">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Analytics table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          boxShadow: c.shadow,
          borderTop: '4px solid transparent',
        }}
      >
        <div className="p-5">
          <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-lg font-semibold mb-4">
            Performance by Banner & Site
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ fontFamily: fonts.body }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${c.earth300}` }}>
                  {['Banner', 'Site', 'Impressions', 'Clicks', 'CTR', 'Period'].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-3 font-medium text-xs uppercase tracking-wider"
                      style={{ color: c.earth500 }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {analytics.map((row, i) => (
                  <tr
                    key={`${row.bannerId}-${row.site}-${i}`}
                    style={{ borderBottom: `1px solid ${c.earth300}` }}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <td className="py-3 px-3 font-medium" style={{ color: c.earth700 }}>{row.bannerName}</td>
                    <td className="py-3 px-3" style={{ color: c.primary500, fontFamily: fonts.mono, fontSize: '12px' }}>{row.site}</td>
                    <td className="py-3 px-3" style={{ color: c.earth600, fontFamily: fonts.mono }}>{row.impressions.toLocaleString()}</td>
                    <td className="py-3 px-3" style={{ color: c.earth600, fontFamily: fonts.mono }}>{row.clicks.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: row.ctr >= 7 ? c.successLight : c.warningLight, color: row.ctr >= 7 ? c.success : c.warning }}
                      >
                        {row.ctr}%
                      </span>
                    </td>
                    <td className="py-3 px-3" style={{ color: c.earth400, fontFamily: fonts.mono, fontSize: '12px' }}>{row.period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── SOCIAL PUBLISHING TAB ─── */

const platformMeta: Record<SocialPlatform, { label: string; color: string; ratio: AspectRatio }> = {
  pinterest: { label: 'Pinterest', color: '#E60023', ratio: '2:3' },
  instagram: { label: 'Instagram', color: '#E4405F', ratio: '1:1' },
  facebook: { label: 'Facebook', color: '#1877F2', ratio: '16:9' },
  twitter: { label: 'Twitter / X', color: '#1DA1F2', ratio: '16:9' },
  threads: { label: 'Threads', color: '#000000', ratio: '1:1' },
}

function SocialTab({
  accounts,
  posts,
  banners,
  onConnect,
  onDisconnect,
  onPublish,
}: {
  accounts: SocialAccount[]
  posts: SocialPost[]
  banners: Banner[]
  onConnect?: (platform: SocialPlatform) => void
  onDisconnect?: (platform: SocialPlatform) => void
  onPublish?: (bannerId: string, platform: SocialPlatform, caption: string) => void
}) {
  const [publishForm, setPublishForm] = useState<{
    platform: SocialPlatform; bannerId: string; caption: string;
    title: string; headline: string; description: string; linkUrl: string;
    ctaText: string; hashtags: string; altText: string;
  } | null>(null)
  const [filterPlatform, setFilterPlatform] = useState<SocialPlatform | 'all'>('all')

  const postStatusColors: Record<string, { bg: string; text: string }> = {
    published: { bg: c.successLight, text: c.success },
    pending: { bg: c.warningLight, text: c.warning },
    failed: { bg: c.errorLight, text: c.error },
  }

  const filteredPosts = filterPlatform === 'all' ? posts : posts.filter((p) => p.platform === filterPlatform)

  return (
    <div>
      {/* Connected Accounts */}
      <div
        className="rounded-lg overflow-hidden mb-6"
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          boxShadow: c.shadow,
          borderTop: '4px solid transparent',
        }}
      >
        <div className="p-5">
          <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-lg font-semibold mb-4">
            Connected Accounts
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((acc) => {
              const meta = platformMeta[acc.platform]
              return (
                <div
                  key={acc.platform}
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.label[0]}
                    </div>
                    <div className="min-w-0">
                      <p style={{ color: c.earth700, fontFamily: fonts.body }} className="font-medium text-sm">
                        {meta.label}
                      </p>
                      {acc.isConnected ? (
                        <p style={{ color: c.success, fontFamily: fonts.mono }} className="text-xs truncate">
                          @{acc.username}
                        </p>
                      ) : (
                        <p style={{ color: c.earth400, fontFamily: fonts.body }} className="text-xs">Not connected</p>
                      )}
                    </div>
                  </div>
                  {acc.isConnected ? (
                    <button
                      onClick={() => onDisconnect?.(acc.platform)}
                      className="text-xs px-2 py-1 rounded"
                      style={{ color: c.error, backgroundColor: c.errorLight }}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => onConnect?.(acc.platform)}
                      className="text-xs px-2 py-1 rounded font-medium"
                      style={{ color: 'white', backgroundColor: meta.color }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Publish New Post */}
      <div
        className="rounded-lg overflow-hidden mb-6"
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          boxShadow: c.shadow,
          borderTop: '4px solid transparent',
        }}
      >
        <div className="p-5">
          <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-lg font-semibold mb-4">
            <Send size={18} className="inline mr-2" style={{ color: c.primary500 }} />
            Publish New Post
          </h3>
          <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm mb-4">
            Select a banner and platform to create a new post. Each publish creates a brand new post — old posts stay for organic reach.
          </p>

          {!publishForm ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {accounts.filter((a) => a.isConnected).map((acc) => {
                const meta = platformMeta[acc.platform]
                const eligibleBanners = banners.filter((b) => b.isActive && b.creatives.some((cr) => cr.ratio === meta.ratio))
                return (
                  <button
                    key={acc.platform}
                    onClick={() => {
                      const b = eligibleBanners[0]
                      setPublishForm({
                        platform: acc.platform, bannerId: b?.id || '', caption: '',
                        title: b?.name || '', headline: b?.headline || '', description: '',
                        linkUrl: b?.ctaUrl || '', ctaText: b?.ctaText || '',
                        hashtags: '', altText: '',
                      })
                    }}
                    disabled={eligibleBanners.length === 0}
                    className="flex items-center gap-3 p-3 rounded-lg text-left transition-all"
                    style={{
                      backgroundColor: eligibleBanners.length > 0 ? c.bg : '#f3f4f6',
                      border: `1px solid ${c.earth300}`,
                      opacity: eligibleBanners.length > 0 ? 1 : 0.5,
                      cursor: eligibleBanners.length > 0 ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.label[0]}
                    </div>
                    <div>
                      <p style={{ color: c.earth700, fontFamily: fonts.body }} className="font-medium text-sm">
                        Publish to {meta.label}
                      </p>
                      <p style={{ color: c.earth400, fontFamily: fonts.mono }} className="text-xs">
                        {meta.ratio} · {eligibleBanners.length} eligible
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="p-4 rounded-lg" style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: platformMeta[publishForm.platform].color }}
                >
                  {platformMeta[publishForm.platform].label[0]}
                </div>
                <span style={{ color: c.earth700, fontFamily: fonts.heading }} className="font-semibold">
                  New {platformMeta[publishForm.platform].label} Post
                </span>
                <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}>
                  {platformMeta[publishForm.platform].ratio}
                </span>
              </div>

              <div className="mb-3">
                <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
                  Select Banner
                </label>
                <select
                  value={publishForm.bannerId}
                  onChange={(e) => {
                    const b = banners.find((bn) => bn.id === e.target.value)
                    setPublishForm({
                      ...publishForm, bannerId: e.target.value,
                      title: b?.name || publishForm.title,
                      headline: b?.headline || publishForm.headline,
                      linkUrl: b?.ctaUrl || publishForm.linkUrl,
                      ctaText: b?.ctaText || publishForm.ctaText,
                    })
                  }}
                  className="w-full px-3 py-2 rounded-lg border text-sm"
                  style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
                >
                  <option value="">Choose a banner...</option>
                  {banners
                    .filter((b) => b.isActive && b.creatives.some((cr) => cr.ratio === platformMeta[publishForm.platform].ratio))
                    .map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
              </div>

              {/* Rich metadata fields */}
              <div className="grid gap-3 sm:grid-cols-2 mb-3">
                <div>
                  <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">Title</label>
                  <input type="text" value={publishForm.title} onChange={(e) => setPublishForm({ ...publishForm, title: e.target.value })}
                    placeholder="Post title" className="w-full px-3 py-2 rounded-lg border text-sm"
                    style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }} />
                </div>
                <div>
                  <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">Headline</label>
                  <input type="text" value={publishForm.headline} onChange={(e) => setPublishForm({ ...publishForm, headline: e.target.value })}
                    placeholder="Eye-catching headline" className="w-full px-3 py-2 rounded-lg border text-sm"
                    style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }} />
                </div>
              </div>

              <div className="mb-3">
                <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">Caption / Body</label>
                <textarea value={publishForm.caption} onChange={(e) => setPublishForm({ ...publishForm, caption: e.target.value })}
                  rows={3} placeholder="Write the post caption..." className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
                  style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }} />
              </div>

              <div className="mb-3">
                <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">Description / Excerpt</label>
                <textarea value={publishForm.description} onChange={(e) => setPublishForm({ ...publishForm, description: e.target.value })}
                  rows={2} placeholder="Short description for link previews and SEO..." className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
                  style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 mb-3">
                <div>
                  <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">
                    Link URL
                    <span style={{ color: c.primary500, fontFamily: fonts.mono }} className="ml-1 text-[10px]">auto-filled from banner</span>
                  </label>
                  <input type="url" value={publishForm.linkUrl} onChange={(e) => setPublishForm({ ...publishForm, linkUrl: e.target.value })}
                    placeholder="https://vastucart.com/..." className="w-full px-3 py-2 rounded-lg border text-sm"
                    style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono, fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">CTA Text</label>
                  <input type="text" value={publishForm.ctaText} onChange={(e) => setPublishForm({ ...publishForm, ctaText: e.target.value })}
                    placeholder="Shop Now, Learn More..." className="w-full px-3 py-2 rounded-lg border text-sm"
                    style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }} />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 mb-4">
                <div>
                  <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">Hashtags</label>
                  <input type="text" value={publishForm.hashtags} onChange={(e) => setPublishForm({ ...publishForm, hashtags: e.target.value })}
                    placeholder="#vastucart #sale #homedecor" className="w-full px-3 py-2 rounded-lg border text-sm"
                    style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono, fontSize: '12px' }} />
                </div>
                <div>
                  <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">Alt Text (accessibility)</label>
                  <input type="text" value={publishForm.altText} onChange={(e) => setPublishForm({ ...publishForm, altText: e.target.value })}
                    placeholder="Describe the image for screen readers" className="w-full px-3 py-2 rounded-lg border text-sm"
                    style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }} />
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (publishForm.bannerId) {
                      onPublish?.(publishForm.bannerId, publishForm.platform, publishForm.caption)
                    }
                    setPublishForm(null)
                  }}
                  disabled={!publishForm.bannerId}
                  className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5"
                  style={{
                    backgroundColor: publishForm.bannerId ? platformMeta[publishForm.platform].color : c.earth300,
                    color: 'white',
                    cursor: publishForm.bannerId ? 'pointer' : 'not-allowed',
                  }}
                >
                  <Send size={14} />Publish
                </button>
                <button
                  onClick={() => setPublishForm(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ backgroundColor: c.earth300, color: c.earth700 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Publish Log */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
          boxShadow: c.shadow,
          borderTop: '4px solid transparent',
        }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-lg font-semibold">
              Publish Log
            </h3>
            <div className="flex gap-1 flex-wrap">
              {(['all', 'pinterest', 'instagram', 'facebook', 'twitter', 'threads'] as const).map((p) => {
                const isActive = filterPlatform === p
                const count = p === 'all' ? posts.length : posts.filter((post) => post.platform === p).length
                if (p !== 'all' && count === 0) return null
                return (
                  <button
                    key={p}
                    onClick={() => setFilterPlatform(p)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium capitalize transition-all"
                    style={{
                      backgroundColor: isActive ? c.primary500 : c.bg,
                      color: isActive ? c.card : c.earth500,
                      border: `1px solid ${isActive ? c.primary500 : c.earth300}`,
                    }}
                  >
                    {p === 'all' ? 'All' : platformMeta[p].label} ({count})
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            {filteredPosts.map((post) => {
              const meta = platformMeta[post.platform]
              const ps = postStatusColors[post.status]
              return (
                <div
                  key={post.id}
                  className="flex items-start justify-between gap-3 p-4 rounded-lg"
                  style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}
                >
                  <div className="flex gap-3 min-w-0 flex-1">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold mt-0.5"
                      style={{ backgroundColor: meta.color }}
                    >
                      {meta.label[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p style={{ color: c.earth700, fontFamily: fonts.body }} className="font-medium text-sm">
                          {post.bannerName}
                        </p>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                          style={{ backgroundColor: ps.bg, color: ps.text }}
                        >
                          {post.status}
                        </span>
                      </div>
                      <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-xs mt-1 line-clamp-2">
                        {post.caption}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span style={{ color: c.earth400, fontFamily: fonts.mono }} className="text-xs">
                          {meta.label}
                        </span>
                        {post.publishedAt && (
                          <span style={{ color: c.earth400, fontFamily: fonts.mono }} className="text-xs">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        )}
                        {post.postUrl && (
                          <a
                            href={post.postUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1"
                            style={{ color: c.primary500 }}
                          >
                            <ExternalLink size={10} />View Post
                          </a>
                        )}
                        {post.meta?.linkUrl && (
                          <span style={{ color: c.primary400, fontFamily: fonts.mono }} className="text-[10px] truncate max-w-48">
                            {post.meta.linkUrl}
                          </span>
                        )}
                      </div>
                      {post.meta?.hashtags && (
                        <p style={{ color: c.primary400, fontFamily: fonts.mono }} className="text-[10px] mt-1">
                          {post.meta.hashtags}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-8">
              <Share2 size={32} style={{ color: c.earth300 }} className="mx-auto mb-2" />
              <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm">No posts published yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */

export function AdminEcosystemAds({
  activeTab,
  banners,
  sites,
  analytics,
  analyticsSummary,
  socialAccounts,
  socialPosts,
  onChangeTab,
  onCreateBanner,
  onEditBanner,
  onDeleteBanner,
  onToggleBanner,
  onAssignPlacement,
  onRemovePlacement,
  onToggleSite,
  onConnectSocial,
  onDisconnectSocial,
  onPublishToSocial,
}: AdminEcosystemAdsProps) {
  return (
    <div style={{ fontFamily: fonts.body }}>
      <div className="max-w-6xl mx-auto">
        <h2 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-2xl font-semibold mb-1">
          Ecosystem Ads
        </h2>
        <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm mb-6">
          Manage banners across all {sites.length} ecosystem sites and Pinterest
        </p>

        {/* Tab navigation */}
        <div className="border-b mb-6 overflow-x-auto" style={{ borderColor: c.earth300 }}>
          <div className="flex gap-1 min-w-max">
            {tabItems.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onChangeTab?.(tab.id)}
                  className="flex items-center gap-2 px-4 py-2.5 font-medium text-sm transition-all border-b-2 whitespace-nowrap"
                  style={{
                    color: isActive ? c.primary500 : c.earth500,
                    borderColor: isActive ? c.primary500 : 'transparent',
                    fontFamily: fonts.body,
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'banners' && (
          <BannersTab
            banners={banners}
            onToggle={onToggleBanner}
            onEdit={(id) => onEditBanner?.(id, {})}
            onDelete={onDeleteBanner}
            onCreate={() => onCreateBanner?.({
              name: '', headline: '', ctaText: '', ctaUrl: '', status: 'draft',
              isActive: false, startDate: '', endDate: '', priority: 1,
              productIds: [], productNames: [], creatives: [], placements: [],
            })}
          />
        )}
        {activeTab === 'placements' && (
          <PlacementsTab
            sites={sites}
            banners={banners}
            onToggleSite={onToggleSite}
            onAssign={onAssignPlacement}
            onRemove={onRemovePlacement}
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsTab summary={analyticsSummary} analytics={analytics} />
        )}
        {activeTab === 'social' && (
          <SocialTab
            accounts={socialAccounts}
            posts={socialPosts}
            banners={banners}
            onConnect={onConnectSocial}
            onDisconnect={onDisconnectSocial}
            onPublish={onPublishToSocial}
          />
        )}
      </div>
    </div>
  )
}
