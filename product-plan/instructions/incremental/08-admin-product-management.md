# Milestone 8 — Admin Product Management

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

Full product catalog management with a list view (card grid + table toggle), search/filters, bulk actions, and an 8-step product add/edit wizard with live storefront preview. Supports dual-currency pricing (INR + USD manually set), per-variant inventory, rich A+ content editing, specifications, FAQs, SEO fields, and Google Merchant Centre fields. Includes CSV import/export for bulk operations.

## Key Functionality

- Product list with card grid (default) and table view toggle
- Search by name, SKU, or category with autocomplete
- Filters: status (active/inactive/draft), category, stock level
- Bulk actions: delete, activate, deactivate, export CSV (checkbox selection)
- 8-step product wizard: Basic Info, Variants & Pricing, Images, Rich Content (A+), Specifications & Attributes, FAQs, SEO & URL, Google Merchant Centre
- Live preview panel showing storefront product appearance as fields are filled
- Save as draft at any step; publish when all required steps are complete
- Duplicate product from the list
- CSV import via drag-and-drop upload
- Dual-currency pricing: INR and USD prices set manually per variant
- Per-variant inventory tracking with stock level badges

## Components Provided

- `AdminProductManagement` — Top-level section component
- `ProductList` — Card grid / table view with filters and bulk actions
- `ProductWizard` — 8-step form with live preview panel

## Props Reference

### Types

| Type | Values |
|------|--------|
| `ProductStatus` | `'active' \| 'inactive' \| 'draft'` |
| `StockLevel` | `'in_stock' \| 'low_stock' \| 'out_of_stock'` |
| `WizardStep` | `'basic' \| 'variants' \| 'images' \| 'rich-content' \| 'specs' \| 'faqs' \| 'seo' \| 'merchant'` |
| `BulkAction` | `'delete' \| 'activate' \| 'deactivate' \| 'export'` |
| `ViewMode` | `'grid' \| 'table'` |

### Key Interfaces

- `Product` — `{ id, name, sku, category, categoryId, status, price, mrp, currency, stock, stockLevel, imageUrl, rating, reviewCount, variantCount, createdAt, updatedAt }`
- `ProductDetail` extends `Product` — adds `description, shortDescription, variants[], images[], richContent[], specs[], faqs[], seo, merchantCentre, tags[], hsnCode, gstRate`
- `ProductVariant` — `{ id, sku, label, price, mrp, currency, stock, stockLevel }`
- `ProductImage` — `{ id, url, alt, isPrimary, sortOrder }`
- `RichContentBlock` — `{ id, type, title, content, imageUrl? }`
- `ProductSpec` — `{ id, label, value, group }`
- `ProductFAQ` — `{ id, question, answer }`
- `ProductSEO` — `{ metaTitle, metaDescription, urlSlug, canonicalUrl }`
- `MerchantCentreData` — `{ gtin, mpn, brand, condition, ageGroup, gender, googleCategory }`
- `ProductFilters` — `{ search, status, category, stockLevel }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeViewMode` | `(mode: ViewMode) => void` | Toggle local state between grid and table |
| `onChangeFilters` | `(filters: Partial<ProductFilters>) => void` | Refetch products from Medusa v2 with updated filters |
| `onSearch` | `(query: string) => void` | Search products via `GET /admin/products?q=` |
| `onAddProduct` | `() => void` | Open wizard in create mode |
| `onEditProduct` | `(productId: string) => void` | Fetch product detail via `GET /admin/products/{id}` and open wizard |
| `onDuplicateProduct` | `(productId: string) => void` | Fetch product, pre-fill wizard with data (clear ID/SKU) |
| `onDeleteProduct` | `(productId: string) => void` | Confirm then `DELETE /admin/products/{id}` |
| `onBulkAction` | `(action: BulkAction, productIds: string[]) => void` | Batch API calls for selected products |
| `onImportCSV` | `(file: File) => void` | Parse CSV, validate, batch create via Medusa v2 |
| `onExportCSV` | `() => void` | Fetch all products, generate CSV download |
| `onSaveDraft` | `(data: Partial<ProductDetail>) => void` | `POST/PUT /admin/products` with `status: 'draft'` |
| `onPublish` | `(data: Partial<ProductDetail>) => void` | `POST/PUT /admin/products` with `status: 'active'` |
| `onCancelEdit` | `() => void` | Return to product list, discard unsaved changes |

