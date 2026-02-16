# Test Specs: Admin Reviews & Q&A Moderation

These test specs are **framework-agnostic**. Adapt them to your testing setup.

## User Flow Tests

### Flow 1: Reviews Moderation
**Success Path:**
- Reviews tab active by default
- Status tabs (Pending/Approved/Rejected) with counts
- Review cards show: stars, text, customer name, product thumbnail, verified badge
- Customer photos render in grid on review card
- Approve button triggers `onApproveReview` with optional response
- Reject button triggers `onRejectReview` with optional reason

### Flow 2: Bulk Actions
**Success Path:**
- Checkbox selection on review cards
- Bulk action bar appears when reviews selected
- Bulk approve triggers `onBulkAction('approve', ids)`
- Bulk reject triggers `onBulkAction('reject', ids)`

### Flow 3: Q&A Moderation
**Success Path:**
- Switch to Q&A tab via `onChangeTab`
- Status tabs: Unanswered/Answered with counts
- Question cards show question, customer, product context
- Answer textarea and submit triggers `onAnswerQuestion`
- Edit existing answer triggers `onEditAnswer`
- Delete answer triggers `onDeleteAnswer`

### Flow 4: Search
- Search by product name or customer filters both tabs

## Empty State Tests
- No pending reviews: "All caught up" message
- No unanswered questions: "No questions pending" message
- No reviews at all: empty state

## Edge Cases
- Review with many photos wraps correctly
- Long review text truncates with expand
- Verified purchase badge only shows for verified purchases
- Admin response shown below review
- Cards stack on mobile
