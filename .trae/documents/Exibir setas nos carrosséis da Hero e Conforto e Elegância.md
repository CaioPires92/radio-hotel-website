## Objetivo
- Exibir setas discretas de navegação (prev/next) além dos dots e arraste:
  - Na Hero (carrossel de fundo da página inicial)
  - Na seção “Conforto e Elegância” (About)

## Alterações na Hero
- Arquivo: `src/components/sections/Hero.tsx`
- Implementar dois botões sobrepostos com `ChevronLeft` e `ChevronRight`:
  - Posição: `absolute` à esquerda/direita, centro vertical (`top-1/2 -translate-y-1/2`) com `z-20`
  - Estilo discreto: `w-9 h-9 rounded-full bg-black/35 hover:bg-black/50`, ícone branco
  - Acessibilidade: `aria-label` (“Imagem anterior”/“Próxima imagem”), foco com `focus:ring-2 focus:ring-gold`
  - Ação: chamar `prevSlide()` e `nextSlide()` já existentes
- Manter:
  - Dots já presentes
  - Navegação por teclado e arraste
  - Autoplay pausando em hover/drag

## Alterações na “Conforto e Elegância” (About)
- Arquivo: `src/components/sections/About.tsx`
- Substituir a imagem estática por `CardImageCarousel` com setas:
  - Inserir `CardImageCarousel` no container `h-[500px] rounded-2xl overflow-hidden`
  - Imagens: usar as existentes do projeto (ex.: `/images/hero/hero1.jpg`, `/images/hero/hero2.jpg`, `/images/hero/hero3.jpg`), mantendo a estética
  - Propriedades: `showArrows={true}`, `showDots={true}`, `fit="cover"`
- Preservar overlays e elementos existentes:
  - Manter a `div` de gradiente por cima (`bg-gradient-to-t from-navy/20`) como overlay absoluto após o carrossel
  - Manter o “Floating Card” com o `Award` no mesmo posicionamento (absolute) sem alterações visuais

## Acessibilidade e UX
- Incluir `aria-label` nos botões de setas
- Garantir que tab navegue nos botões
- Manter comportamento de autoplay e pausa coerente

## Compatibilidade
- Ícones `lucide-react` já usados no projeto (compatíveis com a abordagem adotada para navegadores antigos)
- Tipagem sem `any` (usar tipos do Swiper onde necessário)

## Validação
- Rodar `npm run lint` e `npm run type-check`
- Testar visualmente em `/` (Hero) e na seção About
- Ajustar `z-index` se necessário para que setas fiquem acima do conteúdo

Confirma aplicar essas alterações?