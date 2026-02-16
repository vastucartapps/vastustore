import { useState } from 'react'
import {
  BarChart2,
  Eye,
  ShoppingBag,
  MessageCircle,
  Headphones,
  Plug,
  Unplug,
  CheckCircle2,
  XCircle,
  Circle,
  RefreshCw,
  Globe,
  FileText,
  Map,
  Share2,
  Twitter,
  Tag,
  Plus,
  Trash2,
  Save,
  Search,
  Image
} from 'lucide-react'
import type {
  AdminIntegrationsProps,
  IntegrationTab,
  Integration,
  IntegrationStatus,
  SEODefaults,
  OpenGraphDefaults,
  MarketingTag
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
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
}
const fonts = { heading: "'Lora', serif", body: "'Open Sans', sans-serif", mono: "'IBM Plex Mono', monospace" }

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  'bar-chart-2': BarChart2,
  'eye': Eye,
  'shopping-bag': ShoppingBag,
  'message-circle': MessageCircle,
  'headphones': Headphones,
}

function statusColor(s: IntegrationStatus) {
  return s === 'active' ? c.success : s === 'error' ? c.error : c.earth300
}
function statusLabel(s: IntegrationStatus) {
  return s === 'active' ? 'Active' : s === 'error' ? 'Error' : 'Inactive'
}

function formatDate(iso: string | null) {
  if (!iso) return null
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

/* ─── Tab Bar ─── */
function TabBar({ active, onChange }: { active: IntegrationTab; onChange: (t: IntegrationTab) => void }) {
  const tabs: { id: IntegrationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'integrations', label: 'Integrations', icon: <Plug size={16} /> },
    { id: 'seo', label: 'SEO Settings', icon: <Search size={16} /> },
  ]
  return (
    <div className="flex gap-1 p-1 rounded-lg mb-6" style={{ backgroundColor: c.primary50 }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all flex-1 justify-center"
          style={{
            fontFamily: fonts.body,
            backgroundColor: active === t.id ? c.card : 'transparent',
            color: active === t.id ? c.primary500 : c.earth500,
            boxShadow: active === t.id ? c.shadow : 'none',
          }}
        >
          {t.icon} {t.label}
        </button>
      ))}
    </div>
  )
}

