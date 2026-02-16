import { useState } from 'react'
import type {
  CustomerDashboardProps, DashboardSection, Order,
} from '../types'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardHome } from './DashboardHome'
import { OrdersList } from './OrdersList'
import { OrderDetail } from './OrderDetail'
import { AddressBook } from './AddressBook'
import { WishlistGrid } from './WishlistGrid'
import { CouponsSection } from './CouponsSection'
import { LoyaltySection } from './LoyaltySection'
import { BookingsSection } from './BookingsSection'
import { GiftCardsSection } from './GiftCardsSection'
import { NotificationsSection } from './NotificationsSection'
import { SupportSection } from './SupportSection'

export function CustomerDashboard(props: CustomerDashboardProps) {
  const [activeSection, setActiveSection] = useState<DashboardSection>('home')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const unreadNotifications = props.notifications.filter((n) => !n.isRead).length

  const handleNavigate = (section: DashboardSection) => {
    setActiveSection(section)
    setSelectedOrder(null)
    props.onNavigate?.(section)
  }

  const handleViewOrder = (orderId: string) => {
    const order = props.orders.find((o) => o.id === orderId)
    if (order) {
      setSelectedOrder(order)
      setActiveSection('orders')
    }
    props.onViewOrder?.(orderId)
  }

  const renderContent = () => {
    // Order detail sub-view
    if (activeSection === 'orders' && selectedOrder) {
      return (
        <OrderDetail
          order={selectedOrder}
          onBack={() => setSelectedOrder(null)}
          onDownloadInvoice={props.onDownloadInvoice}
          onTrackOrder={props.onTrackOrder}
        />
      )
    }

    switch (activeSection) {
      case 'home':
        return (
          <DashboardHome
            userProfile={props.userProfile}
            stats={props.dashboardStats}
            recentOrders={props.orders.slice(0, 3)}
            newArrivals={props.newArrivals}
            offers={props.offers}
            onViewOrder={handleViewOrder}
            onNavigate={handleNavigate}
            onViewProduct={props.onViewProduct}
          />
        )
      case 'orders':
        return (
          <OrdersList
            orders={props.orders}
            onViewOrder={handleViewOrder}
            onDownloadInvoice={props.onDownloadInvoice}
          />
        )
      case 'addresses':
        return (
          <AddressBook
            addresses={props.addresses}
            onAddAddress={props.onAddAddress}
            onEditAddress={props.onEditAddress}
            onDeleteAddress={props.onDeleteAddress}
            onSetDefaultAddress={props.onSetDefaultAddress}
          />
        )
      case 'wishlist':
        return (
          <WishlistGrid
            items={props.wishlistItems}
            onAddToCart={props.onAddToCart}
            onRemoveFromWishlist={props.onRemoveFromWishlist}
            onNotifyMe={props.onNotifyMe}
            onViewProduct={props.onViewProduct}
          />
        )
      case 'coupons':
        return (
          <CouponsSection
            coupons={props.coupons}
            onCopyCoupon={props.onCopyCoupon}
          />
        )
      case 'loyalty':
        return (
          <LoyaltySection
            balance={props.loyaltyBalance}
            transactions={props.loyaltyTransactions}
            onRedeemPoints={props.onRedeemPoints}
          />
        )
      case 'bookings':
        return (
          <BookingsSection
            bookings={props.bookings}
            onJoinMeeting={props.onJoinMeeting}
            onBookConsultation={props.onBookConsultation}
          />
        )
      case 'gift-cards':
        return (
          <GiftCardsSection
            giftCards={props.giftCards}
            onCheckGiftCardBalance={props.onCheckGiftCardBalance}
          />
        )
      case 'notifications':
        return (
          <NotificationsSection
            notifications={props.notifications}
            onNotificationClick={props.onNotificationClick}
            onMarkAllRead={props.onMarkAllRead}
            onMarkRead={props.onMarkRead}
          />
        )
      case 'support':
        return (
          <SupportSection
            supportInfo={props.supportInfo}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)]" style={{ background: '#fffbf5' }}>
      {/* Sidebar — hidden on mobile, shown on lg+ */}
      <div className="hidden lg:block flex-shrink-0">
        <DashboardSidebar
          userProfile={props.userProfile}
          activeSection={activeSection}
          unreadNotifications={unreadNotifications}
          onNavigate={handleNavigate}
          onLogout={props.onLogout}
        />
      </div>

      {/* Mobile nav — shown on mobile, hidden on lg+ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30">
        <DashboardSidebar
          userProfile={props.userProfile}
          activeSection={activeSection}
          unreadNotifications={unreadNotifications}
          onNavigate={handleNavigate}
          onLogout={props.onLogout}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-20 lg:pb-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
