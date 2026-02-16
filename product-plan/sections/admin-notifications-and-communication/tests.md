# Test Specs: Admin Notifications & Communication

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Email Templates
**Success Path:**
- Card grid of email templates (Order Confirmation, Shipping Update, etc.)
- Each card shows name, trigger event, subject, active toggle
- Click "Edit Template" reveals inline editor with subject input and body textarea
- Toggle triggers `onToggleEmailTemplate`
- Save triggers `onEditEmailTemplate`

### Flow 2: SMS Configuration
**Success Path:**
- Switch to SMS tab
- Provider config: API Key (masked), Sender ID, enable toggle
- Template list with message preview and active toggles
- Save config triggers `onSaveSMSConfig`

### Flow 3: WhatsApp Configuration
**Success Path:**
- Switch to WhatsApp tab
- Phone number config, enable toggle
- Template list with previews
- Save triggers `onSaveWhatsAppConfig`

### Flow 4: Push Notifications
**Success Path:**
- Switch to Push tab
- VAPID public key config, enable toggle
- Template list with title and body preview

### Flow 5: In-App Announcements
**Success Path:**
- Switch to In-App tab
- Announcement list with title, audience, date range, type, active toggle
- Create form: title, message, audience selector, date range, type (banner/modal/toast)
- `onCreateAnnouncement` called with form data

### Flow 6: Integrations
- Listmonk: URL input, connection status indicator
- Chatwoot: URL, widget token, connection status
- Save triggers `onSaveIntegrations`

## Empty State Tests
- No email templates: empty grid
- No SMS templates: empty list
- No announcements: empty with "Create Announcement" CTA

## Edge Cases
- Masked API keys with reveal toggle
- Channel enable/disable controls visibility of sub-settings
- Template editing preserves content on cancel
- Integrations section always visible across all tabs
