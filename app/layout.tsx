import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/manrope/wght.css'
import './globals.css'
import { SITE_URL } from '@/lib/config'

const title = 'Smart Especializada Apple | Campo Grande, RJ'
const description =
  'Smart Especializada Apple em Campo Grande, Rio de Janeiro. Venda de produtos Apple, aparelhos com nota fiscal e garantia e assistência técnica especializada.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  applicationName: 'Smart Especializada Apple',
  authors: [{ name: 'Smart Especializada Apple' }],
  generator: 'Next.js',
  keywords: [
    'Smart Especializada Apple',
    'iPhone Campo Grande',
    'iPad Rio de Janeiro',
    'MacBook Campo Grande',
    'assistência técnica Apple',
    'Apple Rio de Janeiro',
  ],
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Smart Especializada Apple',
    title,
    description,
    images: [
      {
        // Caminho relativo: o Next.js aplica o basePath automaticamente em cima do metadataBase.
        url: '/assets/hero-studio.jpg',
        width: 1672,
        height: 941,
        alt: 'Smart Especializada Apple — Campo Grande, RJ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/hero-studio.jpg'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  )
}
