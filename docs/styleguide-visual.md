# Styleguide Visual de Cards e Imagens

## Padrões de Cards
- Container padrão (`.card-standard`): `rounded-2xl overflow-hidden ring-1 ring-black/5 shadow-lg bg-white`
- Hover padrão (`.card-standard-hover`): `hover:ring-gold/30 hover:shadow-xl hover:scale-[1.01]`
- Espaçamento interno: `p-6` e `gap-3` entre elementos

## Mídia nos Cards
- Wrapper: `relative w-full aspect-[16/9] overflow-hidden`
- Imagem cover: `absolute inset-0 w-full h-full object-cover object-center`
- Overlay escuro: `absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300`

## Sistema de Imagens
- Thumbs 16:9 geradas em `public/images/**/thumbs-16x9/`
- Formato preferencial: `.webp` com fallback `.jpg`
- Tamanho alvo: `1600x900`, qualidade ~82

## Responsividade
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Proporção mantém consistência visual sem alturas fixas

## Componentização
- Classes utilitárias em `globals.css` (sistema modular de cards):
  - Cards principais: `.card-standard`, `.card-standard-hover`
  - Mídia: `.card-media-16x9`, `.card-media-img-cover`, `.card-overlay-dark`
  - Mini cards (features, ícones, chips): `.mini-card`, `.mini-card-hover`

## Notas
- Use `fit="contain"` quando precisar exibir foto inteira, aceitando faixas.
- Para crop central uniforme, use `object-center` sempre que `object-cover`.