## User Flows

### Flow 1: Add a New Product
1. Admin clicks "Add Product" on the product list page
2. Wizard opens at Step 1 (Basic Info) with empty fields
3. Admin fills in name, description, category, HSN code, GST rate, tags
4. Admin clicks Next to proceed through each step — Variants & Pricing (set INR + USD prices per variant), Images (upload/reorder), Rich Content (add A+ blocks), Specs, FAQs, SEO, Google Merchant
5. Live preview panel updates as fields are filled
6. Admin clicks "Publish" on the final step
7. `onPublish` fires; product is created via Medusa v2 API with all data
8. **Outcome:** Product appears in the catalog as active with all variants, images, and metadata

### Flow 2: Bulk Deactivate Products
1. Admin checks the checkboxes on several product cards/rows
2. Bulk action toolbar appears at the top
3. Admin clicks "Deactivate" from the bulk actions
4. Confirmation dialog appears showing the count of selected products
5. `onBulkAction('deactivate', productIds)` fires
6. Each product's status is updated to inactive via Medusa v2
7. **Outcome:** Selected products are deactivated and show inactive status badges

### Flow 3: Import Products via CSV
1. Admin clicks "Import CSV" button
2. Drag-and-drop upload area appears
3. Admin drops a CSV file
4. `onImportCSV` fires; file is parsed and validated
5. Preview of import results shown (valid rows, errors)
6. Admin confirms import
7. Products are created in Medusa v2 via batch API
8. **Outcome:** New products appear in the catalog

### Flow 4: Edit Product Pricing
1. Admin clicks a product in the list to open the wizard in edit mode
2. Admin navigates to Step 2 (Variants & Pricing)
3. Admin updates INR and USD prices for specific variants
4. Admin clicks "Save Draft" or "Publish"
5. **Outcome:** Variant prices are updated in Medusa v2

## Empty States

- **No products:** Show "No products yet" with an "Add Product" call-to-action button
- **No search results:** Show "No products match your search" with option to clear filters
- **Wizard loading:** Show skeleton for the current step form
- **No variants:** Show "Add at least one variant" prompt in the Variants step
- **No images:** Show upload dropzone placeholder in the Images step

## Files to Reference

- `product/sections/admin-product-management/spec.md` — Full specification
- `product/sections/admin-product-management/types.ts` — TypeScript interfaces
- `product/sections/admin-product-management/data.json` — Sample data
- `src/sections/admin-product-management/` — Screen design components

## Done When

- [ ] Product list loads real products from Medusa v2 `GET /admin/products`
- [ ] Card grid and table view toggle works
- [ ] Search filters products by name, SKU, or category via Medusa v2 API
- [ ] Status, category, and stock level filters work against the API
- [ ] Bulk actions (delete, activate, deactivate, export) work on selected products
- [ ] 8-step wizard creates a new product with all fields saved to Medusa v2
- [ ] Editing a product loads all existing data into the wizard
- [ ] Variants have dual-currency pricing (INR + USD) that saves correctly
- [ ] Per-variant inventory tracking displays correct stock levels
- [ ] Image upload stores images and associates them with the product
- [ ] Rich content (A+ blocks) saves and renders correctly
- [ ] SEO fields and Google Merchant Centre fields persist
- [ ] CSV import parses, validates, and creates products in Medusa v2
- [ ] CSV export downloads all products as a CSV file
- [ ] Duplicate product pre-fills wizard with copied data
- [ ] Live preview panel updates as fields are edited
- [ ] Save Draft saves with status "draft"; Publish saves with status "active"
- [ ] Loading, error, and empty states all render correctly
- [ ] Responsive: wizard goes single-column on mobile with preview behind toggle
- [ ] Light and dark mode both render correctly
