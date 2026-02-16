# Admin Customer Management

## Overview
Admin interface for viewing and managing customers. Features a searchable, filterable customer list and a full customer detail page showing profile info, order history, lifetime value, loyalty points, addresses, reviews, and internal admin notes.

## Components
| Component | Description |
|-----------|-------------|
| `AdminCustomerManagement.tsx` | Root component switching between list and detail |
| `CustomerList.tsx` | Data table with search, segment filters, sorting |
| `CustomerDetailPage.tsx` | Full profile with stats, orders, addresses, reviews, notes |

## Data Shapes
| Type | Description |
|------|-------------|
| `CustomerRow` | List item with name, email, orders, lifetime value, segments |
| `CustomerDetail` | Full customer with orders, addresses, reviews, notes |
| `CustomerSegment` | Segment type: new, repeat, inactive, high_value |
| `AdminNote` | Internal note with author and timestamp |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onChangeFilters` | Admin changes search, segment, or sort |
| `onViewCustomer` | Admin clicks a customer row |
| `onViewOrder` | Admin clicks an order in customer detail |
| `onAddNote` | Admin adds an internal note |
| `onBackToList` | Admin returns to customer list |
