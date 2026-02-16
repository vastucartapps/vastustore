import React from 'react'
import { CustomerList } from './CustomerList'
import { CustomerDetailPage } from './CustomerDetailPage'
import type { AdminCustomerManagementProps } from '../types'

export function AdminCustomerManagement({
  customers,
  customerDetail,
  filters,
  totalCount,
  onChangeFilters,
  onViewCustomer,
  onViewOrder,
  onAddNote,
  onBackToList,
}: AdminCustomerManagementProps) {
  if (customerDetail) {
    return (
      <CustomerDetailPage
        customer={customerDetail}
        onBack={onBackToList}
        onViewOrder={onViewOrder}
        onAddNote={onAddNote ? (note) => onAddNote(customerDetail.id, note) : undefined}
      />
    )
  }

  return (
    <CustomerList
      customers={customers}
      filters={filters}
      totalCount={totalCount}
      onChangeFilters={onChangeFilters}
      onViewCustomer={onViewCustomer}
    />
  )
}
