"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, TrendingUp, X } from "lucide-react"

const c = {
  primary500: "#013f47",
  primary400: "#2a7a72",
  primary50: "#e8f5f3",
  secondary500: "#c85103",
  bgPrimary: "#fffbf5",
  bgCard: "#ffffff",
  earth300: "#a39585",
  earth400: "#75615a",
  earth600: "#5a4f47",
  earth700: "#433b35",
}

interface SearchSuggestion {
  type: "product" | "category" | "query"
  label: string
  imageUrl?: string
  price?: number
  slug?: string
}

interface SearchAutocompleteProps {
  onSearch?: (query: string) => void
}

export function SearchAutocomplete({ onSearch }: SearchAutocompleteProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Fetch suggestions
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setLoading(true)
    setShowSuggestions(true)

    // Debounce API call
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (error) {
        console.error("Failed to fetch search suggestions:", error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setShowSuggestions(false)
    setQuery("")

    if (onSearch) {
      onSearch(searchQuery)
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setShowSuggestions(false)
    setQuery("")

    if (suggestion.type === "product" && suggestion.slug) {
      router.push(`/product/${suggestion.slug}`)
    } else if (suggestion.type === "category" && suggestion.slug) {
      router.push(`/category/${suggestion.slug}`)
    } else {
      handleSearch(suggestion.label)
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
          style={{ color: c.earth400 }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(query)
            }
          }}
          placeholder="Search for products, categories..."
          className="w-full pl-12 pr-12 py-3 rounded-xl border outline-none transition-all"
          style={{
            borderColor: showSuggestions ? c.primary500 : "#e8e0d8",
            background: c.bgCard,
            color: c.earth700,
            fontFamily: "'Open Sans', sans-serif",
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setSuggestions([])
              setShowSuggestions(false)
              inputRef.current?.focus()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: c.earth400 }} />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg border overflow-hidden z-50"
          style={{ background: c.bgCard, borderColor: "#f0ebe4" }}
        >
          {loading ? (
            <div className="p-4 text-center">
              <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: c.primary500 }} />
            </div>
          ) : suggestions.length === 0 ? (
            <div className="p-4 text-center">
              <p
                className="text-sm"
                style={{ color: c.earth400, fontFamily: "'Open Sans', sans-serif" }}
              >
                No results found for "{query}"
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  {suggestion.type === "product" && suggestion.imageUrl ? (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={suggestion.imageUrl}
                        alt={suggestion.label}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : suggestion.type === "query" ? (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: c.primary50 }}
                    >
                      <TrendingUp className="w-5 h-5" style={{ color: c.primary500 }} />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: c.primary50 }}
                    >
                      <Search className="w-5 h-5" style={{ color: c.primary500 }} />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-medium truncate"
                      style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {suggestion.label}
                    </p>
                    {suggestion.price !== undefined && (
                      <p
                        className="text-xs font-semibold"
                        style={{ color: c.primary500, fontFamily: "'Open Sans', sans-serif" }}
                      >
                        ₹{suggestion.price.toLocaleString()}
                      </p>
                    )}
                  </div>

                  <span
                    className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: suggestion.type === "product" ? c.primary50 : c.secondary500 + "20",
                      color: suggestion.type === "product" ? c.primary500 : c.secondary500,
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {suggestion.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
