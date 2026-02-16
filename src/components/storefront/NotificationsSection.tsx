import { Package, Tag, ShoppingBag, Award, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import type { Notification } from './types'

interface NotificationsSectionProps {
  notifications: Notification[]
  onNotificationClick?: (notificationId: string, link: string) => void
  onMarkAllRead?: () => void
  onMarkRead?: (notificationId: string) => void
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

type NotificationType = 'order' | 'promotion' | 'stock' | 'loyalty'

export function NotificationsSection({
  notifications,
  onNotificationClick,
  onMarkAllRead,
  onMarkRead
}: NotificationsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | NotificationType>('all')

  const unreadCount = notifications.filter(n => !n.isRead).length

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
  }

  const getTypeIcon = (type: NotificationType) => {
    const iconMap = {
      order: Package,
      promotion: Tag,
      stock: ShoppingBag,
      loyalty: Award,
    }
    return iconMap[type]
  }

  const getTypeColor = (type: NotificationType) => {
    const colorMap = {
      order: c.primary500,
      promotion: c.secondary500,
      stock: '#16a34a',
      loyalty: '#f59e0b',
    }
    return colorMap[type]
  }

  const filteredNotifications = activeFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeFilter)

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead && onMarkRead) {
      onMarkRead(notification.id)
    }
    if (notification.link && onNotificationClick) {
      onNotificationClick(notification.id, notification.link)
    }
  }

  return (
    <div>
      {/* Section Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: '24px', fontWeight: 700, color: c.earth700, margin: 0 }}>
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '24px',
                height: '24px',
                padding: '0 8px',
                borderRadius: '12px',
                background: c.secondary500,
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                fontFamily: "'Open Sans', sans-serif"
              }}>
                {unreadCount}
              </span>
            )}
          </div>
          <div style={{ flex: 1, height: '2px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Mark All as Read Button */}
      {unreadCount > 0 && (
        <div style={{ marginBottom: '16px', textAlign: 'right' }}>
          <button
            onClick={onMarkAllRead}
            style={{
              background: 'transparent',
              border: 'none',
              color: c.primary500,
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: '4px 8px'
            }}
          >
            Mark All as Read
          </button>
        </div>
      )}

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {(['all', 'order', 'promotion', 'stock', 'loyalty'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${activeFilter === filter ? c.primary500 : c.primary50}`,
              background: activeFilter === filter ? c.primary500 : c.bgCard,
              color: activeFilter === filter ? '#ffffff' : c.earth600,
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: "'Open Sans', sans-serif",
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 0.2s'
            }}
          >
            {filter === 'all' ? 'All' : filter === 'stock' ? 'Stock Alerts' : filter}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            background: c.bgCard,
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            border: `1px solid ${c.primary50}`
          }}>
            <p style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: '14px',
              color: c.earth400,
              margin: 0
            }}>
              No notifications to display
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const TypeIcon = getTypeIcon(notification.type as NotificationType)
            const typeColor = getTypeColor(notification.type as NotificationType)

            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                style={{
                  background: notification.isRead ? c.bgCard : c.bgPrimary,
                  borderRadius: '12px',
                  padding: '16px',
                  border: `1px solid ${c.primary50}`,
                  borderLeft: notification.isRead ? `1px solid ${c.primary50}` : `3px solid ${c.primary500}`,
                  cursor: notification.link ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'flex-start'
                }}
                onMouseEnter={(e) => {
                  if (notification.link) {
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  background: `${typeColor}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <TypeIcon size={20} style={{ color: typeColor }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: c.earth700,
                      margin: 0,
                      flex: 1
                    }}>
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: c.primary500,
                        flexShrink: 0,
                        marginTop: '4px'
                      }} />
                    )}
                  </div>
                  <p style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '14px',
                    color: c.earth400,
                    margin: '0 0 8px 0'
                  }}>
                    {notification.message}
                  </p>
                  <div style={{
                    fontSize: '12px',
                    color: c.earth300,
                    fontFamily: "'Open Sans', sans-serif"
                  }}>
                    {getRelativeTime(notification.date)}
                  </div>
                </div>

                {/* Arrow for clickable notifications */}
                {notification.link && (
                  <ChevronRight size={20} style={{ color: c.earth300, flexShrink: 0, marginTop: '8px' }} />
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
