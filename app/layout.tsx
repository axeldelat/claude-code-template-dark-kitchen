import type { Metadata } from 'next'
import { DM_Sans, Open_Sans } from 'next/font/google'
import './globals.css'
import shared from '@/content/shared.json'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Analytics } from '@vercel/analytics/react'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : shared.seo.canonical_base
  ),
  title: {
    default: shared.restaurante.nombre,
    template: `%s · ${shared.restaurante.nombre}`,
  },
  description: shared.restaurante.descripcion_corta,
  openGraph: {
    siteName: shared.restaurante.nombre,
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const brandStyles = `
    :root {
      --brand-accent: ${shared.brand.color_acento};
      --brand-accent-hover: ${shared.brand.color_acento_hover};
    }
  `

  return (
    <html lang="es-MX" className={`${dmSans.variable} ${openSans.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandStyles }} />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
