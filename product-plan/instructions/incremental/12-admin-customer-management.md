# Milestone 12 — Admin Customer Management

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

Admin interface for viewing and managing customers. Includes a searchable, filterable customer data table and a full customer detail page showing profile info, order history, lifetime value, loyalty points, saved addresses (with gradient accent border), reviews, and internal admin notes.

## Key Functionality

- Customer data table with avatar, name, email, phone, orders count, lifetime value, segment badges, join date
- Search by name, email, or phone
- Segment filter pills: All, New (last 30 days), Repeat (2+ orders), Inactive (no order in 90 days), High Value (top 10% by spend)
- Sort by name, total orders, lifetime value, or join date
- Full customer detail page with profile header card
- Stats row: Total Orders, Lifetime Value, Avg Order Value, Loyalty Points
- Recent orders table (last 5 orders)
- Saved addresses as compact cards with gradient accent border (`linear-gradient(90deg, #013f47, #2a7a72, #c85103)`)
- Customer reviews list with star ratings
- Internal admin notes section

## Components Provided

- `AdminCustomerManagement` — Top-level section with list and detail views
- `CustomerList` — Data table with search, filters, segment pills
- `CustomerDetailPage` — Full customer profile with orders, addresses, reviews, notes

## Props Reference

### Types

| Type | Values |
|------|--------|
| `CustomerSegment` | `'new' \| 'repeat' \| 'inactive' \| 'high_value'` |

### Key Interfaces

- `CustomerRow` — `{ id, name, email, phone, avatarUrl, totalOrders, lifetimeValue, currency, segments[], joinedAt }`
- `CustomerDetail` — `{ id, name, email, emailVerified, phone, avatarUrl, joinedAt, lastOrderAt, totalOrders, lifetimeValue, averageOrderValue, currency, loyaltyPoints, segments[], recentOrders[], addresses[], reviews[], notes[] }`
- `CustomerOrder` — `{ id, orderNumber, total, currency, status, date, itemCount }`
- `CustomerAddress` — `{ id, label, street, city, state, pincode, country, isDefault }`
- `CustomerReview` — `{ id, productName, productImageUrl, rating, excerpt, date }`
- `AdminNote` — `{ id, author, message, createdAt }`
- `CustomerFilters` — `{ search, segment, sortField, sortDirection }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeFilters` | `(filters: Partial<CustomerFilters>) => void` | Refetch customers from Medusa v2 with updated filters/search |
| `onViewCustomer` | `(customerId: string) => void` | Fetch customer detail via `GET /admin/customers/{id}` and navigate to detail page |
| `onViewOrder` | `(orderId: string) => void` | Navigate to order detail page (from Milestone 10) |
| `onAddNote` | `(customerId: string, message: string) => void` | Store note in Supabase (customer_notes table) with admin author and timestamp |
| `onBackToList` | `() => void` | Navigate back to customer list |

## User Flows

### Flow 1: Find a Customer
1. Admin navigates to `/admin/customers`
2. Customer table loads with real data from Medusa v2
3. Admin types a customer email in the search bar
4. Table filters to matching customers
5. Admin clicks the customer row
6. Customer detail page opens with profile, orders, addresses, reviews, notes
7. **Outcome:** Admin has full visibility into the customer's history

### Flow 2: Filter by Segment
1. Admin clicks the "High Value" segment pill
2. `onChangeFilters` fires with `segment: 'high_value'`
3. Table reloads showing only customers in the top 10% by lifetime spend
4. **Outcome:** Admin sees only high-value customers

### Flow 3: View Customer's Recent Order
1. Admin is on a customer detail page
2. Admin sees the recent orders table showing the last 5 orders
3. Admin clicks an order row
4. `onViewOrder` fires; navigates to the order detail page (Milestone 10)
5. **Outcome:** Admin can review the specific order

### Flow 4: Add Admin Note
1. Admin opens a customer detail page
2. Admin types a note ("VIP customer - offer 10% on next order")
3. Admin submits the note
4. `onAddNote` fires; note is stored in Supabase with admin name and timestamp
5. Note appears in the notes list
6. **Outcome:** Internal note is persisted for all admins to see

## Empty States

- **No customers:** Show "No customers yet" message
- **No search results:** Show "No customers match your search" with option to clear filters
- **No orders for customer:** Show "No orders yet" in the recent orders section
- **No addresses:** Show "No saved addresses" in the addresses section
- **No reviews:** Show "No reviews yet" in the reviews section
- **No notes:** Show "No notes yet" with the add note input still visible
- **Loading:** Skeleton placeholders for table rows and detail sections

## Files to Reference

- `product/sections/admin-customer-management/spec.md` — Full specification
- `product/sections/admin-customer-management/types.ts` — TypeScript interfaces
- `product/sections/admin-customer-management/data.json` — Sample data
- `src/sections/admin-customer-management/` — Screen design components

## Done When

- [ ] Customer table loads real customers from Medusa v2 `GET /admin/customers`
- [ ] Search filters customers by name, email, or phone
- [ ] Segment filter pills work (New, Repeat, Inactive, High Value)
- [ ] Sorting works on name, total orders, lifetime value, join date
- [ ] Clicking a customer navigates to detail page with real data
- [ ] Profile header shows avatar, name, email, phone, verified badge, member since
- [ ] Stats row shows correct Total Orders, Lifetime Value, Avg Order Value, Loyalty Points
- [ ] Recent orders table shows the customer's last 5 orders with status badges
- [ ] Clicking an order navigates to the order detail page
- [ ] Addresses display as compact cards with the VastuCart gradient accent border
- [ ] Reviews list shows star ratings, product names, and excerpts
- [ ] Admin notes are stored in Supabase and display with author + timestamp
- [ ] Back button returns to the customer list
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: detail sections stack on mobile
- [ ] Light and dark mode both render correctly
