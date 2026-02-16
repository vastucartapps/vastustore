# Admin Product Management

## Overview
Admin interface for managing the full product catalog. Includes product list with card grid/table toggle, search and filters, bulk actions (delete, activate, deactivate, export CSV), and an 8-step product add/edit wizard with a live storefront preview panel.

## Components
| Component | Description |
|-----------|-------------|
| `AdminProductManagement.tsx` | Root component switching between list and wizard views |
| `ProductList.tsx` | Product grid/table with search, filters, bulk actions |
| `ProductWizard.tsx` | 8-step wizard: Basic, Variants, Images, Rich Content, Specs, FAQs, SEO, Merchant |

## Data Shapes
| Type | Description |
|------|-------------|
| `Product` | Product list item with name, SKU, price, stock, status |
| `ProductDetail` | Full product with variants, images, rich content, specs, FAQs, SEO |
| `ProductVariant` | Variant with SKU, price, stock level |
| `RichContentBlock` | A+ content block (text, image, comparison, banner) |
| `ProductSEO` | SEO metadata (title, description, slug, canonical) |
| `MerchantCentreData` | Google Merchant Centre fields |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onAddProduct` | Admin clicks "Add Product" |
| `onEditProduct` | Admin clicks a product to edit |
| `onDeleteProduct` | Admin deletes a product |
| `onDuplicateProduct` | Admin duplicates a product |
| `onBulkAction` | Admin applies bulk action to selected products |
| `onSaveDraft` | Admin saves product as draft |
| `onPublish` | Admin publishes a product |
| `onImportCSV` | Admin uploads a CSV file |
| `onExportCSV` | Admin exports products to CSV |
