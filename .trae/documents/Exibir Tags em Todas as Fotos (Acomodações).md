## Objetivo
- Garantir que as tags/chips apareçam em todas as fotos de acomodações, tanto na página detalhada quanto na versão simples.

## Diagnóstico
- Página detalhada (`Accommodations.tsx`):
  - Chip de tipo (top-left) já exibido sempre.
  - Chips de "tags" (top-right) usam `room.tags`; se vazio, não aparecem.
  - No modal, o span com a tag usa `rooms[currentRoom].gallery[currentPhotoIndex].tag`.
- Versão simples (`AccommodationsSimple.tsx`):
  - Chip de tipo (top-left) exibido.
  - No modal, nome + tag já aparecem, mas dependem de `selectedRoom.gallery[...]`.tag.
- Possível causa: alguns `roomsData` têm `tags` vazias ou `gallery.tag` faltando — então não há conteúdo para exibir.

## Plano de Ajustes
1. Popular "tags" de todos os `rooms`:
   - Standard: `['Standard vista interna', 'Standard frente rua']`.
   - Luxo: `['Luxo (quarto)', 'Luxo com vista piscina/jardim']`.
   - Conjugado: `['Conjugado']`.
   - Suíte Luxo: `['Luxo (quarto)', 'Luxo com vista piscina/jardim']`.
   - Suíte Master: `['Master com sacada', 'Master especial']`.
2. Assegurar que `gallery.tag` está preenchida para todas as fotos (fallback no modal para `{selectedRoom.type}` quando `tag` estiver ausente).
3. Página detalhada (`Accommodations.tsx`):
   - Manter chip de tipo sempre.
   - Exibir `room.tags` (top-right) sempre; se array estiver vazio, mostrar um fallback com `{room.type}`.
   - No modal, mostrar sempre nome + tag (ou `{room.type}` se tag não existir).
4. Página simples (`AccommodationsSimple.tsx`):
   - Chip de tipo sempre.
   - No modal, mostrar sempre nome + tag (ou `{selectedRoom.type}` se tag não existir).

## Verificação
- Rodar lint e type-check.
- Validar visualmente Standard, Luxo, Conjugado e Master em ambas as páginas.

Confirma aplicar estas correções para que as tags apareçam consistentemente em todas as fotos?