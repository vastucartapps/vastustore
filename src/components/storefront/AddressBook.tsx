import { useState } from 'react'
import { Home, Building, MapPin, Plus, Pencil, Trash2, Star } from 'lucide-react'
import type { Address } from './types'

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

interface AddressBookProps {
  addresses: Address[]
  onAddAddress?: (address: Omit<Address, 'id' | 'isDefault'>) => void
  onEditAddress?: (addressId: string, data: Partial<Address>) => void
  onDeleteAddress?: (addressId: string) => void
  onSetDefaultAddress?: (addressId: string) => void
}

const inputStyle = {
  border: '1.5px solid #e8e0d8',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  width: '100%',
  fontFamily: "'Open Sans', sans-serif",
  fontSize: '0.9375rem',
  transition: 'all 0.2s',
}

const focusStyle = {
  outline: 'none',
  borderColor: c.primary400,
  boxShadow: `0 0 0 3px ${c.primary50}`,
}

export function AddressBook({
  addresses,
  onAddAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
}: AddressBookProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    label: 'Home' as 'Home' | 'Office' | 'Other',
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredAddressId, setHoveredAddressId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddAddress?.(formData)
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      label: 'Home',
    })
    setShowAddForm(false)
  }

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'Home':
        return <Home size={16} />
      case 'Office':
        return <Building size={16} />
      default:
        return <MapPin size={16} />
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
          <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
          <h2 style={{
            fontFamily: "'Lora', serif",
            fontSize: '1.875rem',
            fontWeight: '600',
            color: c.earth700,
            margin: 0,
          }}>
            Address Book
          </h2>
          <div style={{ flex: 1, height: '3px', background: c.gradientAccent }} />
        </div>
      </div>

      {/* Add New Address Button */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: c.primary500,
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            padding: '0.75rem 1.5rem',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '0.9375rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = c.primary400
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = c.primary500
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          <Plus size={20} />
          Add New Address
        </button>
      </div>

      {/* Add Address Form */}
      {showAddForm && (
        <div style={{
          backgroundColor: c.bgPrimary,
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          border: `1px solid #e8e0d8`,
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1.25rem',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: c.earth600,
                  }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      ...inputStyle,
                      ...(focusedField === 'name' ? focusStyle : {}),
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: c.earth600,
                  }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      ...inputStyle,
                      ...(focusedField === 'phone' ? focusStyle : {}),
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: c.earth600,
                }}>
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  onFocus={() => setFocusedField('street')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    ...inputStyle,
                    ...(focusedField === 'street' ? focusStyle : {}),
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: c.earth600,
                  }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    onFocus={() => setFocusedField('city')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      ...inputStyle,
                      ...(focusedField === 'city' ? focusStyle : {}),
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: c.earth600,
                  }}>
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    onFocus={() => setFocusedField('state')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      ...inputStyle,
                      ...(focusedField === 'state' ? focusStyle : {}),
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: c.earth600,
                  }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    onFocus={() => setFocusedField('pincode')}
                    onBlur={() => setFocusedField(null)}
                    required
                    style={{
                      ...inputStyle,
                      ...(focusedField === 'pincode' ? focusStyle : {}),
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: c.earth600,
                }}>
                  Label
                </label>
                <select
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value as 'Home' | 'Office' | 'Other' })}
                  onFocus={() => setFocusedField('label')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputStyle,
                    ...(focusedField === 'label' ? focusStyle : {}),
                  }}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: c.primary500,
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.75rem',
                    padding: '0.75rem 2rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = c.primary400
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = c.primary500
                  }}
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  style={{
                    backgroundColor: 'transparent',
                    color: c.earth600,
                    border: `1px solid ${c.earth400}`,
                    borderRadius: '0.75rem',
                    padding: '0.75rem 2rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.9375rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = c.primary50
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Address Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem',
      }}
      className="md:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            onMouseEnter={() => setHoveredAddressId(address.id)}
            onMouseLeave={() => setHoveredAddressId(null)}
            style={{
              backgroundColor: c.bgCard,
              border: `1px solid #e8e0d8`,
              borderRadius: '1rem',
              padding: '1.5rem',
              position: 'relative',
              transition: 'all 0.2s',
              ...(hoveredAddressId === address.id ? {
                borderColor: c.primary400,
                boxShadow: `0 4px 12px rgba(1, 63, 71, 0.1)`,
              } : {}),
            }}
          >
            {/* Labels */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: c.primary50,
                color: c.primary500,
                padding: '0.375rem 0.75rem',
                borderRadius: '0.5rem',
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: '600',
              }}>
                {getLabelIcon(address.label)}
                {address.label}
              </div>
              {address.isDefault && (
                <div style={{
                  backgroundColor: c.secondary500,
                  color: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '0.5rem',
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: '600',
                }}>
                  Default
                </div>
              )}
            </div>

            {/* Address Details */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '1rem',
                fontWeight: '600',
                color: c.earth700,
                marginBottom: '0.25rem',
              }}>
                {address.name}
              </div>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.875rem',
                color: c.earth600,
                marginBottom: '0.5rem',
              }}>
                {address.phone}
              </div>
              <div style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '0.9375rem',
                color: c.earth600,
                lineHeight: '1.6',
              }}>
                {address.street}, {address.city}, {address.state} - {address.pincode}
              </div>
            </div>

            {/* Action Buttons */}
            {hoveredAddressId === address.id && (
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: `1px solid #e8e0d8`,
              }}>
                <button
                  onClick={() => onEditAddress?.(address.id, {})}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    backgroundColor: 'transparent',
                    color: c.primary500,
                    border: `1px solid ${c.primary500}`,
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = c.primary50
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <Pencil size={14} />
                  Edit
                </button>
                <button
                  onClick={() => onDeleteAddress?.(address.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    backgroundColor: 'transparent',
                    color: c.secondary500,
                    border: `1px solid ${c.secondary500}`,
                    borderRadius: '0.5rem',
                    padding: '0.5rem 1rem',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(200, 81, 3, 0.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => onSetDefaultAddress?.(address.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      backgroundColor: 'transparent',
                      color: c.earth600,
                      border: `1px solid ${c.earth400}`,
                      borderRadius: '0.5rem',
                      padding: '0.5rem 1rem',
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: '0.8125rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = c.primary50
                      e.currentTarget.style.borderColor = c.primary500
                      e.currentTarget.style.color = c.primary500
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.borderColor = c.earth400
                      e.currentTarget.style.color = c.earth600
                    }}
                  >
                    <Star size={14} />
                    Set Default
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showAddForm && (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          color: c.earth400,
        }}>
          <p style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '1rem',
            marginBottom: '1rem',
          }}>
            No addresses saved yet
          </p>
        </div>
      )}
    </div>
  )
}
