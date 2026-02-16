# Test Specs: Admin Product Management

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Product List
**Success Path:**
- Default view shows card grid with product image, name, price, stock badge
- Toggle to table view shows columns with SKU, category, actions
- Search by name/SKU filters products
- Status/category/stock filters work correctly
- Bulk select via checkboxes enables bulk action toolbar

### Flow 2: Product Wizard (Add)
**Success Path:**
- Click "Add Product" opens wizard at Step 1 (Basic Info)
- Step indicator shows 8 numbered steps
- Fill fields and click Next to advance
- Back button returns to previous step
- Live preview panel on right updates as fields are filled
- Save Draft saves at any step
- Publish requires all required steps complete

**Failure Path:**
- Missing required fields show validation errors
- Cannot publish with incomplete required steps

### Flow 3: Product Edit
**Success Path:**
- Click product opens wizard pre-filled with existing data
- Edit any step and save

### Flow 4: Bulk Actions
- Select multiple products via checkboxes
- Bulk delete shows confirmation
- Bulk activate/deactivate toggles status
- Bulk export triggers CSV download

### Flow 5: CSV Import
- Drag-and-drop upload area accepts CSV file
- `onImportCSV` triggered with file

## Empty State Tests
- No products: empty state with "Add Product" CTA
- No search results: "No products found" message
- Wizard with null product: empty form for new product

## Edge Cases
- Grid vs table view toggle persists selection
- Live preview hidden on mobile behind toggle
- Product with many variants renders correctly
- Out-of-stock badge displays on product cards
- Duplicate product creates copy with modified name
