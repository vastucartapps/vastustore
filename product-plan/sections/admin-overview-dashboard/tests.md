# Test Specs: Admin Overview Dashboard

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Stat Cards
**Success Path:**
- 6 stat cards render in grid layout
- Each shows label, value, and comparison delta (up/down indicator)
- Clicking a stat card triggers `onStatClick` with linkTo
- Toggling time period updates all stat values

### Flow 2: Revenue Chart
**Success Path:**
- Bar chart renders daily revenue bars for selected period
- Bars are proportionally sized to max value
- Period toggle (Today/Week/Month) updates chart data

### Flow 3: Recent Orders
**Success Path:**
- Table shows Order #, Customer, Total, Status, Date columns
- Clicking a row triggers `onViewOrder`
- Inline status dropdown triggers `onUpdateOrderStatus`

### Flow 4: Quick Actions
- Buttons render with icons (Add Product, New Order, New Coupon)
- Click triggers `onQuickAction` with target href

### Flow 5: Alerts Sidebar
**Success Path:**
- Alerts grouped by type: low stock, pending reviews, returns
- Each alert shows severity (critical/warning/info) styling
- Click navigates via `onAlertClick`
- Dismiss triggers `onDismissAlert`

## Empty State Tests
- No recent orders: table shows "No orders yet" message
- No alerts: sidebar shows "All clear" message
- Zero revenue: chart renders with empty bars

## Edge Cases
- Time period toggle updates all dashboard data simultaneously
- Stat comparison delta shows positive/negative correctly
- Currency formatting for revenue values (INR)
- Responsive: sidebar collapses below main content on mobile
- Stat cards reflow from 3x2 to 2x3 on smaller screens
