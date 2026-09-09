import type { Metadata } from 'next'
import { asset, business } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Privacidade | Smart Especializada Apple',
  description: 'Informações de privacidade do site da Smart Especializada Apple.',
  robots: { index: true, follow: true },
}

export default function PrivacidadePage() {
  return (
    <>
      <style>{`
        :root { font-family: 'Manrope Variable', Arial, sans-serif; color: #f5f5f3; background: #050505; }
        * { box-sizing: border-box; }
        body { margin: 0; min-height: 100vh; background: radial-gradient(circle at 80% 10%, #1e2721, transparent 30%), #050505; }
        a { color: inherit; }
        header, main, footer { width: min(calc(100% - 36px), 860px); margin-inline: auto; }
        header { min-height: 84px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,.1); }
        .brand { text-decoration: none; font-size: 25px; font-weight: 700; letter-spacing: -1.5px; }
        .brand span { color: #7cf0a4; }
        .back { font-size: 13px; color: rgba(255,255,255,.65); }
        main { padding: 90px 0 100px; }
        .eyebrow { margin: 0 0 20px; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #7cf0a4; }
        h1 { max-width: 720px; margin: 0 0 28px; font-size: clamp(44px, 8vw, 74px); line-height: 1; letter-spacing: -4px; }
        .lead { max-width: 680px; margin-bottom: 55px; font-size: 18px; line-height: 1.7; color: rgba(255,255,255,.58); }
        section { padding: 28px 0; border-top: 1px solid rgba(255,255,255,.1); }
        h2 { margin: 0 0 12px; font-size: 20px; }
        section p { max-width: 720px; margin: 0; font-size: 15px; line-height: 1.75; color: rgba(255,255,255,.58); }
        section a { color: #7cf0a4; }
        footer { padding: 25px 0 40px; border-top: 1px solid rgba(255,255,255,.08); font-size: 11px; color: rgba(255,255,255,.35); }
        :focus-visible { outline: 3px solid #7cf0a4; outline-offset: 4px; }
      `}</style>
      <header>
        <a className="brand" href={asset('/')} aria-label="Voltar para a página inicial">smart<span>.</span></a>
        <a className="back" href={asset('/')}>← Voltar para o site</a>
      </header>
      <main>
        <p className="eyebrow">Privacidade</p>
        <h1>Informações claras, do início ao fim.</h1>
        <p className="lead">Esta página explica de forma simples como o site da Smart Especializada Apple funciona em relação aos seus dados.</p>
        <section>
          <h2>Dados coletados neste site</h2>
          <p>Este site não possui formulários, cadastro de usuários ou pagamento e não solicita dados pessoais diretamente. Os cliques nos botões são registrados apenas localmente na página para possibilitar uma futura integração de métricas; nenhuma informação é enviada por essa função na versão atual.</p>
        </section>
        <section>
          <h2>WhatsApp, Instagram e mapas</h2>
          <p>Ao usar links para WhatsApp, Instagram ou Google Maps, você passa a utilizar serviços de terceiros sujeitos às respectivas políticas de privacidade. O site apenas abre o serviço escolhido por você.</p>
        </section>
        <section>
          <h2>Contato</h2>
          <p>Para dúvidas relacionadas ao atendimento ou a esta página, fale com a Smart pelo WhatsApp <a href={`https://wa.me/${business.whatsappNumber}`}>{business.whatsappDisplay}</a>.</p>
        </section>
        <section>
          <h2>Atualizações</h2>
          <p>Esta informação poderá ser revisada se novos recursos de coleta, métricas ou formulários forem adicionados ao site. Última atualização: setembro de 2026.</p>
        </section>
      </main>
      <footer>Smart Especializada Apple • Campo Grande, Rio de Janeiro</footer>
    </>
  )
}
