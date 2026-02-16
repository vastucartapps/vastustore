# Admin Storefront & Content

## Overview
Admin interface for managing storefront appearance and content. Includes announcement ribbon editor with scheduling, store branding settings, homepage section ordering with visibility toggles, content page editor for static pages, and footer management.

## Components
| Component | Description |
|-----------|-------------|
| `AdminStorefront.tsx` | Tabbed interface: Announcement, Branding, Homepage Sections, Content Pages, Footer |

## Data Shapes
| Type | Description |
|------|-------------|
| `Announcement` | Ribbon config with message, link, colors, schedule |
| `Branding` | Store name, tagline, contact info, logo, favicon |
| `HomepageSection` | Section with name, type, enabled toggle, order |
| `ContentPage` | Static page with title, slug, published status |
| `FooterConfig` | Footer columns with links, copyright, social toggle |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onUpdateAnnouncement` | Admin saves announcement settings |
| `onUpdateBranding` | Admin saves branding info |
| `onReorderSection` | Admin moves a homepage section up/down |
| `onToggleSection` | Admin enables/disables a homepage section |
| `onEditPage` | Admin edits content page text |
| `onTogglePagePublish` | Admin publishes/unpublishes a page |
| `onUpdateFooter` | Admin saves footer configuration |
