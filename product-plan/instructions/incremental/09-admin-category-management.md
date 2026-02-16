# Milestone 9 — Admin Category Management

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

Admin interface for managing the product category hierarchy. Two-panel layout: expandable/collapsible tree on the left, category details on the right. Category add/edit is a full-page form with image upload, SEO fields, parent selection, display order, and active/inactive toggle. Deleting a category prompts for product reassignment.

## Key Functionality

- Expandable/collapsible category tree showing parent-child hierarchy
- Click a category in the tree to see its details in the right panel
- Full-page add/edit form: title, description, image upload, URL slug (auto-generated from title), SEO meta title/description, parent category dropdown, display order, active/inactive toggle
- Delete category with confirmation dialog and product reassignment option
- Drag-and-drop reorder categories within the same level
- Toggle category active/inactive directly from the tree view

## Components Provided

- `AdminCategoryManagement` — Top-level section with tree + detail panels
- `CategoryTree` — Left panel with expandable/collapsible hierarchy
- `CategoryDetail` — Right panel showing selected category info
- `CategoryForm` — Full-page add/edit form

## Props Reference

### Types

| Type | Values |
|------|--------|
| `CategoryStatus` | `'active' \| 'inactive'` |

### Key Interfaces

- `Category` — `{ id, name, slug, description, imageUrl, parentId, parentName, status, productCount, displayOrder, children[], seo: { metaTitle, metaDescription }, createdAt, updatedAt }`
- `CategoryOption` — `{ id, name, depth }` (flat list for parent dropdown)

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onSelectCategory` | `(categoryId: string) => void` | Fetch category detail, display in right panel |
| `onAddCategory` | `() => void` | Navigate to category form in create mode |
| `onEditCategory` | `(categoryId: string) => void` | Navigate to category form in edit mode |
| `onDeleteCategory` | `(categoryId: string, reassignTo?: string) => void` | Show confirmation with product count; `DELETE /admin/product-categories/{id}` via Medusa v2; reassign products if specified |
| `onToggleStatus` | `(categoryId: string) => void` | `PUT /admin/product-categories/{id}` toggle active/inactive |
| `onReorder` | `(categoryId: string, newOrder: number) => void` | `PUT /admin/product-categories/{id}` update display order |
| `onSaveCategory` | `(data: Partial<Category>) => void` | `POST` (create) or `PUT` (update) `/admin/product-categories` via Medusa v2 |
| `onCancelEdit` | `() => void` | Return to tree + detail view |
| `onImageUpload` | `(file: File) => void` | Upload image to storage (Supabase Storage or S3), return URL for category |

## User Flows

### Flow 1: Add a New Category
1. Admin clicks "Add Category" button
2. Full-page form opens with empty fields
3. Admin enters title — URL slug auto-generates from title
4. Admin uploads a category image, fills description, selects parent category (or none for root), sets display order, fills SEO meta fields, toggles active
5. Admin clicks "Save"
6. `onSaveCategory` fires; category is created via Medusa v2 API
7. **Outcome:** New category appears in the tree at the correct position

### Flow 2: Delete a Category with Products
1. Admin selects a category in the tree that has 12 products
2. Admin clicks "Delete" in the detail panel
3. Confirmation modal shows: "This category has 12 products. Reassign them to another category or delete?"
4. Admin selects a reassignment category from the dropdown
5. `onDeleteCategory(id, reassignToId)` fires
6. Products are reassigned, then the category is deleted via Medusa v2
7. **Outcome:** Category is removed from tree; products appear under the new category

### Flow 3: Reorder Categories
1. Admin drags a category card within the tree to a new position in the same level
2. `onReorder` fires with the category ID and new display order
3. Display order is updated via Medusa v2 API
4. **Outcome:** Tree reflects the new order

## Empty States

- **No categories:** Show "No categories yet" with an "Add Category" call-to-action
- **No category selected:** Right detail panel shows "Select a category from the tree"
- **Category with no products:** Detail panel shows product count as 0
- **Loading:** Skeleton placeholders for tree and detail panel

## Files to Reference

- `product/sections/admin-category-management/spec.md` — Full specification
- `product/sections/admin-category-management/types.ts` — TypeScript interfaces
- `product/sections/admin-category-management/data.json` — Sample data
- `src/sections/admin-category-management/` — Screen design components

## Done When

- [ ] Category tree loads real categories from Medusa v2 `GET /admin/product-categories`
- [ ] Tree nodes expand/collapse to show parent-child hierarchy
- [ ] Clicking a category shows its details in the right panel with real data
- [ ] Add category form creates a new category via Medusa v2 API
- [ ] Edit category form loads existing data and updates via API
- [ ] URL slug auto-generates from title (editable)
- [ ] Image upload stores the image and associates it with the category
- [ ] SEO meta fields (title, description) save correctly
- [ ] Parent category dropdown shows all available categories at correct depth
- [ ] Display order input controls position in the tree
- [ ] Active/inactive toggle updates category status via API
- [ ] Delete with product reassignment works — products move to the selected category
- [ ] Drag-and-drop reorder updates display order via API
- [ ] Responsive: panels stack vertically on mobile (tree on top)
- [ ] Loading, error, and empty states all render correctly
- [ ] Light and dark mode both render correctly
