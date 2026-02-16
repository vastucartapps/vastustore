import { useState } from 'react'
import { Save, Upload, ChevronUp, ChevronDown, Eye, EyeOff, Calendar, Megaphone, Store, Layout, FileText, Info } from 'lucide-react'
import type { AdminStorefrontProps, Announcement, Branding, HomepageSection, ContentPage, FooterConfig } from '../types'

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

export function AdminStorefront({
  announcement: initialAnnouncement,
  branding: initialBranding,
  homepageSections: initialSections,
  contentPages,
  footerConfig: initialFooter,
  onUpdateAnnouncement,
  onUpdateBranding,
  onReorderSection,
  onToggleSection,
  onEditPage,
  onTogglePagePublish,
  onUpdateFooter,
}: AdminStorefrontProps) {
  const [activeTab, setActiveTab] = useState<'announcement' | 'branding' | 'homepage' | 'content' | 'footer'>('announcement')
  const [announcement, setAnnouncement] = useState(initialAnnouncement)
  const [branding, setBranding] = useState(initialBranding)
  const [sections, setSections] = useState(initialSections)
  const [footer, setFooter] = useState(initialFooter)
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  const [pageContent, setPageContent] = useState('')

  return (
    <div style={{ fontFamily: fonts.body }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: `2px solid ${c.subtle}`, overflowX: 'auto' }}>
        {[
          { key: 'announcement', label: 'Announcement', icon: Megaphone },
          { key: 'branding', label: 'Branding', icon: Store },
          { key: 'homepage', label: 'Homepage Sections', icon: Layout },
          { key: 'content', label: 'Content Pages', icon: FileText },
          { key: 'footer', label: 'Footer', icon: Info },
        ].map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                background: activeTab === tab.key ? c.primary50 : 'transparent',
                color: activeTab === tab.key ? c.primary500 : c.earth600,
                border: 'none',
                borderBottom: activeTab === tab.key ? `3px solid ${c.primary500}` : '3px solid transparent',
                fontSize: '15px',
                fontWeight: 600,
                fontFamily: fonts.body,
                cursor: 'pointer',
                transition: 'all 200ms',
                marginBottom: '-2px',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab.key) {
                  e.currentTarget.style.background = c.subtle
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab.key) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Announcement Tab */}
      {activeTab === 'announcement' && (
        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: c.shadow,
          }}
        >
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
            Announcement Ribbon
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={announcement.isActive}
                onChange={e => setAnnouncement({ ...announcement, isActive: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: c.primary500 }}
              />
              <span style={{ fontSize: '15px', fontWeight: 600, color: c.earth700 }}>
                Active
              </span>
            </label>
          </div>

          <div style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Message
              </label>
              <input
                type="text"
                value={announcement.message}
                onChange={e => setAnnouncement({ ...announcement, message: e.target.value })}
                placeholder="Free shipping on orders above ₹999!"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: `1px solid ${c.earth300}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = c.primary400}
                onBlur={e => e.target.style.borderColor = c.earth300}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Link Text
                </label>
                <input
                  type="text"
                  value={announcement.linkText}
                  onChange={e => setAnnouncement({ ...announcement, linkText: e.target.value })}
                  placeholder="Shop Now"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Link URL
                </label>
                <input
                  type="text"
                  value={announcement.linkUrl}
                  onChange={e => setAnnouncement({ ...announcement, linkUrl: e.target.value })}
                  placeholder="/collections/best-sellers"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.mono,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Background Color
                </label>
                <input
                  type="color"
                  value={announcement.bgColor}
                  onChange={e => setAnnouncement({ ...announcement, bgColor: e.target.value })}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '4px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Text Color
                </label>
                <input
                  type="color"
                  value={announcement.textColor}
                  onChange={e => setAnnouncement({ ...announcement, textColor: e.target.value })}
                  style={{
                    width: '100%',
                    height: '42px',
                    padding: '4px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  <Calendar size={16} />
                  Start Date
                </label>
                <input
                  type="date"
                  value={announcement.schedule.startDate}
                  onChange={e => setAnnouncement({ ...announcement, schedule: { ...announcement.schedule, startDate: e.target.value } })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  <Calendar size={16} />
                  End Date
                </label>
                <input
                  type="date"
                  value={announcement.schedule.endDate}
                  onChange={e => setAnnouncement({ ...announcement, schedule: { ...announcement.schedule, endDate: e.target.value } })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
            </div>

            {/* Preview */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Preview
              </label>
              <div
                style={{
                  padding: '12px 20px',
                  background: announcement.bgColor,
                  color: announcement.textColor,
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                {announcement.message} <a href={announcement.linkUrl} style={{ textDecoration: 'underline', color: announcement.textColor, fontWeight: 600 }}>{announcement.linkText}</a>
              </div>
            </div>
          </div>

          <button
            onClick={() => onUpdateAnnouncement(announcement)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: c.primary500,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = c.primary400}
            onMouseLeave={e => e.currentTarget.style.background = c.primary500}
          >
            <Save size={16} />
            Save Announcement
          </button>
        </div>
      )}

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: c.shadow,
          }}
        >
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
            Store Branding
          </h2>

          <div style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Store Name
                </label>
                <input
                  type="text"
                  value={branding.storeName}
                  onChange={e => setBranding({ ...branding, storeName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Tagline
                </label>
                <input
                  type="text"
                  value={branding.tagline}
                  onChange={e => setBranding({ ...branding, tagline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={branding.contactEmail}
                  onChange={e => setBranding({ ...branding, contactEmail: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={branding.contactPhone}
                  onChange={e => setBranding({ ...branding, contactPhone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: fonts.body,
                    outline: 'none',
                  }}
                  onFocus={e => e.target.style.borderColor = c.primary400}
                  onBlur={e => e.target.style.borderColor = c.earth300}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                Address
              </label>
              <textarea
                value={branding.address}
                onChange={e => setBranding({ ...branding, address: e.target.value })}
                style={{
                  width: '100%',
                  minHeight: '60px',
                  padding: '10px 12px',
                  border: `1px solid ${c.earth300}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: fonts.body,
                  resize: 'vertical',
                  outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = c.primary400}
                onBlur={e => e.target.style.borderColor = c.earth300}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Logo URL
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={branding.logoUrl}
                    onChange={e => setBranding({ ...branding, logoUrl: e.target.value })}
                    placeholder="/images/logo.png"
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: `1px solid ${c.earth300}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: fonts.mono,
                      outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = c.primary400}
                    onBlur={e => e.target.style.borderColor = c.earth300}
                  />
                  <button
                    style={{
                      padding: '10px 16px',
                      background: c.subtle,
                      border: `1px solid ${c.earth300}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: c.earth700,
                    }}
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
                  Favicon URL
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={branding.faviconUrl}
                    onChange={e => setBranding({ ...branding, faviconUrl: e.target.value })}
                    placeholder="/images/favicon.png"
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      border: `1px solid ${c.earth300}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: fonts.mono,
                      outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = c.primary400}
                    onBlur={e => e.target.style.borderColor = c.earth300}
                  />
                  <button
                    style={{
                      padding: '10px 16px',
                      background: c.subtle,
                      border: `1px solid ${c.earth300}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: c.earth700,
                    }}
                  >
                    <Upload size={16} />
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onUpdateBranding(branding)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: c.primary500,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = c.primary400}
            onMouseLeave={e => e.currentTarget.style.background = c.primary500}
          >
            <Save size={16} />
            Save Branding
          </button>
        </div>
      )}

      {/* Homepage Sections Tab */}
      {activeTab === 'homepage' && (
        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: c.shadow,
          }}
        >
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
            Homepage Sections
          </h2>
          <p style={{ fontSize: '14px', color: c.earth500, margin: '0 0 24px 0' }}>
            Reorder and toggle visibility of homepage sections
          </p>

          <div style={{ display: 'grid', gap: '12px' }}>
            {sections.map((section, idx) => (
              <div
                key={section.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: section.enabled ? c.subtle : c.card,
                  border: `1px solid ${c.earth300}`,
                  borderRadius: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: c.earth400, fontFamily: fonts.mono }}>
                    {section.order}
                  </span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: section.enabled ? c.earth700 : c.earth400 }}>
                    {section.name}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      onClick={() => onReorderSection(section.id, 'up')}
                      disabled={idx === 0}
                      style={{
                        padding: '6px',
                        background: idx === 0 ? c.earth300 : c.card,
                        border: `1px solid ${c.earth300}`,
                        borderRadius: '6px',
                        cursor: idx === 0 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: idx === 0 ? c.earth400 : c.earth700,
                      }}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => onReorderSection(section.id, 'down')}
                      disabled={idx === sections.length - 1}
                      style={{
                        padding: '6px',
                        background: idx === sections.length - 1 ? c.earth300 : c.card,
                        border: `1px solid ${c.earth300}`,
                        borderRadius: '6px',
                        cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        color: idx === sections.length - 1 ? c.earth400 : c.earth700,
                      }}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={() => onToggleSection(section.id, !section.enabled)}
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: section.enabled ? c.primary500 : c.earth300,
                        borderRadius: '28px',
                        transition: 'all 200ms',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          height: '22px',
                          width: '22px',
                          left: section.enabled ? '27px' : '3px',
                          bottom: '3px',
                          background: '#ffffff',
                          borderRadius: '50%',
                          transition: 'all 200ms',
                        }}
                      />
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Pages Tab */}
      {activeTab === 'content' && (
        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: c.shadow,
          }}
        >
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
            Content Pages
          </h2>

          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: c.subtle }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Title
                  </th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Slug
                  </th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Last Updated
                  </th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Status
                  </th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '13px', fontWeight: 700, color: c.earth700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {contentPages.map((page, idx) => (
                  <tr
                    key={page.id}
                    style={{
                      borderTop: idx === 0 ? 'none' : `1px solid ${c.subtle}`,
                      background: c.card,
                    }}
                  >
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: c.earth700 }}>
                      {page.title}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: c.earth600, fontFamily: fonts.mono }}>
                      /{page.slug}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: c.earth600 }}>
                      {new Date(page.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span
                        style={{
                          background: page.isPublished ? c.successLight : c.warningLight,
                          color: page.isPublished ? c.success : c.warning,
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      >
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <button
                        onClick={() => {
                          setEditingPageId(page.id)
                          setPageContent(page.excerpt)
                        }}
                        style={{
                          padding: '6px 12px',
                          background: 'transparent',
                          color: c.primary500,
                          border: `1px solid ${c.primary500}`,
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingPageId && (
            <div style={{ marginTop: '24px', padding: '24px', background: c.primary50, borderRadius: '8px' }}>
              <h3 style={{ fontFamily: fonts.heading, fontSize: '18px', fontWeight: 600, color: c.earth700, margin: '0 0 16px 0' }}>
                Editing: {contentPages.find(p => p.id === editingPageId)?.title}
              </h3>
              <textarea
                value={pageContent}
                onChange={e => setPageContent(e.target.value)}
                placeholder="Enter page content (markdown supported)..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '12px',
                  border: `1px solid ${c.earth300}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: fonts.mono,
                  lineHeight: 1.6,
                  resize: 'vertical',
                  outline: 'none',
                  marginBottom: '12px',
                }}
                onFocus={e => e.target.style.borderColor = c.primary400}
                onBlur={e => e.target.style.borderColor = c.earth300}
              />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => {
                    onEditPage(editingPageId, pageContent)
                    setEditingPageId(null)
                    setPageContent('')
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: c.primary500,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Save size={16} />
                  Save Content
                </button>
                <button
                  onClick={() => {
                    setEditingPageId(null)
                    setPageContent('')
                  }}
                  style={{
                    padding: '10px 20px',
                    background: 'transparent',
                    color: c.earth600,
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Tab */}
      {activeTab === 'footer' && (
        <div
          style={{
            background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
            borderTop: '4px solid transparent',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: c.shadow,
          }}
        >
          <h2 style={{ fontFamily: fonts.heading, fontSize: '20px', fontWeight: 600, color: c.earth700, margin: '0 0 24px 0' }}>
            Footer Configuration
          </h2>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: c.earth700, margin: '0 0 16px 0' }}>
              Footer Columns
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {footer.columns.map((col, idx) => (
                <div key={idx} style={{ padding: '20px', background: c.subtle, borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: c.earth700, margin: '0 0 12px 0' }}>
                    {col.title}
                  </h4>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {col.links.map((link, linkIdx) => (
                      <div key={linkIdx} style={{ fontSize: '14px', color: c.earth600 }}>
                        {link.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: c.earth700, marginBottom: '8px' }}>
              Copyright Text
            </label>
            <input
              type="text"
              value={footer.copyrightText}
              onChange={e => setFooter({ ...footer, copyrightText: e.target.value })}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={footer.showSocialLinks}
                onChange={e => setFooter({ ...footer, showSocialLinks: e.target.checked })}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: c.primary500 }}
              />
              <span style={{ fontSize: '15px', fontWeight: 600, color: c.earth700 }}>
                Show Social Links
              </span>
            </label>
          </div>

          <button
            onClick={() => onUpdateFooter(footer)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: c.primary500,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = c.primary400}
            onMouseLeave={e => e.currentTarget.style.background = c.primary500}
          >
            <Save size={16} />
            Save Footer
          </button>
        </div>
      )}
    </div>
  )
}
