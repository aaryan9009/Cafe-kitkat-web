'use client';
import dynamic from "next/dynamic"

const CafeManagementSystem = dynamic(() => import("../components/cafe-management-system"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen grid place-items-center">
      <div className="rounded-lg border p-6 shadow-sm animate-pulse">Loading cafe...</div>
    </main>
  ),
})

export default function Page() {
  return (
    <main>
      <CafeManagementSystem />
    </main>
  )
}
