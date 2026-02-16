# Admin Returns & Refunds

## Overview
Admin interface for managing return requests and processing refunds. Features a Kanban board with drag-and-drop columns (Pending, Under Review, Approved, Refunded) and a full return detail page with inline approve/reject and refund processing options.

## Components
| Component | Description |
|-----------|-------------|
| `AdminReturnsRefunds.tsx` | Root component switching between Kanban and detail |
| `ReturnsKanban.tsx` | Kanban board with 4 draggable columns |
| `ReturnDetailPage.tsx` | Return detail with product info, photos, admin actions, refund processing |

## Data Shapes
| Type | Description |
|------|-------------|
| `ReturnCard` | Kanban card with order, customer, product, reason, status |
| `ReturnDetail` | Full return with customer, product, photos, timeline |
| `ReturnPhoto` | Customer-uploaded return photo |
| `ReturnTimelineEvent` | Status change with author and note |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onViewReturn` | Admin clicks a return card |
| `onMoveReturn` | Admin drags card to a new column |
| `onApprove` | Admin approves a return with notes |
| `onReject` | Admin rejects a return with notes |
| `onProcessRefund` | Admin processes full/partial refund |
| `onInitiateExchange` | Admin initiates product exchange |
| `onSearch` | Admin searches returns |
