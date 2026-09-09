'use client'

import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { asset, business, trackCta, whatsappUrl, type WhatsAppTopic } from '@/lib/config'

type IconName =
  | 'arrow'
  | 'bag'
  | 'chat'
  | 'check'
  | 'chevron'
  | 'close'
  | 'headphones'
  | 'instagram'
  | 'location'
  | 'menu'
  | 'play'
  | 'shield'
  | 'spark'
  | 'tool'

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  bag: <><path d="M6 8h12l1 12H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
  chat: <><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.5 9.5 0 0 1-4-.9L3 21l1.7-4.6A8.4 8.4 0 1 1 21 11.5Z"/><path d="M8.2 8.4c.5 3 2.2 4.8 5.3 5.4"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  chevron: <path d="m8 10 4 4 4-4"/>,
  close: <><path d="m6 6 12 12"/><path d="M18 6 6 18"/></>,
  headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M18 19h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v4a3 3 0 0 1-3 3Z"/><path d="M6 19H5a3 3 0 0 1-3-3v-4h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2Z"/></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" stroke="none"/></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 17h16"/></>,
  play: <path d="m9 7 8 5-8 5V7Z" fill="currentColor"/>,
  shield: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/></>,
  spark: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
  tool: <><path d="M14.5 6.5a4 4 0 0 0-5-5L7 4l3 3 2.5-2.5a4 4 0 0 0 2 2Z"/><path d="m8.5 7.5-6 6a2.1 2.1 0 0 0 3 3l6-6"/><path d="m14 13 6.5 6.5"/></>,
}

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  )
}

function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function SmartLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`smart-logo ${compact ? 'smart-logo--compact' : ''}`} aria-label="Smart Especializada Apple">
      <span className="smart-logo__name">smart<span>.</span></span>
      {!compact && <span className="smart-logo__sub">especializada apple</span>}
    </span>
  )
}

function WhatsAppLink({
  topic = 'geral',
  label,
  className = '',
  children,
}: {
  topic?: WhatsAppTopic
  label: string
  className?: string
  children: ReactNode
}) {
  const href = whatsappUrl(topic)
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackCta(label, 'whatsapp')}
    >
      {children}
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 20)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return (
    <header className={`site-header ${scrolled || open ? 'site-header--solid' : ''}`}>
      <div className="header-inner shell">
        <a href="#topo" className="brand-link" aria-label="Smart — início" onClick={() => setOpen(false)}>
          <SmartLogo />
        </a>
        <nav className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Navegação principal">
          <a href="#produtos" onClick={() => setOpen(false)}>Produtos</a>
          <a href="#assistencia" onClick={() => setOpen(false)}>Assistência</a>
          <a href="#como-funciona" onClick={() => setOpen(false)}>Como funciona</a>
          <a href="#loja" onClick={() => setOpen(false)}>Loja</a>
          <WhatsAppLink className="button button--sm button--light nav-cta" label="header_whatsapp">
            <Icon name="chat" size={18} /> WhatsApp
          </WhatsAppLink>
        </nav>
        <button className="menu-button" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="topo" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <img src={asset('/assets/hero-studio.jpg')} alt="" width={1672} height={941} fetchPriority="high" />
      </div>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Smart • Campo Grande, RJ</p>
          <h1 id="hero-title">Tecnologia Apple.<br /><em>Escolha inteligente.</em></h1>
          <p className="hero-lead">Encontre iPhone, iPad, MacBooks e acessórios — e fale com a equipe sobre assistência técnica para o seu aparelho.</p>
          <div className="hero-actions">
            <WhatsAppLink className="button button--primary" label="hero_whatsapp">
              <Icon name="chat" /> Falar com a Smart <Icon name="arrow" size={19} />
            </WhatsAppLink>
            <a className="button button--ghost" href="#produtos">Explorar produtos</a>
          </div>
          <p className="hero-contact">Atendimento direto pelo WhatsApp <strong>{business.whatsappDisplay}</strong></p>
        </div>

      </div>

      <div className="trust-row shell" aria-label="Diferenciais da Smart">
        {[
          ['check', 'Nota fiscal'],
          ['shield', 'Garantia'],
          ['tool', 'Assistência técnica'],
          ['location', 'Loja em Campo Grande'],
        ].map(([icon, text]) => (
          <span key={text}><Icon name={icon as IconName} size={19} /> {text}</span>
        ))}
      </div>
    </section>
  )
}

