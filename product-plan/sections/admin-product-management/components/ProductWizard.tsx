import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Upload,
  GripVertical,
  X,
} from 'lucide-react'
import type {
  ProductDetail,
  CategoryOption,
} from '../types'

// Brand constants
const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary200: '#71c1ae',
  primary100: '#c5e8e2',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  secondary50: '#fff5ed',
  bg: '#fffbf5',
  card: '#ffffff',
  subtle: '#f5dfbb',
  earth300: '#a39585',
  earth400: '#75615a',
  earth500: '#71685b',
  earth600: '#5a4f47',
  earth700: '#433b35',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  gradient: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
}
const fonts = {
  heading: "'Lora', serif",
  body: "'Open Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
}

type WizardStep =
  | 'basic'
  | 'variants'
  | 'images'
  | 'rich-content'
  | 'specs'
  | 'faqs'
  | 'seo'
  | 'merchant'

interface ProductWizardProps {
  product: ProductDetail | null // null = creating new
  categories: CategoryOption[]
  currentStep: WizardStep
  isEditing: boolean
  onStepChange?: (step: WizardStep) => void
  onSaveDraft?: (data: Partial<ProductDetail>) => void
  onPublish?: (data: Partial<ProductDetail>) => void
  onCancel?: () => void
  onBack?: () => void
}

const STEPS: Array<{ id: WizardStep; label: string; number: number }> = [
  { id: 'basic', label: 'Basic Info', number: 1 },
  { id: 'variants', label: 'Variants', number: 2 },
  { id: 'images', label: 'Images', number: 3 },
  { id: 'rich-content', label: 'Content', number: 4 },
  { id: 'specs', label: 'Specs', number: 5 },
  { id: 'faqs', label: 'FAQs', number: 6 },
  { id: 'seo', label: 'SEO', number: 7 },
  { id: 'merchant', label: 'Merchant', number: 8 },
]

