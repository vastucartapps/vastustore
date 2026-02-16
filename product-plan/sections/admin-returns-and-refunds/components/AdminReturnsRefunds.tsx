import { useState } from 'react'
import type { AdminReturnsRefundsProps } from '../types'
import { ReturnsKanban } from './ReturnsKanban'
import { ReturnDetailPage } from './ReturnDetailPage'

export function AdminReturnsRefunds(props: AdminReturnsRefundsProps) {
  const [view, setView] = useState<'board' | 'detail'>('board')

  const handleViewReturn = (returnId: string) => {
    setView('detail')
    props.onViewReturn?.(returnId)
  }

  const handleBack = () => {
    setView('board')
    props.onBackToBoard?.()
  }

  if (view === 'detail' && props.returnDetail) {
    return (
      <ReturnDetailPage
        returnRequest={props.returnDetail}
        onBack={handleBack}
        onApprove={props.onApprove}
        onReject={props.onReject}
        onProcessRefund={props.onProcessRefund}
        onInitiateExchange={props.onInitiateExchange}
      />
    )
  }

  return (
    <ReturnsKanban
      returns={props.returns}
      onViewReturn={handleViewReturn}
      onMoveReturn={props.onMoveReturn}
      onSearch={props.onSearch}
    />
  )
}
