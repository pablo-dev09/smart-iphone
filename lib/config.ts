// Caminho-base público (definido via NEXT_PUBLIC_BASE_PATH no build para GitHub Pages).
// No Vercel fica vazio para o site rodar no domínio raiz.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

// URL canônica do site (usada no sitemap e metadata).
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://pablo-dev09.github.io/smart-iphone/'

export const business = {
  name: 'Smart Especializada Apple',
  shortName: 'Smart',
  whatsappDisplay: '(21) 99564-1438',
  whatsappNumber: '5521995641438',
  instagram: 'https://www.instagram.com/smart.especializadaapple/',
  address: 'Estrada do Monteiro, nº 459',
  neighborhood: 'Campo Grande — Rio de Janeiro',
  // Link curto de mapa, conforme solicitado.
  maps: 'https://maps.app.goo.gl/ThRG1JQACS1rGSiA7',
} as const

export type WhatsAppTopic = 'geral' | 'iphone' | 'ipad' | 'macbook' | 'acessorios' | 'assistencia'

const messages: Record<WhatsAppTopic, string> = {
  geral: 'Olá! Vim pelo site da Smart e gostaria de falar com um especialista.',
  iphone: 'Olá! Vim pelo site da Smart e gostaria de consultar os modelos de iPhone disponíveis.',
  ipad: 'Olá! Vim pelo site da Smart e gostaria de consultar os modelos de iPad disponíveis.',
  macbook: 'Olá! Vim pelo site da Smart e gostaria de consultar os modelos de MacBook disponíveis.',
  acessorios: 'Olá! Vim pelo site da Smart e gostaria de consultar acessórios como AirPods, AirTag ou Apple Pencil.',
  assistencia: 'Olá! Vim pelo site da Smart e preciso de orientação sobre assistência técnica. Meu aparelho é: [modelo]. O problema é: [descreva].',
}

export const whatsappUrl = (topic: WhatsAppTopic = 'geral') =>
  `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(messages[topic])}`

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string>>
  }
}

export function trackCta(label: string, destination: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'cta_click', cta_label: label, destination })
}

// Helper para prefixar caminhos de assets com BASE_PATH automaticamente.
export const asset = (path: string) => `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`
