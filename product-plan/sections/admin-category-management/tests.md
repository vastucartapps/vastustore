# Test Specs: Admin Category Management

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Category Tree Browse
**Success Path:**
- Tree renders with expand/collapse arrows for parent categories
- Each node shows thumbnail, name, product count badge, status dot
- Click category selects it and shows details in right panel
- Expand/collapse toggles children visibility

### Flow 2: Category Detail Panel
**Success Path:**
- Shows large image, title, description, parent breadcrumb, product count
- Quick action buttons: Edit, Delete, Toggle Active
- Toggle active/inactive directly from detail panel

### Flow 3: Add/Edit Category
**Success Path:**
- "Add Category" opens full-page form
- Form includes: image upload, title, description, parent dropdown, URL slug, SEO meta, display order, active toggle
- URL slug auto-generates from title
- Save triggers `onSaveCategory`

**Failure Path:**
- Missing required fields show validation errors

### Flow 4: Delete Category
**Success Path:**
- Delete triggers confirmation modal
- Modal shows product count in category
- Option to reassign products to another category
- Confirm triggers `onDeleteCategory` with optional reassignment target

### Flow 5: Reorder
- Drag-and-drop or controls reorder categories within same level
- `onReorder` called with new order value

## Empty State Tests
- No categories: tree shows "Add your first category" CTA
- No category selected: right panel shows placeholder message

## Edge Cases
- Deep nesting (3+ levels) renders correctly
- Category with many products shows accurate count
- Inactive categories show grey status dot
- Panels stack vertically on mobile
