import { Check, X } from 'lucide-react'
import type { RichContentBlock } from '../types'

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

interface RichContentProps {
  blocks: RichContentBlock[]
}

export function RichContent({ blocks }: RichContentProps) {
  return (
    <div className="space-y-16">
      {blocks.map((block) => {
        if (block.type === 'hero') {
          return (
            <div key={block.id}>
              {/* Decorative divider */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
                <h3
                  className="text-xl sm:text-2xl font-bold text-center px-4"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  {block.title}
                </h3>
                <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
              </div>

              {/* Hero image with overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={block.imageUrl}
                  alt={block.title}
                  className="w-full h-72 sm:h-80 lg:h-[420px] object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(1,63,71,0.82) 100%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                  <h4
                    className="text-xl sm:text-2xl font-bold text-white"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {block.headline}
                  </h4>
                </div>
              </div>

              {/* Description */}
              <p
                className="mt-6 text-sm sm:text-base leading-relaxed"
                style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif", lineHeight: 1.8 }}
              >
                {block.description}
              </p>
            </div>
          )
        }

        if (block.type === 'comparison') {
          return (
            <div key={block.id}>
              {/* Decorative divider */}
              <div className="flex items-center gap-4 mb-10">
                <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
                <h3
                  className="text-xl sm:text-2xl font-bold text-center px-4"
                  style={{ color: c.earth700, fontFamily: "'Lora', serif" }}
                >
                  {block.title}
                </h3>
                <div className="flex-1 h-px" style={{ background: c.gradientAccent }} />
              </div>

              <div
                className="rounded-2xl overflow-hidden overflow-x-auto shadow-sm"
                style={{ border: '1px solid #f0ebe4' }}
              >
                {/* Gradient accent top */}
                <div className="h-1" style={{ background: c.gradientAccent }} />

                <table className="w-full min-w-[520px]">
                  {/* Product headers */}
                  <thead>
                    <tr>
                      <th className="p-5 w-44" style={{ background: c.bgPrimary }} />
                      {block.products.map((prod) => (
                        <th
                          key={prod.asin}
                          className="p-5 text-center"
                          style={{
                            background: prod.isCurrentProduct ? c.primary50 : c.bgPrimary,
                            borderBottom: prod.isCurrentProduct ? `2px solid ${c.primary500}` : 'none',
                          }}
                        >
                          <div
                            className="w-24 h-24 mx-auto mb-3 rounded-xl overflow-hidden"
                            style={{
                              border: prod.isCurrentProduct ? `2px solid ${c.primary500}` : '2px solid #f0ebe4',
                            }}
                          >
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p
                            className="text-sm font-semibold"
                            style={{
                              color: prod.isCurrentProduct ? c.primary500 : c.earth700,
                              fontFamily: "'Open Sans', sans-serif",
                            }}
                          >
                            {prod.name}
                          </p>
                          {prod.isCurrentProduct && (
                            <span
                              className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                              style={{ background: c.secondary500 }}
                            >
                              <Check className="w-3 h-3" /> This Product
                            </span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Metric rows */}
                  <tbody>
                    {block.metrics.map((metric, idx) => (
                      <tr
                        key={metric.label}
                        style={{ background: idx % 2 === 0 ? c.bgCard : c.bgPrimary }}
                      >
                        <td
                          className="px-5 py-4 text-sm font-medium"
                          style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                        >
                          {metric.label}
                        </td>
                        {metric.values.map((val, vi) => (
                          <td key={vi} className="px-5 py-4 text-center">
                            {typeof val === 'boolean' ? (
                              val ? (
                                <span
                                  className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                                  style={{ background: c.primary50 }}
                                >
                                  <Check className="w-4 h-4" style={{ color: c.primary500 }} />
                                </span>
                              ) : (
                                <span
                                  className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                                  style={{ background: '#f5f0ea' }}
                                >
                                  <X className="w-3.5 h-3.5" style={{ color: c.earth300 }} />
                                </span>
                              )
                            ) : (
                              <span
                                className="text-sm font-medium"
                                style={{ color: c.earth600, fontFamily: "'Open Sans', sans-serif" }}
                              >
                                {val}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
