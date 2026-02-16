# Admin Overview Dashboard

## Overview
The admin home dashboard provides a real-time snapshot of store performance. Features stat cards with period comparison, a CSS-only revenue bar chart, recent orders with inline status updates, quick-action shortcuts, and an alerts sidebar for low stock, pending reviews, and new returns.

## Components
| Component | Description |
|-----------|-------------|
| `AdminOverviewDashboard.tsx` | Root dashboard layout with main content and sidebar |
| `AdminLayout.tsx` | Admin page layout wrapper |
| `StatCards.tsx` | Grid of 6 stat cards with values and comparison deltas |
| `RevenueChart.tsx` | CSS-only daily revenue bar chart |
| `RecentOrdersTable.tsx` | Orders table with inline status dropdown |
| `QuickActions.tsx` | Shortcut buttons (Add Product, New Order, New Coupon) |
| `AlertsSidebar.tsx` | Alerts for low stock, pending reviews, new returns |

## Data Shapes
| Type | Description |
|------|-------------|
| `DashboardStat` | Stat card with label, value, previous value, icon |
| `RevenueBar` | Single bar in the revenue chart |
| `RecentOrder` | Order row with number, customer, total, status |
| `QuickAction` | Shortcut button with label, icon, href |
| `Alert` | Warning item with type, severity, link |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onTimePeriodChange` | Admin toggles Today/Week/Month |
| `onStatClick` | Admin clicks a stat card |
| `onViewOrder` | Admin clicks an order row |
| `onUpdateOrderStatus` | Admin changes order status inline |
| `onQuickAction` | Admin clicks a quick-action button |
| `onAlertClick` | Admin clicks an alert item |
| `onDismissAlert` | Admin dismisses an alert |
