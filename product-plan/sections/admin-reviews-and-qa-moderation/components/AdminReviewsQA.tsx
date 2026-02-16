import { useState, useMemo } from 'react'
import { Star, Search, CheckCircle2, XCircle, Clock, Check, X, MessageSquare, Edit2, Trash2, Badge } from 'lucide-react'
import type { AdminReviewsQAProps, ReviewItem, QAItem } from '../types'

const c = {
  primary500: '#013f47', primary400: '#2a7a72', primary200: '#71c1ae',
  primary100: '#c5e8e2', primary50: '#e8f5f3',
  secondary500: '#c85103', secondary300: '#fd8630', secondary50: '#fff5ed',
  bg: '#fffbf5', card: '#ffffff', subtle: '#f5dfbb',
  earth300: '#a39585', earth400: '#75615a', earth500: '#71685b', earth600: '#5a4f47', earth700: '#433b35',
  success: '#10B981', successLight: '#D1FAE5',
  warning: '#F59E0B', warningLight: '#FEF3C7',
  error: '#EF4444', errorLight: '#FEE2E2',
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
  shadowHover: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
}
const fonts = { heading: "'Lora', serif", body: "'Open Sans', sans-serif", mono: "'IBM Plex Mono', monospace" }

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={16}
          fill={star <= rating ? c.secondary300 : 'none'}
          stroke={star <= rating ? c.secondary300 : c.earth300}
          strokeWidth={1.5}
        />
      ))}
      <span style={{ marginLeft: '8px', fontSize: '14px', fontWeight: 600, color: c.earth600, fontFamily: fonts.body }}>
        {rating}/5
      </span>
    </div>
  )
}

