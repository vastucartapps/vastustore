import { AppShell } from "@/components/shell/AppShell"
import { VerificationBanner } from "@/components/auth/VerificationBanner"
import { CartDrawerContainer } from "@/components/storefront/CartDrawerContainer"
import { QuickViewModal } from "@/components/storefront/QuickViewModal"

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <VerificationBanner />
      <AppShell>{children}</AppShell>
      <CartDrawerContainer />
      <QuickViewModal />
    </>
  )
}
