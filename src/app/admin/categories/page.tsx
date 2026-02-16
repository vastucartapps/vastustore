"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { medusa } from "@/lib/medusa"
import { AdminCategoryManagement } from "@/components/admin-category-management/AdminCategoryManagement"
import type {
  Category,
  CategoryOption,
} from "@/components/admin-category-management/types"

export default function AdminCategoryManagementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [parentOptions, setParentOptions] = useState<CategoryOption[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<{
    categoryId: string
    productCount: number
  } | null>(null)

  // Fetch categories from Medusa
  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      setLoading(true)

      // Fetch all categories from Medusa
      const { product_categories } = await medusa.admin.productCategory
        .list({
          limit: 100,
          expand: 'parent_category,category_children',
        })
        .catch(() => ({ product_categories: [] }))

      if (product_categories && product_categories.length > 0) {
        // Transform Medusa categories to component format
        const transformedCategories = await Promise.all(
          product_categories.map(async (cat: any) => {
            // Get product count for this category
            const { products } = await medusa.admin.product
              .list({
                category_id: [cat.id],
                limit: 1,
              })
              .catch(() => ({ products: [], count: 0 }))

            return transformCategory(cat, products?.length || 0)
          })
        )

        // Build tree structure
        const tree = buildCategoryTree(transformedCategories)
        setCategories(tree)

        // Build flat parent options
        const options = buildParentOptions(transformedCategories)
        setParentOptions(options)
      } else {
        setCategories([])
        setParentOptions([])
      }

      setLoading(false)
    } catch (error) {
      console.error("Error fetching categories:", error)
      setCategories([])
      setParentOptions([])
      setLoading(false)
    }
  }

  // Transform Medusa category to component format
  function transformCategory(medusaCat: any, productCount: number): Category {
    return {
      id: medusaCat.id,
      name: medusaCat.name,
      slug: medusaCat.handle,
      description: medusaCat.description || '',
      imageUrl: medusaCat.image?.url || '',
      parentId: medusaCat.parent_category_id || null,
      parentName: medusaCat.parent_category?.name || null,
      status: medusaCat.is_active ? 'active' : 'inactive',
      productCount,
      displayOrder: medusaCat.rank || 0,
      children: [],
      seo: {
        metaTitle: medusaCat.metadata?.meta_title || '',
        metaDescription: medusaCat.metadata?.meta_description || '',
      },
      createdAt: medusaCat.created_at,
      updatedAt: medusaCat.updated_at,
    }
  }

  // Build hierarchical tree from flat list
  function buildCategoryTree(flatCategories: Category[]): Category[] {
    const categoryMap = new Map<string, Category>()
    const rootCategories: Category[] = []

    // First pass: create map
    flatCategories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [] })
    })

    // Second pass: build tree
    flatCategories.forEach(cat => {
      const category = categoryMap.get(cat.id)!
      if (cat.parentId) {
        const parent = categoryMap.get(cat.parentId)
        if (parent) {
          parent.children.push(category)
        } else {
          rootCategories.push(category)
        }
      } else {
        rootCategories.push(category)
      }
    })

    // Sort by display order
    const sortByOrder = (cats: Category[]) => {
      cats.sort((a, b) => a.displayOrder - b.displayOrder)
      cats.forEach(cat => {
        if (cat.children.length > 0) {
          sortByOrder(cat.children)
        }
      })
    }
    sortByOrder(rootCategories)

    return rootCategories
  }

  // Build flat parent options with depth
  function buildParentOptions(flatCategories: Category[]): CategoryOption[] {
    const options: CategoryOption[] = []
    const categoryMap = new Map<string, Category>()

    flatCategories.forEach(cat => {
      categoryMap.set(cat.id, cat)
    })

    const addOption = (cat: Category, depth: number) => {
      options.push({
        id: cat.id,
        name: cat.name,
        depth,
      })

      // Add children
      flatCategories
        .filter(c => c.parentId === cat.id)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .forEach(child => addOption(child, depth + 1))
    }

    // Add root categories first
    flatCategories
      .filter(cat => !cat.parentId)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .forEach(cat => addOption(cat, 0))

    return options
  }

  // Handlers
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId)
    setEditingCategory(null)
  }

  const handleAddCategory = () => {
    setEditingCategory(null)
    setSelectedCategoryId(null)
    router.push('/admin/categories/new')
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    // Component will handle the form view switch
  }

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      // Check if category has products
      const { products } = await medusa.admin.product.list({
        category_id: [categoryId],
        limit: 1,
      })

      if (products && products.length > 0) {
        // Ask user for confirmation with product count
        const confirmed = window.confirm(
          `This category has ${products.length} product(s). Deleting will remove products from this category. Continue?`
        )
        if (!confirmed) return
      }

      // Delete the category
      await medusa.admin.productCategory.delete(categoryId)

      // Refresh categories
      await fetchCategories()

      // Clear selection
      setSelectedCategoryId(null)
    } catch (error: any) {
      console.error("Error deleting category:", error)
      alert(`Failed to delete category: ${error.message}`)
    }
  }

  const handleToggleStatus = async (categoryId: string) => {
    try {
      // Find category
      const findCategory = (cats: Category[]): Category | null => {
        for (const cat of cats) {
          if (cat.id === categoryId) return cat
          if (cat.children.length > 0) {
            const found = findCategory(cat.children)
            if (found) return found
          }
        }
        return null
      }

      const category = findCategory(categories)
      if (!category) return

      // Toggle status
      await medusa.admin.productCategory.update(categoryId, {
        is_active: category.status === 'inactive',
      })

      // Refresh categories
      await fetchCategories()
    } catch (error: any) {
      console.error("Error toggling status:", error)
      alert(`Failed to toggle status: ${error.message}`)
    }
  }

  const handleReorder = async (categoryId: string, newOrder: number) => {
    try {
      await medusa.admin.productCategory.update(categoryId, {
        rank: newOrder,
      })

      // Refresh categories
      await fetchCategories()
    } catch (error: any) {
      console.error("Error reordering category:", error)
      alert(`Failed to reorder: ${error.message}`)
    }
  }

  const handleSaveCategory = async (data: Partial<Category>) => {
    try {
      const payload = {
        name: data.name!,
        description: data.description || '',
        handle: data.slug,
        is_active: data.status === 'active',
        parent_category_id: data.parentId || undefined,
        rank: data.displayOrder || 0,
        metadata: {
          meta_title: data.seo?.metaTitle || '',
          meta_description: data.seo?.metaDescription || '',
          image_url: data.imageUrl || '',
        },
      }

      if (data.id) {
        // Update existing
        await medusa.admin.productCategory.update(data.id, payload as any)
      } else {
        // Create new
        await medusa.admin.productCategory.create(payload as any)
      }

      // Refresh and return to list
      await fetchCategories()
      router.push('/admin/categories')
    } catch (error: any) {
      console.error("Error saving category:", error)
      alert(`Failed to save category: ${error.message}`)
    }
  }

  const handleCancelEdit = () => {
    router.push('/admin/categories')
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    // TODO: Implement image upload to Supabase Storage or S3
    // For now, we'll just log it and return empty string
    console.log('Image upload requested:', file.name)
    alert('Image upload not yet implemented. Coming soon with Supabase Storage integration.')
    return ''
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminCategoryManagement
      categories={categories}
      parentOptions={parentOptions}
      selectedCategoryId={selectedCategoryId}
      editingCategory={editingCategory}
      onSelectCategory={handleSelectCategory}
      onAddCategory={handleAddCategory}
      onEditCategory={handleEditCategory}
      onDeleteCategory={handleDeleteCategory}
      onToggleStatus={handleToggleStatus}
      onReorder={handleReorder}
      onSaveCategory={handleSaveCategory}
      onCancelEdit={handleCancelEdit}
      onImageUpload={handleImageUpload}
    />
  )
}