function ReviewCard({
  review,
  isSelected,
  onToggleSelect,
  onApprove,
  onReject,
}: {
  review: ReviewItem
  isSelected: boolean
  onToggleSelect: (id: string) => void
  onApprove: (id: string, response?: string) => void
  onReject: (id: string, reason?: string) => void
}) {
  const [showResponse, setShowResponse] = useState(false)
  const [responseText, setResponseText] = useState(review.adminResponse || '')

  const getStatusColor = (status: ReviewItem['status']) => {
    switch (status) {
      case 'pending': return { bg: c.warningLight, text: c.warning }
      case 'approved': return { bg: c.successLight, text: c.success }
      case 'rejected': return { bg: c.errorLight, text: c.error }
    }
  }

  const statusColor = getStatusColor(review.status)

  return (
    <div
      style={{
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
        borderTop: '4px solid transparent',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: c.shadow,
        marginBottom: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        {review.status === 'pending' && (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(review.id)}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: c.primary500,
              marginTop: '4px',
            }}
          />
        )}
        <img
          src={review.productImageUrl}
          alt={review.productName}
          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h4 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 600, color: c.earth700, margin: 0 }}>
              {review.productName}
            </h4>
            <span
              style={{
                background: statusColor.bg,
                color: statusColor.text,
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {review.status}
            </span>
            {review.isVerifiedPurchase && (
              <span
                style={{
                  background: c.primary100,
                  color: c.primary500,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Badge size={12} />
                Verified
              </span>
            )}
          </div>
          <div style={{ fontSize: '14px', color: c.earth600, marginBottom: '12px' }}>
            {review.customerName} • {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <StarRating rating={review.rating} />
        </div>
      </div>

      {/* Review Content */}
      {review.title && (
        <h5 style={{ fontFamily: fonts.heading, fontSize: '15px', fontWeight: 600, color: c.earth700, margin: '0 0 8px 0' }}>
          {review.title}
        </h5>
      )}
      <p style={{ color: c.earth600, fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
        {review.text}
      </p>

      {/* Photos */}
      {review.photos.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {review.photos.map((photo, idx) => (
            <img
              key={idx}
              src={photo}
              alt={`Review photo ${idx + 1}`}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: `1px solid ${c.earth300}`,
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}

      {/* Admin Response */}
      {review.adminResponse && (
        <div
          style={{
            background: c.primary50,
            borderLeft: `4px solid ${c.primary500}`,
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: 600, color: c.primary500, marginBottom: '6px' }}>
            Admin Response
          </div>
          <p style={{ fontSize: '14px', color: c.earth600, margin: 0 }}>
            {review.adminResponse}
          </p>
        </div>
      )}

      {/* Response Input */}
      {review.status === 'pending' && showResponse && (
        <div style={{ marginBottom: '16px' }}>
          <textarea
            value={responseText}
            onChange={e => setResponseText(e.target.value)}
            placeholder="Optional admin response..."
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              border: `1px solid ${c.earth300}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: fonts.body,
              resize: 'vertical',
              outline: 'none',
            }}
            onFocus={e => e.target.style.borderColor = c.primary400}
            onBlur={e => e.target.style.borderColor = c.earth300}
          />
        </div>
      )}

      {/* Actions */}
      {review.status === 'pending' && (
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              onApprove(review.id, responseText || undefined)
              setShowResponse(false)
              setResponseText('')
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: c.success,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <CheckCircle2 size={16} />
            Approve
          </button>
          <button
            onClick={() => onReject(review.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: c.error,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            <XCircle size={16} />
            Reject
          </button>
          <button
            onClick={() => setShowResponse(!showResponse)}
            style={{
              padding: '8px 16px',
              background: 'transparent',
              color: c.primary500,
              border: `1px solid ${c.primary500}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = c.primary50
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {showResponse ? 'Hide Response' : 'Add Response'}
          </button>
        </div>
      )}
    </div>
  )
}

function QACard({
  qa,
  onAnswer,
  onEditAnswer,
  onDeleteAnswer,
}: {
  qa: QAItem
  onAnswer: (id: string, answer: string) => void
  onEditAnswer: (id: string, answer: string) => void
  onDeleteAnswer: (id: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [answerText, setAnswerText] = useState(qa.answer || '')

  const handleSubmit = () => {
    if (!answerText.trim()) return
    if (qa.status === 'answered') {
      onEditAnswer(qa.id, answerText)
    } else {
      onAnswer(qa.id, answerText)
    }
    setIsEditing(false)
  }

  return (
    <div
      style={{
        background: `linear-gradient(${c.card}, ${c.card}) padding-box, ${c.gradient} border-box`,
        borderTop: '4px solid transparent',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: c.shadow,
        marginBottom: '16px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
        <img
          src={qa.productImageUrl}
          alt={qa.productName}
          style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <h4 style={{ fontFamily: fonts.heading, fontSize: '16px', fontWeight: 600, color: c.earth700, margin: '0 0 8px 0' }}>
            {qa.productName}
          </h4>
          <div style={{ fontSize: '14px', color: c.earth600, marginBottom: '12px' }}>
            {qa.customerName} • {new Date(qa.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <span
            style={{
              background: qa.status === 'answered' ? c.successLight : c.warningLight,
              color: qa.status === 'answered' ? c.success : c.warning,
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          >
            {qa.status}
          </span>
        </div>
      </div>

      {/* Question */}
      <div
        style={{
          background: c.subtle,
          borderLeft: `4px solid ${c.primary500}`,
          padding: '12px 16px',
          borderRadius: '8px',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <MessageSquare size={14} style={{ color: c.primary500 }} />
          <span style={{ fontSize: '12px', fontWeight: 600, color: c.primary500 }}>Question</span>
        </div>
        <p style={{ fontSize: '14px', color: c.earth700, margin: 0, fontWeight: 500 }}>
          {qa.question}
        </p>
      </div>

      {/* Answer Display */}
      {qa.answer && !isEditing && (
        <div
          style={{
            background: c.primary50,
            borderLeft: `4px solid ${c.secondary500}`,
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={14} style={{ color: c.secondary500 }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: c.secondary500 }}>
                Answer by {qa.answeredBy}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => {
                  setIsEditing(true)
                  setAnswerText(qa.answer!)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: 'transparent',
                  color: c.primary500,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Edit2 size={12} />
                Edit
              </button>
              <button
                onClick={() => onDeleteAnswer(qa.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: 'transparent',
                  color: c.error,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: c.earth700, margin: 0 }}>
            {qa.answer}
          </p>
          {qa.answeredAt && (
            <div style={{ fontSize: '12px', color: c.earth500, marginTop: '8px' }}>
              Answered on {new Date(qa.answeredAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          )}
        </div>
      )}

      {/* Answer Input */}
      {(qa.status === 'unanswered' || isEditing) && (
        <div>
          <textarea
            value={answerText}
            onChange={e => setAnswerText(e.target.value)}
            placeholder="Type your answer..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              border: `1px solid ${c.earth300}`,
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: fonts.body,
              resize: 'vertical',
              outline: 'none',
              marginBottom: '12px',
            }}
            onFocus={e => e.target.style.borderColor = c.primary400}
            onBlur={e => e.target.style.borderColor = c.earth300}
          />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleSubmit}
              disabled={!answerText.trim()}
              style={{
                padding: '8px 16px',
                background: answerText.trim() ? c.primary500 : c.earth300,
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: answerText.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 200ms',
              }}
              onMouseEnter={e => answerText.trim() && (e.currentTarget.style.background = c.primary400)}
              onMouseLeave={e => answerText.trim() && (e.currentTarget.style.background = c.primary500)}
            >
              {qa.status === 'answered' ? 'Update Answer' : 'Submit Answer'}
            </button>
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false)
                  setAnswerText(qa.answer!)
                }}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  color: c.earth600,
                  border: `1px solid ${c.earth300}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function AdminReviewsQA({
  reviews,
  qaItems,
  activeTab,
  reviewStatusFilter,
  qaStatusFilter,
  searchQuery,
  onChangeTab,
  onChangeReviewStatus,
  onChangeQAStatus,
  onSearch,
  onApproveReview,
  onRejectReview,
  onBulkAction,
  onAnswerQuestion,
  onEditAnswer,
  onDeleteAnswer,
}: AdminReviewsQAProps) {
  const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set())

  const filteredReviews = useMemo(() => {
    let result = reviews
    if (reviewStatusFilter !== 'all') {
      result = result.filter(r => r.status === reviewStatusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        r => r.productName.toLowerCase().includes(q) || r.customerName.toLowerCase().includes(q) || r.text.toLowerCase().includes(q)
      )
    }
    return result
  }, [reviews, reviewStatusFilter, searchQuery])

  const filteredQA = useMemo(() => {
    let result = qaItems
    if (qaStatusFilter !== 'all') {
      result = result.filter(q => q.status === qaStatusFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        qa => qa.productName.toLowerCase().includes(q) || qa.customerName.toLowerCase().includes(q) || qa.question.toLowerCase().includes(q)
      )
    }
    return result
  }, [qaItems, qaStatusFilter, searchQuery])

  const reviewCounts = useMemo(() => ({
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  }), [reviews])

  const qaCounts = useMemo(() => ({
    unanswered: qaItems.filter(q => q.status === 'unanswered').length,
    answered: qaItems.filter(q => q.status === 'answered').length,
  }), [qaItems])

  const handleToggleSelect = (id: string) => {
    const newSet = new Set(selectedReviews)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setSelectedReviews(newSet)
  }

  const handleBulkApprove = () => {
    if (selectedReviews.size > 0 && onBulkAction) {
      onBulkAction('approve', Array.from(selectedReviews))
      setSelectedReviews(new Set())
    }
  }

  const handleBulkReject = () => {
    if (selectedReviews.size > 0 && onBulkAction) {
      onBulkAction('reject', Array.from(selectedReviews))
      setSelectedReviews(new Set())
    }
  }

  return (
    <div style={{ fontFamily: fonts.body }}>
      {/* Main Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', borderBottom: `2px solid ${c.subtle}` }}>
        {[
          { key: 'reviews', label: 'Reviews', count: reviews.length },
          { key: 'qa', label: 'Q&A', count: qaItems.length },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => onChangeTab?.(tab.key as 'reviews' | 'qa')}
            style={{
              padding: '12px 24px',
              background: activeTab === tab.key ? c.primary50 : 'transparent',
              color: activeTab === tab.key ? c.primary500 : c.earth600,
              border: 'none',
              borderBottom: activeTab === tab.key ? `3px solid ${c.primary500}` : '3px solid transparent',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: fonts.heading,
              cursor: 'pointer',
              transition: 'all 200ms',
              marginBottom: '-2px',
            }}
            onMouseEnter={e => {
              if (activeTab !== tab.key) {
                e.currentTarget.style.background = c.subtle
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== tab.key) {
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <>
          {/* Status Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'All', count: reviews.length },
              { key: 'pending', label: 'Pending', count: reviewCounts.pending, icon: Clock },
              { key: 'approved', label: 'Approved', count: reviewCounts.approved, icon: CheckCircle2 },
              { key: 'rejected', label: 'Rejected', count: reviewCounts.rejected, icon: XCircle },
            ].map(status => {
              const Icon = status.icon
              const isActive = reviewStatusFilter === status.key
              return (
                <button
                  key={status.key}
                  onClick={() => onChangeReviewStatus?.(status.key as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: isActive ? c.primary500 : c.card,
                    color: isActive ? '#ffffff' : c.earth700,
                    border: isActive ? 'none' : `1px solid ${c.earth300}`,
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms',
                    boxShadow: isActive ? c.shadow : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = c.subtle
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = c.card
                    }
                  }}
                >
                  {Icon && <Icon size={16} />}
                  {status.label} ({status.count})
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: c.earth400 }} />
            <input
              type="text"
              placeholder="Search reviews by product, customer, or text..."
              value={searchQuery}
              onChange={e => onSearch?.(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          {/* Bulk Actions Bar */}
          {selectedReviews.size > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                background: c.primary50,
                borderRadius: '12px',
                marginBottom: '24px',
                border: `1px solid ${c.primary200}`,
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 600, color: c.primary500 }}>
                {selectedReviews.size} review{selectedReviews.size === 1 ? '' : 's'} selected
              </span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleBulkApprove}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: c.success,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Check size={16} />
                  Approve All
                </button>
                <button
                  onClick={handleBulkReject}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: c.error,
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <X size={16} />
                  Reject All
                </button>
                <button
                  onClick={() => setSelectedReviews(new Set())}
                  style={{
                    padding: '8px 16px',
                    background: 'transparent',
                    color: c.earth600,
                    border: `1px solid ${c.earth300}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Reviews List */}
          {filteredReviews.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 24px',
                color: c.earth500,
                fontSize: '15px',
              }}
            >
              No reviews found.
            </div>
          ) : (
            filteredReviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                isSelected={selectedReviews.has(review.id)}
                onToggleSelect={handleToggleSelect}
                onApprove={onApproveReview!}
                onReject={onRejectReview!}
              />
            ))
          )}
        </>
      )}

      {/* Q&A Tab */}
      {activeTab === 'qa' && (
        <>
          {/* Status Filters */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'All', count: qaItems.length },
              { key: 'unanswered', label: 'Unanswered', count: qaCounts.unanswered, icon: Clock },
              { key: 'answered', label: 'Answered', count: qaCounts.answered, icon: CheckCircle2 },
            ].map(status => {
              const Icon = status.icon
              const isActive = qaStatusFilter === status.key
              return (
                <button
                  key={status.key}
                  onClick={() => onChangeQAStatus?.(status.key as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 18px',
                    background: isActive ? c.primary500 : c.card,
                    color: isActive ? '#ffffff' : c.earth700,
                    border: isActive ? 'none' : `1px solid ${c.earth300}`,
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 200ms',
                    boxShadow: isActive ? c.shadow : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = c.subtle
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = c.card
                    }
                  }}
                >
                  {Icon && <Icon size={16} />}
                  {status.label} ({status.count})
                </button>
              )
            })}
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: c.earth400 }} />
            <input
              type="text"
              placeholder="Search questions by product, customer, or text..."
              value={searchQuery}
              onChange={e => onSearch?.(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 16px 14px 48px',
                border: `1px solid ${c.earth300}`,
                borderRadius: '12px',
                fontSize: '15px',
                fontFamily: fonts.body,
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = c.primary400}
              onBlur={e => e.target.style.borderColor = c.earth300}
            />
          </div>

          {/* Q&A List */}
          {filteredQA.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '64px 24px',
                color: c.earth500,
                fontSize: '15px',
              }}
            >
              No questions found.
            </div>
          ) : (
            filteredQA.map(qa => (
              <QACard
                key={qa.id}
                qa={qa}
                onAnswer={onAnswerQuestion!}
                onEditAnswer={onEditAnswer!}
                onDeleteAnswer={onDeleteAnswer!}
              />
            ))
          )}
        </>
      )}
    </div>
  )
}
