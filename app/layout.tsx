import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/shared/components/theme/theme-provider'
import { Toast } from '@heroui/react'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Velostock',
  description: 'Aplicacion de control de inventario de la empresa Bahia.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toast.Provider placement="top" />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
