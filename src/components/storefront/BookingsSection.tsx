import { Plus, Calendar, Clock, Video, CalendarDays } from 'lucide-react'
import type { Booking } from './types'

interface BookingsSectionProps {
  bookings: Booking[]
  onJoinMeeting?: (bookingId: string) => void
  onBookConsultation?: () => void
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

export function BookingsSection({ bookings, onJoinMeeting, onBookConsultation }: BookingsSectionProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { bg: c.primary500, text: '#ffffff', label: 'Confirmed' },
      completed: { bg: '#16a34a', text: '#ffffff', label: 'Completed' },
      pending: { bg: '#f59e0b', text: '#ffffff', label: 'Pending' },
      cancelled: { bg: '#ef4444', text: '#ffffff', label: 'Cancelled' },
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 600,
        background: config.bg,
        color: config.text,
        fontFamily: "'Open Sans', sans-serif"
      }}>
        {config.label}
      </span>
    )
  }

  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: '24px', fontWeight: 700, color: c.earth700, margin: 0 }}>
            Bookings & Consultations
          </h2>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Book Consultation Button */}
      <button
        onClick={onBookConsultation}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          background: c.primary500,
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          fontFamily: "'Open Sans', sans-serif",
          cursor: 'pointer',
          marginBottom: '24px',
          transition: 'opacity 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
      >
        <Plus size={20} />
        Book a Consultation
      </button>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div style={{
          background: c.bgCard,
          borderRadius: '16px',
          padding: '64px 32px',
          textAlign: 'center',
          border: `1px solid ${c.primary50}`
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: c.primary50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CalendarDays size={40} style={{ color: c.primary500 }} />
          </div>
          <h3 style={{
            fontFamily: "'Lora', serif",
            fontSize: '20px',
            fontWeight: 700,
            color: c.earth700,
            marginBottom: '8px',
            marginTop: 0
          }}>
            No consultations yet
          </h3>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '14px',
            color: c.earth400,
            marginBottom: '24px',
            marginTop: 0
          }}>
            Book your first Vastu consultation to get personalized guidance
          </p>
          <button
            onClick={onBookConsultation}
            style={{
              padding: '12px 24px',
              background: c.primary500,
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Book Now
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {bookings.map((booking) => (
            <div
              key={booking.id}
              style={{
                background: c.bgCard,
                borderRadius: '16px',
                padding: '24px',
                border: `1px solid ${c.primary50}`,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Lora', serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: c.earth700,
                    marginBottom: '4px',
                    marginTop: 0
                  }}>
                    {booking.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    color: c.earth400,
                    marginTop: 0,
                    marginBottom: 0
                  }}>
                    with {booking.consultantName}
                  </p>
                </div>
                {getStatusBadge(booking.status)}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} style={{ color: c.earth400 }} />
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    color: c.earth600
                  }}>
                    {formatDate(booking.date)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} style={{ color: c.earth400 }} />
                  <span style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    color: c.earth600
                  }}>
                    {booking.time}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  fontFamily: "'Lora', serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: c.primary500
                }}>
                  ₹{booking.price.toLocaleString('en-IN')}
                </div>

                {booking.meetingLink && booking.status === 'confirmed' && (
                  <button
                    onClick={() => onJoinMeeting?.(booking.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: c.primary500,
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      fontFamily: "'Open Sans', sans-serif",
                      cursor: 'pointer',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <Video size={16} />
                    Join Meeting
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
