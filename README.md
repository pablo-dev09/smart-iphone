# Smart Especializada Apple

Landing page da Smart Especializada Apple, em Campo Grande, Rio de Janeiro. O projeto combina mídias reais da marca com uma arte complementar criada por IA e direciona os principais fluxos de compra e assistência para o WhatsApp.

O projeto é um app **Next.js 15** (App Router) exportado de forma estática (`output: 'export'`), o que permite publicar a mesma build tanto no **GitHub Pages** quanto na **Vercel** (ou qualquer hospedagem de arquivos estáticos).

## Desenvolvimento

Requisitos: Node.js 22 ou superior.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Validação e build

```bash
npm run typecheck
npm run build         # build padrão (sem basePath) — usado pela Vercel
npm run build:gh      # build com basePath /smart-iphone — usado pelo GitHub Pages
```

- `npm run build` gera a pasta `out/` servível na raiz (ideal para Vercel).
- `npm run build:gh` gera `out/` já com `basePath: '/smart-iphone'` para o GitHub Pages.

Você pode servir o conteúdo exportado com qualquer servidor estático para conferir:

```bash
npx serve out
```

## Publicação

### GitHub Pages (workflow automático)

O workflow `.github/workflows/deploy.yml` roda `npm run build:gh` a cada push em `main` e publica a pasta `out` no GitHub Pages.

No GitHub, use **Settings → Pages → Source → GitHub Actions**. A URL esperada é:

https://pablo-dev09.github.io/smart-iphone/

### Vercel

1. Importe o repositório em https://vercel.com/new.
2. A Vercel detecta Next.js automaticamente e respeita o `output: 'export'` do `next.config.mjs`. O build usa `npm run build`, que gera a pasta `out/` na raiz (sem `basePath`).
3. Em **Build & Development Settings** confirme:
   - **Build Command:** `npm run build`
   - **Output Directory:** `out` (a Vercel detecta automaticamente, mas pode ajustar)
4. A Vercel serve o `out/` como site estático. Pronto.

Se o deploy falhar com erro de `routes-manifest.json`, limpe o cache do projeto em **Settings → General → Clear Build Cache** e re-deploy.

## Informações comerciais

Nome, contato, endereço e mensagens do WhatsApp ficam centralizados em `lib/config.ts`. O link do mapa aponta para o Google Maps (link curto). Altere esse arquivo para atualizar os dados sem procurar valores espalhados pela interface.

O site não apresenta estoque, preços, horários, prazos ou condições específicas. Essas informações devem ser confirmadas diretamente com a equipe.

## Mídias

Os arquivos usados pela página ficam em `public/assets`:

- `hero-studio.jpg`: fundo complementar do hero criado por IA.
- `smart-reel-01.mp4`: vídeo da seção de assistência e da galeria.
- `smart-reel-02.mp4`: vídeo complementar da galeria.
- `brand-logo.jpg`, `airpods.jpg` e `product-range.jpg`: artes fornecidas pela marca.

Ao substituir uma mídia, mantenha o nome atual ou atualize a referência em `components/Landing.tsx`. Comprima novas imagens e vídeos antes de publicar.

## SEO e metadados

- `app/layout.tsx` define `<title>`, descrição, Open Graph e Twitter Card.
- `app/sitemap.ts` e `app/robots.ts` são gerados automaticamente pelo Next.js na build.
- O favicon fica em `app/icon.svg` (Next.js o referencia automaticamente).

## Independência da marca

Smart Especializada Apple é uma empresa independente. Apple e os nomes de seus produtos são marcas de seus respectivos titulares.
