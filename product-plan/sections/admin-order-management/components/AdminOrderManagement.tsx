import { useState } from 'react'
import type { AdminOrderManagementProps } from '../types'
import { OrdersTable } from './OrdersTable'
import { OrderDetailPage } from './OrderDetailPage'

export function AdminOrderManagement(props: AdminOrderManagementProps) {
  const [view, setView] = useState<'list' | 'detail'>('list')

  const handleViewOrder = (orderId: string) => {
    setView('detail')
    props.onViewOrder?.(orderId)
  }

  const handleBack = () => {
    setView('list')
    props.onBackToList?.()
  }

  if (view === 'detail' && props.orderDetail) {
    return (
      <OrderDetailPage
        order={props.orderDetail}
        onBack={handleBack}
        onUpdateStatus={props.onUpdateStatus}
        onAddNote={props.onAddNote}
        onDownloadInvoice={props.onDownloadInvoice}
        onEmailCustomer={props.onEmailCustomer}
      />
    )
  }

  return (
    <OrdersTable
      orders={props.orders}
      filters={props.filters}
      pagination={props.pagination}
      onChangeFilters={props.onChangeFilters}
      onChangePage={props.onChangePage}
      onChangePerPage={props.onChangePerPage}
      onViewOrder={handleViewOrder}
      onDownloadInvoice={props.onDownloadInvoice}
    />
  )
}
