import { useState } from 'react'
import type { AdminProductManagementProps, WizardStep } from './types'
import { ProductList } from './ProductList'
import { ProductWizard } from './ProductWizard'

export function AdminProductManagement(props: AdminProductManagementProps) {
  const [view, setView] = useState<'list' | 'wizard'>('list')
  const [wizardStep, setWizardStep] = useState<WizardStep>('basic')
  const [isEditing, setIsEditing] = useState(false)

  const handleAddProduct = () => {
    setIsEditing(false)
    setWizardStep('basic')
    setView('wizard')
    props.onAddProduct?.()
  }

  const handleEditProduct = (productId: string) => {
    setIsEditing(true)
    setWizardStep('basic')
    setView('wizard')
    props.onEditProduct?.(productId)
  }

  const handleCancelWizard = () => {
    setView('list')
    props.onCancelEdit?.()
  }

  if (view === 'wizard') {
    return (
      <ProductWizard
        product={props.editingProduct}
        categories={props.categories}
        currentStep={wizardStep}
        isEditing={isEditing}
        onStepChange={setWizardStep}
        onSaveDraft={props.onSaveDraft}
        onPublish={props.onPublish}
        onCancel={handleCancelWizard}
        onBack={handleCancelWizard}
      />
    )
  }

  return (
    <ProductList
      products={props.products}
      categories={props.categories}
      filters={props.filters}
      viewMode={props.viewMode}
      totalCount={props.totalCount}
      onChangeViewMode={props.onChangeViewMode}
      onChangeFilters={props.onChangeFilters}
      onSearch={props.onSearch}
      onAddProduct={handleAddProduct}
      onEditProduct={handleEditProduct}
      onDuplicateProduct={props.onDuplicateProduct}
      onDeleteProduct={props.onDeleteProduct}
      onBulkAction={props.onBulkAction}
      onImportCSV={props.onImportCSV}
      onExportCSV={props.onExportCSV}
    />
  )
}
