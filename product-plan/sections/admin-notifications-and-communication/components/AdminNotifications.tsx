import { useState } from 'react'
import {
  Mail,
  MessageSquare,
  Phone,
  Bell,
  Megaphone,
  Edit2,
  Save,
  X,
  Check,
  Eye,
  EyeOff,
  Plus,
  Link2,
  ExternalLink,
  AlertCircle,
} from 'lucide-react'
import type {
  AdminNotificationsProps,
  ChannelTab,
  EmailTemplate,
  ChannelTemplate,
  SMSConfig,
  WhatsAppConfig,
  PushConfig,
  InAppAnnouncement,
  AnnouncementType,
  TargetAudience,
  IntegrationConfig,
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

const channelTabs: { id: ChannelTab; label: string; icon: typeof Mail }[] = [
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'sms', label: 'SMS', icon: Phone },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
  { id: 'push', label: 'Push', icon: Bell },
  { id: 'inapp', label: 'In-App', icon: Megaphone },
]

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

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
        boxShadow: c.shadow,
        borderTop: '4px solid transparent',
      }}
    >
      <div className="p-6">{children}</div>
    </div>
  )
}

/* ─── EMAIL TAB ─── */

function EmailTemplateCard({
  template,
  onToggle,
  onEdit,
}: {
  template: EmailTemplate
  onToggle?: () => void
  onEdit?: (subject: string, body: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [subject, setSubject] = useState(template.subject)
  const [body, setBody] = useState('')

  return (
    <div
      className="rounded-lg border p-4 transition-all"
      style={{ borderColor: c.earth300, backgroundColor: c.card }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold">
            {template.name}
          </h4>
          <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm mt-1">
            {template.description}
          </p>
        </div>
        <ToggleSwitch enabled={template.isActive} onToggle={onToggle} />
      </div>

      <div className="flex items-center gap-2 mt-3 mb-2 flex-wrap">
        <span
          className="text-xs px-2 py-0.5 rounded-full"
          style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}
        >
          {template.triggerEvent}
        </span>
        <span style={{ color: c.earth500, fontFamily: fonts.body }} className="text-xs">
          Edited {template.lastEdited}
        </span>
      </div>

      {!editing && (
        <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-sm truncate mb-3">
          Subject: {template.subject}
        </p>
      )}

      {editing ? (
        <div className="mt-3 space-y-3">
          <div>
            <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
              Subject Line
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
            />
          </div>
          <div>
            <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
              Email Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={5}
              placeholder="Enter HTML or plain text email body..."
              className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
              style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono, fontSize: '13px' }}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { onEdit?.(subject, body); setEditing(false) }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: c.primary500, color: c.card }}
            >
              <Save size={14} className="inline mr-1.5" />Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: c.earth300, color: c.earth700 }}
            >
              <X size={14} className="inline mr-1.5" />Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: c.primary50, color: c.primary500, border: `1px solid ${c.primary200}` }}
        >
          <Edit2 size={14} className="inline mr-1.5" />Edit Template
        </button>
      )}
    </div>
  )
}

function EmailTab({
  templates,
  onToggle,
  onEdit,
}: {
  templates: EmailTemplate[]
  onToggle?: (id: string) => void
  onEdit?: (id: string, subject: string, body: string) => void
}) {
  return (
    <Card>
      <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold mb-4">
        Email Templates
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((tpl) => (
          <EmailTemplateCard
            key={tpl.id}
            template={tpl}
            onToggle={() => onToggle?.(tpl.id)}
            onEdit={(subject, body) => onEdit?.(tpl.id, subject, body)}
          />
        ))}
      </div>
    </Card>
  )
}

/* ─── CHANNEL CONFIG (SMS / WhatsApp / Push) ─── */

function MaskedInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange?: (v: string) => void
  placeholder?: string
}) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="mb-4">
      <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={revealed ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 pr-10 rounded-lg border text-sm"
          style={{ borderColor: c.earth300, color: c.earth700, fontFamily: revealed ? fonts.mono : fonts.body }}
        />
        <button
          type="button"
          onClick={() => setRevealed(!revealed)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: c.earth500 }}
        >
          {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  )
}

