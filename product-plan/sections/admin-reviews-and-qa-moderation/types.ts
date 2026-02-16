/** Review moderation status */
export type ReviewStatus = 'pending' | 'approved' | 'rejected'

/** Q&A status */
export type QAStatus = 'unanswered' | 'answered'

/** Active main tab */
export type ModerationTab = 'reviews' | 'qa'

/** A review for moderation */
export interface ReviewItem {
  id: string
  customerName: string
  customerEmail: string
  productId: string
  productName: string
  productImageUrl: string
  rating: number
  title: string
  text: string
  photos: string[]
  isVerifiedPurchase: boolean
  status: ReviewStatus
  adminResponse: string | null
  createdAt: string
}

/** A product Q&A item */
export interface QAItem {
  id: string
  customerName: string
  productId: string
  productName: string
  productImageUrl: string
  question: string
  answer: string | null
  answeredBy: string | null
  status: QAStatus
  createdAt: string
  answeredAt: string | null
}

/** Bulk action */
export type ReviewBulkAction = 'approve' | 'reject'

/** Props for the Reviews & Q&A Moderation section */
export interface AdminReviewsQAProps {
  reviews: ReviewItem[]
  qaItems: QAItem[]
  activeTab: ModerationTab
  reviewStatusFilter: ReviewStatus | 'all'
  qaStatusFilter: QAStatus | 'all'
  searchQuery: string

  onChangeTab?: (tab: ModerationTab) => void
  onChangeReviewStatus?: (status: ReviewStatus | 'all') => void
  onChangeQAStatus?: (status: QAStatus | 'all') => void
  onSearch?: (query: string) => void
  onApproveReview?: (reviewId: string, response?: string) => void
  onRejectReview?: (reviewId: string, reason?: string) => void
  onBulkAction?: (action: ReviewBulkAction, reviewIds: string[]) => void
  onAnswerQuestion?: (qaId: string, answer: string) => void
  onEditAnswer?: (qaId: string, answer: string) => void
  onDeleteAnswer?: (qaId: string) => void
}
