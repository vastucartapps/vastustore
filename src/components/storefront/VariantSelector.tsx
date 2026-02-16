"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { VariantAttribute, SwatchValue } from './types'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  bgCard: '#ffffff',
  bgPrimary: '#fffbf5',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
}

interface VariantSelectorProps {
  attributes: VariantAttribute[]
  selectedValues: Record<string, string>
  onSelect: (attributeName: string, value: string) => void
}

function isSwatch(values: string[] | SwatchValue[]): values is SwatchValue[] {
  return values.length > 0 && typeof values[0] === 'object'
}

function CustomDropdown({
  label,
  value,
  options,
  onSelect,
}: {
  label: string
  value: string
  options: string[]
  onSelect: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(-1)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative w-full sm:w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all"
        style={{
          border: open ? `1.5px solid ${c.primary400}` : '1.5px solid #e8e0d8',
          background: c.bgCard,
          color: value ? c.earth700 : c.earth300,
          fontFamily: "'Open Sans', sans-serif",
          boxShadow: open ? `0 0 0 3px ${c.primary500}15` : 'none',
        }}
      >
        <span>{value || `Select ${label}`}</span>
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200"
          style={{
            color: open ? c.primary500 : c.earth300,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {open && (
        <div
          className="absolute z-50 w-full mt-1.5 rounded-xl overflow-hidden py-1"
          style={{
            background: c.bgCard,
            border: '1px solid #f0ebe4',
            boxShadow: '0 8px 24px rgba(67,59,53,0.12)',
          }}
        >
          {options.map((opt, idx) => {
            const isActive = opt === value
            const isHovered = idx === hoveredIdx
            return (
              <button
                key={opt}
                onClick={() => { onSelect(opt); setOpen(false) }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(-1)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left transition-colors"
                style={{
                  background: isActive ? c.primary50 : isHovered ? c.bgPrimary : 'transparent',
                  color: isActive ? c.primary500 : c.earth700,
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                <span>{opt}</span>
                {isActive && <Check className="w-4 h-4" style={{ color: c.primary500 }} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function VariantSelector({ attributes, selectedValues, onSelect }: VariantSelectorProps) {
  return (
    <div className="space-y-5">
      {attributes.map((attr) => (
        <div key={attr.name}>
          <label
            className="block text-sm font-medium mb-2.5"
            style={{ color: c.earth700, fontFamily: "'Open Sans', sans-serif" }}
          >
            {attr.label}:{' '}
            <span style={{ color: c.primary500, fontWeight: 600 }}>
              {selectedValues[attr.name] || '—'}
            </span>
          </label>

          {attr.type === 'swatch' && isSwatch(attr.values) ? (
            <div className="flex gap-3 flex-wrap">
              {attr.values.map((sv) => {
                const isActive = selectedValues[attr.name] === sv.value
                return (
                  <button
                    key={sv.value}
                    onClick={() => onSelect(attr.name, sv.value)}
                    className="relative flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200"
                    style={{
                      border: isActive ? `2px solid ${c.primary500}` : '2px solid #e8e0d8',
                      background: isActive ? c.primary50 : c.bgCard,
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex-shrink-0"
                      style={{
                        background: sv.color,
                        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                      }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isActive ? c.primary500 : c.earth600,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {sv.value}
                    </span>
                    {isActive && (
                      <Check className="w-3.5 h-3.5" style={{ color: c.primary500 }} />
                    )}
                  </button>
                )
              })}
            </div>
          ) : (
            <CustomDropdown
              label={attr.label}
              value={selectedValues[attr.name] || ''}
              options={attr.values as string[]}
              onSelect={(v) => onSelect(attr.name, v)}
            />
          )}
        </div>
      ))}
    </div>
  )
}