function ChannelTemplateRow({
  tpl,
  onToggle,
  onEditTemplate,
  channelType,
}: {
  tpl: ChannelTemplate
  onToggle?: () => void
  onEditTemplate?: (id: string, template: string) => void
  channelType: 'sms' | 'whatsapp' | 'push'
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(tpl.template)

  const charLimit = channelType === 'sms' ? 160 : undefined
  const variableHints: Record<string, string[]> = {
    sms: ['{{customer_name}}', '{{order_id}}', '{{amount}}', '{{tracking_url}}', '{{otp}}'],
    whatsapp: ['{{customer_name}}', '{{order_id}}', '{{amount}}', '{{tracking_url}}', '{{store_name}}', '{{delivery_date}}'],
    push: ['{{customer_name}}', '{{product_name}}', '{{discount}}', '{{order_status}}'],
  }

  return (
    <div
      className="p-4 rounded-lg border mb-3"
      style={{ borderColor: c.earth300 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p style={{ color: c.earth700, fontFamily: fonts.body }} className="font-medium text-sm">
            {tpl.name}
          </p>
          <span
            className="inline-block text-xs mt-1 px-2 py-0.5 rounded-full"
            style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono }}
          >
            {tpl.triggerEvent}
          </span>
        </div>
        <ToggleSwitch enabled={tpl.isActive} onToggle={onToggle} />
      </div>

      {editing ? (
        <div className="mt-3">
          {channelType === 'push' && (
            <div className="mb-3">
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                defaultValue={tpl.name}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              />
            </div>
          )}
          <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-xs font-medium mb-1">
            {channelType === 'whatsapp' ? 'Meta-Approved Template' : 'Template Body'}
          </label>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={channelType === 'sms' ? 3 : 5}
            className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
            style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono, fontSize: '13px' }}
          />
          {charLimit && (
            <p className="text-xs mt-1" style={{ color: draft.length > charLimit ? c.error : c.earth500, fontFamily: fonts.mono }}>
              {draft.length}/{charLimit} characters
            </p>
          )}
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            <span style={{ color: c.earth500, fontFamily: fonts.body }} className="text-xs mr-1">Variables:</span>
            {variableHints[channelType].map((v) => (
              <button
                key={v}
                onClick={() => setDraft(prev => prev + ' ' + v)}
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ backgroundColor: c.primary50, color: c.primary500, fontFamily: fonts.mono, cursor: 'pointer' }}
              >
                {v}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { onEditTemplate?.(tpl.id, draft); setEditing(false) }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: c.primary500, color: c.card }}
            >
              <Save size={14} className="inline mr-1.5" />Save
            </button>
            <button
              onClick={() => { setDraft(tpl.template); setEditing(false) }}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: c.earth300, color: c.earth700 }}
            >
              <X size={14} className="inline mr-1.5" />Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p style={{ color: c.earth500, fontFamily: fonts.mono }} className="text-xs mt-2 whitespace-pre-wrap">
            {tpl.template}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="mt-3 px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{ backgroundColor: c.primary50, color: c.primary500, border: `1px solid ${c.primary200}` }}
          >
            <Edit2 size={14} className="inline mr-1.5" />Edit Template
          </button>
        </>
      )}
    </div>
  )
}

function SMSTab({
  config,
  onToggle,
  onSave,
  onToggleTemplate,
  onEditTemplate,
}: {
  config: SMSConfig
  onToggle?: (enabled: boolean) => void
  onSave?: (config: SMSConfig) => void
  onToggleTemplate?: (id: string) => void
  onEditTemplate?: (id: string, template: string) => void
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold">
          SMS Notifications
        </h3>
        <div className="flex items-center gap-3">
          <span style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm">
            {config.isEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <ToggleSwitch enabled={config.isEnabled} onToggle={() => onToggle?.(!config.isEnabled)} />
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: c.bg }}>
        <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-sm font-medium mb-3">
          Provider: <span style={{ color: c.primary500 }}>{config.provider.toUpperCase()}</span>
        </p>
        <MaskedInput label="API Key" value={config.apiKey} placeholder="Enter Twilio API key" />
        <div className="mb-4">
          <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
            Sender ID
          </label>
          <input
            type="text"
            value={config.senderId}
            readOnly
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono }}
          />
        </div>
        <button
          onClick={() => onSave?.(config)}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: c.primary500, color: c.card }}
        >
          <Save size={14} className="inline mr-1.5" />Save Config
        </button>
      </div>

      <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold mb-3">
        SMS Templates
      </h4>
      {config.templates.map((tpl) => (
        <ChannelTemplateRow key={tpl.id} tpl={tpl} channelType="sms" onToggle={() => onToggleTemplate?.(tpl.id)} onEditTemplate={(id, template) => onEditTemplate?.(id, template)} />
      ))}
    </Card>
  )
}

