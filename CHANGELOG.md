# CHANGELOG

Este documento registra as atualizações a partir de 2025-11-18.

## Formato
- Cada seção é identificada pela data `AAAA-MM-DD`.
- Liste mudanças em frases curtas e objetivas.
- Inclua referências a arquivos e caminhos quando útil.
- Valide as alterações com `npm run lint` e `npm run type-check`.

## 2025-11-19
- Blog — atualização de contatos dos pontos de interesse:
  - `src/app/blog/page.tsx`
  - Vale do Ouro Verde — Museu do Café: `locationUrl` atualizado para link de lugar (Google Maps Place) em vez de busca.
  - Museu do Vinho e da Cachaça (Família Silotto): removido número secundário de WhatsApp de `whatsappNumbers`.
  - Validação: `npm run lint` (sem erros) e `npm run type-check` (OK).

- Limpeza:
  - `src/app/blog/page.tsx` — removido import não utilizado `Linkedin`.

- Restaurante — ajustes de conteúdo e tipografia:
  - `src/app/restaurante/page.tsx`
  - Removidas informações detalhadas de cardápio (à la carte/buffet) do Cinquentenário.
  - Paradiso: texto atualizado e acrescentado que é aberto nos feriados.
  - Aumentada a fonte das frases remanescentes (`text-lg md:text-xl`).
  - Slide de fotos ampliado: altura aumentada para `h-[28rem] md:h-[36rem]`.
  - Adicionada bolinha discreta com total de fotos no carrossel (badge).
  - Estilizadas bolinhas de paginação no rodapé das fotos (Swiper): discretas e com destaque suave no ativo.
  - Aumentada a visibilidade dos dots: tamanho `8px`, fundo branco translúcido e borda suave.
  - Correção de posicionamento e centralização dos dots: `.swiper-pagination` com `left/right: 0`, `display:flex` e `justify-content:center`.
  - Dots circulares apenas na página Restaurante (`.restaurant-dots` escopo CSS).

- Tabelas:
  - `src/app/globals.css` — `th` agora usa negrito globalmente para maior legibilidade.

- Componentes:
  - `src/components/ui/custom/CardImageCarousel.tsx` — novo prop opcional `showCountBadge` para exibir o total de imagens.
  - `src/app/globals.css` — estilos para `.swiper-pagination` e bullets.

## 2025-11-18
- Ocultado o banner superior de “Programação especial” na Home.
  - Componente `src/components/ui/PromoRibbon.tsx` permanece no código, mas não é mais utilizado.
  - Remoção da importação e da renderização de `PromoRibbon` em `src/components/HomePage.tsx`.
  - Resultado: a faixa fixa (`sticky top-0`) não aparece mais no topo.
- Removidos os pacotes sazonais “Pacote de Natal” e “Pacote de Réveillon” da Home.
  - Remoção da importação e do uso de `SeasonalPackages` em `src/components/HomePage.tsx`.
  - O componente `src/components/sections/SeasonalPackages.tsx` permanece no projeto, mas não é renderizado na Home.
- Adicionado “Férias de Janeiro” aos Novos Eventos (modal de eventos).
  - Inclusão do item em `src/components/modals/EventsModal.tsx`.
  - Traduções adicionadas em `src/dictionaries/pt-BR.json`, `src/dictionaries/en-US.json`, `src/dictionaries/es-ES.json`.

- Ajustes de contraste e padronização de headers (overlay + subtítulo em branco):
  - Blog: `src/components/sections/BlogHero.tsx` — overlay `from-navy/80 to-blue/70` e `h2` com `text-white` e `font-medium`.
  - Convenções: `src/components/sections/ConventionsHero.tsx` — overlay escurecido e `h2` com `text-white`.
  - Acomodações: `src/components/sections/AccommodationsHero.tsx` — overlay escurecido e `h2` com `text-white`.
  - Restaurante: `src/app/restaurante/page.tsx` — header com overlay escurecido.
  - Contato: `src/app/contato/page.tsx` — header com overlay escurecido.

