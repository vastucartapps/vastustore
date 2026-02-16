# Milestone 20 — Admin: Notifications & Communication

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend (Medusa v2 APIs + Supabase)
- Implement loading, error, and empty states
- Every touch point must be functional — no dead buttons, no hardcoded data

The components are props-based — they accept data and fire callbacks. Wire them to Medusa v2 APIs, Supabase auth, and your state management.

---

## Overview

Multi-channel notification management for VastuCart. Tabbed interface organized by channel (Email, SMS, WhatsApp, Push, In-App) with template editing, provider configuration, and in-app announcement broadcasting. Includes integration settings for Listmonk (email marketing) and Chatwoot (live chat) always visible at the bottom.

## Key Functionality

- **Email tab:** Card grid of email templates (Order Confirmation, Shipping Update, Delivery Confirmation, Abandoned Cart, Welcome, Password Reset) with subject line, trigger event, active toggle, and inline editor for subject + body
- **SMS tab:** Twilio provider config (API key masked, Sender ID, enable toggle) plus template list with message preview, character count, variable placeholders, and active toggles
- **WhatsApp tab:** WhatsApp Business provider config (phone number, enable toggle) plus Meta-approved template list with active toggles
- **Push tab:** VAPID public key config, enable toggle, template list with title and body preview
- **In-App tab:** Announcement list with title, message, audience targeting (all/new/returning/VIP), date range, type (banner/modal/toast), active toggle; "Create Announcement" form
- **Integrations section (always visible):** Listmonk URL + connection status, Chatwoot URL + widget token + connection status

## Components Provided

| Component | Description |
|-----------|-------------|
| `AdminNotifications` | Root component with 5 channel tabs and bottom integrations section |

## Props Reference

### Data Props

| Prop | Type | Description |
|------|------|-------------|
| `activeChannel` | `ChannelTab` | Currently active channel tab |
| `emailTemplates` | `EmailTemplate[]` | Email template configurations |
| `smsConfig` | `SMSConfig` | SMS provider config and templates |
| `whatsappConfig` | `WhatsAppConfig` | WhatsApp provider config and templates |
| `pushConfig` | `PushConfig` | Push notification config and templates |
| `inAppAnnouncements` | `InAppAnnouncement[]` | In-app announcements list |
| `integrations` | `IntegrationConfig` | Listmonk + Chatwoot settings |

### Key Types

```ts
type ChannelTab = 'email' | 'sms' | 'whatsapp' | 'push' | 'inapp'
type AnnouncementType = 'banner' | 'modal' | 'toast'
type TargetAudience = 'all' | 'new' | 'returning' | 'vip'

interface EmailTemplate {
  id: string; name: string; subject: string; description: string
  isActive: boolean; lastEdited: string; triggerEvent: string
}

interface ChannelTemplate {
  id: string; name: string; template: string; triggerEvent: string; isActive: boolean
}

interface SMSConfig {
  provider: string; apiKey: string; senderId: string
  isEnabled: boolean; templates: ChannelTemplate[]
}

interface WhatsAppConfig {
  provider: string; phoneNumber: string; isEnabled: boolean; templates: ChannelTemplate[]
}

interface PushConfig {
  isEnabled: boolean; vapidPublicKey: string; templates: ChannelTemplate[]
}

interface InAppAnnouncement {
  id: string; title: string; message: string; targetAudience: TargetAudience
  startDate: string; endDate: string; isActive: boolean; type: AnnouncementType
}

interface IntegrationConfig {
  listmonk: { url: string; isConnected: boolean }
  chatwoot: { url: string; isConnected: boolean; widgetToken: string }
}
```