function WhatsAppTab({
  config,
  onToggle,
  onSave,
  onToggleTemplate,
  onEditTemplate,
}: {
  config: WhatsAppConfig
  onToggle?: (enabled: boolean) => void
  onSave?: (config: WhatsAppConfig) => void
  onToggleTemplate?: (id: string) => void
  onEditTemplate?: (id: string, template: string) => void
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold">
          WhatsApp Notifications
        </h3>
        <div className="flex items-center gap-3">
          <span style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm">
            {config.isEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <ToggleSwitch enabled={config.isEnabled} onToggle={() => onToggle?.(!config.isEnabled)} />
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: c.bg }}>
        <p style={{ color: c.earth600, fontFamily: fonts.body }} className="text-sm font-medium mb-3">
          Provider: <span style={{ color: c.primary500 }}>{config.provider}</span>
        </p>
        <div className="mb-4">
          <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
            Business Phone Number
          </label>
          <input
            type="text"
            value={config.phoneNumber}
            readOnly
            className="w-full px-3 py-2 rounded-lg border text-sm"
            style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono }}
          />
        </div>
        <button
          onClick={() => onSave?.(config)}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: c.primary500, color: c.card }}
        >
          <Save size={14} className="inline mr-1.5" />Save Config
        </button>
      </div>

      <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold mb-3">
        WhatsApp Templates
      </h4>
      {config.templates.map((tpl) => (
        <ChannelTemplateRow key={tpl.id} tpl={tpl} channelType="whatsapp" onToggle={() => onToggleTemplate?.(tpl.id)} onEditTemplate={(id, template) => onEditTemplate?.(id, template)} />
      ))}
    </Card>
  )
}

function PushTab({
  config,
  onToggle,
  onSave,
  onToggleTemplate,
  onEditTemplate,
}: {
  config: PushConfig
  onToggle?: (enabled: boolean) => void
  onSave?: (config: PushConfig) => void
  onToggleTemplate?: (id: string) => void
  onEditTemplate?: (id: string, template: string) => void
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold">
          Push Notifications
        </h3>
        <div className="flex items-center gap-3">
          <span style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm">
            {config.isEnabled ? 'Enabled' : 'Disabled'}
          </span>
          <ToggleSwitch enabled={config.isEnabled} onToggle={() => onToggle?.(!config.isEnabled)} />
        </div>
      </div>

      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: c.bg }}>
        <MaskedInput label="VAPID Public Key" value={config.vapidPublicKey} placeholder="Enter VAPID public key" />
        <button
          onClick={() => onSave?.(config)}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: c.primary500, color: c.card }}
        >
          <Save size={14} className="inline mr-1.5" />Save Config
        </button>
      </div>

      <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold mb-3">
        Push Templates
      </h4>
      {config.templates.map((tpl) => (
        <ChannelTemplateRow key={tpl.id} tpl={tpl} channelType="push" onToggle={() => onToggleTemplate?.(tpl.id)} onEditTemplate={(id, template) => onEditTemplate?.(id, template)} />
      ))}
    </Card>
  )
}

/* ─── IN-APP TAB ─── */

