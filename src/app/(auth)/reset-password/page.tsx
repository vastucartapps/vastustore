"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AuthScreen } from '@/components/auth'
import type { MarketingSlide, PasswordRequirement } from '@/components/auth/types'

const defaultSlides: MarketingSlide[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    quote: 'Choose a strong password to protect your account',
    attribution: 'VastuCart Security',
    isActive: true,
    order: 1,
  },
]

const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', key: 'minLength' },
  { label: 'One uppercase letter', key: 'uppercase' },
  { label: 'One lowercase letter', key: 'lowercase' },
  { label: 'One number', key: 'number' },
  { label: 'One special character', key: 'special' },
]

function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setError('Invalid reset link')
      setTimeout(() => router.push('/forgot-password'), 2000)
    } else {
      setToken(tokenParam)
    }
  }, [searchParams, router])

  async function handleResetPassword(newPassword: string) {
    if (!token) {
      setError('Invalid reset link')
      return
    }

    try {
      setError('')
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Password reset failed')
        return
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    } catch (err) {
      setError('An unexpected error occurred')
    }
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
      {success && (
        <div
          className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md"
          style={{ background: '#D1FAE5', color: '#10B981', fontFamily: "'Open Sans', sans-serif" }}
        >
          Password reset successful! Redirecting to login...
        </div>
      )}
      <AuthScreen
        view="reset-password"
        marketingSlides={defaultSlides}
        passwordRequirements={passwordRequirements}
        onResetPassword={handleResetPassword}
      />
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  )
}
