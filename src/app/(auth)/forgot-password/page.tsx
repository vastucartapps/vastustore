"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AuthScreen } from '@/components/auth'
import type { AuthView, MarketingSlide, PasswordRequirement } from '@/components/auth/types'

const defaultSlides: MarketingSlide[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    quote: 'Your account security is our priority',
    attribution: 'VastuCart Security',
    isActive: true,
    order: 1,
  },
]

const passwordRequirements: PasswordRequirement[] = []

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)

  async function handleForgotPassword(email: string) {
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      setSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      // Still show success to prevent email enumeration
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    }
  }

  function handleNavigate(view: AuthView) {
    if (view === 'login') router.push('/login')
  }

  return (
    <>
      {success && (
        <div 
          className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md"
          style={{ background: '#D1FAE5', color: '#10B981', fontFamily: "'Open Sans', sans-serif" }}
        >
          If an account exists with this email, you'll receive a reset link
        </div>
      )}
      <AuthScreen
        view="forgot-password"
        marketingSlides={defaultSlides}
        passwordRequirements={passwordRequirements}
        onForgotPassword={handleForgotPassword}
        onNavigate={handleNavigate}
      />
    </>
  )
}
