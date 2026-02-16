# Milestone 7 — Admin Overview Dashboard

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

The admin home dashboard provides a real-time snapshot of store performance. It includes six stat cards (total orders, revenue, pending orders, low-stock count, new customers, recent reviews), a CSS-only daily revenue bar chart, a recent orders table with inline status updates, quick-action shortcuts, and an alerts sidebar for items needing attention. All data responds to a time period toggle (Today / This Week / This Month).

## Key Functionality

- Six stat cards with value, comparison delta vs previous period, and clickable navigation to relevant admin sections
- Time period toggle (today / week / month) that refreshes all dashboard data
- CSS-only bar chart showing daily revenue for the selected period
- Recent orders table with inline status dropdown for quick updates
- Quick-action shortcuts: Add Product, New Order, New Coupon
- Alerts sidebar: low-stock products, pending reviews, new return requests
- Every stat card, alert, and quick action navigates to the correct admin section

## Components Provided

- `AdminOverviewDashboard` — Main dashboard layout with stat cards, chart, orders table, sidebar
- Stat card grid (6 cards, responsive 2x3 or 3x2)
- Revenue bar chart (CSS-only, no chart library)
- Recent orders table with inline status dropdown
- Quick actions panel
- Alerts/warnings sidebar

## Props Reference

### Types

| Type | Values |
|------|--------|
| `TimePeriod` | `'today' \| 'week' \| 'month'` |
| `StatFormat` | `'number' \| 'currency'` |
| `OrderStatus` | `'processing' \| 'accepted' \| 'shipped' \| 'in_transit' \| 'out_for_delivery' \| 'delivered' \| 'cancelled' \| 'returned'` |
| `AlertType` | `'low_stock' \| 'pending_review' \| 'new_return'` |
| `AlertSeverity` | `'critical' \| 'warning' \| 'info'` |

### Key Interfaces

- `DashboardStat` — `{ id, label, value, previousValue, format, currency?, icon, linkTo }`
- `RevenueBar` — `{ date, label, amount }`
- `RecentOrder` — `{ id, orderNumber, customerName, customerEmail, total, currency, status, itemCount, date }`
- `QuickAction` — `{ id, label, icon, href, color }`
- `Alert` — `{ id, type, title, message, severity, linkTo, meta }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onTimePeriodChange` | `(period: TimePeriod) => void` | Refetch all dashboard data from Medusa v2 analytics for the selected period |
| `onStatClick` | `(linkTo: string) => void` | `router.push(linkTo)` — navigate to the relevant admin section |
| `onViewOrder` | `(orderId: string) => void` | Navigate to order detail page |
| `onUpdateOrderStatus` | `(orderId: string, status: OrderStatus) => void` | `POST /admin/orders/{id}` to update status via Medusa v2 |
| `onQuickAction` | `(href: string) => void` | `router.push(href)` — navigate to the target admin page |
| `onAlertClick` | `(linkTo: string) => void` | `router.push(linkTo)` — navigate to the relevant management page |
| `onDismissAlert` | `(alertId: string) => void` | Dismiss alert from local state or persist dismissal |

## User Flows

### Flow 1: View Dashboard on Load
1. Admin navigates to `/admin` (dashboard home)
2. Fetch stats, revenue data, recent orders, and alerts from Medusa v2 APIs for the default time period (today)
3. Render stat cards with values and deltas, bar chart, orders table, and alerts sidebar
4. **Outcome:** Admin sees a real-time snapshot of store performance

### Flow 2: Change Time Period
1. Admin clicks "This Week" or "This Month" pill button
2. `onTimePeriodChange` fires with the new period
3. All dashboard data refetches for the selected period — stats, chart bars, recent orders
4. **Outcome:** All dashboard widgets update to reflect the selected time range

### Flow 3: Update Order Status Inline
1. Admin sees a recent order with status "processing"
2. Admin clicks the inline status dropdown on that order row
3. Admin selects "accepted" from the dropdown
4. `onUpdateOrderStatus` fires with the order ID and new status
5. API call to Medusa v2 updates the order; row reflects the new status
6. **Outcome:** Order status is updated without leaving the dashboard

### Flow 4: Act on Alert
1. Admin sees a "Low Stock" alert in the sidebar showing 3 products below threshold
2. Admin clicks the alert
3. `onAlertClick` navigates to the product management page filtered by low stock
4. **Outcome:** Admin can immediately address low-stock items

## Empty States

- **No orders yet:** Show "No orders to display" in the recent orders table area
- **No alerts:** Show "All clear — no alerts" in the alerts sidebar
- **No revenue data:** Show empty chart area with "No revenue data for this period"
- **Loading:** Show skeleton placeholders for stat cards, chart, and orders table

## Files to Reference

- `product/sections/admin-overview-dashboard/spec.md` — Full specification
- `product/sections/admin-overview-dashboard/types.ts` — TypeScript interfaces
- `product/sections/admin-overview-dashboard/data.json` — Sample data
- `src/sections/admin-overview-dashboard/` — Screen design components

## Done When

- [ ] Dashboard loads with real data from Medusa v2 APIs (not sample data)
- [ ] All six stat cards display correct values and deltas for the selected time period
- [ ] Time period toggle (Today / This Week / This Month) refreshes all dashboard data
- [ ] Revenue bar chart renders daily bars for the selected period using real order data
- [ ] Recent orders table shows real orders with correct status badges
- [ ] Inline status dropdown on order rows updates order status via Medusa v2 API
- [ ] Every stat card click navigates to the correct admin section
- [ ] Quick-action buttons navigate to Add Product, New Order, New Coupon pages
- [ ] Alerts sidebar shows real low-stock, pending review, and new return counts
- [ ] Alert clicks navigate to the relevant management page
- [ ] Loading skeletons display while data is being fetched
- [ ] Empty states display when no data is available
- [ ] Dashboard is responsive — sidebar collapses below main content on mobile
- [ ] Light and dark mode both render correctly
