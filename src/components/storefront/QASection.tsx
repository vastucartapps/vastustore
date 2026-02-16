"use client"

import { useState } from 'react'
import { ChevronDown, MessageCircle, ShieldCheck, HelpCircle, MessageSquare } from 'lucide-react'
import type { ProductFAQ, ProductQuestion } from './types'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradientAccent: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
}

interface QASectionProps {
  faqs: ProductFAQ[]
  questions: ProductQuestion[]
  onAskQuestion?: (question: string) => void
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function QASection({ faqs, questions, onAskQuestion }: QASectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(faqs[0]?.id ?? null)
  const [expandedQ, setExpandedQ] = useState<string | null>(questions[0]?.id ?? null)
  const [askOpen, setAskOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')

  const handleSubmit = () => {
    if (newQuestion.trim()) {
      onAskQuestion?.(newQuestion.trim())
      setNewQuestion('')
      setAskOpen(false)
    }
  }

  return (
    <div className="space-y-14">
      {/* ═══ Admin FAQs ═══ */}
      {faqs.length > 0 && (
        <div>
          {/* Section header with gradient dividers */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
            <h3
              className="text-xl sm:text-2xl font-bold text-center px-4"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              Frequently Asked Questions
            </h3>
            <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid #f0ebe4' }}
          >
            {/* Gradient accent top */}
            <div className="h-1" style={{ background: c.gradientAccent }} />

            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === faq.id
              const isLast = idx === faqs.length - 1
              return (
                <div
                  key={faq.id}
                  style={{ borderBottom: isLast ? 'none' : '1px solid #f0ebe4' }}
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left transition-colors"
                    style={{ background: isOpen ? c.primary50 : c.bgCard }}
                    onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = c.bgPrimary }}
                    onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = c.bgCard }}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: isOpen ? `${c.primary500}15` : '#f5f0ea' }}
                    >
                      <HelpCircle className="w-4 h-4" style={{ color: isOpen ? c.primary500 : c.earth300 }} />
                    </span>
                    <span
                      className="text-sm sm:text-base font-medium flex-1"
                      style={{ color: isOpen ? c.primary500 : c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                      style={{
                        color: isOpen ? c.primary500 : c.earth300,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 sm:px-6 pb-5 pt-1"
                      style={{ background: c.bgCard }}
                    >
                      <div className="ml-12">
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif", lineHeight: 1.7 }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ═══ Customer Q&A ═══ */}
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="flex-1 h-px hidden sm:block" style={{ background: c.gradientAccent }} />
            <h3
              className="text-xl sm:text-2xl font-bold whitespace-nowrap"
              style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
            >
              Questions & Answers
            </h3>
            <div className="flex-1 h-px hidden sm:block" style={{ background: c.gradientAccent }} />
          </div>
          <button
            onClick={() => setAskOpen(!askOpen)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: c.primary500,
              color: '#fff',
              fontFamily: "'Open Sans', sans-serif",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = c.primary400)}
            onMouseLeave={(e) => (e.currentTarget.style.background = c.primary500)}
          >
            <MessageCircle className="w-4 h-4" /> Ask a Question
          </button>
        </div>

        {/* Ask form */}
        {askOpen && (
          <div
            className="rounded-2xl p-5 mb-6"
            style={{ background: c.primary50, border: `1.5px solid ${c.primary400}33` }}
          >
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question about this product..."
              rows={3}
              className="w-full rounded-xl p-4 text-sm outline-none resize-none transition-all"
              style={{
                border: '1.5px solid #e8e0d8',
                color: c.earth700,
                fontFamily: "'Open Sans', sans-serif",
                background: c.bgCard,
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = c.primary400
                e.currentTarget.style.boxShadow = `0 0 0 3px ${c.primary500}10`
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e8e0d8'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => { setAskOpen(false); setNewQuestion('') }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f0ea')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{
                  background: newQuestion.trim() ? c.primary500 : c.earth300,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                onMouseEnter={(e) => { if (newQuestion.trim()) e.currentTarget.style.background = c.primary400 }}
                onMouseLeave={(e) => { if (newQuestion.trim()) e.currentTarget.style.background = c.primary500 }}
              >
                Submit Question
              </button>
            </div>
          </div>
        )}

        {/* Questions list — accordion style */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: '1px solid #f0ebe4' }}
        >
          <div className="h-1" style={{ background: c.gradientAccent }} />

          {questions.map((q, idx) => {
            const isOpen = expandedQ === q.id
            const isLast = idx === questions.length - 1
            return (
              <div
                key={q.id}
                style={{ borderBottom: isLast ? 'none' : '1px solid #f0ebe4' }}
              >
                <button
                  onClick={() => setExpandedQ(isOpen ? null : q.id)}
                  className="w-full flex items-center gap-4 px-5 sm:px-6 py-4 text-left transition-colors"
                  style={{ background: isOpen ? c.primary50 : c.bgCard }}
                  onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = c.bgPrimary }}
                  onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = isOpen ? c.primary50 : c.bgCard }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: isOpen ? `${c.secondary500}15` : '#f5f0ea' }}
                  >
                    <MessageSquare className="w-4 h-4" style={{ color: isOpen ? c.secondary500 : c.earth300 }} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-sm sm:text-base font-medium block"
                      style={{ color: isOpen ? c.primary500 : c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {q.question}
                    </span>
                    <span className="text-xs mt-0.5 block" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                      {q.askedBy} · {formatDate(q.askedAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {q.answer && q.isAdminAnswer && (
                      <span
                        className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: c.primary50, color: c.primary500 }}
                      >
                        <ShieldCheck className="w-3 h-3" /> Answered
                      </span>
                    )}
                    {!q.answer && (
                      <span
                        className="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: '#f5f0ea', color: c.earth300 }}
                      >
                        Pending
                      </span>
                    )}
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        color: isOpen ? c.primary500 : c.earth300,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      }}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1" style={{ background: c.bgCard }}>
                    {q.answer ? (
                      <div
                        className="ml-12 rounded-xl p-4"
                        style={{ background: c.bgPrimary }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif", lineHeight: 1.7 }}
                        >
                          {q.answer}
                        </p>
                        <div className="flex items-center gap-2.5 mt-2.5">
                          {q.isAdminAnswer && (
                            <span
                              className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                              style={{ background: c.primary50, color: c.primary500 }}
                            >
                              <ShieldCheck className="w-3 h-3" /> Official Answer
                            </span>
                          )}
                          <span className="text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                            {q.answeredBy} · {q.answeredAt && formatDate(q.answeredAt)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <p
                        className="text-xs italic ml-12"
                        style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        Awaiting answer from our team...
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
