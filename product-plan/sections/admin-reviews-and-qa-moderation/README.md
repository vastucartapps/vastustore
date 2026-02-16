# Admin Reviews & Q&A Moderation

## Overview
Admin interface for moderating customer reviews and product Q&A. Features tabbed views for Reviews and Q&A with status filtering, bulk approve/reject for reviews, review detail with customer photos, and admin answer capability for Q&A.

## Components
| Component | Description |
|-----------|-------------|
| `AdminReviewsQA.tsx` | Root component with Reviews/Q&A tabs, filters, and content |

## Data Shapes
| Type | Description |
|------|-------------|
| `ReviewItem` | Review with rating, text, photos, verified badge, status |
| `QAItem` | Question with answer, product context, status |
| `ModerationTab` | Active tab: reviews or qa |

## Callback Props
| Callback | Triggered When |
|----------|----------------|
| `onChangeTab` | Admin switches between Reviews and Q&A |
| `onApproveReview` | Admin approves a review (with optional response) |
| `onRejectReview` | Admin rejects a review (with optional reason) |
| `onBulkAction` | Admin bulk approves/rejects selected reviews |
| `onAnswerQuestion` | Admin answers a question |
| `onEditAnswer` | Admin edits an existing answer |
| `onDeleteAnswer` | Admin deletes an answer |
| `onSearch` | Admin searches by product or customer |