// Extract InputField to top level to avoid unmount/remount bug
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  help,
  maxLength,
  rows,
}: {
  label: string
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  help?: string
  maxLength?: number
  rows?: number
}) {
  const isTextarea = rows !== undefined

  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium mb-1"
        style={{ color: c.earth700, fontFamily: fonts.body }}
      >
        {label}
        {required && <span style={{ color: c.error }}>*</span>}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
          style={{
            borderColor: c.earth300,
            fontFamily: fonts.body,
            focusRingColor: c.primary400,
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
          style={{
            borderColor: c.earth300,
            fontFamily: fonts.body,
            focusRingColor: c.primary400,
          }}
        />
      )}
      {help && (
        <p className="text-xs mt-1" style={{ color: c.earth400, fontFamily: fonts.body }}>
          {help}
        </p>
      )}
      {maxLength && (
        <p className="text-xs mt-1 text-right" style={{ color: c.earth400, fontFamily: fonts.body }}>
          {String(value).length}/{maxLength}
        </p>
      )}
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  required?: boolean
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium mb-1"
        style={{ color: c.earth700, fontFamily: fonts.body }}
      >
        {label}
        {required && <span style={{ color: c.error }}>*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
        style={{
          borderColor: c.earth300,
          fontFamily: fonts.body,
          focusRingColor: c.primary400,
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function ProductWizard({
  product,
  categories,
  currentStep,
  isEditing,
  onStepChange,
  onSaveDraft,
  onPublish,
  onCancel,
  onBack,
}: ProductWizardProps) {
  const [formData, setFormData] = useState<Partial<ProductDetail>>(
    product || {
      name: '',
      sku: '',
      description: '',
      shortDescription: '',
      categoryId: '',
      category: '',
      price: 0,
      mrp: 0,
      currency: '₹',
      status: 'draft',
      tags: [],
      hsnCode: '',
      gstRate: 0,
      variants: [],
      images: [],
      richContent: [],
      specs: [],
      faqs: [],
      seo: {
        metaTitle: '',
        metaDescription: '',
        urlSlug: '',
        canonicalUrl: '',
      },
      merchantCentre: {
        gtin: '',
        mpn: '',
        brand: '',
        condition: 'new',
        ageGroup: '',
        gender: '',
        googleCategory: '',
      },
    }
  )

  const [previewCollapsed, setPreviewCollapsed] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<WizardStep>>(new Set())

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep)
  const currentStepData = STEPS[currentStepIndex]

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev[parent as keyof typeof prev] as any), [field]: value },
    }))
  }

  const handleNext = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
    if (currentStepIndex < STEPS.length - 1) {
      onStepChange?.(STEPS[currentStepIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      onStepChange?.(STEPS[currentStepIndex - 1].id)
    }
  }

  const handleStepClick = (step: WizardStep) => {
    const stepIndex = STEPS.findIndex((s) => s.id === step)
    if (stepIndex <= currentStepIndex || completedSteps.has(step)) {
      onStepChange?.(step)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return (
          <div>
            <InputField
              label="Product Name"
              value={formData.name || ''}
              onChange={(v) => updateField('name', v)}
              placeholder="Enter product name"
              required
            />
            <InputField
              label="Short Description"
              value={formData.shortDescription || ''}
              onChange={(v) => updateField('shortDescription', v)}
              placeholder="Brief one-line description"
              maxLength={120}
              help="Shown in product listings and cards"
            />
            <InputField
              label="Full Description"
              value={formData.description || ''}
              onChange={(v) => updateField('description', v)}
              placeholder="Detailed product description"
              rows={6}
            />
            <SelectField
              label="Category"
              value={formData.categoryId || ''}
              onChange={(v) => {
                const cat = categories.find((c) => c.id === v)
                updateField('categoryId', v)
                updateField('category', cat?.name || '')
              }}
              options={[
                { value: '', label: 'Select a category' },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
              required
            />
            <InputField
              label="Tags"
              value={formData.tags?.join(', ') || ''}
              onChange={(v) => updateField('tags', v.split(',').map((t) => t.trim()))}
              placeholder="e.g., organic, handmade, eco-friendly"
              help="Comma-separated keywords for search and filtering"
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="HSN Code"
                value={formData.hsnCode || ''}
                onChange={(v) => updateField('hsnCode', v)}
                placeholder="e.g., 1234"
                help="For GST compliance"
              />
              <InputField
                label="GST Rate (%)"
                value={formData.gstRate || ''}
                onChange={(v) => updateField('gstRate', parseFloat(v) || 0)}
                type="number"
                placeholder="e.g., 18"
              />
            </div>
            <SelectField
              label="Status"
              value={formData.status || 'draft'}
              onChange={(v) => updateField('status', v)}
              options={[
                { value: 'draft', label: 'Draft' },
                { value: 'active', label: 'Active' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
          </div>
        )

      case 'variants':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                Product Variants
              </h3>
              <button
                onClick={() =>
                  updateField('variants', [
                    ...(formData.variants || []),
                    {
                      id: `var-${Date.now()}`,
                      label: '',
                      sku: '',
                      price: 0,
                      mrp: 0,
                      stock: 0,
                    },
                  ])
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: c.gradient,
                  color: c.card,
                  fontFamily: fonts.body,
                }}
              >
                <Plus size={16} />
                Add Variant
              </button>
            </div>

            {formData.variants && formData.variants.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${c.earth300}` }}>
                      <th
                        className="text-left py-2 px-2 font-semibold"
                        style={{ color: c.earth700, fontFamily: fonts.body }}
                      >
                        Label
                      </th>
                      <th
                        className="text-left py-2 px-2 font-semibold"
                        style={{ color: c.earth700, fontFamily: fonts.body }}
                      >
                        SKU
                      </th>
                      <th
                        className="text-left py-2 px-2 font-semibold"
                        style={{ color: c.earth700, fontFamily: fonts.body }}
                      >
                        Price (₹)
                      </th>
                      <th
                        className="text-left py-2 px-2 font-semibold"
                        style={{ color: c.earth700, fontFamily: fonts.body }}
                      >
                        MRP (₹)
                      </th>
                      <th
                        className="text-left py-2 px-2 font-semibold"
                        style={{ color: c.earth700, fontFamily: fonts.body }}
                      >
                        Stock
                      </th>
                      <th className="py-2 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.variants.map((variant, idx) => (
                      <tr key={variant.id} style={{ borderBottom: `1px solid ${c.subtle}` }}>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={variant.label}
                            onChange={(e) => {
                              const updated = [...(formData.variants || [])]
                              updated[idx] = { ...updated[idx], label: e.target.value }
                              updateField('variants', updated)
                            }}
                            className="w-full px-2 py-1 border rounded"
                            style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                            placeholder="e.g., 500ml"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => {
                              const updated = [...(formData.variants || [])]
                              updated[idx] = { ...updated[idx], sku: e.target.value }
                              updateField('variants', updated)
                            }}
                            className="w-full px-2 py-1 border rounded"
                            style={{ borderColor: c.earth300, fontFamily: fonts.mono }}
                            placeholder="SKU-001"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => {
                              const updated = [...(formData.variants || [])]
                              updated[idx] = { ...updated[idx], price: parseFloat(e.target.value) || 0 }
                              updateField('variants', updated)
                            }}
                            className="w-full px-2 py-1 border rounded"
                            style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={variant.mrp}
                            onChange={(e) => {
                              const updated = [...(formData.variants || [])]
                              updated[idx] = { ...updated[idx], mrp: parseFloat(e.target.value) || 0 }
                              updateField('variants', updated)
                            }}
                            className="w-full px-2 py-1 border rounded"
                            style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) => {
                              const updated = [...(formData.variants || [])]
                              updated[idx] = { ...updated[idx], stock: parseInt(e.target.value) || 0 }
                              updateField('variants', updated)
                            }}
                            className="w-full px-2 py-1 border rounded"
                            style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                          />
                        </td>
                        <td className="py-2 px-2">
                          <button
                            onClick={() => {
                              const updated = formData.variants?.filter((_, i) => i !== idx)
                              updateField('variants', updated)
                            }}
                            className="p-1 hover:bg-opacity-10 rounded transition-all"
                            style={{ color: c.error }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: c.earth400, fontFamily: fonts.body }}>
                <p>No variants added. Add a variant to define different options (size, color, etc.)</p>
                <p className="text-sm mt-2">Or skip this step for single-variant products</p>
              </div>
            )}

            {(!formData.variants || formData.variants.length === 0) && (
              <div className="mt-6 p-4 rounded-lg" style={{ background: c.primary50 }}>
                <h4 className="font-semibold mb-2" style={{ color: c.primary500, fontFamily: fonts.heading }}>
                  Single Product Pricing
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label="Price (₹)"
                    value={formData.price || ''}
                    onChange={(v) => updateField('price', parseFloat(v) || 0)}
                    type="number"
                    placeholder="e.g., 499"
                  />
                  <InputField
                    label="MRP (₹)"
                    value={formData.mrp || ''}
                    onChange={(v) => updateField('mrp', parseFloat(v) || 0)}
                    type="number"
                    placeholder="e.g., 599"
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'images':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                Product Images
              </h3>
            </div>

            <div
              className="border-2 border-dashed rounded-lg p-8 mb-6 text-center cursor-pointer hover:border-opacity-60 transition-all"
              style={{ borderColor: c.primary400, background: c.primary50 }}
            >
              <Upload size={32} className="mx-auto mb-2" style={{ color: c.primary400 }} />
              <p className="font-medium mb-1" style={{ color: c.primary500, fontFamily: fonts.body }}>
                Click to upload or drag and drop
              </p>
              <p className="text-sm" style={{ color: c.earth400, fontFamily: fonts.body }}>
                PNG, JPG up to 5MB
              </p>
            </div>

            {formData.images && formData.images.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative border rounded-lg overflow-hidden"
                    style={{ borderColor: c.earth300 }}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {img.url ? (
                        <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                      ) : (
                        <span style={{ color: c.earth400, fontFamily: fonts.body }}>No Image</span>
                      )}
                    </div>
                    <div className="absolute top-2 left-2 flex gap-2">
                      <span
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{ background: c.primary500, color: c.card, fontFamily: fonts.mono }}
                      >
                        {idx + 1}
                      </span>
                      {img.isPrimary && (
                        <span
                          className="px-2 py-1 rounded text-xs font-bold"
                          style={{ background: c.secondary500, color: c.card, fontFamily: fonts.body }}
                        >
                          Primary
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        className="p-1 rounded"
                        style={{ background: c.card, color: c.error }}
                        onClick={() => {
                          const updated = formData.images?.filter((_, i) => i !== idx)
                          updateField('images', updated)
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="p-2" style={{ background: c.card }}>
                      <input
                        type="text"
                        value={img.alt}
                        onChange={(e) => {
                          const updated = [...(formData.images || [])]
                          updated[idx] = { ...updated[idx], alt: e.target.value }
                          updateField('images', updated)
                        }}
                        placeholder="Alt text"
                        className="w-full px-2 py-1 text-xs border rounded"
                        style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                      />
                      <label className="flex items-center gap-2 mt-2 text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={img.isPrimary}
                          onChange={(e) => {
                            const updated = formData.images?.map((image, i) => ({
                              ...image,
                              isPrimary: i === idx ? e.target.checked : false,
                            }))
                            updateField('images', updated)
                          }}
                          style={{ accentColor: c.primary500 }}
                        />
                        <span style={{ color: c.earth600, fontFamily: fonts.body }}>Set as primary</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: c.earth400, fontFamily: fonts.body }}>
                <p>No images uploaded yet. Upload at least one product image.</p>
              </div>
            )}
          </div>
        )

      case 'rich-content':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                Rich Content (A+ Content)
              </h3>
              <button
                onClick={() =>
                  updateField('richContent', [
                    ...(formData.richContent || []),
                    {
                      id: `rc-${Date.now()}`,
                      type: 'text',
                      title: '',
                      content: '',
                      imageUrl: '',
                    },
                  ])
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: c.gradient,
                  color: c.card,
                  fontFamily: fonts.body,
                }}
              >
                <Plus size={16} />
                Add Block
              </button>
            </div>

            {formData.richContent && formData.richContent.length > 0 ? (
              <div className="space-y-4">
                {formData.richContent.map((block, idx) => (
                  <div
                    key={block.id}
                    className="p-4 border rounded-lg"
                    style={{ borderColor: c.earth300, background: c.card }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} style={{ color: c.earth400 }} />
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ background: c.subtle, color: c.earth700, fontFamily: fonts.mono }}
                        >
                          Block {idx + 1}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          const updated = formData.richContent?.filter((_, i) => i !== idx)
                          updateField('richContent', updated)
                        }}
                        className="p-1 hover:bg-opacity-10 rounded transition-all"
                        style={{ color: c.error }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <SelectField
                      label="Block Type"
                      value={block.type}
                      onChange={(v) => {
                        const updated = [...(formData.richContent || [])]
                        updated[idx] = { ...updated[idx], type: v as any }
                        updateField('richContent', updated)
                      }}
                      options={[
                        { value: 'text', label: 'Text Only' },
                        { value: 'image', label: 'Image Only' },
                        { value: 'image_text', label: 'Image + Text' },
                        { value: 'comparison', label: 'Comparison Table' },
                        { value: 'banner', label: 'Banner' },
                      ]}
                    />

                    <InputField
                      label="Title"
                      value={block.title}
                      onChange={(v) => {
                        const updated = [...(formData.richContent || [])]
                        updated[idx] = { ...updated[idx], title: v }
                        updateField('richContent', updated)
                      }}
                      placeholder="Block title"
                    />

                    {(block.type === 'text' ||
                      block.type === 'image_text' ||
                      block.type === 'comparison') && (
                      <InputField
                        label="Content"
                        value={block.content}
                        onChange={(v) => {
                          const updated = [...(formData.richContent || [])]
                          updated[idx] = { ...updated[idx], content: v }
                          updateField('richContent', updated)
                        }}
                        placeholder="Block content or markdown"
                        rows={4}
                      />
                    )}

                    {(block.type === 'image' ||
                      block.type === 'image_text' ||
                      block.type === 'banner') && (
                      <InputField
                        label="Image URL"
                        value={block.imageUrl || ''}
                        onChange={(v) => {
                          const updated = [...(formData.richContent || [])]
                          updated[idx] = { ...updated[idx], imageUrl: v }
                          updateField('richContent', updated)
                        }}
                        placeholder="https://example.com/image.jpg"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: c.earth400, fontFamily: fonts.body }}>
                <p>No rich content blocks added. Add blocks to enhance your product page.</p>
              </div>
            )}
          </div>
        )

      case 'specs':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                Product Specifications
              </h3>
              <button
                onClick={() =>
                  updateField('specs', [
                    ...(formData.specs || []),
                    {
                      id: `spec-${Date.now()}`,
                      group: 'General',
                      label: '',
                      value: '',
                    },
                  ])
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: c.gradient,
                  color: c.card,
                  fontFamily: fonts.body,
                }}
              >
                <Plus size={16} />
                Add Spec
              </button>
            </div>

            {formData.specs && formData.specs.length > 0 ? (
              <div className="space-y-4">
                {Object.entries(
                  (formData.specs || []).reduce(
                    (acc, spec) => {
                      if (!acc[spec.group]) acc[spec.group] = []
                      acc[spec.group].push(spec)
                      return acc
                    },
                    {} as Record<string, typeof formData.specs>
                  )
                ).map(([group, specs]) => (
                  <div key={group}>
                    <h4
                      className="font-semibold mb-2 px-3 py-1 rounded"
                      style={{
                        color: c.primary500,
                        background: c.primary50,
                        fontFamily: fonts.heading,
                      }}
                    >
                      {group}
                    </h4>
                    <div className="space-y-2">
                      {specs.map((spec, idx) => {
                        const globalIdx = formData.specs?.findIndex((s) => s.id === spec.id) ?? 0
                        return (
                          <div
                            key={spec.id}
                            className="flex items-center gap-3 p-2 rounded"
                            style={{ background: c.card, border: `1px solid ${c.earth300}` }}
                          >
                            <input
                              type="text"
                              value={spec.group}
                              onChange={(e) => {
                                const updated = [...(formData.specs || [])]
                                updated[globalIdx] = { ...updated[globalIdx], group: e.target.value }
                                updateField('specs', updated)
                              }}
                              placeholder="Group"
                              className="w-1/4 px-2 py-1 border rounded text-sm"
                              style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                            />
                            <input
                              type="text"
                              value={spec.label}
                              onChange={(e) => {
                                const updated = [...(formData.specs || [])]
                                updated[globalIdx] = { ...updated[globalIdx], label: e.target.value }
                                updateField('specs', updated)
                              }}
                              placeholder="Label (e.g., Weight)"
                              className="flex-1 px-2 py-1 border rounded text-sm"
                              style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                            />
                            <input
                              type="text"
                              value={spec.value}
                              onChange={(e) => {
                                const updated = [...(formData.specs || [])]
                                updated[globalIdx] = { ...updated[globalIdx], value: e.target.value }
                                updateField('specs', updated)
                              }}
                              placeholder="Value (e.g., 500g)"
                              className="flex-1 px-2 py-1 border rounded text-sm"
                              style={{ borderColor: c.earth300, fontFamily: fonts.body }}
                            />
                            <button
                              onClick={() => {
                                const updated = formData.specs?.filter((s) => s.id !== spec.id)
                                updateField('specs', updated)
                              }}
                              className="p-1 hover:bg-opacity-10 rounded transition-all"
                              style={{ color: c.error }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: c.earth400, fontFamily: fonts.body }}>
                <p>No specifications added. Add technical specs for your product.</p>
              </div>
            )}
          </div>
        )

      case 'faqs':
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                Frequently Asked Questions
              </h3>
              <button
                onClick={() =>
                  updateField('faqs', [
                    ...(formData.faqs || []),
                    {
                      id: `faq-${Date.now()}`,
                      question: '',
                      answer: '',
                    },
                  ])
                }
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: c.gradient,
                  color: c.card,
                  fontFamily: fonts.body,
                }}
              >
                <Plus size={16} />
                Add FAQ
              </button>
            </div>

            {formData.faqs && formData.faqs.length > 0 ? (
              <div className="space-y-4">
                {formData.faqs.map((faq, idx) => (
                  <div
                    key={faq.id}
                    className="p-4 border rounded-lg"
                    style={{ borderColor: c.earth300, background: c.card }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{ background: c.subtle, color: c.earth700, fontFamily: fonts.mono }}
                      >
                        FAQ {idx + 1}
                      </span>
                      <button
                        onClick={() => {
                          const updated = formData.faqs?.filter((_, i) => i !== idx)
                          updateField('faqs', updated)
                        }}
                        className="p-1 hover:bg-opacity-10 rounded transition-all"
                        style={{ color: c.error }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <InputField
                      label="Question"
                      value={faq.question}
                      onChange={(v) => {
                        const updated = [...(formData.faqs || [])]
                        updated[idx] = { ...updated[idx], question: v }
                        updateField('faqs', updated)
                      }}
                      placeholder="What is your return policy?"
                    />

                    <InputField
                      label="Answer"
                      value={faq.answer}
                      onChange={(v) => {
                        const updated = [...(formData.faqs || [])]
                        updated[idx] = { ...updated[idx], answer: v }
                        updateField('faqs', updated)
                      }}
                      placeholder="We accept returns within 30 days..."
                      rows={3}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8" style={{ color: c.earth400, fontFamily: fonts.body }}>
                <p>No FAQs added. Add common questions to help customers.</p>
              </div>
            )}
          </div>
        )

      case 'seo':
        return (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: c.earth700, fontFamily: fonts.heading }}>
              SEO Settings
            </h3>

            <InputField
              label="Meta Title"
              value={formData.seo?.metaTitle || ''}
              onChange={(v) => updateNestedField('seo', 'metaTitle', v)}
              placeholder={formData.name || 'Product name'}
              maxLength={60}
              help="Shown in search engine results (recommended: 50-60 characters)"
            />

            <InputField
              label="Meta Description"
              value={formData.seo?.metaDescription || ''}
              onChange={(v) => updateNestedField('seo', 'metaDescription', v)}
              placeholder="Brief description for search engines"
              rows={3}
              maxLength={160}
              help="Shown in search engine results (recommended: 150-160 characters)"
            />

            <InputField
              label="URL Slug"
              value={formData.seo?.urlSlug || ''}
              onChange={(v) => updateNestedField('seo', 'urlSlug', v)}
              placeholder="product-name"
              help={`Preview: /products/${formData.seo?.urlSlug || 'product-name'}`}
            />

            <InputField
              label="Canonical URL"
              value={formData.seo?.canonicalUrl || ''}
              onChange={(v) => updateNestedField('seo', 'canonicalUrl', v)}
              placeholder="https://example.com/products/product-name"
              help="Optional: Specify the preferred URL if this product has duplicates"
            />
          </div>
        )

      case 'merchant':
        return (
          <div>
            <h3 className="font-semibold mb-4" style={{ color: c.earth700, fontFamily: fonts.heading }}>
              Google Merchant Centre
            </h3>

            <InputField
              label="GTIN (Global Trade Item Number)"
              value={formData.merchantCentre?.gtin || ''}
              onChange={(v) => updateNestedField('merchantCentre', 'gtin', v)}
              placeholder="e.g., 00012345600012"
              help="UPC, EAN, JAN, or ISBN code"
            />

            <InputField
              label="MPN (Manufacturer Part Number)"
              value={formData.merchantCentre?.mpn || ''}
              onChange={(v) => updateNestedField('merchantCentre', 'mpn', v)}
              placeholder="e.g., MFG-12345"
            />

            <InputField
              label="Brand"
              value={formData.merchantCentre?.brand || ''}
              onChange={(v) => updateNestedField('merchantCentre', 'brand', v)}
              placeholder="e.g., Acme Corp"
            />

            <SelectField
              label="Condition"
              value={formData.merchantCentre?.condition || 'new'}
              onChange={(v) => updateNestedField('merchantCentre', 'condition', v)}
              options={[
                { value: 'new', label: 'New' },
                { value: 'refurbished', label: 'Refurbished' },
                { value: 'used', label: 'Used' },
              ]}
            />

            <InputField
              label="Age Group"
              value={formData.merchantCentre?.ageGroup || ''}
              onChange={(v) => updateNestedField('merchantCentre', 'ageGroup', v)}
              placeholder="e.g., adult, kids, infant"
            />

            <InputField
              label="Gender"
              value={formData.merchantCentre?.gender || ''}
              onChange={(v) => updateNestedField('merchantCentre', 'gender', v)}
              placeholder="e.g., male, female, unisex"
            />

            <InputField
              label="Google Product Category"
              value={formData.merchantCentre?.googleCategory || ''}
              onChange={(v) => updateNestedField('merchantCentre', 'googleCategory', v)}
              placeholder="e.g., Apparel & Accessories > Clothing"
              help="Use Google's product taxonomy"
            />
          </div>
        )

      default:
        return null
    }
  }

  const renderPreview = () => {
    const primaryImage = formData.images?.find((img) => img.isPrimary)?.url || formData.images?.[0]?.url
    const displayPrice = formData.variants?.[0]?.price || formData.price || 0
    const displayMrp = formData.variants?.[0]?.mrp || formData.mrp || 0
    const discount = displayMrp > 0 ? Math.round(((displayMrp - displayPrice) / displayMrp) * 100) : 0

    return (
      <div
        className="border rounded-lg overflow-hidden"
        style={{ borderColor: c.earth300, background: c.card, boxShadow: c.shadow }}
      >
        {primaryImage ? (
          <div className="aspect-square bg-gray-100">
            <img src={primaryImage} alt={formData.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div
            className="aspect-square flex items-center justify-center"
            style={{ background: c.subtle }}
          >
            <span style={{ color: c.earth400, fontFamily: fonts.body }}>No Image</span>
          </div>
        )}

        <div className="p-4">
          <h4
            className="font-semibold text-lg mb-2"
            style={{ color: c.earth700, fontFamily: fonts.heading }}
          >
            {formData.name || 'Product Name'}
          </h4>

          <p className="text-sm mb-3" style={{ color: c.earth500, fontFamily: fonts.body }}>
            {formData.shortDescription || 'Product description will appear here'}
          </p>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold" style={{ color: c.primary500, fontFamily: fonts.heading }}>
              ₹{displayPrice.toLocaleString()}
            </span>
            {displayMrp > displayPrice && (
              <>
                <span
                  className="text-sm line-through"
                  style={{ color: c.earth400, fontFamily: fonts.body }}
                >
                  ₹{displayMrp.toLocaleString()}
                </span>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded"
                  style={{ background: c.successLight, color: c.success, fontFamily: fonts.body }}
                >
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{ color: c.secondary500 }}>
                ★
              </span>
            ))}
            <span className="text-sm ml-1" style={{ color: c.earth400, fontFamily: fonts.body }}>
              (4.5)
            </span>
          </div>

          {formData.status === 'active' && (
            <span
              className="inline-block text-xs font-semibold px-2 py-1 rounded"
              style={{ background: c.successLight, color: c.success, fontFamily: fonts.body }}
            >
              In Stock
            </span>
          )}
          {formData.status === 'draft' && (
            <span
              className="inline-block text-xs font-semibold px-2 py-1 rounded"
              style={{ background: c.warningLight, color: c.warning, fontFamily: fonts.body }}
            >
              Draft
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: c.bg, fontFamily: fonts.body }} className="min-h-screen">
      {/* Header */}
      <div className="border-b" style={{ borderColor: c.earth300, background: c.card }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-opacity-10 rounded-lg transition-all"
                style={{ color: c.primary500 }}
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                {isEditing ? `Edit: ${product?.name || 'Product'}` : 'Add Product'}
              </h1>
            </div>
          </div>

          {/* Step Indicator - Desktop */}
          <div className="hidden md:flex items-center gap-2 mt-4 overflow-x-auto pb-2">
            {STEPS.map((step, idx) => {
              const isCompleted = completedSteps.has(step.id)
              const isCurrent = step.id === currentStep
              const isClickable = idx <= currentStepIndex || isCompleted

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => isClickable && handleStepClick(step.id)}
                    disabled={!isClickable}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      isClickable ? 'cursor-pointer hover:bg-opacity-10' : 'cursor-not-allowed opacity-50'
                    }`}
                    style={{
                      background: isCurrent ? c.primary50 : 'transparent',
                      color: isCurrent ? c.primary500 : c.earth600,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: isCompleted
                          ? c.success
                          : isCurrent
                            ? c.primary500
                            : c.earth300,
                        color: isCompleted || isCurrent ? c.card : c.earth600,
                      }}
                    >
                      {isCompleted ? <Check size={14} /> : step.number}
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">{step.label}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div
                      className="w-8 h-0.5 mx-1"
                      style={{ background: isCompleted ? c.success : c.earth300 }}
                    />
                  )}
                </div>
              )
            })}
          </div>

          {/* Step Indicator - Mobile */}
          <div className="md:hidden mt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: c.earth600, fontFamily: fonts.body }}>
                Step {currentStepData.number} of {STEPS.length}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: c.primary500, fontFamily: fonts.body }}
              >
                {currentStepData.label}
              </span>
            </div>
            <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: c.earth300 }}>
              <div
                className="h-full transition-all duration-300"
                style={{
                  background: c.primary500,
                  width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Panel - Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-lg overflow-hidden"
              style={{
                background: c.card,
                borderTop: `4px solid transparent`,
                borderImage: c.gradient,
                borderImageSlice: 1,
                boxShadow: c.shadow,
              }}
            >
              <div className="p-6">{renderStepContent()}</div>
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between mt-6 gap-4">
              <div className="flex gap-3">
                {currentStepIndex > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 rounded-lg font-medium transition-all border"
                    style={{
                      borderColor: c.primary500,
                      color: c.primary500,
                      fontFamily: fonts.body,
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-lg font-medium transition-all"
                  style={{ color: c.earth500, fontFamily: fonts.body }}
                >
                  Cancel
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onSaveDraft?.(formData)}
                  className="px-4 py-2 rounded-lg font-medium transition-all border"
                  style={{
                    borderColor: c.earth400,
                    color: c.earth600,
                    fontFamily: fonts.body,
                  }}
                >
                  Save Draft
                </button>

                {currentStepIndex < STEPS.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg font-medium transition-all"
                    style={{
                      background: c.gradient,
                      color: c.card,
                      fontFamily: fonts.body,
                    }}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => onPublish?.(formData)}
                    className="px-6 py-2 rounded-lg font-medium transition-all"
                    style={{
                      background: c.gradient,
                      color: c.card,
                      fontFamily: fonts.body,
                    }}
                  >
                    Publish Product
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <div
                className="rounded-lg overflow-hidden"
                style={{ background: c.card, borderColor: c.earth300, boxShadow: c.shadow }}
              >
                <div
                  className="px-4 py-3 border-b flex items-center justify-between cursor-pointer lg:cursor-default"
                  style={{ borderColor: c.earth300 }}
                  onClick={() => setPreviewCollapsed(!previewCollapsed)}
                >
                  <h3 className="font-semibold" style={{ color: c.earth700, fontFamily: fonts.heading }}>
                    Live Preview
                  </h3>
                  <button className="lg:hidden">
                    {previewCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
                  </button>
                </div>

                <div className={`p-4 ${previewCollapsed ? 'hidden lg:block' : ''}`}>
                  {renderPreview()}

                  <div className="mt-6 pt-6 border-t" style={{ borderColor: c.earth300 }}>
                    <h4
                      className="text-sm font-semibold mb-3"
                      style={{ color: c.earth600, fontFamily: fonts.heading }}
                    >
                      Current Step Preview
                    </h4>

                    {currentStep === 'basic' && formData.description && (
                      <div className="text-sm" style={{ color: c.earth600, fontFamily: fonts.body }}>
                        <p>{formData.description}</p>
                      </div>
                    )}

                    {currentStep === 'variants' && formData.variants && formData.variants.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium" style={{ color: c.earth500 }}>
                          Available Options:
                        </p>
                        {formData.variants.map((v) => (
                          <div
                            key={v.id}
                            className="text-sm px-3 py-2 rounded"
                            style={{ background: c.primary50, color: c.primary500, fontFamily: fonts.body }}
                          >
                            {v.label} - ₹{v.price}
                          </div>
                        ))}
                      </div>
                    )}

                    {currentStep === 'specs' && formData.specs && formData.specs.length > 0 && (
                      <div className="text-sm space-y-1">
                        {formData.specs.slice(0, 3).map((spec) => (
                          <div key={spec.id} className="flex justify-between">
                            <span style={{ color: c.earth500 }}>{spec.label}:</span>
                            <span style={{ color: c.earth700 }} className="font-medium">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {currentStep === 'faqs' && formData.faqs && formData.faqs.length > 0 && (
                      <div className="space-y-2">
                        {formData.faqs.slice(0, 2).map((faq) => (
                          <div key={faq.id}>
                            <p className="text-sm font-medium" style={{ color: c.earth700 }}>
                              Q: {faq.question}
                            </p>
                            <p className="text-xs mt-1" style={{ color: c.earth500 }}>
                              A: {faq.answer}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
