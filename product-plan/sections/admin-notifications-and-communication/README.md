# Admin Notifications & Communication

## Overview
Multi-channel notification management with tabbed interface for Email, SMS, WhatsApp, Push, and In-App channels. Includes email template editing, provider configuration for SMS/WhatsApp/Push, in-app announcement broadcasting, and integration settings for Listmonk and Chatwoot.

## Components
| Component | Description |
|-----------|-------------|
| `AdminNotifications.tsx` | Channel-tabbed interface with templates, config, and integration settings |

## Data Shapes
| Type | Description |
|------|-------------|
| `EmailTemplate` | Email template with name, subject, trigger event, active status |
| `SMSConfig` | Twilio provider config with API key and templates |
| `WhatsAppConfig` | WhatsApp Business config with phone and templates |
| `PushConfig` | Push notification config with VAPID key and templates |
| `InAppAnnouncement` | Announcement with audience, schedule, type (banner/modal/toast) |
| `IntegrationConfig` | Listmonk and Chatwoot connection settings |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onChangeChannel` | Admin switches channel tab |
| `onToggleEmailTemplate` | Admin enables/disables an email template |
| `onEditEmailTemplate` | Admin edits email subject and body |
| `onToggleSMS` | Admin enables/disables SMS channel |
| `onSaveSMSConfig` | Admin saves SMS provider config |
| `onToggleWhatsApp` | Admin enables/disables WhatsApp |
| `onTogglePush` | Admin enables/disables push notifications |
| `onCreateAnnouncement` | Admin creates in-app announcement |
| `onSaveIntegrations` | Admin saves Listmonk/Chatwoot settings |
