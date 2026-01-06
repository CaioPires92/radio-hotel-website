## Resumo Executivo
- Projeto em Next.js 15.5.0 com App Router, React 19, TypeScript e Tailwind 4. Scripts de build/start/export presentes em [package.json](file:///c:/Users/caiog/OneDrive/Área%20de%20Trabalho/trae/radio-hotel-website/package.json#L5-L29). Configuração de imagens com `unoptimized: true` em [next.config.ts](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/next.config.ts#L10-L18). Há rotas de API ativas ([contact](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/app/api/contact/route.ts#L1-L35) e [rooms](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/app/api/rooms/route.ts#L1-L18)).
- Para Hostinger, existem dois caminhos: exportação estática (Shared Hosting) ou execução Node.js (VPS/Managed). Shared Hosting não suporta SSR/rotas de API; VPS/Managed sim. Fonte: [StackOverflow](https://stackoverflow.com/questions/73295521/how-to-deploy-nextjs-project-in-hostinger) e [Hostinger Web Apps](https://www.hostinger.com/web-apps-hosting).

## Estrutura do Projeto
- Organização: `src/app` (App Router), `public` com imagens otimizadas e thumbs, `components` por seções, testes com Vitest/Playwright. Assets presentes em `public/images/*` e ícones/PWA em `public/icons/*`.
- Essenciais: HTML/CSS/JS gerados pelo Next no build; estilos via Tailwind; imagens prontas em `public`. Não há `.env` versionado; variáveis são lidas via `process.env`.
- Configuração: Next habilita imagem não otimizada (bom para CDN/estático), ignora erros de ESLint/TS em produção ([next.config.ts](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/next.config.ts#L3-L9)).

## Dependências e Build
- Scripts: `npm run build` (produção), `npm run start` (Node server), `npm run export` (estático), testes (`vitest`, `playwright`), auditorias `lighthouse` ([package.json](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/package.json#L5-L29)).
- Versões: Next 15.5.0, React 19.1.0, ESLint 9, TypeScript 5, Tailwind 4. Node recomendado: 18–20 (sem `engines` fixo). Ver [package.json](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/package.json#L31-L73).
- Otimização: Next cuida de bundling/minificação na build. Imagens tratadas como estáticas (`unoptimized: true`), há scripts para otimização com Sharp.

## Específicos da Hostinger
- Shared Hosting: serve apenas estático (HTML/CSS/JS). Não roda Node.js/SSR/rotas de API. [StackOverflow](https://stackoverflow.com/questions/73295521/how-to-deploy-nextjs-project-in-hostinger).
- VPS/Managed Node: suporta Node.js e SSR. [Hostinger Web Apps Hosting](https://www.hostinger.com/web-apps-hosting) indica suporte a Next.js com deploy gerenciado ou via VPS.
- Domínio/SSL: Hostinger fornece SSL gerenciado e DNS; apontar A/AAAA para a instância ou usar o gerenciado com web apps.

## Testes e Verificações
- Unitários: `vitest` com jsdom ([vitest.config.ts](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/vitest.config.ts#L5-L17)).
- E2E: `playwright` com `npm run dev` como webServer ([playwright.config.ts](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/playwright.config.ts#L65-L71)).
- Responsividade: ampla cobertura de componentes, imagens em múltiplos tamanhos, breakpoints Tailwind.
- Acessibilidade/Performance: scripts Lighthouse e Hotjar/GA configurados em [Analytics.tsx](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/components/analytics/Analytics.tsx#L1-L243) e [lib/analytics.ts](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/lib/analytics.ts#L1-L238).

## Segurança
- Sem credenciais expostas no repositório; leitura via `process.env` (ver usos em `NEXT_PUBLIC_*` e SMTP em [grep](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/app/layout.tsx#L22), [lib/analytics.ts](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/lib/analytics.ts#L4-L16), [contact route](file:///c:/Users/caiog/OneDrive/%C3%81rea%20de%20Trabalho/trae/radio-hotel-website/src/app/api/contact/route.ts#L23-L27)).
- `Analytics.tsx` usa anonimização de IP e desabilita sinais de personalização no GA.
- API `contact`: retorna 501 se SMTP não configurado; inclui honeypot e validações básicas.

## Decisão de Deploy: Dois Caminhos
- Caminho A — Estático (Shared Hosting):
  - Uso: sem SSR/API. Requer remover/alternar funcionalidades que dependem de rotas de API.
  - Ações: 
    - Configurar `output: 'export'` no Next (limitação: Next 15 ainda recomenda scripts `next export`).
    - Remover/estaticizar `src/app/api/*` (ex.: gerar JSON para quartos na build em vez de `fs.readdir` em runtime) e ajustar formulários para usar serviço externo (Formspree, EmailJS, ou API num serviço gerenciado).
    - Rodar `npm run export`; publicar pasta `/out` no Hostinger.
  - Limitações: sem ISR, sem Server Actions, sem APIs; imagens já estão `unoptimized`, compatível com estático.

- Caminho B — Node.js (VPS/Managed):
  - Uso: mantém SSR/APIs (contact/rooms), App Router, etc.
  - Ações:
    - Provisionar VPS/Managed com Node 18/20 LTS.
    - `npm ci && npm run build` e executar com `npm run start` (ou `pm2 start "next start"`).
    - Configurar reverse proxy (Nginx) e SSL; definir variáveis de ambiente (GA/GTM/Clarity/Hotjar, SMTP_* e e-mails) no painel.
    - Habilitar logs e monitoramento; opcional: CDN da Hostinger.

## Comandos de Build
- Estático: `npm ci && npm run export` (publicar `/out`).
- Node: `npm ci && npm run build` e `npm run start` (ou com PM2). Opcional: `npm run optimize-images` antes da build.

## Configurações Adicionais
- Variáveis de ambiente:
  - Públicas: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_FB_PIXEL_ID`, `NEXT_PUBLIC_HOTJAR_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_SITE_URL`.
  - Servidor: `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`/`EMAIL_RESERVAS`.
- DNS/SSL: configurar domínio, A/AAAA/CNAME conforme ambiente; habilitar SSL gerenciado no painel.
- Node versão: preferir 20 LTS (compatível com dependências do projeto).

## Potenciais Problemas em Produção
- Shared Hosting: rotas de API indisponíveis; o formulário de contato retorna 501; a galeria de quartos via API não carrega. Mitigar com geração estática de dados e serviços externos para formulário.
- Ignorar erros ESLint/TS no build pode ocultar problemas; recomendável reativar validações antes do deploy final.
- `images.unoptimized: true` não faz resize dinâmico; garantir que assets em `public` estejam otimizados (WebP/AVIF já presentes).

## Recomendação
- Se você precisa de formulário de contato funcional e listagem dinâmica de quartos, use o Caminho B (VPS/Managed Node). Caso contrário, se for somente site institucional estático, Caminho A é suficiente e mais simples.

## Próximos Passos
1. Escolher caminho de deploy (A estático ou B Node/VPS).
2. Eu preparo as alterações necessárias (estaticizar APIs ou configurar scripts e infra). 
3. Executar testes (`npm run test`, `npm run test:e2e`) e auditorias (`npm run lighthouse`).
4. Publicar e validar em produção.

Deseja seguir com estático (Shared Hosting) ou Node (VPS/Managed)?