function AnnouncementRow({
  announcement,
  onToggle,
}: {
  announcement: InAppAnnouncement
  onToggle?: () => void
}) {
  const typeColors: Record<AnnouncementType, { bg: string; text: string }> = {
    banner: { bg: c.primary50, text: c.primary500 },
    modal: { bg: c.secondary50, text: c.secondary500 },
    toast: { bg: c.warningLight, text: c.warning },
  }
  const tc = typeColors[announcement.type]

  return (
    <div
      className="flex items-start justify-between gap-3 p-4 rounded-lg border mb-3"
      style={{ borderColor: c.earth300 }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 style={{ color: c.earth700, fontFamily: fonts.heading }} className="font-semibold text-sm">
            {announcement.title}
          </h4>
          <span
            className="text-xs px-2 py-0.5 rounded-full capitalize"
            style={{ backgroundColor: tc.bg, color: tc.text, fontFamily: fonts.body }}
          >
            {announcement.type}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: c.bg, color: c.earth500, fontFamily: fonts.body }}
          >
            {announcement.targetAudience}
          </span>
        </div>
        <p style={{ color: c.earth500, fontFamily: fonts.body }} className="text-sm mt-1">
          {announcement.message}
        </p>
        <p style={{ color: c.earth400, fontFamily: fonts.mono }} className="text-xs mt-2">
          {announcement.startDate} — {announcement.endDate}
        </p>
      </div>
      <ToggleSwitch enabled={announcement.isActive} onToggle={onToggle} />
    </div>
  )
}

function InAppTab({
  announcements,
  onToggle,
  onCreate,
}: {
  announcements: InAppAnnouncement[]
  onToggle?: (id: string) => void
  onCreate?: (announcement: Omit<InAppAnnouncement, 'id'>) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [audience, setAudience] = useState<TargetAudience>('all')
  const [type, setType] = useState<AnnouncementType>('banner')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleCreate = () => {
    onCreate?.({ title, message, targetAudience: audience, type, startDate, endDate, isActive: true })
    setTitle(''); setMessage(''); setStartDate(''); setEndDate('')
    setShowForm(false)
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold">
          In-App Announcements
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: c.primary500, color: c.card }}
        >
          <Plus size={14} className="inline mr-1.5" />{showForm ? 'Cancel' : 'Create Announcement'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              />
            </div>
            <div className="md:col-span-2">
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
                className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              />
            </div>
            <div>
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">Target Audience</label>
              <select
                value={audience} onChange={(e) => setAudience(e.target.value as TargetAudience)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              >
                <option value="all">All Users</option>
                <option value="new">New Users</option>
                <option value="returning">Returning Users</option>
                <option value="vip">VIP Users</option>
              </select>
            </div>
            <div>
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">Display Type</label>
              <select
                value={type} onChange={(e) => setType(e.target.value as AnnouncementType)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              >
                <option value="banner">Banner</option>
                <option value="modal">Modal</option>
                <option value="toast">Toast</option>
              </select>
            </div>
            <div>
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              />
            </div>
            <div>
              <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm"
                style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.body }}
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: c.primary500, color: c.card }}
          >
            <Check size={14} className="inline mr-1.5" />Create
          </button>
        </div>
      )}

      {announcements.map((ann) => (
        <AnnouncementRow key={ann.id} announcement={ann} onToggle={() => onToggle?.(ann.id)} />
      ))}
    </Card>
  )
}

/* ─── INTEGRATIONS SECTION ─── */

