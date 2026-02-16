import React, { useState, useEffect } from 'react'
import { ArrowLeft, Upload, X } from 'lucide-react'
import type { Category, CategoryOption } from '../types'

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

export interface CategoryFormProps {
  category: Category | null
  parentOptions: CategoryOption[]
  isEditing: boolean
  onSave?: (data: Partial<Category>) => void
  onCancel?: () => void
  onImageUpload?: (file: File) => Promise<string>
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function CategoryForm({
  category,
  parentOptions,
  isEditing,
  onSave,
  onCancel,
  onImageUpload,
}: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentId: '',
    slug: '',
    displayOrder: 0,
    status: 'active' as 'active' | 'inactive',
    imageUrl: '',
    metaTitle: '',
    metaDescription: '',
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [slugEdited, setSlugEdited] = useState(false)

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        parentId: category.parentId || '',
        slug: category.slug,
        displayOrder: category.displayOrder,
        status: category.status,
        imageUrl: category.imageUrl || '',
        metaTitle: category.seo?.metaTitle || '',
        metaDescription: category.seo?.metaDescription || '',
      })
      setImagePreview(category.imageUrl || null)
      setSlugEdited(true) // Don't auto-generate slug for existing categories
    }
  }, [category])

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: slugEdited ? prev.slug : slugify(name),
    }))
  }

  const handleSlugChange = (slug: string) => {
    setSlugEdited(true)
    setFormData((prev) => ({ ...prev, slug }))
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const imageUrl = onImageUpload ? await onImageUpload(file) : URL.createObjectURL(file)
      setFormData((prev) => ({ ...prev, imageUrl }))
      setImagePreview(imageUrl)
    } catch (error) {
      console.error('Image upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: '' }))
    setImagePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const saveData: Partial<Category> = {
      name: formData.name,
      description: formData.description,
      parentId: formData.parentId || null,
      slug: formData.slug,
      displayOrder: formData.displayOrder,
      status: formData.status,
      imageUrl: formData.imageUrl,
      seo: {
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
      },
    }
    onSave?.(saveData)
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 mb-4 text-sm font-medium transition-colors"
            style={{ color: c.primary500, fontFamily: fonts.body }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = c.primary400
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = c.primary500
            }}
          >
            <ArrowLeft size={16} />
            Back to Categories
          </button>
          <h1 className="text-3xl font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
            {isEditing ? `Edit: ${category?.name}` : 'Add Category'}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div
            className="rounded-lg overflow-hidden mb-6"
            style={{ backgroundColor: c.card, boxShadow: c.shadow }}
          >
            <div style={{ background: c.gradient, height: '4px' }} />
            <div className="p-6 space-y-6">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  Category Image
                </label>
                {imagePreview ? (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md aspect-video object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 rounded-full transition-colors"
                      style={{ backgroundColor: c.card, color: c.error }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = c.errorLight
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = c.card
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label
                    className="flex flex-col items-center justify-center w-full max-w-md aspect-video rounded-lg cursor-pointer transition-colors"
                    style={{
                      border: `2px dashed ${c.primary200}`,
                      backgroundColor: c.primary50,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = c.primary400
                      e.currentTarget.style.backgroundColor = c.primary100
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = c.primary200
                      e.currentTarget.style.backgroundColor = c.primary50
                    }}
                  >
                    <Upload size={32} style={{ color: c.primary500 }} className="mb-2" />
                    <p className="text-sm font-medium mb-1" style={{ color: c.primary500, fontFamily: fonts.body }}>
                      {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-xs" style={{ color: c.earth400, fontFamily: fonts.body }}>
                      PNG, JPG or WebP (max. 2MB)
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  Category Name <span style={{ color: c.error }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg transition-colors"
                  style={{
                    border: `1px solid ${c.primary200}`,
                    backgroundColor: c.card,
                    color: c.earth700,
                    fontFamily: fonts.body,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = c.primary500
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = c.primary200
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg transition-colors resize-none"
                  style={{
                    border: `1px solid ${c.primary200}`,
                    backgroundColor: c.card,
                    color: c.earth700,
                    fontFamily: fonts.body,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = c.primary500
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = c.primary200
                  }}
                />
              </div>

              {/* Parent Category */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  Parent Category
                </label>
                <select
                  value={formData.parentId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, parentId: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg transition-colors"
                  style={{
                    border: `1px solid ${c.primary200}`,
                    backgroundColor: c.card,
                    color: c.earth700,
                    fontFamily: fonts.body,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = c.primary500
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = c.primary200
                  }}
                >
                  <option value="">None (Top Level)</option>
                  {parentOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {'\u2014 '.repeat(option.depth)}{option.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* URL Slug */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                  URL Slug <span style={{ color: c.error }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg transition-colors"
                  style={{
                    border: `1px solid ${c.primary200}`,
                    backgroundColor: c.card,
                    color: c.earth700,
                    fontFamily: fonts.mono,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = c.primary500
                    e.currentTarget.style.outline = 'none'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = c.primary200
                  }}
                />
              </div>

              {/* Display Order & Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData((prev) => ({ ...prev, displayOrder: parseInt(e.target.value) || 0 }))}
                    min="0"
                    className="w-full px-4 py-2 rounded-lg transition-colors"
                    style={{
                      border: `1px solid ${c.primary200}`,
                      backgroundColor: c.card,
                      color: c.earth700,
                      fontFamily: fonts.body,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = c.primary500
                      e.currentTarget.style.outline = 'none'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = c.primary200
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: c.earth700, fontFamily: fonts.body }}>
                    Status
                  </label>
                  <div className="flex items-center gap-3 h-10">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={(e) => setFormData((prev) => ({ ...prev, status: 'active' }))}
                        className="w-4 h-4"
                        style={{ accentColor: c.primary500 }}
                      />
                      <span className="text-sm" style={{ color: c.earth700, fontFamily: fonts.body }}>
                        Active
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={(e) => setFormData((prev) => ({ ...prev, status: 'inactive' }))}
                        className="w-4 h-4"
                        style={{ accentColor: c.earth300 }}
                      />
                      <span className="text-sm" style={{ color: c.earth700, fontFamily: fonts.body }}>
                        Inactive
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div
                className="p-4 rounded-lg space-y-4"
                style={{ backgroundColor: c.subtle, border: `1px solid ${c.primary100}` }}
              >
                <h3 className="text-lg font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                  SEO Settings
                </h3>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium" style={{ color: c.earth700, fontFamily: fonts.body }}>
                      Meta Title
                    </label>
                    <span
                      className="text-xs"
                      style={{
                        color: formData.metaTitle.length > 60 ? c.warning : c.earth400,
                        fontFamily: fonts.mono,
                      }}
                    >
                      {formData.metaTitle.length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, metaTitle: e.target.value }))}
                    maxLength={60}
                    className="w-full px-4 py-2 rounded-lg transition-colors"
                    style={{
                      border: `1px solid ${c.primary200}`,
                      backgroundColor: c.card,
                      color: c.earth700,
                      fontFamily: fonts.body,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = c.primary500
                      e.currentTarget.style.outline = 'none'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = c.primary200
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium" style={{ color: c.earth700, fontFamily: fonts.body }}>
                      Meta Description
                    </label>
                    <span
                      className="text-xs"
                      style={{
                        color: formData.metaDescription.length > 160 ? c.warning : c.earth400,
                        fontFamily: fonts.mono,
                      }}
                    >
                      {formData.metaDescription.length}/160
                    </span>
                  </div>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData((prev) => ({ ...prev, metaDescription: e.target.value }))}
                    maxLength={160}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg transition-colors resize-none"
                    style={{
                      border: `1px solid ${c.primary200}`,
                      backgroundColor: c.card,
                      color: c.earth700,
                      fontFamily: fonts.body,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = c.primary500
                      e.currentTarget.style.outline = 'none'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = c.primary200
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg text-base font-medium transition-all"
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
              Save Category
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-lg text-base font-medium transition-colors"
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
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
