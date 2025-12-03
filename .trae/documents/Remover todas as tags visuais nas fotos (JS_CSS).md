## Escopo
- Remover todas as tags/labels sobrepostas nas fotos (chips e spans) em todas as seções de acomodações.
- Eliminar referências de dados a "tags" e seu uso no código.
- Limpar classes/CSS inline relativos às tags.

## Arquivos afetados
- `src/components/sections/Accommodations.tsx` (página detalhada)
- `src/components/sections/AccommodationsSimple.tsx` (listagem simples)

## Ações (Detalhado)
- Remover renderização do chip de tipo (top-left) sobre imagens.
- Remover container de tags (top-right) que usa `room.tags`.
- No modal da galeria: remover os dois spans superiores (nome e tag da foto).
- Deixar alt/title vindo de `{selectedRoom.description || selectedRoom.name}` (sem tag).
- Remover campo `tags` dos objetos `roomsData` (se existir) e qualquer fallback ligado a ele.

## Ações (Simple)
- Remover chip de tipo (top-left) e container de tags (top-right) nas cartas.
- No modal, remover spans (nome/tag) sobre a imagem.
- Remover `tags?` do tipo `Room` e sua população em `getRooms`.

## CSS/Tailwind
- Excluir classes das tags: `bg-black/70`, `bg-black/60`, `bg-white/90`, posicionamentos `absolute top-3 ...` associados às tags.
- Manter layout sem sobreposições para não afetar a navegação.

## Verificação
- Rodar `npm run lint` e `npm run type-check`.
- Testar navegação e galeria (setas e thumbs) para garantir que nada quebre.

## Entrega
- Commit único com mensagem clara: "Acomodações: remover todas as tags/labels sobrepostas e referências de dados; limpar CSS; lint/type-check OK".

Posso aplicar agora?