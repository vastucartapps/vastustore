# Test Specs: Admin Order Management

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Orders Table
**Success Path:**
- Table renders columns: Order #, Customer, Items, Total, Status, Payment, Date
- Status filter pills filter orders by status
- Date range picker filters by preset (today, 7 days, 30 days) or custom range
- Search by order ID or customer name/email works
- Sort by date, total, status, or customer name
- Pagination controls navigate pages; rows-per-page selector works

### Flow 2: Order Detail
**Success Path:**
- Back button returns to list
- Items list shows image, name, variant, qty, price, line total
- Customer card shows name, email, phone, total orders
- Address card shows full shipping address
- Payment card shows method, status, transaction ID

### Flow 3: Status Update
**Success Path:**
- Status dropdown shows workflow options
- Marking as "shipped" reveals tracking number and carrier inputs
- "Update Status" button triggers `onUpdateStatus`
- Timeline updates with new status entry

### Flow 4: Internal Notes
**Success Path:**
- Notes section shows existing notes with timestamps
- Text input and add button create a new note
- `onAddNote` called with order ID and message

### Flow 5: Actions
- Download invoice triggers `onDownloadInvoice`
- Email customer triggers `onEmailCustomer`

## Empty State Tests
- No orders: table shows "No orders yet" message
- No notes on order: notes section shows empty state
- No tracking number: tracking field empty

## Edge Cases
- Order with many items scrolls correctly
- Timeline with cancelled/returned status shows correct coloring
- Custom date range validation (start before end)
- Table scrolls horizontally on mobile
- Pagination with single page hides controls
