# Milestone 11 — Admin Returns & Refunds

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

Admin interface for managing return requests and processing refunds. Features a Kanban board with drag-and-drop columns (Pending, Under Review, Approved, Refunded) and a full return detail page. The detail page shows return reason, customer-uploaded photos, order reference, product details, admin approve/reject with notes, refund processing (full/partial, original payment or store credit), and exchange initiation.

## Key Functionality

- Kanban board with 4 columns: Pending, Under Review, Approved, Refunded
- Drag-and-drop cards between columns to update return status
- Return cards show: order number, customer name, product thumbnail, return reason, date, refund amount
- Search returns by order number or customer
- Full return detail page with product info, customer photos, reason, and admin notes
- Approve or reject a return with admin notes
- Process refund: full or partial, select refund method (original payment method or store credit)
- Initiate exchange instead of refund
- Return policy compliance check (within return window, condition met)
- Status change timeline

## Components Provided

- `AdminReturnsRefunds` — Top-level section with Kanban board and detail page
- `ReturnsKanban` — Kanban board with 4 draggable columns
- `ReturnDetailPage` — Full return detail with approve/reject, refund, and exchange actions

## Props Reference

### Types

| Type | Values |
|------|--------|
| `ReturnStatus` | `'pending' \| 'under_review' \| 'approved' \| 'refunded' \| 'rejected'` |
| `RefundType` | `'full' \| 'partial'` |
| `RefundMethod` | `'original_payment' \| 'store_credit'` |
| `ReturnReason` | `'defective' \| 'wrong_item' \| 'not_as_described' \| 'changed_mind' \| 'size_issue' \| 'damaged_in_transit' \| 'other'` |

### Key Interfaces

- `ReturnCard` — `{ id, orderNumber, customerName, customerEmail, productName, productImageUrl, variantLabel, reason, status, refundAmount, currency, requestedAt, daysOpen }`
- `ReturnDetail` — `{ id, orderNumber, orderId, status, customer: { id, name, email, phone }, product: { id, name, variantLabel, imageUrl, quantity, price, currency }, reason, customerNotes, photos[], adminNotes, refundType, refundAmount, refundMethod, isWithinReturnWindow, returnWindowDays, timeline[], requestedAt, resolvedAt }`
- `ReturnPhoto` — `{ id, url, caption }`
- `ReturnTimelineEvent` — `{ id, action, author, note, timestamp }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onViewReturn` | `(returnId: string) => void` | Navigate to return detail page |
| `onMoveReturn` | `(returnId: string, newStatus: ReturnStatus) => void` | Update return status via Medusa v2 return/refund APIs |
| `onSearch` | `(query: string) => void` | Filter returns by order number or customer |
| `onApprove` | `(returnId: string, notes: string) => void` | Approve return via Medusa v2 `POST /admin/returns/{id}/receive`; save admin notes |
| `onReject` | `(returnId: string, notes: string) => void` | Reject return and save rejection reason |
| `onProcessRefund` | `(returnId: string, type: RefundType, amount: number, method: RefundMethod) => void` | Process refund via Medusa v2 refund API or create store credit |
| `onInitiateExchange` | `(returnId: string) => void` | Create exchange order via Medusa v2 exchange/swap API |
| `onBackToBoard` | `() => void` | Navigate back to Kanban board |

## User Flows

### Flow 1: Review and Approve a Return
1. Admin sees a return card in the "Pending" column on the Kanban board
2. Admin clicks the card to open the return detail page
3. Admin views the return reason, customer photos, and product details
4. Admin checks "Within return window: Yes" indicator
5. Admin types approval notes and clicks "Approve"
6. `onApprove` fires; return status updates to "approved" via Medusa v2
7. Card moves to the "Approved" column on the board
8. **Outcome:** Return is approved and ready for refund processing

### Flow 2: Process a Partial Refund
1. Admin opens an approved return detail page
2. Admin selects "Partial" refund type
3. Admin enters the refund amount (less than the original price)
4. Admin selects "Original Payment Method" as the refund method
5. Admin clicks "Process Refund"
6. `onProcessRefund` fires with return ID, "partial", amount, and "original_payment"
7. Refund is processed via Medusa v2; card moves to "Refunded" column
8. **Outcome:** Customer receives a partial refund to their original payment method

### Flow 3: Initiate an Exchange
1. Admin opens a return detail page for a size issue
2. Instead of refunding, admin clicks "Initiate Exchange"
3. `onInitiateExchange` fires
4. Exchange flow opens to select replacement product/variant
5. **Outcome:** Exchange order is created via Medusa v2 swap API

### Flow 4: Drag-and-Drop Status Update
1. Admin drags a return card from "Pending" to "Under Review"
2. `onMoveReturn` fires with the return ID and new status
3. Return status updates via API
4. **Outcome:** Card is now in the "Under Review" column

## Empty States

- **No returns:** Show "No return requests" message on the Kanban board
- **Empty column:** Show "No items" placeholder in the empty Kanban column
- **No photos:** Return detail shows "No photos uploaded by customer"
- **Loading:** Skeleton cards in each Kanban column; skeleton sections on detail page

## Files to Reference

- `product/sections/admin-returns-and-refunds/spec.md` — Full specification
- `product/sections/admin-returns-and-refunds/types.ts` — TypeScript interfaces
- `product/sections/admin-returns-and-refunds/data.json` — Sample data
- `src/sections/admin-returns-and-refunds/` — Screen design components

## Done When

- [ ] Kanban board loads real return requests from Medusa v2
- [ ] Four columns render with correct return cards grouped by status
- [ ] Drag-and-drop between columns updates return status via API
- [ ] Search filters returns by order number or customer name
- [ ] Clicking a card opens the full return detail page with real data
- [ ] Customer-uploaded photos display in a grid
- [ ] Return reason and customer notes are visible
- [ ] Return policy compliance (within return window) is checked and displayed
- [ ] Approve button updates status and saves admin notes via Medusa v2
- [ ] Reject button updates status and saves rejection reason
- [ ] Refund processing works for both full and partial refunds
- [ ] Refund method selection (original payment or store credit) works correctly
- [ ] Exchange initiation creates a swap/exchange order via Medusa v2
- [ ] Status change timeline displays all events with timestamps
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: Kanban columns stack vertically on mobile
- [ ] Light and dark mode both render correctly
