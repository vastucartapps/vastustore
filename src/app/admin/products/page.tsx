"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { medusa } from '@/lib/medusa'
import { AdminProductManagement } from '@/components/storefront'
import type {
  AdminProduct,
  ProductDetail,
  ProductFilters,
  ViewMode,
  BulkAction,
  CategoryOption,
} from '@/components/storefront/types'

export default function AdminProductManagementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [categories, setCategories] = useState<CategoryOption[]>([])
  const [editingProduct, setEditingProduct] = useState<ProductDetail | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    status: 'all',
    category: 'all',
    stockLevel: 'all',
  })

  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  // Fetch categories from Medusa
  useEffect(() => {
    async function fetchCategories() {
      try {
        const { product_categories } = await medusa.admin.productCategory.list({
          limit: 100,
        }).catch(() => ({ product_categories: [] }))

        const categoryOptions: CategoryOption[] = (product_categories || []).map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          parentName: cat.parent_category?.name || null,
        }))

        setCategories(categoryOptions)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  // Fetch products from Medusa based on filters
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const queryParams: any = {
          limit: 100,
          expand: 'variants,images,categories',
        }

        // Apply search filter
        if (filters.search) {
          queryParams.q = filters.search
        }

        // Apply category filter
        if (filters.category && filters.category !== 'all') {
          queryParams.category_id = [filters.category]
        }

        // Apply status filter
        if (filters.status !== 'all') {
          queryParams.status = filters.status === 'active' ? 'published' : filters.status
        }

        const { products: medusaProducts, count } = await medusa.admin.product.list(queryParams)
          .catch(() => ({ products: [], count: 0 }))

        // Transform Medusa products to our format
        const transformedProducts: AdminProduct[] = (medusaProducts || []).map((product: any) => {
          const defaultVariant = product.variants?.[0]
          const stock = defaultVariant?.inventory_quantity || 0

          let stockLevel: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock'
          if (stock === 0) stockLevel = 'out_of_stock'
          else if (stock < 10) stockLevel = 'low_stock'

          return {
            id: product.id,
            name: product.title,
            sku: defaultVariant?.sku || '',
            category: product.categories?.[0]?.name || 'Uncategorized',
            categoryId: product.categories?.[0]?.id || '',
            status: product.status === 'published' ? 'active' : product.status as any,
            price: Math.round((defaultVariant?.calculated_price?.calculated_amount || 0) / 100),
            mrp: Math.round((defaultVariant?.calculated_price?.original_amount || 0) / 100),
            currency: 'INR',
            stock,
            stockLevel,
            imageUrl: product.thumbnail || product.images?.[0]?.url || '',
            rating: 4.5, // TODO: Calculate from reviews
            reviewCount: 0, // TODO: Get from Supabase
            variantCount: product.variants?.length || 0,
            createdAt: product.created_at,
            updatedAt: product.updated_at,
          }
        })

        // Apply stock level filter client-side (Medusa doesn't support this natively)
        let filteredProducts = transformedProducts
        if (filters.stockLevel !== 'all') {
          filteredProducts = transformedProducts.filter(p => p.stockLevel === filters.stockLevel)
        }

        setProducts(filteredProducts)
        setTotalCount(count || filteredProducts.length)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  const handleChangeFilters = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }))
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
  }

  const handleEditProduct = async (productId: string) => {
    try {
      // Fetch full product details from Medusa
      const { product } = await medusa.admin.product.retrieve(productId, {
        expand: 'variants,images,categories,tags',
      })

      if (!product) return

      // Transform to ProductDetail format
      const defaultVariant = product.variants?.[0]
      const stock = defaultVariant?.inventory_quantity || 0

      let stockLevel: 'in_stock' | 'low_stock' | 'out_of_stock' = 'in_stock'
      if (stock === 0) stockLevel = 'out_of_stock'
      else if (stock < 10) stockLevel = 'low_stock'

      const productDetail: ProductDetail = {
        id: product.id,
        name: product.title,
        sku: defaultVariant?.sku || '',
        category: product.categories?.[0]?.name || 'Uncategorized',
        categoryId: product.categories?.[0]?.id || '',
        status: product.status === 'published' ? 'active' : product.status as any,
        price: Math.round((defaultVariant?.calculated_price?.calculated_amount || 0) / 100),
        mrp: Math.round((defaultVariant?.calculated_price?.original_amount || 0) / 100),
        currency: 'INR',
        stock,
        stockLevel,
        imageUrl: product.thumbnail || product.images?.[0]?.url || '',
        rating: 4.5,
        reviewCount: 0,
        variantCount: product.variants?.length || 0,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
        description: product.description || '',
        shortDescription: product.subtitle || '',
        variants: (product.variants || []).map((v: any) => ({
          id: v.id,
          sku: v.sku,
          label: v.title || 'Default',
          price: Math.round((v.calculated_price?.calculated_amount || 0) / 100),
          mrp: Math.round((v.calculated_price?.original_amount || 0) / 100),
          currency: 'INR',
          stock: v.inventory_quantity || 0,
          stockLevel: (v.inventory_quantity || 0) === 0 ? 'out_of_stock'
            : (v.inventory_quantity || 0) < 10 ? 'low_stock' : 'in_stock',
        })),
        images: (product.images || []).map((img: any, index: number) => ({
          id: img.id,
          url: img.url,
          alt: product.title,
          isPrimary: index === 0,
          sortOrder: index,
        })),
        richContent: [],
        specs: [],
        faqs: [],
        seo: {
          metaTitle: product.metadata?.meta_title as string || product.title,
          metaDescription: product.metadata?.meta_description as string || product.description || '',
          urlSlug: product.handle || '',
          canonicalUrl: '',
        },
        merchantCentre: {
          gtin: product.metadata?.gtin as string || '',
          mpn: product.metadata?.mpn as string || '',
          brand: product.metadata?.brand as string || '',
          condition: 'new',
          ageGroup: '',
          gender: '',
          googleCategory: '',
        },
        tags: (product.tags || []).map((t: any) => t.value),
        hsnCode: product.hs_code || '',
        gstRate: 18, // Default GST rate
      }

      setEditingProduct(productDetail)
    } catch (error) {
      console.error('Error fetching product details:', error)
      alert('Failed to load product details')
    }
  }

  const handleDuplicateProduct = async (productId: string) => {
    await handleEditProduct(productId)
    // Clear ID and SKU to create a new product
    setEditingProduct(prev => prev ? {
      ...prev,
      id: '',
      name: `${prev.name} (Copy)`,
      sku: '',
      variants: prev.variants.map(v => ({ ...v, id: '', sku: '' })),
    } : null)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await medusa.admin.product.delete(productId)

      // Remove from local state
      setProducts(prev => prev.filter(p => p.id !== productId))
      setTotalCount(prev => prev - 1)
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product. Please try again.')
    }
  }

  const handleBulkAction = async (action: BulkAction, productIds: string[]) => {
    if (!confirm(`Are you sure you want to ${action} ${productIds.length} product(s)?`)) return

    try {
      if (action === 'delete') {
        await Promise.all(productIds.map(id => medusa.admin.product.delete(id)))
        setProducts(prev => prev.filter(p => !productIds.includes(p.id)))
        setTotalCount(prev => prev - productIds.length)
      } else if (action === 'activate') {
        await Promise.all(productIds.map(id =>
          medusa.admin.product.update(id, { status: 'published' })
        ))
        // Refresh products
        handleChangeFilters({})
      } else if (action === 'deactivate') {
        await Promise.all(productIds.map(id =>
          medusa.admin.product.update(id, { status: 'draft' })
        ))
        // Refresh products
        handleChangeFilters({})
      } else if (action === 'export') {
        handleExportCSV()
      }
    } catch (error) {
      console.error(`Error performing bulk ${action}:`, error)
      alert(`Failed to ${action} products. Please try again.`)
    }
  }

  const handleImportCSV = async (file: File) => {
    try {
      const text = await file.text()
      const lines = text.split('\n')
      const headers = lines[0].split(',')

      // TODO: Parse CSV and create products via Medusa
      // This would require parsing each row and calling medusa.admin.product.create()
      alert('CSV import is not yet implemented. Please add products individually for now.')
    } catch (error) {
      console.error('Error importing CSV:', error)
      alert('Failed to import CSV. Please check the file format.')
    }
  }

  const handleExportCSV = () => {
    try {
      // Generate CSV from products
      const headers = ['ID', 'Name', 'SKU', 'Category', 'Status', 'Price', 'Stock']
      const rows = products.map(p => [
        p.id,
        p.name,
        p.sku,
        p.category,
        p.status,
        p.price,
        p.stock,
      ])

      const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `products-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting CSV:', error)
      alert('Failed to export CSV')
    }
  }

  const handleSaveDraft = async (data: Partial<ProductDetail>) => {
    try {
      const productData = {
        title: data.name,
        subtitle: data.shortDescription,
        description: data.description,
        status: 'draft',
        handle: data.seo?.urlSlug,
        categories: data.categoryId ? [{ id: data.categoryId }] : undefined,
        tags: data.tags?.map(t => ({ value: t })),
        hs_code: data.hsnCode,
        metadata: {
          meta_title: data.seo?.metaTitle,
          meta_description: data.seo?.metaDescription,
          gtin: data.merchantCentre?.gtin,
          mpn: data.merchantCentre?.mpn,
          brand: data.merchantCentre?.brand,
        },
      }

      if (editingProduct?.id) {
        // Update existing product
        await medusa.admin.product.update(editingProduct.id, productData)
        alert('Product saved as draft')
      } else {
        // Create new product
        await medusa.admin.product.create(productData)
        alert('Product created as draft')
      }

      // Refresh products list
      setEditingProduct(null)
      handleChangeFilters({})
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save product. Please try again.')
    }
  }

  const handlePublish = async (data: Partial<ProductDetail>) => {
    try {
      const productData = {
        title: data.name,
        subtitle: data.shortDescription,
        description: data.description,
        status: 'published',
        handle: data.seo?.urlSlug,
        categories: data.categoryId ? [{ id: data.categoryId }] : undefined,
        tags: data.tags?.map(t => ({ value: t })),
        hs_code: data.hsnCode,
        metadata: {
          meta_title: data.seo?.metaTitle,
          meta_description: data.seo?.metaDescription,
          gtin: data.merchantCentre?.gtin,
          mpn: data.merchantCentre?.mpn,
          brand: data.merchantCentre?.brand,
        },
      }

      if (editingProduct?.id) {
        // Update existing product
        await medusa.admin.product.update(editingProduct.id, productData)
        alert('Product published successfully')
      } else {
        // Create new product
        await medusa.admin.product.create(productData)
        alert('Product created and published')
      }

      // Refresh products list
      setEditingProduct(null)
      handleChangeFilters({})
    } catch (error) {
      console.error('Error publishing product:', error)
      alert('Failed to publish product. Please try again.')
    }
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <AdminProductManagement
      products={products}
      categories={categories}
      editingProduct={editingProduct}
      filters={filters}
      viewMode={viewMode}
      totalCount={totalCount}
      onChangeViewMode={setViewMode}
      onChangeFilters={handleChangeFilters}
      onSearch={handleSearch}
      onAddProduct={handleAddProduct}
      onEditProduct={handleEditProduct}
      onDuplicateProduct={handleDuplicateProduct}
      onDeleteProduct={handleDeleteProduct}
      onBulkAction={handleBulkAction}
      onImportCSV={handleImportCSV}
      onExportCSV={handleExportCSV}
      onSaveDraft={handleSaveDraft}
      onPublish={handlePublish}
      onCancelEdit={handleCancelEdit}
    />
  )
}
