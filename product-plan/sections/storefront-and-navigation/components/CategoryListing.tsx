import { useState } from 'react'
import { ChevronDown, ChevronRight, SlidersHorizontal, X, Star } from 'lucide-react'
import type { CategoryListingProps, CategoryHero, FilterGroup as FilterGroupType } from '../types'
import { ProductCard } from './ProductCard'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  secondary300: '#fd8630',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
  gradientAccent: 'linear-gradient(90deg, #013f47, #2a7a72, #c85103)',
}

function FilterSidebar({
  filterGroups,
  activeFilters,
  onFilterChange,
  onPriceRangeChange,
  onClearFilters,
}: {
  filterGroups: FilterGroupType[]
  activeFilters: Record<string, string[]>
  onFilterChange?: (filterId: string, values: string[]) => void
  onPriceRangeChange?: (min: number, max: number) => void
  onClearFilters?: () => void
}) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([99, 10000])

  const totalActive = Object.values(activeFilters).flat().length

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
        >
          Filters
          {totalActive > 0 && (
            <span
              className="ml-2 px-2 py-0.5 text-[10px] rounded-full text-white"
              style={{ background: c.secondary500 }}
            >
              {totalActive}
            </span>
          )}
        </h3>
        {totalActive > 0 && (
          <button
            onClick={onClearFilters}
            className="text-xs font-medium transition-colors"
            style={{ color: c.secondary500, fontFamily: "'Open Sans', sans-serif" }}
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter groups */}
      <div className="space-y-1">
        {filterGroups.map((group) => {
          const isCollapsed = collapsed[group.id] ?? false
          const activeValues = activeFilters[group.id] || []

          return (
            <div key={group.id} className="border-b" style={{ borderColor: '#f0ebe4' }}>
              <button
                onClick={() => setCollapsed((p) => ({ ...p, [group.id]: !isCollapsed }))}
                className="w-full flex items-center justify-between py-3.5"
              >
                <span
                  className="text-sm font-medium"
                  style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                >
                  {group.label}
                </span>
                <ChevronDown
                  className="w-4 h-4 transition-transform duration-200"
                  style={{
                    color: c.earth300,
                    transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {!isCollapsed && (
                <div className="pb-4">
                  {/* Price range */}
                  {group.type === 'range' && (
                    <div className="px-1">
                      <input
                        type="range"
                        min={group.min}
                        max={group.max}
                        value={priceRange[1]}
                        onChange={(e) => {
                          const v = Number(e.target.value)
                          setPriceRange([priceRange[0], v])
                          onPriceRangeChange?.(priceRange[0], v)
                        }}
                        className="w-full accent-[#013f47]"
                      />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                          ₹{priceRange[0].toLocaleString()}
                        </span>
                        <span className="text-xs" style={{ color: c.earth300, fontFamily: "'Open Sans', sans-serif" }}>
                          ₹{priceRange[1].toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Rating filter */}
                  {group.type === 'rating' && group.options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeValues.includes(opt.value)}
                        onChange={() => {
                          const next = activeValues.includes(opt.value)
                            ? activeValues.filter((v) => v !== opt.value)
                            : [...activeValues, opt.value]
                          onFilterChange?.(group.id, next)
                        }}
                        className="w-3.5 h-3.5 rounded accent-[#013f47]"
                      />
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-3 h-3"
                            fill={s <= Number(opt.value) ? '#F59E0B' : 'none'}
                            stroke={s <= Number(opt.value) ? '#F59E0B' : '#d1c9c0'}
                            strokeWidth={1.5}
                          />
                        ))}
                        <span className="text-xs ml-1" style={{ color: c.earth300 }}>& above</span>
                      </div>
                      <span className="text-[11px] ml-auto" style={{ color: c.earth300 }}>({opt.count})</span>
                    </label>
                  ))}

                  {/* Checkbox / Toggle */}
                  {(group.type === 'checkbox' || group.type === 'toggle') && group.options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2.5 py-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={activeValues.includes(opt.value)}
                        onChange={() => {
                          const next = activeValues.includes(opt.value)
                            ? activeValues.filter((v) => v !== opt.value)
                            : [...activeValues, opt.value]
                          onFilterChange?.(group.id, next)
                        }}
                        className="w-3.5 h-3.5 rounded accent-[#013f47]"
                      />
                      <span className="text-sm" style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}>
                        {opt.label}
                      </span>
                      <span className="text-[11px] ml-auto" style={{ color: c.earth300 }}>({opt.count})</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function CategoryListing({
  categoryHero,
  breadcrumbs,
  pageTitle,
  products,
  totalCount,
  currentPage,
  totalPages,
  filterGroups,
  activeFilters,
  sortOptions,
  currentSort,
  onProductClick,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  onFilterChange,
  onPriceRangeChange,
  onClearFilters,
  onSortChange,
  onPageChange,
}: CategoryListingProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div style={{ background: c.bgPrimary, minHeight: '100vh' }}>
      {/* ═══ CATEGORY HERO BANNER ═══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 220 }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryHero.imageUrl})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(1,63,71,0.92) 0%, rgba(1,63,71,0.7) 50%, rgba(1,63,71,0.45) 100%)' }}
        />
        {/* Diamond pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white"
            style={{ fontFamily: "'Lora', serif" }}
          >
            {categoryHero.name}
          </h1>
          <p
            className="mt-3 text-sm sm:text-base max-w-2xl leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Open Sans', sans-serif" }}
          >
            {categoryHero.description}
          </p>
          <p
            className="mt-2 text-xs font-medium tracking-wide uppercase"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Open Sans', sans-serif" }}
          >
            {categoryHero.productCount} products
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 mb-5 flex-wrap">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5" style={{ color: c.earth300 }} />}
              {crumb.href ? (
                <button
                  className="text-sm transition-colors"
                  style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.primary500)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.earth400)}
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-sm font-medium" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Toolbar — filters + sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm" style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}>
            Showing {products.length} of {totalCount} results
          </p>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
              style={{ borderColor: '#e8e0d8', color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            {/* Sort */}
            <select
              value={currentSort}
              onChange={(e) => onSortChange?.(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm border outline-none"
              style={{
                borderColor: '#e8e0d8',
                color: c.earth600,
                background: c.bgCard,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main layout */}
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div
              className="sticky top-6 rounded-xl p-5"
              style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
            >
              <FilterSidebar
                filterGroups={filterGroups}
                activeFilters={activeFilters}
                onFilterChange={onFilterChange}
                onPriceRangeChange={onPriceRangeChange}
                onClearFilters={onClearFilters}
              />
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={onProductClick}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => onPageChange?.(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-all disabled:opacity-40"
                  style={{ borderColor: '#e8e0d8', color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => onPageChange?.(page)}
                    className="w-9 h-9 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: page === currentPage ? c.primary500 : 'transparent',
                      color: page === currentPage ? '#fff' : c.earth400,
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => onPageChange?.(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 rounded-lg text-sm font-medium border transition-all disabled:opacity-40"
                  style={{ borderColor: '#e8e0d8', color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div
            className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto p-6"
            style={{ background: c.bgCard }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold" style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}>
                Filters
              </h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="w-5 h-5" style={{ color: c.earth400 }} />
              </button>
            </div>
            <FilterSidebar
              filterGroups={filterGroups}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              onPriceRangeChange={onPriceRangeChange}
              onClearFilters={onClearFilters}
            />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 rounded-xl text-sm font-semibold text-white"
              style={{ background: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
            >
              Show {totalCount} Results
            </button>
          </div>
        </>
      )}
    </div>
  )
}
