import { AppShell } from "@/components/shell/AppShell"
import { UserMenu } from "@/components/shell/UserMenu"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell>
      <div className="flex">
        <UserMenu variant="sidebar" />
        <main className="flex-1 p-4 md:p-6" style={{ background: '#fffbf5' }}>
          {children}
        </main>
      </div>
    </AppShell>
  )
}
