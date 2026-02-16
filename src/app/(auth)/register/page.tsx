"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthScreen } from '@/components/auth'
import type { AuthView, MarketingSlide, PasswordRequirement } from '@/components/auth/types'
import { useAuthStore } from '@/lib/store'

const defaultSlides: MarketingSlide[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    quote: 'Join thousands discovering the power of sacred living',
    attribution: 'VastuCart Community',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
    quote: 'Transform your space, elevate your energy, embrace harmony',
    attribution: 'Start Your Journey Today',
    isActive: true,
    order: 2,
  },
]

const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', key: 'minLength' },
  { label: 'One uppercase letter', key: 'uppercase' },
  { label: 'One lowercase letter', key: 'lowercase' },
  { label: 'One number', key: 'number' },
  { label: 'One special character', key: 'special' },
]

export default function RegisterPage() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const [error, setError] = useState('')

  async function handleRegister(name: string, email: string, password: string) {
    try {
      setError('')
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      // Fetch user profile
      const meRes = await fetch('/api/auth/me')
      const meData = await meRes.json()

      if (meData.user) {
        setUser(meData.user)
        router.push('/')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  function handleNavigate(view: AuthView) {
    if (view === 'login') router.push('/login')
  }

  return (
    <>
      {error && (
        <div 
          className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md"
          style={{ background: '#FEE2E2', color: '#EF4444', fontFamily: "'Open Sans', sans-serif" }}
        >
          {error}
        </div>
      )}
      <AuthScreen
        view="register"
        marketingSlides={defaultSlides}
        passwordRequirements={passwordRequirements}
        onRegister={handleRegister}
        onNavigate={handleNavigate}
      />
    </>
  )
}
