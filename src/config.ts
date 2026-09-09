export const business = {
  name: 'Smart Especializada Apple',
  shortName: 'Smart',
  whatsappDisplay: '(21) 99564-1438',
  whatsappNumber: '5521995641438',
  instagram: 'https://www.instagram.com/smart.especializadaapple/',
  address: 'Estrada do Monteiro, nº 459',
  neighborhood: 'Campo Grande — Rio de Janeiro',
  maps: 'https://www.google.com/maps/search/?api=1&query=Estrada%20do%20Monteiro%2C%20459%2C%20Campo%20Grande%2C%20Rio%20de%20Janeiro',
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
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'cta_click', cta_label: label, destination })
}

