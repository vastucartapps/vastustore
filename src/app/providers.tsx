"use client"

import { useEffect } from "react"
import { useAuthStore, useCartStore, useWishlistStore } from "@/lib/store"

function AuthHydrator() {
  const setUser = useAuthStore((s) => s.setUser)

  useEffect(() => {
    async function hydrate() {
      try {
        const res = await fetch("/api/auth", { credentials: "include" })
        if (res.ok) {
          const user = await res.json()
          setUser(user)
        } else {
          setUser(null)
        }
      } catch {
        setUser(null)
      }
    }
    hydrate()
  }, [setUser])

  return null
}

function CartHydrator() {
  const hydrateFromMedusa = useCartStore((s) => s.hydrateFromMedusa)

  useEffect(() => {
    // Hydrate cart from Medusa on mount
    hydrateFromMedusa()
  }, [hydrateFromMedusa])

  return null
}

function WishlistHydrator() {
  const hydrateFromSupabase = useWishlistStore((s) => s.hydrateFromSupabase)

  useEffect(() => {
    // Hydrate wishlist from Supabase on mount
    hydrateFromSupabase()
  }, [hydrateFromSupabase])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthHydrator />
      <CartHydrator />
      <WishlistHydrator />
      {children}
    </>
  )
}
