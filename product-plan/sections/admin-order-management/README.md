# Admin Order Management

## Overview
Admin interface for managing all customer orders. Features a full data table with sortable columns, status filters, date range picker, search, and pagination. Order detail page shows items, customer info, shipping address, payment details, visual status timeline, and internal notes.

## Components
| Component | Description |
|-----------|-------------|
| `AdminOrderManagement.tsx` | Root component switching between list and detail |
| `OrdersTable.tsx` | Full-width data table with filters, sort, pagination |
| `OrderDetailPage.tsx` | Order detail with items, timeline, customer/payment cards, notes |

## Data Shapes
| Type | Description |
|------|-------------|
| `OrderRow` | Order list item with number, customer, total, status |
| `OrderDetail` | Full order with items, timeline, customer, payment, notes |
| `TimelineEvent` | Status change event with timestamp |
| `OrderNote` | Internal admin note with author and timestamp |
| `OrderFilters` | Filter state (search, status, date, sort) |
| `Pagination` | Page, perPage, totalItems, totalPages |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onChangeFilters` | Admin changes any filter |
| `onViewOrder` | Admin clicks an order row |
| `onUpdateStatus` | Admin updates order status with tracking info |
| `onAddNote` | Admin adds an internal note |
| `onDownloadInvoice` | Admin downloads order invoice PDF |
| `onEmailCustomer` | Admin sends follow-up email |
| `onChangePage` | Admin navigates between pages |
