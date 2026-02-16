import { AdminLayout as AdminShellLayout } from "@/components/admin/AdminLayout"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminShellLayout>{children}</AdminShellLayout>
}
