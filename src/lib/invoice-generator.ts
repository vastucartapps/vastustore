/**
 * GST Invoice PDF Generator
 */

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface InvoiceData {
  invoiceNumber: string
  orderNumber: string
  orderDate: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  billingAddress?: string
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  shippingFee: number
  codFee: number
  couponDiscount: number
  giftCardDiscount: number
  prepaidDiscount: number
  taxableAmount: number
  cgst: number
  sgst: number
  igst: number
  totalTax: number
  grandTotal: number
  currency: string
  paymentMethod: string
}

const COMPANY_INFO = {
  name: 'VastuCart',
  address: 'Plot No. 123, Sector 15, Gurgaon, Haryana - 122001',
  gstin: 'GSTIN123456789',
  pan: 'PANCARD123',
  email: 'orders@vastucart.in',
  phone: '+91-1234567890',
}

export function generateGSTInvoice(data: InvoiceData): jsPDF {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  let yPos = 20

  // Header - Company Logo & Info
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(1, 63, 71) // Deep teal
  doc.text('VastuCart', 15, yPos)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  yPos += 6
  doc.text(COMPANY_INFO.address, 15, yPos)
  yPos += 5
  doc.text(`GSTIN: ${COMPANY_INFO.gstin} | PAN: ${COMPANY_INFO.pan}`, 15, yPos)
  yPos += 5
  doc.text(`Email: ${COMPANY_INFO.email} | Phone: ${COMPANY_INFO.phone}`, 15, yPos)

  // Invoice Title
  yPos += 15
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('TAX INVOICE', pageWidth / 2, yPos, { align: 'center' })

  // Invoice Details
  yPos += 10
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text(`Invoice No: ${data.invoiceNumber}`, 15, yPos)
  doc.text(`Date: ${data.orderDate}`, pageWidth - 60, yPos)
  yPos += 6
  doc.text(`Order No: ${data.orderNumber}`, 15, yPos)

  // Customer Details
  yPos += 10
  doc.setFont('helvetica', 'bold')
  doc.text('Bill To:', 15, yPos)
  doc.setFont('helvetica', 'normal')
  yPos += 6
  doc.text(data.customerName, 15, yPos)
  yPos += 5

  // Split address into lines
  const addressLines = doc.splitTextToSize(data.shippingAddress, 90)
  addressLines.forEach((line: string) => {
    doc.text(line, 15, yPos)
    yPos += 5
  })

  doc.text(`Email: ${data.customerEmail}`, 15, yPos)
  yPos += 5
  doc.text(`Phone: ${data.customerPhone}`, 15, yPos)

  // Items Table
  yPos += 10
  autoTable(doc, {
    startY: yPos,
    head: [['#', 'Item Description', 'Qty', 'Rate', 'Amount']],
    body: data.items.map((item, index) => [
      (index + 1).toString(),
      item.name,
      item.quantity.toString(),
      `${data.currency === 'INR' ? '₹' : '$'}${item.price.toFixed(2)}`,
      `${data.currency === 'INR' ? '₹' : '$'}${item.total.toFixed(2)}`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: [1, 63, 71] },
  })

  // @ts-ignore - autoTable modifies doc
  yPos = doc.lastAutoTable.finalY + 10

  // Summary Section
  const summaryX = pageWidth - 70
  doc.setFontSize(10)

  const addSummaryRow = (label: string, value: number, isBold = false) => {
    if (isBold) {
      doc.setFont('helvetica', 'bold')
    } else {
      doc.setFont('helvetica', 'normal')
    }
    doc.text(label, summaryX - 5, yPos, { align: 'right' })
    doc.text(`${data.currency === 'INR' ? '₹' : '$'}${value.toFixed(2)}`, pageWidth - 15, yPos, { align: 'right' })
    yPos += 6
  }

  addSummaryRow('Subtotal:', data.subtotal)

  if (data.shippingFee > 0) {
    addSummaryRow('Shipping:', data.shippingFee)
  }

  if (data.codFee > 0) {
    addSummaryRow('COD Fee:', data.codFee)
  }

  if (data.couponDiscount > 0) {
    addSummaryRow('Coupon Discount:', -data.couponDiscount)
  }

  if (data.giftCardDiscount > 0) {
    addSummaryRow('Gift Card:', -data.giftCardDiscount)
  }

  if (data.prepaidDiscount > 0) {
    addSummaryRow('Prepaid Discount:', -data.prepaidDiscount)
  }

  yPos += 3
  doc.line(summaryX - 5, yPos, pageWidth - 15, yPos)
  yPos += 6

  // GST Breakdown
  if (data.currency === 'INR') {
    if (data.cgst > 0 && data.sgst > 0) {
      // Intra-state (CGST + SGST)
      addSummaryRow('CGST (9%):', data.cgst)
      addSummaryRow('SGST (9%):', data.sgst)
    } else if (data.igst > 0) {
      // Inter-state (IGST)
      addSummaryRow('IGST (18%):', data.igst)
    }
  } else {
    addSummaryRow('Tax:', data.totalTax)
  }

  yPos += 3
  doc.line(summaryX - 5, yPos, pageWidth - 15, yPos)
  yPos += 8

  addSummaryRow('Total Amount:', data.grandTotal, true)

  // Payment Method
  yPos += 10
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`Payment Method: ${data.paymentMethod}`, 15, yPos)

  // Footer
  yPos = doc.internal.pageSize.height - 30
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text('This is a computer-generated invoice and does not require a signature.', pageWidth / 2, yPos, { align: 'center' })
  yPos += 5
  doc.text('For any queries, please contact us at orders@vastucart.in', pageWidth / 2, yPos, { align: 'center' })

  return doc
}

export function downloadInvoice(data: InvoiceData) {
  const doc = generateGSTInvoice(data)
  doc.save(`Invoice_${data.invoiceNumber}.pdf`)
}