- Conteúdo de lazer:
  - Removido parágrafo “Piscina e salão de jogos.” em `src/app/lazer/page.tsx`.

- Acomodações — ajustes de textos:
  - Standard: removido “Ótimo custo-benefício” em `src/components/sections/AccommodationsSimple.tsx`.
  - Suíte Master: atualizado para “Suíte ampla com duas camas de casal king size, no mesmo ambiente, com sacada e vista para a piscina.” em `src/components/sections/AccommodationsSimple.tsx`.

- Passeios (correções ortográficas em PT‑BR):
  - `src/dictionaries/pt-BR.json` — revisão de acentuação e grafia em descrições:
    - Família Silotto (Museu do Vinho e da Cachaça)
    - Vale do Ouro Verde (Museu do Café)
    - Sítio Bom Retiro – Família Carra
    - Sítio Chapadão – Produção de Queijos

## Como registrar novas atualizações
- Crie uma nova seção com a data do dia.
- Descreva brevemente o que mudou e por quê.
- Referencie arquivos afetados usando caminhos relativos.
- Após implementar, execute `npm run lint` e `npm run type-check`.
- Padronização de tamanhos de títulos e subtítulos (igual à página Passeios):
  - Restaurante: `src/app/restaurante/page.tsx` — `h1` agora `text-5xl md:text-6xl` e `h2` `text-xl md:text-2xl`.
  - Contato: `src/app/contato/page.tsx` — `h1` padronizado e subtítulo convertido para `h2` com `text-white`.
  - Convenções: `src/components/sections/ConventionsHero.tsx` — já usa `h1`/`h2` nos tamanhos padronizados.
  - Acomodações: `src/components/sections/AccommodationsHero.tsx` — já usa `h1`/`h2` nos tamanhos padronizados.
- Passeios (correções em EN/ES):
  - `src/dictionaries/en-US.json` — ajustes de coerência nas descrições (sem tradução literal de termos locais; ex.: “semi‑cured cheese”).
  - `src/dictionaries/es-ES.json` — correção de acentos e grafia (teleférico, réplica, manténgase), revisão de termos (“semicurado”, “equipamiento”).

- Dicionário ES — correção ampla de encoding e acentuação:
  - `src/dictionaries/es-ES.json` — substituição de caracteres mal‑codificados (`Ã`, `Â`, `â€`, etc.) por acentuação correta (ex.: “Menú”, “Teléfono”, “Dirección”, “Ubicación”, “Años”, “Tradición”).
  - Ajustes em seções: `hero`, `about`, `highlights`, `parallax`, `accommodations`, `events`, `facilities`, `restaurant`, `booking`, `reviews`, `footer`, `pwa`, `meta`, `accessibility`.
  - Verificado com busca de padrões e validação: nenhum resíduo de encoding incorreto restante.

- Dicionário EN — revisão geral:
  - `src/dictionaries/en-US.json` — verificado consistência, sem ocorrências de encoding incorreto.
- Tabelas:
  - `src/components/sections/ConferenceTable.tsx` — cabeçalhos agora usam fonte sans (`font-sans`, Inter) para melhorar leitura.
- Convenções — tabela de salas:
  - `src/components/sections/ConferenceTable.tsx` — atualizado valor de Auditório da sala Monterrey de 100 para 60.
- Convenções — conteúdo:
  - `src/dictionaries/pt-BR.json` — removido “Com 800 m² de área construída...” da descrição e atualizado para: “Possui 2 salas no formato auditório: Millenium e Monterrey. A sala Monterrey tem capacidade para até 60 pessoas. Os ambientes são climatizados e equipados com Wi‑Fi.”
- Convenções — indicadores:
  - `pt-BR`, `en-US`, `es-ES` — removido indicador de área ("800 m²") dos dicionários (`events.convention.area`).
