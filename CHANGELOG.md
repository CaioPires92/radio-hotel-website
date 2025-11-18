# CHANGELOG

Este documento registra as atualizações a partir de 2025-11-18.

## Formato
- Cada seção é identificada pela data `AAAA-MM-DD`.
- Liste mudanças em frases curtas e objetivas.
- Inclua referências a arquivos e caminhos quando útil.
- Valide as alterações com `npm run lint` e `npm run type-check`.

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

## Como registrar novas atualizações
- Crie uma nova seção com a data do dia.
- Descreva brevemente o que mudou e por quê.
- Referencie arquivos afetados usando caminhos relativos.
- Após implementar, execute `npm run lint` e `npm run type-check`.
