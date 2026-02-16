import { create } from "zustand"
import { persist } from "zustand/middleware"

// ─── Auth Store ──────────────────────────────────────────────
interface User {
  id: string
  email: string
  name: string
  role: string
  ecom_role: string
  phone: string | null
  phone_country_code: string
  avatar_url: string | null
  default_currency: string
  is_active: boolean
  is_verified: boolean
}

interface AuthState {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, isLoading: false }),
}))

// ─── Cart Store ──────────────────────────────────────────────
export interface CartItem {
  id: string
  productId: string
  variantId: string
  name: string
  imageUrl: string
  price: number
  quantity: number
  currency: string
}

interface CartState {
  items: CartItem[]
  medusaCartId: string | null
  isOpen: boolean
  isSyncing: boolean
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  hydrateFromMedusa: () => Promise<void>
  setMedusaCartId: (cartId: string | null) => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      medusaCartId: null,
      isOpen: false,
      isSyncing: false,

      setMedusaCartId: (cartId) => set({ medusaCartId: cartId }),

      // Hydrate cart from Medusa on app load
      hydrateFromMedusa: async () => {
        try {
          const { getCart, transformMedusaCartItems } = await import('./medusa-cart')
          const medusaCart = await getCart()

          if (medusaCart && medusaCart.id) {
            const items = transformMedusaCartItems(medusaCart)
            set({ items, medusaCartId: medusaCart.id })
          }
        } catch (error) {
          console.error('Error hydrating cart from Medusa:', error)
        }
      },

      addItem: async (item) => {
        // Optimistic update
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          )

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              isSyncing: true,
            }
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
            isSyncing: true,
          }
        })

        // Sync with Medusa
        try {
          const { addToCart } = await import('./medusa-cart')
          const result = await addToCart(item.variantId, 1)

          if (result.success && result.cart) {
            const { transformMedusaCartItems } = await import('./medusa-cart')
            const items = transformMedusaCartItems(result.cart)
            set({ items, medusaCartId: result.cart.id, isSyncing: false })
          } else {
            set({ isSyncing: false })
          }
        } catch (error) {
          console.error('Error syncing add to Medusa:', error)
          set({ isSyncing: false })
        }
      },

      removeItem: async (id) => {
        // Optimistic update
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          isSyncing: true,
        }))

        // Sync with Medusa
        try {
          const { removeFromCart } = await import('./medusa-cart')
          await removeFromCart(id)
          set({ isSyncing: false })
        } catch (error) {
          console.error('Error syncing remove to Medusa:', error)
          set({ isSyncing: false })
        }
      },

      updateQuantity: async (id, quantity) => {
        // Optimistic update
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
          isSyncing: true,
        }))

        // Sync with Medusa
        try {
          const { updateCartItem } = await import('./medusa-cart')
          await updateCartItem(id, quantity)
          set({ isSyncing: false })
        } catch (error) {
          console.error('Error syncing update to Medusa:', error)
          set({ isSyncing: false })
        }
      },

      clearCart: async () => {
        // Optimistic update
        set({ items: [], isSyncing: true })

        // Sync with Medusa
        try {
          const { clearCart } = await import('./medusa-cart')
          await clearCart()
          set({ medusaCartId: null, isSyncing: false })
        } catch (error) {
          console.error('Error syncing clear to Medusa:', error)
          set({ isSyncing: false })
        }
      },

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    }),
    {
      name: "vastucart-cart",
    }
  )
)

// ─── Wishlist Store ──────────────────────────────────────────
export interface WishlistItem {
  id: string
  productId: string
  name: string
  imageUrl: string
  price: number
  currency: string
  slug: string
}

interface WishlistState {
  items: WishlistItem[]
  isSyncing: boolean
  addItem: (item: WishlistItem) => Promise<void>
  removeItem: (productId: string) => Promise<void>
  toggleItem: (item: WishlistItem) => Promise<boolean> // Returns true if added, false if removed
  hasItem: (productId: string) => boolean
  getTotalItems: () => number
  hydrateFromSupabase: () => Promise<void>
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isSyncing: false,

      hydrateFromSupabase: async () => {
        try {
          const response = await fetch('/api/wishlist')
          if (response.ok) {
            const data = await response.json()
            // Transform Supabase rows to WishlistItem format
            // For now, just set empty since we need product details from Medusa
            // This will be enhanced when we integrate Medusa product fetching
            set({ items: data.wishlist || [] })
          }
        } catch (error) {
          console.error('Error hydrating wishlist from Supabase:', error)
        }
      },

      addItem: async (item) => {
        // Optimistic update
        set((state) => {
          const exists = state.items.some((i) => i.productId === item.productId)
          if (exists) return state
          return { items: [...state.items, item], isSyncing: true }
        })

        // Sync with Supabase
        try {
          const response = await fetch('/api/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product_id: item.productId }),
          })

          if (!response.ok) {
            // Rollback on error
            set((state) => ({
              items: state.items.filter((i) => i.productId !== item.productId),
              isSyncing: false,
            }))
          } else {
            set({ isSyncing: false })
          }
        } catch (error) {
          console.error('Error syncing add to Supabase:', error)
          // Rollback on error
          set((state) => ({
            items: state.items.filter((i) => i.productId !== item.productId),
            isSyncing: false,
          }))
        }
      },

      removeItem: async (productId) => {
        // Optimistic update
        const previousItems = get().items
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
          isSyncing: true,
        }))

        // Sync with Supabase
        try {
          const response = await fetch(`/api/wishlist?product_id=${productId}`, {
            method: 'DELETE',
          })

          if (!response.ok) {
            // Rollback on error
            set({ items: previousItems, isSyncing: false })
          } else {
            set({ isSyncing: false })
          }
        } catch (error) {
          console.error('Error syncing remove to Supabase:', error)
          // Rollback on error
          set({ items: previousItems, isSyncing: false })
        }
      },

      toggleItem: async (item) => {
        const state = get()
        const exists = state.items.some((i) => i.productId === item.productId)

        if (exists) {
          await get().removeItem(item.productId)
          return false
        } else {
          await get().addItem(item)
          return true
        }
      },

      hasItem: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },

      getTotalItems: () => {
        return get().items.length
      },
    }),
    {
      name: "vastucart-wishlist",
    }
  )
)

// ─── QuickView Store ─────────────────────────────────────────
interface QuickViewState {
  productId: string | null
  isOpen: boolean
  open: (productId: string) => void
  close: () => void
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  productId: null,
  isOpen: false,
  open: (productId) => set({ productId, isOpen: true }),
  close: () => set({ productId: null, isOpen: false }),
}))

// ─── UI Store (persisted) ────────────────────────────────────
interface UIState {
  announcementDismissed: boolean
  adminSidebarCollapsed: boolean
  dismissAnnouncement: () => void
  toggleAdminSidebar: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      announcementDismissed: false,
      adminSidebarCollapsed: false,
      dismissAnnouncement: () => set({ announcementDismissed: true }),
      toggleAdminSidebar: () =>
        set((s) => ({ adminSidebarCollapsed: !s.adminSidebarCollapsed })),
    }),
    { name: "vc-ui" }
  )
)
