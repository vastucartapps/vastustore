# Milestone 10 — Admin Order Management

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

Full order management interface with a sortable, filterable data table and a full-page order detail view. The orders table supports status filters, date range picker, search, sorting, and pagination. Order detail shows items, customer info, shipping address, payment details, a visual status timeline, internal notes, invoice download, and follow-up email trigger. Status workflow: processing -> accepted -> shipped -> in transit -> out for delivery -> delivered.

## Key Functionality

- Orders data table with sortable columns (date, total, status, customer)
- Status filter pills (All, Processing, Accepted, Shipped, In Transit, Out for Delivery, Delivered, Cancelled, Returned)
- Date range picker with presets (today, 7 days, 30 days) and custom range
- Search by order ID, customer name, or email
- Pagination with configurable rows per page
- Full-page order detail with items list, customer info, shipping address, payment details
- Visual status timeline with completed (green), current (teal pulse), and upcoming (grey) steps
- Status update dropdown with tracking number and carrier input when marking as shipped
- Internal notes section — add and view notes with timestamps
- Invoice PDF download
- Send follow-up email to customer from order detail

## Components Provided

- `AdminOrderManagement` — Top-level section component
- `OrdersTable` — Data table with filters, search, pagination
- `OrderDetailPage` — Full-page order detail with timeline, notes, actions

## Props Reference

### Types

| Type | Values |
|------|--------|
| `OrderStatus` | `'processing' \| 'accepted' \| 'shipped' \| 'in_transit' \| 'out_for_delivery' \| 'delivered' \| 'cancelled' \| 'returned'` |
| `PaymentMethod` | `'razorpay' \| 'stripe' \| 'cod' \| 'upi' \| 'netbanking' \| 'wallet'` |
| `PaymentStatus` | `'paid' \| 'pending' \| 'failed' \| 'refunded'` |
| `DatePreset` | `'today' \| '7days' \| '30days' \| 'custom'` |
| `OrderSortField` | `'date' \| 'total' \| 'status' \| 'customer'` |

### Key Interfaces

- `OrderRow` — `{ id, orderNumber, customerName, customerEmail, itemCount, total, currency, status, paymentMethod, paymentStatus, date }`
- `OrderDetail` — `{ id, orderNumber, status, customer, shippingAddress, payment, items[], timeline[], notes[], subtotal, discount, shippingFee, tax, total, currency, trackingNumber, trackingUrl, carrier, createdAt, updatedAt }`
- `OrderItem` — `{ id, productName, variantLabel, imageUrl, quantity, price, lineTotal, currency }`
- `TimelineEvent` — `{ id, status, label, timestamp, note, isCompleted, isCurrent }`
- `OrderNote` — `{ id, author, message, createdAt }`
- `OrderCustomer` — `{ id, name, email, phone, totalOrders }`
- `ShippingAddress` — `{ name, phone, street, city, state, pincode, country }`
- `PaymentDetails` — `{ method, status, transactionId, amount, currency, paidAt }`
- `OrderFilters` — `{ search, status, datePreset, dateFrom, dateTo, sortField, sortDirection }`
- `Pagination` — `{ page, perPage, totalItems, totalPages }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeFilters` | `(filters: Partial<OrderFilters>) => void` | Refetch orders from Medusa v2 with updated filters |
| `onChangePage` | `(page: number) => void` | Fetch the specified page of orders |
| `onChangePerPage` | `(perPage: number) => void` | Update rows per page and refetch |
| `onViewOrder` | `(orderId: string) => void` | Fetch order detail via `GET /admin/orders/{id}` and navigate to detail page |
| `onUpdateStatus` | `(orderId: string, status: OrderStatus, trackingNumber?: string, carrier?: string) => void` | `POST /admin/orders/{id}/fulfillments` or update order status via Medusa v2; save tracking info |
| `onAddNote` | `(orderId: string, message: string) => void` | Store note in Supabase (order_notes table) with admin author and timestamp |
| `onDownloadInvoice` | `(orderId: string) => void` | Generate and download invoice PDF for the order |
| `onEmailCustomer` | `(orderId: string) => void` | Trigger follow-up email to customer (e.g., delivery confirmation, feedback request) |
| `onBackToList` | `() => void` | Navigate back to orders table |

## User Flows

### Flow 1: Find and Review an Order
1. Admin navigates to `/admin/orders`
2. Orders table loads with real data from Medusa v2
3. Admin types a customer name in the search bar
4. Table filters to matching orders
5. Admin clicks an order row
6. Order detail page opens showing items, customer info, address, payment, timeline
7. **Outcome:** Admin has full visibility into the order

### Flow 2: Update Order Status with Tracking
1. Admin opens order detail for an order in "accepted" status
2. Admin selects "shipped" from the status dropdown
3. Tracking number and carrier input fields appear
4. Admin enters tracking number and selects carrier
5. Admin clicks "Update Status"
6. `onUpdateStatus` fires with order ID, "shipped", tracking number, and carrier
7. Medusa v2 API creates a fulfillment; timeline updates with new status and timestamp
8. **Outcome:** Order shows as shipped with tracking information; customer can view tracking

### Flow 3: Add Internal Notes
1. Admin views an order detail page
2. Admin types a note in the notes input field ("Customer requested gift wrapping")
3. Admin submits the note
4. `onAddNote` fires; note is stored in Supabase with the admin's name and timestamp
5. Note appears in the notes list below the input
6. **Outcome:** Internal note is persisted and visible to all admins

### Flow 4: Filter by Date Range
1. Admin clicks "Last 30 days" preset button in the date range picker
2. `onChangeFilters` fires with `datePreset: '30days'`
3. Orders table reloads showing only orders from the last 30 days
4. Admin then switches to "Custom" and enters specific dates
5. **Outcome:** Table shows orders within the custom date range

## Empty States

- **No orders:** Show "No orders yet" message
- **No search results:** Show "No orders match your filters" with option to clear filters
- **No notes on order:** Show "No notes yet" with the add note input still visible
- **Loading:** Skeleton placeholders for table rows and detail sections

## Files to Reference

- `product/sections/admin-order-management/spec.md` — Full specification
- `product/sections/admin-order-management/types.ts` — TypeScript interfaces
- `product/sections/admin-order-management/data.json` — Sample data
- `src/sections/admin-order-management/` — Screen design components

## Done When

- [ ] Orders table loads real orders from Medusa v2 `GET /admin/orders`
- [ ] Status filter pills filter orders by status
- [ ] Date range picker (presets + custom) filters orders by date
- [ ] Search filters by order number, customer name, or email
- [ ] Sorting works on all sortable columns (date, total, status, customer)
- [ ] Pagination works with configurable rows per page
- [ ] Clicking an order navigates to the full detail page with real data
- [ ] Order detail shows items, customer info, shipping address, and payment details
- [ ] Visual status timeline renders with correct completed/current/upcoming states
- [ ] Status update dropdown changes order status via Medusa v2 API
- [ ] Tracking number and carrier input appear when marking as shipped and persist
- [ ] Internal notes are stored in Supabase and display with author + timestamp
- [ ] Invoice download generates and downloads a PDF
- [ ] Email customer button triggers a follow-up email
- [ ] Back button returns to the orders table preserving filter state
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: detail cards stack on mobile; table scrolls horizontally
- [ ] Light and dark mode both render correctly
