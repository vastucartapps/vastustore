import React, { useState } from 'react'
import { Edit, Trash2, Eye, EyeOff, Package, Calendar, Hash } from 'lucide-react'
import type { Category } from '../types'

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

export interface CategoryDetailProps {
  category: Category | null
  onEdit?: (category: Category) => void
  onDelete?: (categoryId: string) => void
  onToggleStatus?: (categoryId: string) => void
}

export function CategoryDetail({ category, onEdit, onDelete, onToggleStatus }: CategoryDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!category) {
    return (
      <div
        className="h-full rounded-lg flex items-center justify-center"
        style={{ backgroundColor: c.card, boxShadow: c.shadow }}
      >
        <div className="text-center px-6">
          <Package size={64} style={{ color: c.earth300 }} className="mx-auto mb-4" />
          <p className="text-lg font-medium mb-2" style={{ color: c.earth500, fontFamily: fonts.heading }}>
            Select a category to view details
          </p>
          <p className="text-sm" style={{ color: c.earth400, fontFamily: fonts.body }}>
            Click on a category in the tree to see its details and manage it.
          </p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div
      className="h-full rounded-lg overflow-y-auto"
      style={{ backgroundColor: c.card, boxShadow: c.shadow }}
    >
      <div className="p-6">
        {/* Image */}
        {category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full aspect-video object-cover rounded-lg mb-6"
          />
        ) : (
          <div
            className="w-full aspect-video rounded-lg flex items-center justify-center mb-6"
            style={{ backgroundColor: c.primary50 }}
          >
            <Package size={64} style={{ color: c.primary400 }} />
          </div>
        )}

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-semibold mb-2" style={{ color: c.earth700, fontFamily: fonts.heading }}>
            {category.name}
          </h2>
          {category.parentName && (
            <p className="text-sm mb-3" style={{ color: c.earth400, fontFamily: fonts.body }}>
              Parent: <span style={{ color: c.primary500, fontFamily: fonts.mono }}>{category.parentName}</span>
            </p>
          )}
          {category.description && (
            <p className="text-base leading-relaxed" style={{ color: c.earth600, fontFamily: fonts.body }}>
              {category.description}
            </p>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: c.primary50 }}>
            <div className="flex items-center gap-2 mb-1">
              <Package size={16} style={{ color: c.primary500 }} />
              <p className="text-xs font-medium" style={{ color: c.primary500, fontFamily: fonts.body }}>
                Products
              </p>
            </div>
            <p className="text-2xl font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
              {category.productCount}
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: c.secondary50 }}>
            <div className="flex items-center gap-2 mb-1">
              <Hash size={16} style={{ color: c.secondary500 }} />
              <p className="text-xs font-medium" style={{ color: c.secondary500, fontFamily: fonts.body }}>
                Display Order
              </p>
            </div>
            <p className="text-2xl font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
              {category.displayOrder}
            </p>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: c.subtle }}>
            <p className="text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
              Status
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.status === 'active' ? c.success : c.earth300 }}
              />
              <p className="text-sm font-medium capitalize" style={{ color: c.earth700, fontFamily: fonts.body }}>
                {category.status}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-lg" style={{ backgroundColor: c.subtle }}>
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} style={{ color: c.earth500 }} />
              <p className="text-xs font-medium" style={{ color: c.earth500, fontFamily: fonts.body }}>
                Created
              </p>
            </div>
            <p className="text-sm" style={{ color: c.earth700, fontFamily: fonts.body }}>
              {formatDate(category.createdAt)}
            </p>
          </div>
        </div>

        {/* SEO Section */}
        {category.seo && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: c.earth700, fontFamily: fonts.heading }}>
              SEO Settings
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg" style={{ backgroundColor: c.subtle }}>
                <p className="text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
                  Meta Title
                </p>
                <p className="text-sm" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  {category.seo.metaTitle || 'Not set'}
                </p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: c.subtle }}>
                <p className="text-xs font-medium mb-1" style={{ color: c.earth500, fontFamily: fonts.body }}>
                  Meta Description
                </p>
                <p className="text-sm" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  {category.seo.metaDescription || 'Not set'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4" style={{ borderTop: `1px solid ${c.primary100}` }}>
          <button
            onClick={() => onEdit?.(category)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: c.primary500,
              color: c.card,
              fontFamily: fonts.body,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = c.primary400
              e.currentTarget.style.boxShadow = c.shadowHover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = c.primary500
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <Edit size={16} />
            Edit Category
          </button>

          <button
            onClick={() => onToggleStatus?.(category.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: c.earth600,
              backgroundColor: 'transparent',
              fontFamily: fonts.body,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = c.subtle
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            {category.status === 'active' ? (
              <>
                <EyeOff size={16} />
                Deactivate
              </>
            ) : (
              <>
                <Eye size={16} />
                Activate
              </>
            )}
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{
              color: c.error,
              backgroundColor: 'transparent',
              border: `1px solid ${c.error}`,
              fontFamily: fonts.body,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = c.errorLight
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div
            className="mt-4 p-4 rounded-lg"
            style={{ backgroundColor: c.errorLight, border: `1px solid ${c.error}` }}
          >
            <p className="text-sm font-medium mb-2" style={{ color: c.error, fontFamily: fonts.body }}>
              Are you sure you want to delete this category?
            </p>
            {category.productCount > 0 && (
              <p className="text-sm mb-3" style={{ color: c.earth600, fontFamily: fonts.body }}>
                This category contains <strong>{category.productCount} products</strong>. They will need to be reassigned to another category.
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onDelete?.(category.id)
                  setShowDeleteConfirm(false)
                }}
                className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: c.error,
                  color: c.card,
                  fontFamily: fonts.body,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
                style={{
                  color: c.earth600,
                  backgroundColor: c.card,
                  fontFamily: fonts.body,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = c.subtle
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = c.card
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