/* ─── Integration Card ─── */
function IntegrationCard({
  integration, onToggle, onTest, onSaveConfig
}: {
  integration: Integration
  onToggle?: () => void
  onTest?: () => void
  onSaveConfig?: (fields: Record<string, string>) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [fields, setFields] = useState(integration.configFields)
  const [testing, setTesting] = useState(false)
  const Icon = iconMap[integration.icon] || Plug

  const handleTest = () => {
    setTesting(true)
    onTest?.()
    setTimeout(() => setTesting(false), 1500)
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: c.card, boxShadow: c.shadow }}
    >
      {/* Gradient top border */}
      <div className="h-1" style={{ background: c.gradient }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: c.primary50 }}>
              <Icon size={20} style={{ color: c.primary500 }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ fontFamily: fonts.heading, color: c.earth700 }}>
                {integration.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Circle size={8} fill={statusColor(integration.status)} style={{ color: statusColor(integration.status) }} />
                <span className="text-xs" style={{ color: statusColor(integration.status), fontFamily: fonts.body }}>
                  {statusLabel(integration.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Connected toggle */}
          <button
            onClick={onToggle}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            style={{ backgroundColor: integration.isConnected ? c.success : c.earth300 }}
            title={integration.isConnected ? 'Connected' : 'Disconnected'}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform"
              style={{ transform: integration.isConnected ? 'translateX(24px)' : 'translateX(4px)' }}
            />
          </button>
        </div>

        <p className="text-xs mb-3 leading-relaxed" style={{ color: c.earth500, fontFamily: fonts.body }}>
          {integration.description}
        </p>

        {integration.lastSynced && (
          <p className="text-xs mb-3" style={{ color: c.earth400, fontFamily: fonts.body }}>
            <RefreshCw size={11} className="inline mr-1" style={{ verticalAlign: '-1px' }} />
            Last synced: {formatDate(integration.lastSynced)}
          </p>
        )}

        {/* Config toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium mb-2"
          style={{ color: c.primary500, fontFamily: fonts.body }}
        >
          {expanded ? 'Hide Configuration' : 'Show Configuration'}
        </button>

        {expanded && (
          <div className="mt-2 space-y-2">
            {Object.entries(fields).map(([key, val]) => (
              <div key={key}>
                <label className="block text-xs mb-1 capitalize" style={{ color: c.earth500, fontFamily: fonts.body }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="text"
                  value={val}
                  onChange={e => setFields(prev => ({ ...prev, [key]: e.target.value }))}
                  className="w-full px-3 py-1.5 rounded-md text-xs border outline-none focus:ring-2"
                  style={{
                    fontFamily: fonts.mono,
                    borderColor: c.primary100,
                    color: c.earth700,
                    backgroundColor: c.bg,
                  }}
                />
              </div>
            ))}

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => onSaveConfig?.(fields)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-white"
                style={{ backgroundColor: c.primary500, fontFamily: fonts.body }}
              >
                <Save size={12} /> Save
              </button>
              <button
                onClick={handleTest}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border"
                style={{ borderColor: c.primary500, color: c.primary500, fontFamily: fonts.body }}
              >
                {testing ? <RefreshCw size={12} className="animate-spin" /> : <CheckCircle2 size={12} />}
                {testing ? 'Testing...' : 'Test Connection'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── SEO Section ─── */
function SEOSettingsPanel({
  seo, openGraph, marketingTags,
  onSaveSEO, onSaveOG, onToggleTag, onRemoveTag
}: {
  seo: SEODefaults
  openGraph: OpenGraphDefaults
  marketingTags: MarketingTag[]
  onSaveSEO?: (s: SEODefaults) => void
  onSaveOG?: (og: OpenGraphDefaults) => void
  onToggleTag?: (id: string) => void
  onRemoveTag?: (id: string) => void
}) {
  const [seoState, setSeo] = useState(seo)
  const [ogState, setOG] = useState(openGraph)

  const metaLen = seoState.metaDescription.length
  const metaColor = metaLen > 160 ? c.error : metaLen >= 150 ? c.warning : c.success

  const sectionCard = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <div className="rounded-xl overflow-hidden mb-6" style={{ backgroundColor: c.card, boxShadow: c.shadow }}>
      <div className="h-1" style={{ background: c.gradient }} />
      <div className="p-5">
        <h3 className="flex items-center gap-2 text-base font-semibold mb-4" style={{ fontFamily: fonts.heading, color: c.earth700 }}>
          {icon} {title}
        </h3>
        {children}
      </div>
    </div>
  )

  return (
    <div>
      {/* Title & Meta */}
      {sectionCard('Title & Meta', <Globe size={18} style={{ color: c.primary500 }} />, (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              Site Title Template <span className="font-normal">(use %s for page title)</span>
            </label>
            <input
              type="text"
              value={seoState.siteTitleTemplate}
              onChange={e => setSeo(prev => ({ ...prev, siteTitleTemplate: e.target.value }))}
              className="w-full px-3 py-2 rounded-md text-sm border outline-none focus:ring-2"
              style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.mono, backgroundColor: c.bg }}
            />
            <p className="text-xs mt-1" style={{ color: c.earth400, fontFamily: fonts.body }}>
              Preview: <span style={{ color: c.primary500 }}>{seoState.siteTitleTemplate.replace('%s', 'Brass Diya Set')}</span>
            </p>
          </div>

          <div>
            <div className="flex justify-between items-end mb-1">
              <label className="block text-xs font-medium" style={{ color: c.earth500, fontFamily: fonts.body }}>
                Default Meta Description
              </label>
              <span className="text-xs" style={{ color: metaColor, fontFamily: fonts.mono }}>
                {metaLen}/160
              </span>
            </div>
            <textarea
              value={seoState.metaDescription}
              onChange={e => setSeo(prev => ({ ...prev, metaDescription: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 rounded-md text-sm border outline-none focus:ring-2 resize-none"
              style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.body, backgroundColor: c.bg }}
            />
          </div>

          <button
            onClick={() => onSaveSEO?.(seoState)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: c.primary500, fontFamily: fonts.body }}
          >
            <Save size={14} /> Save Meta Settings
          </button>
        </div>
      ))}

      {/* Robots & Sitemap */}
      {sectionCard('Robots & Sitemap', <FileText size={18} style={{ color: c.primary500 }} />, (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              robots.txt
            </label>
            <textarea
              value={seoState.robotsTxt}
              onChange={e => setSeo(prev => ({ ...prev, robotsTxt: e.target.value }))}
              rows={8}
              className="w-full px-3 py-2 rounded-md text-xs border outline-none focus:ring-2 resize-none leading-relaxed"
              style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.mono, backgroundColor: '#1a1a1a', ...(true && { color: '#e5e5e5', backgroundColor: '#1e1e2e' }) }}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: c.primary50 }}>
            <div className="flex items-center gap-3">
              <Map size={16} style={{ color: c.primary500 }} />
              <div>
                <p className="text-sm font-medium" style={{ color: c.earth700, fontFamily: fonts.body }}>XML Sitemap Auto-Generation</p>
                {seoState.sitemapEnabled && seoState.sitemapLastGenerated && (
                  <p className="text-xs" style={{ color: c.earth400, fontFamily: fonts.body }}>
                    Last generated: {formatDate(seoState.sitemapLastGenerated)}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setSeo(prev => ({ ...prev, sitemapEnabled: !prev.sitemapEnabled }))}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
              style={{ backgroundColor: seoState.sitemapEnabled ? c.success : c.earth300 }}
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform"
                style={{ transform: seoState.sitemapEnabled ? 'translateX(24px)' : 'translateX(4px)' }}
              />
            </button>
          </div>

          <button
            onClick={() => onSaveSEO?.(seoState)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: c.primary500, fontFamily: fonts.body }}
          >
            <Save size={14} /> Save Robots & Sitemap
          </button>
        </div>
      ))}

      {/* Open Graph & Social */}
      {sectionCard('Open Graph & Social', <Share2 size={18} style={{ color: c.primary500 }} />, (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              Default OG Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={ogState.defaultImage}
                onChange={e => setOG(prev => ({ ...prev, defaultImage: e.target.value }))}
                className="flex-1 px-3 py-2 rounded-md text-sm border outline-none focus:ring-2"
                style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.mono, backgroundColor: c.bg }}
              />
              <div className="w-16 h-10 rounded-md flex items-center justify-center border" style={{ borderColor: c.primary100, backgroundColor: c.primary50 }}>
                <Image size={16} style={{ color: c.primary400 }} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              Default OG Title
            </label>
            <input
              type="text"
              value={ogState.defaultTitle}
              onChange={e => setOG(prev => ({ ...prev, defaultTitle: e.target.value }))}
              className="w-full px-3 py-2 rounded-md text-sm border outline-none focus:ring-2"
              style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.body, backgroundColor: c.bg }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              Default OG Description
            </label>
            <textarea
              value={ogState.defaultDescription}
              onChange={e => setOG(prev => ({ ...prev, defaultDescription: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 rounded-md text-sm border outline-none focus:ring-2 resize-none"
              style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.body, backgroundColor: c.bg }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              Twitter Handle
            </label>
            <input
              type="text"
              value={ogState.twitterHandle}
              onChange={e => setOG(prev => ({ ...prev, twitterHandle: e.target.value }))}
              className="w-full px-3 py-2 rounded-md text-sm border outline-none focus:ring-2"
              style={{ borderColor: c.primary100, color: c.earth700, fontFamily: fonts.mono, backgroundColor: c.bg }}
              placeholder="@handle"
            />
          </div>

          <button
            onClick={() => onSaveOG?.(ogState)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium text-white"
            style={{ backgroundColor: c.primary500, fontFamily: fonts.body }}
          >
            <Save size={14} /> Save Social Settings
          </button>
        </div>
      ))}

      {/* Marketing Tags */}
      {sectionCard('Marketing & Performance Tags', <Tag size={18} style={{ color: c.primary500 }} />, (
        <div className="space-y-3">
          {marketingTags.map(tag => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{ borderColor: c.primary100, backgroundColor: c.bg }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: tag.platform === 'Google' ? c.primary50 : c.secondary50,
                    color: tag.platform === 'Google' ? c.primary500 : c.secondary500,
                    fontFamily: fonts.body,
                  }}
                >
                  {tag.platform}
                </span>
                <div>
                  <p className="text-sm font-medium" style={{ color: c.earth700, fontFamily: fonts.body }}>{tag.name}</p>
                  <p className="text-xs" style={{ color: c.earth400, fontFamily: fonts.mono }}>{tag.pixelId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleTag?.(tag.id)}
                  className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
                  style={{ backgroundColor: tag.isActive ? c.success : c.earth300 }}
                >
                  <span
                    className="inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform"
                    style={{ transform: tag.isActive ? 'translateX(18px)' : 'translateX(3px)' }}
                  />
                </button>
                <button onClick={() => onRemoveTag?.(tag.id)} className="p-1 rounded hover:bg-stone-100">
                  <Trash2 size={14} style={{ color: c.error }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── Main Component ─── */
export function AdminIntegrations({
  activeTab: initialTab,
  integrations,
  seoDefaults,
  openGraph,
  marketingTags,
  onChangeTab,
  onToggleConnection,
  onTestConnection,
  onSaveIntegrationConfig,
  onSaveSEO,
  onSaveOpenGraph,
  onToggleTag,
  onRemoveTag,
}: AdminIntegrationsProps) {
  const [tab, setTab] = useState<IntegrationTab>(initialTab)

  const handleTabChange = (t: IntegrationTab) => {
    setTab(t)
    onChangeTab?.(t)
  }

  return (
    <div style={{ fontFamily: fonts.body }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold mb-1" style={{ fontFamily: fonts.heading, color: c.earth700 }}>
            Integrations & SEO
          </h1>
          <p className="text-sm" style={{ color: c.earth500, fontFamily: fonts.body }}>
            Manage third-party connections, analytics, and search engine settings.
          </p>
        </div>

        {/* Tabs */}
        <TabBar active={tab} onChange={handleTabChange} />

        {/* Integrations Tab */}
        {tab === 'integrations' && (
          <div>
            {/* Summary bar */}
            <div className="flex flex-wrap gap-4 mb-6">
              {(['active', 'error', 'inactive'] as IntegrationStatus[]).map(s => {
                const count = integrations.filter(i => i.status === s).length
                return (
                  <div key={s} className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: c.card, boxShadow: c.shadow }}>
                    <Circle size={8} fill={statusColor(s)} style={{ color: statusColor(s) }} />
                    <span className="text-xs font-medium" style={{ color: c.earth600, fontFamily: fonts.body }}>
                      {count} {statusLabel(s)}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {integrations.map(integ => (
                <IntegrationCard
                  key={integ.id}
                  integration={integ}
                  onToggle={() => onToggleConnection?.(integ.id)}
                  onTest={() => onTestConnection?.(integ.id)}
                  onSaveConfig={(f) => onSaveIntegrationConfig?.(integ.id, f)}
                />
              ))}
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {tab === 'seo' && (
          <SEOSettingsPanel
            seo={seoDefaults}
            openGraph={openGraph}
            marketingTags={marketingTags}
            onSaveSEO={onSaveSEO}
            onSaveOG={onSaveOpenGraph}
            onToggleTag={onToggleTag}
            onRemoveTag={onRemoveTag}
          />
        )}
      </div>
    </div>
  )
}