### Callback Props

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeChannel` | `(channel) => void` | Local state / URL param |
| `onToggleEmailTemplate` | `(templateId) => void` | Toggle email template active state in Supabase |
| `onEditEmailTemplate` | `(templateId, subject, body) => void` | Save email template to Supabase / Listmonk |
| `onToggleSMS` | `(enabled) => void` | Enable/disable SMS channel |
| `onSaveSMSConfig` | `(config) => void` | Save Twilio API key and sender ID to Supabase |
| `onToggleSMSTemplate` | `(templateId) => void` | Toggle SMS template active state |
| `onEditSMSTemplate` | `(templateId, template) => void` | Save SMS template text |
| `onToggleWhatsApp` | `(enabled) => void` | Enable/disable WhatsApp channel |
| `onSaveWhatsAppConfig` | `(config) => void` | Save WhatsApp Business config |
| `onToggleWhatsAppTemplate` | `(templateId) => void` | Toggle WhatsApp template active state |
| `onEditWhatsAppTemplate` | `(templateId, template) => void` | Save WhatsApp template |
| `onTogglePush` | `(enabled) => void` | Enable/disable push notifications |
| `onSavePushConfig` | `(config) => void` | Save VAPID key config |
| `onTogglePushTemplate` | `(templateId) => void` | Toggle push template active state |
| `onEditPushTemplate` | `(templateId, template) => void` | Save push template |
| `onToggleAnnouncement` | `(announcementId) => void` | Toggle in-app announcement active state |
| `onCreateAnnouncement` | `(announcement) => void` | Create new in-app announcement in Supabase |
| `onSaveIntegrations` | `(integrations) => void` | Save Listmonk/Chatwoot URLs and tokens |

## User Flows

### Flow 1: Edit an Email Template

1. Admin opens the Email tab
2. Sees card grid of 6 email templates — each shows name, trigger event, subject, active toggle
3. Clicks "Edit Template" on "Order Confirmation"
4. Inline editor expands with subject input and body textarea
5. Admin updates the subject line and body with variable placeholders (e.g., `{{customer_name}}`, `{{order_id}}`)
6. Clicks Save
7. **Outcome:** Updated template saved to Supabase, used for all future order confirmation emails

### Flow 2: Configure SMS Provider and Templates

1. Admin opens the SMS tab
2. Enters Twilio API Key (masked), Sender ID
3. Toggles SMS to enabled
4. Scrolls to template list, clicks edit on "Order Shipped" template
5. Edits message: "Hi {{name}}, your order #{{order_id}} has been shipped! Track: {{tracking_url}}"
6. Character counter shows 95/160
7. Clicks Save
8. **Outcome:** SMS sends via Twilio when orders ship, using the updated template

### Flow 3: Create an In-App Announcement

1. Admin opens the In-App tab
2. Clicks "Create Announcement"
3. Fills in: title "Diwali Sale", message "Up to 40% off on all Vastu products!", audience "all", type "banner", start/end dates
4. Toggles active to ON
5. Clicks Create
6. **Outcome:** Banner announcement shows to all users on the storefront within the scheduled dates

### Flow 4: Connect Chatwoot for Live Chat

1. Admin scrolls to the Integrations section (always visible at bottom)
2. Enters Chatwoot URL and widget token
3. Clicks Save — system tests the connection
4. Status shows "Connected" with green indicator
5. **Outcome:** Chatwoot live chat widget appears on the storefront

## Empty States

| State | Message |
|-------|---------|
| No email templates | "No email templates configured. Set up templates for automated customer emails." |
| SMS not configured | "SMS provider not configured. Enter your Twilio credentials to enable SMS notifications." |
| WhatsApp not configured | "WhatsApp Business not connected. Configure your WhatsApp number to send messages." |
| No in-app announcements | "No announcements created. Create one to broadcast messages to your customers." |
| Integrations not connected | Connection status shows "Not Connected" with setup instructions |

## Files to Reference

| File | Path |
|------|------|
| Spec | `product/sections/admin-notifications-and-communication/spec.md` |
| Types | `product/sections/admin-notifications-and-communication/types.ts` |
| Sample Data | `product/sections/admin-notifications-and-communication/data.json` |
| Components | `src/sections/admin-notifications-and-communication/components/` |

## Done When

- [ ] Email templates load from Supabase and display in card grid
- [ ] Email template inline editor saves subject + body with variable placeholders
- [ ] Email template active toggles persist
- [ ] SMS provider config (Twilio) saves API key (encrypted) and sender ID
- [ ] SMS templates save with character count validation
- [ ] SMS enable/disable toggle controls whether SMS sends
- [ ] WhatsApp Business config saves phone number and provider settings
- [ ] WhatsApp templates (Meta-approved) display and toggle correctly
- [ ] Push notification VAPID key saves and templates display
- [ ] In-app announcement creation form is fully functional with all fields
- [ ] Announcement audience targeting, date scheduling, and type selection work
- [ ] Announcement active toggle controls visibility on storefront
- [ ] Listmonk URL saves and connection status reflects real state
- [ ] Chatwoot URL + widget token saves and live chat widget appears on storefront
- [ ] API keys are masked with reveal buttons where applicable
- [ ] Variable placeholders in templates are documented and validated
- [ ] All saves show success/error feedback
- [ ] Loading states while fetching configs
- [ ] Dark mode renders correctly
