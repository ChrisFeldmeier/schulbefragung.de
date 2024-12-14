import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Schülerbefragung',
  description: 'Eine Plattform für Schülerbefragungen',
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head />
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
