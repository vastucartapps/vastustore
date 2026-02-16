import { Mail, Phone, MessageCircle, Clock, ChevronRight } from 'lucide-react'
import type { SupportInfo } from './types'

interface SupportSectionProps {
  supportInfo: SupportInfo
  onOpenChat?: () => void
}

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

export function SupportSection({ supportInfo, onOpenChat }: SupportSectionProps) {
  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: '24px', fontWeight: 700, color: c.earth700, margin: 0 }}>
            Help & Support
          </h2>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Contact Info Card */}
      <div style={{
        background: c.bgCard,
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ height: '4px', background: c.gradientAccent }} />
        <div style={{ padding: '24px' }}>
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: '18px',
            fontWeight: 700,
            color: c.earth700,
            marginBottom: '20px',
            marginTop: 0
          }}>
            Contact Us
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: c.primary50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Mail size={20} style={{ color: c.primary500 }} />
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: c.earth400,
                  fontFamily: "'Open Sans', sans-serif",
                  marginBottom: '2px'
                }}>
                  Email
                </div>
                <a
                  href={`mailto:${supportInfo.email}`}
                  style={{
                    fontSize: '14px',
                    color: c.primary500,
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  {supportInfo.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: c.primary50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Phone size={20} style={{ color: c.primary500 }} />
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: c.earth400,
                  fontFamily: "'Open Sans', sans-serif",
                  marginBottom: '2px'
                }}>
                  Phone
                </div>
                <a
                  href={`tel:${supportInfo.phone}`}
                  style={{
                    fontSize: '14px',
                    color: c.primary500,
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  {supportInfo.phone}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: c.primary50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MessageCircle size={20} style={{ color: c.primary500 }} />
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: c.earth400,
                  fontFamily: "'Open Sans', sans-serif",
                  marginBottom: '2px'
                }}>
                  WhatsApp
                </div>
                <a
                  href={`https://wa.me/${supportInfo.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '14px',
                    color: c.primary500,
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  {supportInfo.whatsapp}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: c.primary50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Clock size={20} style={{ color: c.primary500 }} />
              </div>
              <div>
                <div style={{
                  fontSize: '12px',
                  color: c.earth400,
                  fontFamily: "'Open Sans', sans-serif",
                  marginBottom: '2px'
                }}>
                  Support Hours
                </div>
                <div style={{
                  fontSize: '14px',
                  color: c.earth700,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 600
                }}>
                  {supportInfo.hours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Links Card */}
      <div style={{
        background: c.bgCard,
        borderRadius: '16px',
        marginBottom: '16px',
        border: `1px solid ${c.primary50}`,
        overflow: 'hidden'
      }}>
        <div style={{ padding: '24px' }}>
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: '18px',
            fontWeight: 700,
            color: c.earth700,
            marginBottom: '16px',
            marginTop: 0
          }}>
            Frequently Asked Questions
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {supportInfo.faqLinks.map((faq, index) => (
              <a
                key={index}
                href={faq.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  textDecoration: 'none',
                  color: c.earth700,
                  borderBottom: index < supportInfo.faqLinks.length - 1 ? `1px solid ${c.primary50}` : 'none',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = c.primary50
                  e.currentTarget.style.paddingLeft = '12px'
                  e.currentTarget.style.paddingRight = '12px'
                  e.currentTarget.style.marginLeft = '-12px'
                  e.currentTarget.style.marginRight = '-12px'
                  e.currentTarget.style.borderRadius = '8px'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.paddingLeft = '0'
                  e.currentTarget.style.paddingRight = '0'
                  e.currentTarget.style.marginLeft = '0'
                  e.currentTarget.style.marginRight = '0'
                  e.currentTarget.style.borderRadius = '0'
                }}
              >
                <span style={{
                  fontSize: '14px',
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 500
                }}>
                  {faq.label}
                </span>
                <ChevronRight size={16} style={{ color: c.earth400, flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Chat CTA Button */}
      <button
        onClick={onOpenChat}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          padding: '16px',
          background: c.gradientAccent,
          color: '#ffffff',
          border: 'none',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: "'Open Sans', sans-serif",
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)'
          e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <MessageCircle size={20} />
        Chat with Us
      </button>
    </div>
  )
}
