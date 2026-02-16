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
    quote: 'Create harmony in every corner of your home with authentic Vastu products',
    attribution: 'VastuCart Promise',
    isActive: true,
    order: 1,
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800',
    quote: 'From sacred crystals to traditional brass, discover the essence of balanced living',
    attribution: 'Ancient Wisdom, Modern Living',
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

export default function LoginPage() {
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const [error, setError] = useState('')

  async function handleLogin(email: string, password: string, rememberMe: boolean) {
    try {
      setError('')
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      // Fetch user profile
      const meRes = await fetch('/api/auth/me')
      const meData = await meRes.json()

      if (meData.user) {
        setUser(meData.user)
        
        // Role-based redirect
        if (meData.user.ecom_role === 'ecom_admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }
  }

  function handleNavigate(view: AuthView) {
    if (view === 'register') router.push('/register')
    if (view === 'forgot-password') router.push('/forgot-password')
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
        view="login"
        marketingSlides={defaultSlides}
        passwordRequirements={passwordRequirements}
        onLogin={handleLogin}
        onNavigate={handleNavigate}
      />
    </>
  )
}
