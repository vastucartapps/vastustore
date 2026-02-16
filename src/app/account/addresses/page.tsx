"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import { medusa } from '@/lib/medusa'
import { AddressBook } from '@/components/storefront/AddressBook'
import type { Address } from '@/components/storefront/types'

export default function AddressBookPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Fetch addresses from Medusa
  useEffect(() => {
    if (!user) return

    async function fetchAddresses() {
      try {
        // Fetch customer data from Medusa to get addresses
        // Note: Medusa stores customer addresses on the customer object
        const { customer } = await medusa.store.customer.retrieve()

        if (customer && customer.shipping_addresses) {
          const transformedAddresses: Address[] = customer.shipping_addresses.map((addr: any, index: number) => ({
            id: addr.id,
            name: `${addr.first_name} ${addr.last_name}`.trim(),
            phone: addr.phone || '',
            street: `${addr.address_1}${addr.address_2 ? ', ' + addr.address_2 : ''}`,
            city: addr.city || '',
            state: addr.province || '',
            pincode: addr.postal_code || '',
            country: addr.country_code === 'IN' ? 'India' : 'United States',
            isDefault: index === 0, // First address is default
            label: addr.metadata?.label || 'Home',
          }))

          setAddresses(transformedAddresses)
        }

        setLoading(false)
      } catch (error) {
        console.error('Error fetching addresses:', error)
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [user])

  const handleAddAddress = async (address: Omit<Address, 'id' | 'isDefault'>) => {
    try {
      // Add address to Medusa customer
      const nameParts = address.name.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      const { customer } = await medusa.store.customer.createAddress({
        first_name: firstName,
        last_name: lastName,
        phone: address.phone,
        address_1: address.street,
        address_2: '',
        city: address.city,
        province: address.state,
        postal_code: address.pincode,
        country_code: address.country === 'India' ? 'IN' : 'US',
        metadata: { label: address.label },
      })

      if (customer && customer.shipping_addresses) {
        // Refresh addresses list
        const transformedAddresses: Address[] = customer.shipping_addresses.map((addr: any, index: number) => ({
          id: addr.id,
          name: `${addr.first_name} ${addr.last_name}`.trim(),
          phone: addr.phone || '',
          street: `${addr.address_1}${addr.address_2 ? ', ' + addr.address_2 : ''}`,
          city: addr.city || '',
          state: addr.province || '',
          pincode: addr.postal_code || '',
          country: addr.country_code === 'IN' ? 'India' : 'United States',
          isDefault: index === 0,
          label: addr.metadata?.label || 'Home',
        }))

        setAddresses(transformedAddresses)
      }
    } catch (error) {
      console.error('Error adding address:', error)
      alert('Failed to add address. Please try again.')
    }
  }

  const handleEditAddress = async (addressId: string, data: Partial<Address>) => {
    try {
      // Update address in Medusa
      const address = addresses.find(a => a.id === addressId)
      if (!address) return

      const nameParts = (data.name || address.name).split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      const { customer } = await medusa.store.customer.updateAddress(addressId, {
        first_name: firstName,
        last_name: lastName,
        phone: data.phone || address.phone,
        address_1: data.street || address.street,
        address_2: '',
        city: data.city || address.city,
        province: data.state || address.state,
        postal_code: data.pincode || address.pincode,
        country_code: (data.country || address.country) === 'India' ? 'IN' : 'US',
        metadata: { label: data.label || address.label },
      })

      if (customer && customer.shipping_addresses) {
        // Refresh addresses list
        const transformedAddresses: Address[] = customer.shipping_addresses.map((addr: any, index: number) => ({
          id: addr.id,
          name: `${addr.first_name} ${addr.last_name}`.trim(),
          phone: addr.phone || '',
          street: `${addr.address_1}${addr.address_2 ? ', ' + addr.address_2 : ''}`,
          city: addr.city || '',
          state: addr.province || '',
          pincode: addr.postal_code || '',
          country: addr.country_code === 'IN' ? 'India' : 'United States',
          isDefault: index === 0,
          label: addr.metadata?.label || 'Home',
        }))

        setAddresses(transformedAddresses)
      }
    } catch (error) {
      console.error('Error updating address:', error)
      alert('Failed to update address. Please try again.')
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    try {
      // Delete address from Medusa
      await medusa.store.customer.deleteAddress(addressId)

      // Remove from local state
      setAddresses(prev => prev.filter(addr => addr.id !== addressId))
    } catch (error) {
      console.error('Error deleting address:', error)
      alert('Failed to delete address. Please try again.')
    }
  }

  const handleSetDefaultAddress = async (addressId: string) => {
    // Reorder addresses so selected one is first (Medusa treats first as default)
    setAddresses(prev => {
      const selected = prev.find(a => a.id === addressId)
      const others = prev.filter(a => a.id !== addressId)
      if (!selected) return prev

      return [
        { ...selected, isDefault: true },
        ...others.map(a => ({ ...a, isDefault: false })),
      ]
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#013f47] mx-auto mb-4"></div>
          <p className="text-[#75615a]">Loading addresses...</p>
        </div>
      </div>
    )
  }

  return (
    <AddressBook
      addresses={addresses}
      onAddAddress={handleAddAddress}
      onEditAddress={handleEditAddress}
      onDeleteAddress={handleDeleteAddress}
      onSetDefaultAddress={handleSetDefaultAddress}
    />
  )
}
