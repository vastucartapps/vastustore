/** Category status */
export type CategoryStatus = 'active' | 'inactive'

/** A category node in the tree */
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl: string
  parentId: string | null
  parentName: string | null
  status: CategoryStatus
  productCount: number
  displayOrder: number
  children: Category[]
  seo: {
    metaTitle: string
    metaDescription: string
  }
  createdAt: string
  updatedAt: string
}

/** Flat category option for parent dropdown */
export interface CategoryOption {
  id: string
  name: string
  depth: number
}

/** Props for the Category Tree panel */
export interface CategoryTreeProps {
  categories: Category[]
  selectedCategoryId: string | null
  onSelectCategory?: (categoryId: string) => void
  onToggleStatus?: (categoryId: string) => void
  onReorder?: (categoryId: string, newOrder: number) => void
  onAddCategory?: () => void
}

/** Props for the Category Detail panel */
export interface CategoryDetailProps {
  category: Category | null
  onEdit?: (categoryId: string) => void
  onDelete?: (categoryId: string) => void
  onToggleStatus?: (categoryId: string) => void
}

/** Props for the Category Form (full page) */
export interface CategoryFormProps {
  category: Category | null
  parentOptions: CategoryOption[]
  isEditing: boolean
  onSave?: (data: Partial<Category>) => void
  onCancel?: () => void
  onImageUpload?: (file: File) => void
}

/** Props for the Admin Category Management section */
export interface AdminCategoryManagementProps {
  categories: Category[]
  parentOptions: CategoryOption[]
  selectedCategoryId: string | null
  editingCategory: Category | null

  onSelectCategory?: (categoryId: string) => void
  onAddCategory?: () => void
  onEditCategory?: (categoryId: string) => void
  onDeleteCategory?: (categoryId: string, reassignTo?: string) => void
  onToggleStatus?: (categoryId: string) => void
  onReorder?: (categoryId: string, newOrder: number) => void
  onSaveCategory?: (data: Partial<Category>) => void
  onCancelEdit?: () => void
  onImageUpload?: (file: File) => void
}
