# Milestone 13 — Admin Reviews & Q&A Moderation

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

Admin interface for moderating customer reviews and product Q&A. Two main tabs (Reviews and Q&A) are switchable at the top. Reviews have status sub-tabs (Pending / Approved / Rejected) with bulk approve/reject, review detail with photos, and optional admin response. Q&A has sub-tabs (Unanswered / Answered) with admin answer, edit, and delete capabilities. Both tabs support search by product name or customer.

## Key Functionality

- Two main tabs: Reviews and Q&A (switchable)
- Reviews tab: status sub-tabs (Pending / Approved / Rejected) with count badges
- Review cards: star rating, title, text, customer name, date, product thumbnail + name, verified purchase badge, customer photos grid, approve/reject buttons
- Bulk select reviews with checkboxes; bulk approve or reject
- Approve/reject individual review with optional admin response text
- Q&A tab: status sub-tabs (Unanswered / Answered) with count badges
- Question cards: question text, customer name, date, product thumbnail + name, admin answer (if answered), answer/edit textarea
- Admin can answer a question, edit an existing answer, or delete an answer
- Search across reviews or Q&A by product name or customer

## Components Provided

- `AdminReviewsQA` — Top-level section with tabs for Reviews and Q&A

## Props Reference

### Types

| Type | Values |
|------|--------|
| `ReviewStatus` | `'pending' \| 'approved' \| 'rejected'` |
| `QAStatus` | `'unanswered' \| 'answered'` |
| `ModerationTab` | `'reviews' \| 'qa'` |
| `ReviewBulkAction` | `'approve' \| 'reject'` |

### Key Interfaces

- `ReviewItem` — `{ id, customerName, customerEmail, productId, productName, productImageUrl, rating, title, text, photos[], isVerifiedPurchase, status, adminResponse, createdAt }`
- `QAItem` — `{ id, customerName, productId, productName, productImageUrl, question, answer, answeredBy, status, createdAt, answeredAt }`

### Callbacks

| Callback | Signature | Wire To |
|----------|-----------|---------|
| `onChangeTab` | `(tab: ModerationTab) => void` | Switch between Reviews and Q&A tabs |
| `onChangeReviewStatus` | `(status: ReviewStatus \| 'all') => void` | Filter reviews by status sub-tab |
| `onChangeQAStatus` | `(status: QAStatus \| 'all') => void` | Filter Q&A by status sub-tab |
| `onSearch` | `(query: string) => void` | Search reviews or Q&A by product name or customer |
| `onApproveReview` | `(reviewId: string, response?: string) => void` | Approve review in Supabase; optionally save admin response |
| `onRejectReview` | `(reviewId: string, reason?: string) => void` | Reject review in Supabase; optionally save rejection reason |
| `onBulkAction` | `(action: ReviewBulkAction, reviewIds: string[]) => void` | Batch approve or reject selected reviews |
| `onAnswerQuestion` | `(qaId: string, answer: string) => void` | Save admin answer to question in Supabase |
| `onEditAnswer` | `(qaId: string, answer: string) => void` | Update existing admin answer |
| `onDeleteAnswer` | `(qaId: string) => void` | Delete admin answer; question returns to "unanswered" |

## User Flows

### Flow 1: Moderate Pending Reviews
1. Admin navigates to Reviews & Q&A Moderation page
2. "Reviews" tab is active by default; "Pending" sub-tab shows count of pending reviews
3. Admin sees review cards with star ratings, text, photos, and product links
4. Admin reads a review, clicks "Approve" (optionally types a thank-you response)
5. `onApproveReview` fires; review status updates to "approved" in Supabase
6. Card moves out of the Pending list; Pending count decreases
7. **Outcome:** Approved review becomes visible on the storefront product page

### Flow 2: Bulk Reject Reviews
1. Admin is on the Reviews tab, Pending sub-tab
2. Admin checks the checkboxes on 5 spam reviews
3. Bulk action bar appears; admin clicks "Reject"
4. `onBulkAction('reject', reviewIds)` fires
5. All 5 reviews are rejected in Supabase
6. Cards disappear from Pending; Rejected count increases
7. **Outcome:** Spam reviews are rejected in one action

### Flow 3: Answer a Customer Question
1. Admin switches to the "Q&A" tab
2. "Unanswered" sub-tab shows questions awaiting admin response
3. Admin clicks on a question card, types an answer in the textarea
4. Admin clicks "Submit Answer"
5. `onAnswerQuestion` fires; answer is saved in Supabase with admin name and timestamp
6. Question moves to "Answered" sub-tab
7. **Outcome:** Customer question has an admin answer visible on the product page

### Flow 4: Edit an Existing Answer
1. Admin switches to Q&A tab, "Answered" sub-tab
2. Admin finds a question with an outdated answer
3. Admin clicks "Edit" on the answer, updates the text
4. `onEditAnswer` fires; answer is updated in Supabase
5. **Outcome:** Updated answer is visible on the storefront

## Empty States

- **No reviews:** Show "No reviews to moderate" in the reviews tab
- **No pending reviews:** Show "All caught up — no pending reviews" in the Pending sub-tab
- **No Q&A items:** Show "No questions yet" in the Q&A tab
- **No unanswered questions:** Show "All questions answered" in the Unanswered sub-tab
- **No search results:** Show "No results match your search"
- **Loading:** Skeleton cards for reviews and Q&A items

## Files to Reference

- `product/sections/admin-reviews-and-qa-moderation/spec.md` — Full specification
- `product/sections/admin-reviews-and-qa-moderation/types.ts` — TypeScript interfaces
- `product/sections/admin-reviews-and-qa-moderation/data.json` — Sample data
- `src/sections/admin-reviews-and-qa-moderation/` — Screen design components

## Done When

- [ ] Reviews and Q&A tabs are switchable
- [ ] Reviews tab loads real reviews from Supabase
- [ ] Status sub-tabs (Pending / Approved / Rejected) filter reviews with correct counts
- [ ] Review cards display star rating, title, text, customer photos, product link, verified badge
- [ ] Approve and reject buttons work on individual reviews via Supabase
- [ ] Optional admin response saves with approval
- [ ] Bulk select with checkboxes works; bulk approve/reject processes all selected
- [ ] Q&A tab loads real questions from Supabase
- [ ] Status sub-tabs (Unanswered / Answered) filter questions with correct counts
- [ ] Admin can answer an unanswered question via textarea and submit
- [ ] Admin can edit an existing answer
- [ ] Admin can delete an answer (question returns to unanswered)
- [ ] Search filters reviews/Q&A by product name or customer
- [ ] Product thumbnail and name on each card link to the product
- [ ] Loading, error, and empty states render correctly
- [ ] Responsive: cards stack on mobile
- [ ] Light and dark mode both render correctly