const products: Array<{ title: string; text: string; topic: WhatsAppTopic; icon: IconName; index: string }> = [
  { title: 'iPhone', text: 'Encontre o modelo ideal para o seu uso.', topic: 'iphone', icon: 'spark', index: '01' },
  { title: 'iPad', text: 'Para estudar, trabalhar, criar e aproveitar mais.', topic: 'ipad', icon: 'bag', index: '02' },
  { title: 'MacBooks', text: 'Mobilidade e desempenho para a sua rotina.', topic: 'macbook', icon: 'spark', index: '03' },
  { title: 'Acessórios', text: 'AirPods, AirTag e Apple Pencil.', topic: 'acessorios', icon: 'headphones', index: '04' },
]

function Products() {
  return (
    <section className="section products" id="produtos" aria-labelledby="products-title">
      <div className="shell">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow eyebrow--dark"><span /> Produtos Apple</p>
            <h2 id="products-title">Encontre o que combina<br />com a sua rotina.</h2>
          </div>
          <p>Consulte modelos, condições e disponibilidade diretamente com a equipe.</p>
        </div>

        <div className="product-layout">
          <figure className="product-feature" data-reveal>
            <img src={asset('/assets/product-range.jpg')} alt="iPhone, iPad, MacBook, AirTag, Apple Pencil e AirPods divulgados pela Smart" width={1400} height={1750} loading="lazy" />
            <div className="product-feature__overlay">
              <span>Seleção Smart</span>
              <strong>Um ecossistema.<br />Muitas possibilidades.</strong>
            </div>
          </figure>

          <div className="product-cards">
            {products.map((product, index) => (
              <article className="product-card" data-reveal style={{ '--delay': `${index * 70}ms` } as CSSProperties} key={product.title}>
                <span className="product-card__number">{product.index}</span>
                <span className="product-card__icon"><Icon name={product.icon} /></span>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
                <WhatsAppLink topic={product.topic} label={`produto_${product.topic}`}>
                  Consultar {product.title.toLowerCase()} <Icon name="arrow" size={18} />
                </WhatsAppLink>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Assistance() {
  return (
    <section className="section assistance" id="assistencia" aria-labelledby="assistance-title">
      <div className="assistance-grid shell">
        <div className="assistance-media" data-reveal>
          <div className="assistance-media__frame">
            <video
              src={asset('/assets/smart-reel-01.mp4')}
              poster={asset('/assets/product-range.jpg')}
              muted
              playsInline
              controls
              preload="metadata"
              aria-label="Vídeo da Smart Especializada Apple"
            />
          </div>
          <span className="assistance-media__tag"><Icon name="play" size={17} /> Aperte o play</span>
        </div>

        <div className="assistance-copy" data-reveal>
          <p className="eyebrow"><span /> Assistência técnica</p>
          <h2 id="assistance-title">Seu aparelho<br />precisa de atenção?</h2>
          <p className="section-lead">Conte o que está acontecendo, informe o modelo do aparelho e fale com a equipe sobre os próximos passos.</p>

          <div className="service-list">
            <div><span><Icon name="chat" /></span><p><strong>Conversa direta</strong>Explique o que aconteceu pelo WhatsApp.</p></div>
            <div><span><Icon name="tool" /></span><p><strong>Orientação técnica</strong>Receba as informações para seguir com seu atendimento.</p></div>
            <div><span><Icon name="location" /></span><p><strong>Atendimento na loja</strong>Visite a Smart em Campo Grande, no Rio de Janeiro.</p></div>
          </div>

          <WhatsAppLink topic="assistencia" className="button button--primary" label="assistencia_whatsapp">
            <Icon name="tool" /> Pedir orientação técnica <Icon name="arrow" size={19} />
          </WhatsAppLink>
          <small className="formless">Sem formulário: o atendimento começa diretamente no WhatsApp.</small>
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    ['01', 'Chame no WhatsApp', 'Diga se você procura um produto ou assistência técnica.'],
    ['02', 'Receba orientação', 'Tire suas dúvidas sobre opções, disponibilidade e condições.'],
    ['03', 'Visite a Smart', 'Encontre a loja em Campo Grande, Rio de Janeiro.'],
  ]

  return (
    <section className="section process" id="como-funciona" aria-labelledby="process-title">
      <div className="shell">
        <div className="process-heading" data-reveal>
          <p className="eyebrow eyebrow--dark"><span /> Como funciona</p>
          <h2 id="process-title">Simples desde<br />o primeiro contato.</h2>
        </div>
        <div className="process-grid">
          {steps.map(([number, title, text], index) => (
            <article className="process-step" data-reveal style={{ '--delay': `${index * 90}ms` } as CSSProperties} key={number}>
              <span className="process-step__number">{number}</span>
              <span className="process-step__line" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

type GalleryItem = { type: 'image' | 'video'; src: string; alt: string; className?: string }

const galleryItems: GalleryItem[] = [
  { type: 'image', src: '/assets/airpods.jpg', alt: 'AirPods apresentados pela Smart', className: 'gallery-item--tall' },
  { type: 'video', src: '/assets/smart-reel-01.mp4', alt: 'Vídeo da Smart com produtos Apple' },
  { type: 'image', src: '/assets/brand-logo.jpg', alt: 'Marca Smart Especializada Apple' },
  { type: 'video', src: '/assets/smart-reel-02.mp4', alt: 'Vídeo publicado pela Smart' },
]

function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<GalleryItem | null>(null)

  const openItem = (item: GalleryItem) => {
    setActive(item)
    requestAnimationFrame(() => dialogRef.current?.showModal())
  }

  const close = () => dialogRef.current?.close()

  return (
    <section className="section gallery" id="galeria" aria-labelledby="gallery-title">
      <div className="shell">
        <div className="section-heading section-heading--light" data-reveal>
          <div>
            <p className="eyebrow"><span /> Por dentro da Smart</p>
            <h2 id="gallery-title">Produtos, novidades<br />e detalhes de perto.</h2>
          </div>
          <div className="section-heading__side">
            <p>Veja conteúdos da Smart e acompanhe as novidades pelo Instagram.</p>
            <a href={business.instagram} target="_blank" rel="noreferrer" className="text-link" onClick={() => trackCta('galeria_instagram', 'instagram')}>
              <Icon name="instagram" size={19} /> Ver no Instagram <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, index) => (
            <button className={`gallery-item ${item.className || ''}`} type="button" onClick={() => openItem(item)} aria-label={`Ampliar: ${item.alt}`} data-reveal key={`${item.src}-${index}`}>
              {item.type === 'image' ? (
                <img src={asset(item.src)} alt={item.alt} loading="lazy" />
              ) : (
                <video src={asset(item.src)} muted playsInline preload="metadata" aria-label={item.alt} />
              )}
              <span className="gallery-item__icon"><Icon name={item.type === 'video' ? 'play' : 'spark'} size={18} /></span>
            </button>
          ))}
        </div>
      </div>

      <dialog className="lightbox" ref={dialogRef} onClose={() => setActive(null)} onClick={(event) => event.target === dialogRef.current && close()} aria-label="Visualização ampliada">
        <button className="lightbox__close" type="button" onClick={close} aria-label="Fechar visualização"><Icon name="close" /></button>
        {active?.type === 'image' && <img src={asset(active.src)} alt={active.alt} />}
        {active?.type === 'video' && <video src={asset(active.src)} controls autoPlay muted playsInline aria-label={active.alt} />}
      </dialog>
    </section>
  )
}

function Location() {
  return (
    <section className="section location-section" id="loja" aria-labelledby="location-title">
      <div className="location-card shell" data-reveal>
        <div className="location-visual" aria-hidden="true">
          <span className="location-pin"><Icon name="location" size={32} /></span>
          <span className="location-ring location-ring--one" />
          <span className="location-ring location-ring--two" />
          <span className="location-mapline location-mapline--one" />
          <span className="location-mapline location-mapline--two" />
          <span className="location-mapline location-mapline--three" />
        </div>
        <div className="location-copy">
          <p className="eyebrow eyebrow--dark"><span /> Loja física</p>
          <h2 id="location-title">A Smart está em<br />Campo Grande.</h2>
          <div className="address-block">
            <Icon name="location" />
            <address><strong>{business.address}</strong><span>{business.neighborhood}</span></address>
          </div>
          <div className="address-block">
            <Icon name="chat" />
            <p><strong>{business.whatsappDisplay}</strong><span>Consulte o horário antes da visita.</span></p>
          </div>
          <div className="location-actions">
            <a className="button button--dark" href={business.maps} target="_blank" rel="noreferrer" onClick={() => trackCta('localizacao_mapa', 'maps')}>
              Abrir no mapa <Icon name="arrow" size={18} />
            </a>
            <WhatsAppLink className="button button--outline-dark" label="localizacao_whatsapp">Chamar no WhatsApp</WhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  )
}

const faqs = [
  ['Quais produtos a Smart trabalha?', 'A Smart divulga iPhone, iPad, MacBooks, AirPods, AirTag e Apple Pencil. Consulte a disponibilidade atual pelo WhatsApp.'],
  ['Os produtos têm nota fiscal e garantia?', 'Sim. Confirme com a equipe as condições aplicáveis ao item escolhido.'],
  ['A Smart oferece assistência técnica?', 'Sim. Informe o modelo do aparelho e descreva o problema pelo WhatsApp para receber orientação.'],
  ['Onde fica a loja?', 'Na Estrada do Monteiro, nº 459, em Campo Grande, Rio de Janeiro.'],
  ['Como consultar preços e modelos disponíveis?', 'Fale diretamente com a equipe pelo WhatsApp para receber as informações atuais.'],
]

function FAQ() {
  const id = useId()
  return (
    <section className="section faq" aria-labelledby={`${id}-title`}>
      <div className="faq-grid shell">
        <div className="faq-heading" data-reveal>
          <p className="eyebrow"><span /> Perguntas frequentes</p>
          <h2 id={`${id}-title`}>Antes de falar<br />com a Smart.</h2>
          <p>Ainda ficou com alguma dúvida? A equipe responde diretamente pelo WhatsApp.</p>
          <WhatsAppLink className="text-link text-link--green" label="faq_whatsapp"><Icon name="chat" size={19} /> Conversar com a equipe <Icon name="arrow" size={18} /></WhatsAppLink>
        </div>
        <div className="faq-list" data-reveal>
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}<span><Icon name="chevron" /></span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="final-title">
      <div className="final-cta__glow" aria-hidden="true" />
      <div className="shell final-cta__inner" data-reveal>
        <p className="eyebrow"><span /> Fale com a Smart</p>
        <h2 id="final-title">O próximo passo<br />é <em>simples.</em></h2>
        <p>Encontre o produto que procura ou fale sobre assistência técnica diretamente com a equipe.</p>
        <WhatsAppLink className="button button--primary button--wide" label="cta_final_whatsapp">
          <Icon name="chat" /> Abrir WhatsApp <Icon name="arrow" size={19} />
        </WhatsAppLink>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div>
          <SmartLogo />
          <p>Produtos e assistência técnica<br />em Campo Grande, RJ.</p>
        </div>
        <div className="footer-links">
          <div><strong>Navegação</strong><a href="#produtos">Produtos</a><a href="#assistencia">Assistência</a><a href="#como-funciona">Como funciona</a><a href="#loja">Loja</a><a href={asset('/privacidade/')}>Privacidade</a></div>
          <div><strong>Contato</strong><WhatsAppLink label="footer_whatsapp">{business.whatsappDisplay}</WhatsAppLink><a href={business.instagram} target="_blank" rel="noreferrer">Instagram</a><a href={business.maps} target="_blank" rel="noreferrer">Como chegar</a></div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Smart Especializada Apple.</p>
        <p>Empresa independente. Apple e os nomes de seus produtos são marcas de seus respectivos titulares.</p>
      </div>
    </footer>
  )
}

export default function Landing() {
  useReveal()

  // Marca o <html> como habilitado por JS (substitui o document.documentElement.classList.add do Vite).
  useEffect(() => {
    document.documentElement.classList.add('js')
  }, [])

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Products />
        <Assistance />
        <Process />
        <Gallery />
        <Location />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppLink className="floating-whatsapp" label="floating_whatsapp">
        <Icon name="chat" /> <span>WhatsApp</span>
      </WhatsAppLink>
    </>
  )
}
