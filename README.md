# Smart Especializada Apple

Landing page da Smart Especializada Apple, em Campo Grande, Rio de Janeiro. O projeto combina mídias reais da marca com uma arte complementar criada por IA e direciona os principais fluxos de compra e assistência para o WhatsApp.

## Desenvolvimento

Requisitos: Node.js 22 ou superior.

```bash
npm install
npm run dev
```

Validação e build de produção:

```bash
npm run typecheck
npm run build
npm run preview
```

## Informações comerciais

Nome, contato, endereço e mensagens do WhatsApp ficam centralizados em `src/config.ts`. Altere esse arquivo para atualizar os dados sem procurar valores espalhados pela interface.

O site não apresenta estoque, preços, horários, prazos ou condições específicas. Essas informações devem ser confirmadas diretamente com a equipe.

## Mídias

Os arquivos usados pela página ficam em `public/assets`:

- `hero-studio.jpg`: fundo complementar do hero criado por IA.
- `smart-reel-01.mp4`: vídeo principal do hero.
- `smart-reel-02.mp4`: vídeo da seção de assistência.
- `brand-logo.jpg`, `airpods.jpg` e `product-range.jpg`: artes fornecidas pela marca.

Ao substituir uma mídia, mantenha o nome atual ou atualize a referência em `src/App.tsx`. Comprima novas imagens e vídeos antes de publicar.

## Publicação

O workflow `.github/workflows/deploy.yml` gera o projeto e publica a pasta `dist` no GitHub Pages a cada push na branch `main`. O `base` do Vite está configurado para `/smart-iphone/`.

No GitHub, use **Settings → Pages → Source → GitHub Actions**. A URL esperada é:

https://pablo-dev09.github.io/smart-iphone/

## Independência da marca

Smart Especializada Apple é uma empresa independente. Apple e os nomes de seus produtos são marcas de seus respectivos titulares.
