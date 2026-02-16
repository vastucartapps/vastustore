# Test Specs: Admin Returns & Refunds

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Kanban Board
**Success Path:**
- Four columns render: Pending, Under Review, Approved, Refunded
- Each column shows count badge and colored header
- Cards show order number, customer, product thumbnail, reason, amount
- Drag card between columns triggers `onMoveReturn` with new status
- Search bar filters cards across all columns

### Flow 2: Return Detail
**Success Path:**
- Back button returns to Kanban board
- Product info with image, name, variant, quantity, price displayed
- Customer-uploaded photos shown in grid
- Return reason and customer notes visible
- Return window compliance info displayed

### Flow 3: Approve/Reject
**Success Path:**
- Approve button with notes textarea triggers `onApprove`
- Reject button with notes textarea triggers `onReject`
- Timeline updates after action

### Flow 4: Refund Processing
**Success Path:**
- Toggle between Full and Partial refund
- Partial refund: enter custom amount
- Select refund method (original payment or store credit)
- Process button triggers `onProcessRefund`

### Flow 5: Exchange
- Initiate exchange triggers `onInitiateExchange`

## Empty State Tests
- No returns: all columns empty with placeholder message
- No return photos: photo grid section hidden

## Edge Cases
- Return outside return window shows warning
- Days open counter displays correctly
- Rejected status rendering
- Multiple photos in grid layout
- Columns stack vertically on mobile
- Drag indicators visible during drag operation
