## Escopo
- Site Next.js (Tailwind, shadcn, framer-motion, imagens otimizadas). Avaliar páginas principais: Home, Acomodações, Lazer, Restaurante, Passeios, Contato, Acomodação detalhada, Programação Especial (modal), Formulário de reservas.
- Cobrir desktop, tablet e mobile; navegadores modernos e legados (Fallbacks já existentes em `globals.css`).

## Metodologia
- Preparar matriz de testes e checklist WCAG/QA.
- Executar varredura automática (Lighthouse, axe, link checker, bundle analyzer) + testes manuais guiados por cenários.
- Registrar achados com evidências (screenshots/console) e classificar por severidade: P0 crítico, P1 alto, P2 médio, P3 baixo.

## Testes de QA
- Funcionalidades principais:
  - Navegação entre seções, carrosseis (Swiper), modais (EventsModal, BookingForm), galerias.
  - CTAs WhatsApp, telefone, reserva; abertura de links externos; rolagem âncoras.
  - Carregamento dinâmico de `/api/rooms` e fallback estático.
- Compatibilidade de navegadores:
  - Chrome, Firefox, Edge; Safari iOS; Android Chrome.
  - Verificação de fallbacks para opacidade/cores (classes Tailwind e overrides em `globals.css`).
- Validação de formulários:
  - BookingForm: obrigatórios, máscaras, mensagens de erro, acessibilidade de inputs; envio para WhatsApp com encoding.
  - Contato: botões de WhatsApp e e-mail, estados desabilitados.
- Performance:
  - Lighthouse: Performance/Best Practices/SEO/A11y; medir LCP, CLS, TBT.
  - WebPageTest/Chrome DevTools: cobertura de código (Coverage), waterfalls, caching (Cache-Control), compressão (gzip/br).

## Avaliação UI/UX
- Usabilidade e fluxo:
  - Hierarquia de informação em Hero, destaques, cards; consistência de CTAs; feedback de interação.
- Consistência visual:
  - Paleta (gold/navy), tipografia, espaçamentos, componentes shadcn.
- Acessibilidade (WCAG 2.1 AA):
  - Contraste, foco visível, navegação por teclado, nomes acessíveis (aria-labels), semântica, imagens `alt`, animações respeitando `prefers-reduced-motion`.
- (Opcional) Testes com usuários: roteiro de 5 tarefas (achar acomodação, abrir fotos, iniciar reserva, encontrar programação, contato).

## Recursos Não Utilizados
- Páginas órfãs: varredura de rotas sem links internos.
- CSS/JS não referenciados: Coverage + análise de Tailwind (classes não geradas), inspeção de `globals.css`.
- Imagens/mídias: listar arquivos em `public/images/**` sem referência no código.

## Detecção de Bugs
- Console/Network: erros, warnings, CORS, 404/500.
- Links quebrados: crawl interno e validação de status.
- Responsividade: grid/Breakpoints, touch/hover, carrosseis.
- Comportamentos inesperados: modais que não fecham, foco preso, sobreposições/overlays.

## Segurança
- HTTPS e HSTS; mixed content; políticas de cabeçalhos (CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- Bibliotecas vulneráveis (verificação de advisories); `npm audit` (apenas após aprovação).
- Proteção básica: input sanitization (URLs WhatsApp), uso de `next/image` contra XSS de SVG externo.

## Sugestões de Melhorias
- Imagens: formatos modernos, lazy e prioridades; revisão de `sizes` e `quality` em `next/image`.
- SEO: metas por página, headings, sitemap/robots, Open Graph.
- Conteúdo: clareza de descrições das acomodações, CTAs; reforço da Programação Especial.
- Funcionalidades: filtro de acomodações, página dedicada de eventos com calendário, estado de loading nos carrosseis.

## Entregáveis
- Relatório em PDF com:
  - Sumário executivo.
  - Lista completa de achados por categoria (QA/UI/UX/A11y/Perf/Sec/SEO/Conteúdo).
  - Priorização P0–P3 e estimativa de esforço (S, M, L) por item.
  - Evidências (screenshots, trechos de console, métricas Lighthouse/WebPageTest).
  - Recomendações e plano de correção.
- Anexos: checklist WCAG, matriz de casos de teste, export do Lighthouse.

## Ferramentas (somente leitura nesta fase)
- Lighthouse/DevTools, axe, Linkinator (ou alternativa), Chrome Coverage, Next.js Bundle Analyzer (config após sua aprovação), BrowserStack (se disponível).

## Próximos Passos
- Executar a auditoria seguindo o plano e entregar o PDF. Após sua aprovação do relatório, aplicar correções priorizadas e validar novamente com testes automatizados (Playwright/Vitest) e Lighthouse CI.