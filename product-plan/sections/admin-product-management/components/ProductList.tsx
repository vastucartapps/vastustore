import { useState } from 'react'
import {
  Search,
  Plus,
  Upload,
  LayoutGrid,
  List,
  Edit2,
  Copy,
  Trash2,
  Star,
  ChevronDown,
} from 'lucide-react'
import type {
  Product,
  CategoryOption,
  ProductFilters,
  ViewMode,
  BulkAction,
} from '../types'

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
  shadowHover:
    '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
}

const fonts = {
  heading: "'Lora', serif",
  body: "'Open Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
}

interface ProductListProps {
  products: Product[]
  categories: CategoryOption[]
  filters: ProductFilters
  viewMode: ViewMode
  totalCount: number
  onChangeViewMode?: (mode: ViewMode) => void
  onChangeFilters?: (filters: Partial<ProductFilters>) => void
  onSearch?: (query: string) => void
  onAddProduct?: () => void
  onEditProduct?: (productId: string) => void
  onDuplicateProduct?: (productId: string) => void
  onDeleteProduct?: (productId: string) => void
  onBulkAction?: (action: BulkAction, productIds: string[]) => void
  onImportCSV?: (file: File) => void
  onExportCSV?: () => void
}

export function ProductList({
  products,
  categories,
  filters,
  viewMode,
  totalCount,
  onChangeViewMode,
  onChangeFilters,
  onSearch,
  onAddProduct,
  onEditProduct,
  onDuplicateProduct,
  onDeleteProduct,
  onBulkAction,
  onImportCSV,
  onExportCSV,
}: ProductListProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleSelectAll = () => {
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)))
    }
  }

  const handleSelectProduct = (productId: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(productId)) {
      newSelected.delete(productId)
    } else {
      newSelected.add(productId)
    }
    setSelectedIds(newSelected)
  }

  const handleBulkAction = (action: BulkAction) => {
    onBulkAction?.(action, Array.from(selectedIds))
    setSelectedIds(new Set())
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImportCSV?.(file)
    }
  }

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const calculateDiscount = (mrp: number, price: number) => {
    const discount = ((mrp - price) / mrp) * 100
    return Math.round(discount)
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: c.successLight, text: c.success, label: 'Active' }
      case 'inactive':
        return { bg: c.errorLight, text: c.error, label: 'Inactive' }
      case 'draft':
        return { bg: c.warningLight, text: c.warning, label: 'Draft' }
      default:
        return { bg: c.subtle, text: c.earth600, label: status }
    }
  }

  const getStockStyle = (stockLevel: string) => {
    switch (stockLevel) {
      case 'in_stock':
        return { bg: c.successLight, text: c.success, label: 'In Stock' }
      case 'low_stock':
        return { bg: c.warningLight, text: c.warning, label: 'Low Stock' }
      case 'out_of_stock':
        return { bg: c.errorLight, text: c.error, label: 'Out of Stock' }
      default:
        return { bg: c.subtle, text: c.earth600, label: stockLevel }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-3">
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: fonts.heading, color: c.earth700 }}
          >
            Products
          </h1>
          <span
            className="rounded-full px-3 py-1 text-sm font-medium"
            style={{
              backgroundColor: c.primary50,
              color: c.primary500,
            }}
          >
            {totalCount}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
            style={{
              background: c.gradient,
              boxShadow: c.shadow,
            }}
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>

          <label
            className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:border-opacity-60"
            style={{
              borderColor: c.secondary500,
              color: c.secondary500,
              backgroundColor: c.card,
            }}
          >
            <Upload className="h-4 w-4" />
            Import CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        className="rounded-lg p-4"
        style={{ backgroundColor: c.card, boxShadow: c.shadow }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: c.earth400 }}
            />
            <input
              type="text"
              placeholder="Search products by name, SKU..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: c.subtle,
                backgroundColor: c.bg,
                color: c.earth700,
              }}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {/* Status Filter */}
            <div className="relative">
              <select
                value={filters.status || 'all'}
                onChange={(e) =>
                  onChangeFilters?.({
                    status: e.target.value === 'all' ? undefined : e.target.value,
                  })
                }
                className="appearance-none rounded-lg border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: c.subtle,
                  backgroundColor: c.card,
                  color: c.earth700,
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: c.earth400 }}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={filters.category || 'all'}
                onChange={(e) =>
                  onChangeFilters?.({
                    category: e.target.value === 'all' ? undefined : e.target.value,
                  })
                }
                className="appearance-none rounded-lg border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: c.subtle,
                  backgroundColor: c.card,
                  color: c.earth700,
                }}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: c.earth400 }}
              />
            </div>

            {/* Stock Filter */}
            <div className="relative">
              <select
                value={filters.stock || 'all'}
                onChange={(e) =>
                  onChangeFilters?.({
                    stock: e.target.value === 'all' ? undefined : e.target.value,
                  })
                }
                className="appearance-none rounded-lg border py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2"
                style={{
                  borderColor: c.subtle,
                  backgroundColor: c.card,
                  color: c.earth700,
                }}
              >
                <option value="all">All Stock</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
                style={{ color: c.earth400 }}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex gap-1 rounded-lg border p-1" style={{ borderColor: c.subtle }}>
            <button
              onClick={() => onChangeViewMode?.('grid')}
              className="rounded p-2 transition-all"
              style={{
                backgroundColor: viewMode === 'grid' ? c.primary50 : 'transparent',
                color: viewMode === 'grid' ? c.primary500 : c.earth400,
              }}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onChangeViewMode?.('table')}
              className="rounded p-2 transition-all"
              style={{
                backgroundColor: viewMode === 'table' ? c.primary50 : 'transparent',
                color: viewMode === 'table' ? c.primary500 : c.earth400,
              }}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div
          className="flex flex-wrap items-center gap-4 rounded-lg p-4"
          style={{
            backgroundColor: c.primary50,
            borderLeft: `4px solid ${c.primary500}`,
          }}
        >
          <span className="text-sm font-medium" style={{ color: c.primary500 }}>
            {selectedIds.size} selected
          </span>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBulkAction('activate')}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
              style={{
                backgroundColor: c.success,
                color: 'white',
              }}
            >
              Activate
            </button>

            <button
              onClick={() => handleBulkAction('deactivate')}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
              style={{
                backgroundColor: c.warning,
                color: 'white',
              }}
            >
              Deactivate
            </button>

            <button
              onClick={() => handleBulkAction('delete')}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
              style={{
                backgroundColor: c.error,
                color: 'white',
              }}
            >
              Delete
            </button>

            <button
              onClick={onExportCSV}
              className="rounded-lg border px-3 py-1.5 text-sm font-medium transition-all hover:opacity-80"
              style={{
                borderColor: c.primary500,
                backgroundColor: c.card,
                color: c.primary500,
              }}
            >
              Export CSV
            </button>
          </div>

          <button
            onClick={handleSelectAll}
            className="ml-auto text-sm font-medium underline"
            style={{ color: c.primary500 }}
          >
            {selectedIds.size === products.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      )}

      {/* Product Grid View */}
      {viewMode === 'grid' && (
        <>
          {products.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-lg py-16"
              style={{ backgroundColor: c.card, boxShadow: c.shadow }}
            >
              <div
                className="mb-4 text-6xl"
                style={{ color: c.earth300 }}
              >
                📦
              </div>
              <h3
                className="text-lg font-medium"
                style={{ fontFamily: fonts.heading, color: c.earth600 }}
              >
                No products found
              </h3>
              <p className="mt-1 text-sm" style={{ color: c.earth400 }}>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => {
                const statusStyle = getStatusStyle(product.status)
                const stockStyle = getStockStyle(product.stockLevel)
                const discount = product.mrp > product.price
                  ? calculateDiscount(product.mrp, product.price)
                  : 0

                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-lg transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: c.card,
                      boxShadow: c.shadow,
                      borderTop: `3px solid transparent`,
                      borderImage: c.gradient,
                      borderImageSlice: 1,
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-stone-100">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="flex h-full w-full items-center justify-center text-4xl"
                          style={{ color: c.earth300 }}
                        >
                          📦
                        </div>
                      )}

                      {/* Checkbox Overlay */}
                      <div className="absolute left-2 top-2">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="h-5 w-5 cursor-pointer rounded border-2 border-white bg-white/90 backdrop-blur-sm"
                        />
                      </div>

                      {/* Status Badge */}
                      <div className="absolute right-2 top-2">
                        <span
                          className="rounded-full px-2 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                          }}
                        >
                          {statusStyle.label}
                        </span>
                      </div>

                      {/* Action Buttons - Show on Hover */}
                      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => onEditProduct?.(product.id)}
                          className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white"
                          style={{ color: c.primary500 }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDuplicateProduct?.(product.id)}
                          className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white"
                          style={{ color: c.earth600 }}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct?.(product.id)}
                          className="rounded-lg bg-white/90 p-2 backdrop-blur-sm transition-all hover:bg-white"
                          style={{ color: c.error }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Stock Badge */}
                      <div className="mb-2">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            backgroundColor: stockStyle.bg,
                            color: stockStyle.text,
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: stockStyle.text }}
                          />
                          {stockStyle.label}
                        </span>
                      </div>

                      {/* Name and Category */}
                      <h3
                        className="truncate text-base font-medium"
                        style={{ fontFamily: fonts.heading, color: c.earth700 }}
                      >
                        {product.name}
                      </h3>
                      <p className="mt-0.5 truncate text-xs" style={{ color: c.earth400 }}>
                        {product.category}
                      </p>

                      {/* Price */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span
                          className="text-lg font-semibold"
                          style={{ color: c.primary500 }}
                        >
                          {formatPrice(product.price)}
                        </span>
                        {discount > 0 && (
                          <>
                            <span
                              className="text-sm line-through"
                              style={{ color: c.earth300 }}
                            >
                              {formatPrice(product.mrp)}
                            </span>
                            <span
                              className="text-xs font-medium"
                              style={{ color: c.secondary500 }}
                            >
                              {discount}% off
                            </span>
                          </>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="mt-2 flex items-center gap-1">
                        <Star
                          className="h-3.5 w-3.5 fill-current"
                          style={{ color: c.warning }}
                        />
                        <span className="text-sm font-medium" style={{ color: c.earth700 }}>
                          {product.rating?.toFixed(1) || '0.0'}
                        </span>
                        <span className="text-xs" style={{ color: c.earth400 }}>
                          ({product.reviewCount || 0})
                        </span>
                      </div>

                      {/* Variants */}
                      {product.variantCount > 0 && (
                        <div className="mt-2">
                          <span
                            className="text-xs"
                            style={{ color: c.earth400 }}
                          >
                            {product.variantCount} variant{product.variantCount > 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Product Table View */}
      {viewMode === 'table' && (
        <div
          className="overflow-hidden rounded-lg"
          style={{ backgroundColor: c.card, boxShadow: c.shadow }}
        >
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 text-6xl" style={{ color: c.earth300 }}>
                📦
              </div>
              <h3
                className="text-lg font-medium"
                style={{ fontFamily: fonts.heading, color: c.earth600 }}
              >
                No products found
              </h3>
              <p className="mt-1 text-sm" style={{ color: c.earth400 }}>
                Try adjusting your filters or search query
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{ backgroundColor: c.bg }}>
                  <tr>
                    <th className="p-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === products.length}
                        onChange={handleSelectAll}
                        className="h-4 w-4 cursor-pointer rounded"
                      />
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Image
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Name & SKU
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Category
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Price
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Stock
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Status
                    </th>
                    <th
                      className="p-4 text-left text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Rating
                    </th>
                    <th
                      className="p-4 text-right text-xs font-semibold uppercase tracking-wide"
                      style={{ color: c.earth600 }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    const statusStyle = getStatusStyle(product.status)
                    const stockStyle = getStockStyle(product.stockLevel)

                    return (
                      <tr
                        key={product.id}
                        className="transition-colors hover:bg-stone-50"
                        style={{
                          borderTop: index === 0 ? 'none' : `1px solid ${c.subtle}`,
                        }}
                      >
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(product.id)}
                            onChange={() => handleSelectProduct(product.id)}
                            className="h-4 w-4 cursor-pointer rounded"
                          />
                        </td>
                        <td className="p-4">
                          <div className="h-12 w-12 overflow-hidden rounded bg-stone-100">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div
                                className="flex h-full w-full items-center justify-center text-xl"
                                style={{ color: c.earth300 }}
                              >
                                📦
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p
                              className="font-medium"
                              style={{ fontFamily: fonts.heading, color: c.earth700 }}
                            >
                              {product.name}
                            </p>
                            <p
                              className="text-xs"
                              style={{ fontFamily: fonts.mono, color: c.earth400 }}
                            >
                              {product.sku}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm" style={{ color: c.earth600 }}>
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <div>
                            <p
                              className="font-semibold"
                              style={{ color: c.primary500 }}
                            >
                              {formatPrice(product.price)}
                            </p>
                            {product.mrp > product.price && (
                              <p
                                className="text-xs line-through"
                                style={{ color: c.earth300 }}
                              >
                                {formatPrice(product.mrp)}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: stockStyle.text }}
                            />
                            <span className="text-sm" style={{ color: stockStyle.text }}>
                              {stockStyle.label}
                            </span>
                            <span className="text-xs" style={{ color: c.earth400 }}>
                              ({product.stock})
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span
                            className="inline-block rounded-full px-2 py-1 text-xs font-medium"
                            style={{
                              backgroundColor: statusStyle.bg,
                              color: statusStyle.text,
                            }}
                          >
                            {statusStyle.label}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star
                              className="h-3.5 w-3.5 fill-current"
                              style={{ color: c.warning }}
                            />
                            <span className="text-sm font-medium" style={{ color: c.earth700 }}>
                              {product.rating?.toFixed(1) || '0.0'}
                            </span>
                            <span className="text-xs" style={{ color: c.earth400 }}>
                              ({product.reviewCount || 0})
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => onEditProduct?.(product.id)}
                              className="rounded p-2 transition-all hover:bg-stone-100"
                              style={{ color: c.primary500 }}
                              title="Edit"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onDuplicateProduct?.(product.id)}
                              className="rounded p-2 transition-all hover:bg-stone-100"
                              style={{ color: c.earth600 }}
                              title="Duplicate"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct?.(product.id)}
                              className="rounded p-2 transition-all hover:bg-stone-100"
                              style={{ color: c.error }}
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
