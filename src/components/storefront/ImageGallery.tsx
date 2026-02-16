"use client"

import { useState, useRef } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import type { ProductImage } from './types'

const c = {
  primary500: '#013f47',
  primary400: '#2a7a72',
  primary50: '#e8f5f3',
  secondary500: '#c85103',
  bgPrimary: '#fffbf5',
  bgCard: '#ffffff',
  earth300: '#a39585',
  earth400: '#75615a',
  earth600: '#5a4f47',
  earth700: '#433b35',
}

interface ImageGalleryProps {
  images: ProductImage[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const sorted = [...images].sort((a, b) => a.order - b.order)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbRef = useRef<HTMLDivElement>(null)

  const activeImage = sorted[activeIndex]

  const goPrev = () => setActiveIndex((p) => (p - 1 + sorted.length) % sorted.length)
  const goNext = () => setActiveIndex((p) => (p + 1) % sorted.length)

  const scrollThumbs = (dir: 'left' | 'right') => {
    if (thumbRef.current) {
      thumbRef.current.scrollBy({ left: dir === 'left' ? -160 : 160, behavior: 'smooth' })
    }
  }

  return (
    <>
      <div>
        {/* Main image with arrow navigation */}
        <div
          className="relative group rounded-2xl overflow-hidden"
          style={{ background: c.bgCard, border: '1px solid #f0ebe4' }}
        >
          <div className="relative w-full aspect-square cursor-zoom-in" onClick={() => setLightboxOpen(true)}>
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Zoom hint */}
          <div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 pointer-events-none flex items-center justify-center"
          >
            <div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(1,63,71,0.7)' }}
            >
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Left arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: c.earth700 }} />
          </button>

          {/* Right arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.9)')}
          >
            <ChevronRight className="w-5 h-5" style={{ color: c.earth700 }} />
          </button>

          {/* Image counter */}
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(1,63,71,0.7)', color: '#fff', fontFamily: "'Open Sans', sans-serif" }}
          >
            {activeIndex + 1} / {sorted.length}
          </div>
        </div>

        {/* Thumbnails with arrow buttons, no scrollbar */}
        <div className="relative mt-3">
          {sorted.length > 5 && (
            <>
              <button
                onClick={() => scrollThumbs('left')}
                className="absolute -left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{ background: c.bgCard, border: '1px solid #e8e0d8', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.primary400)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e8e0d8')}
              >
                <ChevronLeft className="w-3.5 h-3.5" style={{ color: c.earth400 }} />
              </button>
              <button
                onClick={() => scrollThumbs('right')}
                className="absolute -right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{ background: c.bgCard, border: '1px solid #e8e0d8', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.primary400)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#e8e0d8')}
              >
                <ChevronRight className="w-3.5 h-3.5" style={{ color: c.earth400 }} />
              </button>
            </>
          )}

          <div
            ref={thumbRef}
            className="flex gap-2.5 overflow-hidden scroll-smooth px-1"
          >
            {sorted.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setActiveIndex(idx)}
                className="flex-shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden transition-all duration-200 relative"
                style={{
                  border: idx === activeIndex ? `2px solid ${c.primary500}` : '2px solid #f0ebe4',
                  opacity: idx === activeIndex ? 1 : 0.65,
                }}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.9)' }}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.1)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="relative max-w-[90vw] max-h-[85vh]">
            <Image
              src={sorted[activeIndex].url}
              alt={sorted[activeIndex].alt}
              width={1200}
              height={1200}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Lightbox dots instead of thumbnails */}
          <div className="absolute bottom-6 flex gap-2">
            {sorted.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                style={{
                  background: idx === activeIndex ? '#fff' : 'rgba(255,255,255,0.35)',
                  transform: idx === activeIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
