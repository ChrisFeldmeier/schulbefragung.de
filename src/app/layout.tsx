import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

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
      <body className={`${inter.variable} font-sans antialiased`}>
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
