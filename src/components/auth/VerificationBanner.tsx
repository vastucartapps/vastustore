"use client"

import { useState } from "react"
import { AlertTriangle, X, Loader2 } from "lucide-react"
import { useAuthStore } from "@/lib/store"

export function VerificationBanner() {
  const user = useAuthStore((s) => s.user)
  const [dismissed, setDismissed] = useState(false)
  const [resending, setResending] = useState(false)
  const [sent, setSent] = useState(false)

  // Only show for logged-in, unverified users
  if (!user || user.is_verified || dismissed) return null

  async function handleResend() {
    setResending(true)
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user!.email }),
      })
      if (res.ok) {
        setSent(true)
      }
    } catch {
      // Graceful
    } finally {
      setResending(false)
    }
  }

  return (
    <div
      className="flex items-center justify-center gap-3 px-4 py-2.5 text-sm"
      style={{ background: "#FEF3C7", color: "#92400E" }}
    >
      <AlertTriangle size={16} className="shrink-0" />
      <span>
        Please verify your email address.{" "}
        {sent ? (
          <span className="font-medium">Verification email sent!</span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="font-semibold underline underline-offset-2 hover:opacity-80"
          >
            {resending ? (
              <Loader2 size={12} className="inline animate-spin" />
            ) : (
              "Resend verification email"
            )}
          </button>
        )}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-auto shrink-0 rounded p-1 transition-opacity hover:opacity-70"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}