function IntegrationsSection({
  integrations,
  onSave,
}: {
  integrations: IntegrationConfig
  onSave?: (integrations: IntegrationConfig) => void
}) {
  return (
    <Card className="mt-6">
      <h3 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-xl font-semibold mb-6">
        <Link2 size={20} className="inline mr-2" style={{ color: c.primary500 }} />
        Integrations
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Listmonk */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}>
          <div className="flex items-center justify-between mb-3">
            <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold">
              Listmonk
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: integrations.listmonk.isConnected ? c.success : c.error }} />
              <span style={{ color: integrations.listmonk.isConnected ? c.success : c.error, fontFamily: fonts.body }} className="text-xs font-medium">
                {integrations.listmonk.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
            Instance URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={integrations.listmonk.url}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono }}
            />
            <a
              href={integrations.listmonk.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg"
              style={{ backgroundColor: c.primary50, color: c.primary500 }}
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Chatwoot */}
        <div className="p-4 rounded-lg" style={{ backgroundColor: c.bg, border: `1px solid ${c.earth300}` }}>
          <div className="flex items-center justify-between mb-3">
            <h4 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="font-semibold">
              Chatwoot
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: integrations.chatwoot.isConnected ? c.success : c.error }} />
              <span style={{ color: integrations.chatwoot.isConnected ? c.success : c.error, fontFamily: fonts.body }} className="text-xs font-medium">
                {integrations.chatwoot.isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <label style={{ color: c.earth600, fontFamily: fonts.body }} className="block text-sm font-medium mb-1">
            Instance URL
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={integrations.chatwoot.url}
              readOnly
              className="flex-1 px-3 py-2 rounded-lg border text-sm"
              style={{ borderColor: c.earth300, color: c.earth700, fontFamily: fonts.mono }}
            />
            <a
              href={integrations.chatwoot.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg"
              style={{ backgroundColor: c.primary50, color: c.primary500 }}
            >
              <ExternalLink size={16} />
            </a>
          </div>
          <MaskedInput label="Widget Token" value={integrations.chatwoot.widgetToken} placeholder="Enter widget token" />
        </div>
      </div>

      <button
        onClick={() => onSave?.(integrations)}
        className="mt-4 px-4 py-2 rounded-lg text-sm font-medium"
        style={{ backgroundColor: c.primary500, color: c.card }}
      >
        <Save size={14} className="inline mr-1.5" />Save Integration Settings
      </button>
    </Card>
  )
}

/* ─── MAIN COMPONENT ─── */

export function AdminNotifications({
  activeChannel,
  emailTemplates,
  smsConfig,
  whatsappConfig,
  pushConfig,
  inAppAnnouncements,
  integrations,
  onChangeChannel,
  onToggleEmailTemplate,
  onEditEmailTemplate,
  onToggleSMS,
  onSaveSMSConfig,
  onToggleSMSTemplate,
  onEditSMSTemplate,
  onToggleWhatsApp,
  onSaveWhatsAppConfig,
  onToggleWhatsAppTemplate,
  onEditWhatsAppTemplate,
  onTogglePush,
  onSavePushConfig,
  onTogglePushTemplate,
  onEditPushTemplate,
  onToggleAnnouncement,
  onCreateAnnouncement,
  onSaveIntegrations,
}: AdminNotificationsProps) {
  return (
    <div style={{ fontFamily: fonts.body }}>
      <div className="max-w-5xl mx-auto">
        <h2 style={{ fontFamily: fonts.heading, color: c.earth700 }} className="text-2xl font-semibold mb-6">
          Notifications & Communication
        </h2>

        {/* Channel Tabs */}
        <div className="border-b mb-6 overflow-x-auto" style={{ borderColor: c.earth300 }}>
          <div className="flex gap-1 min-w-max">
            {channelTabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeChannel === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => onChangeChannel?.(tab.id)}
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

        {/* Active Channel Content */}
        {activeChannel === 'email' && (
          <EmailTab templates={emailTemplates} onToggle={onToggleEmailTemplate} onEdit={onEditEmailTemplate} />
        )}
        {activeChannel === 'sms' && (
          <SMSTab config={smsConfig} onToggle={onToggleSMS} onSave={onSaveSMSConfig} onToggleTemplate={onToggleSMSTemplate} onEditTemplate={onEditSMSTemplate} />
        )}
        {activeChannel === 'whatsapp' && (
          <WhatsAppTab config={whatsappConfig} onToggle={onToggleWhatsApp} onSave={onSaveWhatsAppConfig} onToggleTemplate={onToggleWhatsAppTemplate} onEditTemplate={onEditWhatsAppTemplate} />
        )}
        {activeChannel === 'push' && (
          <PushTab config={pushConfig} onToggle={onTogglePush} onSave={onSavePushConfig} onToggleTemplate={onTogglePushTemplate} onEditTemplate={onEditPushTemplate} />
        )}
        {activeChannel === 'inapp' && (
          <InAppTab announcements={inAppAnnouncements} onToggle={onToggleAnnouncement} onCreate={onCreateAnnouncement} />
        )}

        {/* Integrations always visible */}
        <IntegrationsSection integrations={integrations} onSave={onSaveIntegrations} />
      </div>
    </div>
  )
}
