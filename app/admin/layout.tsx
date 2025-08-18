// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic'

import ClientAdminLayout from './client-layout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientAdminLayout>
      {children}
    </ClientAdminLayout>
  )
}