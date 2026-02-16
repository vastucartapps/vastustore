import React, { useState } from 'react'
import type { Category, CategoryOption } from './types'
import { CategoryTree } from './CategoryTree'
import { CategoryDetail } from './CategoryDetail'
import { CategoryForm } from './CategoryForm'

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

export interface AdminCategoryManagementProps {
  categories: Category[]
  parentOptions: CategoryOption[]
  selectedCategoryId: string | null
  editingCategory: Category | null
  onSelectCategory?: (categoryId: string) => void
  onAddCategory?: () => void
  onEditCategory?: (category: Category) => void
  onDeleteCategory?: (categoryId: string) => void
  onToggleStatus?: (categoryId: string) => void
  onReorder?: (categoryId: string, newOrder: number) => void
  onSaveCategory?: (data: Partial<Category>) => void
  onCancelEdit?: () => void
  onImageUpload?: (file: File) => Promise<string>
}

export function AdminCategoryManagement({
  categories,
  parentOptions,
  selectedCategoryId,
  editingCategory,
  onSelectCategory,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onToggleStatus,
  onReorder,
  onSaveCategory,
  onCancelEdit,
  onImageUpload,
}: AdminCategoryManagementProps) {
  const [view, setView] = useState<'browse' | 'form'>('browse')
  const [isEditing, setIsEditing] = useState(false)

  const handleAddCategory = () => {
    setView('form')
    setIsEditing(false)
    onAddCategory?.()
  }

  const handleEditCategory = (category: Category) => {
    setView('form')
    setIsEditing(true)
    onEditCategory?.(category)
  }

  const handleSaveCategory = (data: Partial<Category>) => {
    onSaveCategory?.(data)
    setView('browse')
  }

  const handleCancelEdit = () => {
    setView('browse')
    onCancelEdit?.()
  }

  const selectedCategory = categories
    .flatMap(function flattenCategories(cat: Category): Category[] {
      return [cat, ...(cat.children || []).flatMap(flattenCategories)]
    })
    .find((cat) => cat.id === selectedCategoryId) || null

  if (view === 'form') {
    return (
      <div className="h-full" style={{ backgroundColor: c.bg }}>
        <CategoryForm
          category={editingCategory}
          parentOptions={parentOptions}
          isEditing={isEditing}
          onSave={handleSaveCategory}
          onCancel={handleCancelEdit}
          onImageUpload={onImageUpload}
        />
      </div>
    )
  }

  return (
    <div className="h-full" style={{ backgroundColor: c.bg }}>
      <div className="h-full max-w-[1600px] mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6 h-full">
          {/* Left Panel - Category Tree */}
          <div className="h-full min-h-[400px]">
            <CategoryTree
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={onSelectCategory}
              onToggleStatus={onToggleStatus}
              onReorder={onReorder}
              onAddCategory={handleAddCategory}
            />
          </div>

          {/* Right Panel - Category Detail */}
          <div className="h-full min-h-[400px]">
            <CategoryDetail
              category={selectedCategory}
              onEdit={handleEditCategory}
              onDelete={onDeleteCategory}
              onToggleStatus={onToggleStatus}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
