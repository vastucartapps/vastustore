export type ChannelTab = 'email' | 'sms' | 'whatsapp' | 'push' | 'inapp'

export type AnnouncementType = 'banner' | 'modal' | 'toast'
export type TargetAudience = 'all' | 'new' | 'returning' | 'vip'

export interface EmailTemplate {
  id: string
  name: string
  subject: string
  description: string
  isActive: boolean
  lastEdited: string
  triggerEvent: string
}

export interface ChannelTemplate {
  id: string
  name: string
  template: string
  triggerEvent: string
  isActive: boolean
}

export interface SMSConfig {
  provider: string
  apiKey: string
  senderId: string
  isEnabled: boolean
  templates: ChannelTemplate[]
}

export interface WhatsAppConfig {
  provider: string
  phoneNumber: string
  isEnabled: boolean
  templates: ChannelTemplate[]
}

export interface PushConfig {
  isEnabled: boolean
  vapidPublicKey: string
  templates: ChannelTemplate[]
}

export interface InAppAnnouncement {
  id: string
  title: string
  message: string
  targetAudience: TargetAudience
  startDate: string
  endDate: string
  isActive: boolean
  type: AnnouncementType
}

export interface IntegrationConfig {
  listmonk: { url: string; isConnected: boolean }
  chatwoot: { url: string; isConnected: boolean; widgetToken: string }
}

export interface AdminNotificationsProps {
  activeChannel: ChannelTab
  emailTemplates: EmailTemplate[]
  smsConfig: SMSConfig
  whatsappConfig: WhatsAppConfig
  pushConfig: PushConfig
  inAppAnnouncements: InAppAnnouncement[]
  integrations: IntegrationConfig

  onChangeChannel?: (channel: ChannelTab) => void
  onToggleEmailTemplate?: (templateId: string) => void
  onEditEmailTemplate?: (templateId: string, subject: string, body: string) => void
  onToggleSMS?: (enabled: boolean) => void
  onSaveSMSConfig?: (config: SMSConfig) => void
  onToggleSMSTemplate?: (templateId: string) => void
  onEditSMSTemplate?: (templateId: string, template: string) => void
  onToggleWhatsApp?: (enabled: boolean) => void
  onSaveWhatsAppConfig?: (config: WhatsAppConfig) => void
  onToggleWhatsAppTemplate?: (templateId: string) => void
  onEditWhatsAppTemplate?: (templateId: string, template: string) => void
  onTogglePush?: (enabled: boolean) => void
  onSavePushConfig?: (config: PushConfig) => void
  onTogglePushTemplate?: (templateId: string) => void
  onEditPushTemplate?: (templateId: string, template: string) => void
  onToggleAnnouncement?: (announcementId: string) => void
  onCreateAnnouncement?: (announcement: Omit<InAppAnnouncement, 'id'>) => void
  onSaveIntegrations?: (integrations: IntegrationConfig) => void
}
