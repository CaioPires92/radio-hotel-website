// Sistema de espaçamento padronizado para o Radio Hotel
// Baseado em múltiplos de 4px para consistência visual

export const spacing = {
  // Espaçamentos internos (padding)
  padding: {
    xs: 'p-2',    // 8px
    sm: 'p-3',    // 12px
    md: 'p-4',    // 16px
    lg: 'p-6',    // 24px
    xl: 'p-8',    // 32px
    '2xl': 'p-12', // 48px
  },
  
  // Espaçamentos horizontais (padding-x)
  paddingX: {
    xs: 'px-2',   // 8px
    sm: 'px-3',   // 12px
    md: 'px-4',   // 16px
    lg: 'px-6',   // 24px
    xl: 'px-8',   // 32px
    '2xl': 'px-12', // 48px
  },
  
  // Espaçamentos verticais (padding-y)
  paddingY: {
    xs: 'py-2',   // 8px
    sm: 'py-3',   // 12px
    md: 'py-4',   // 16px
    lg: 'py-6',   // 24px
    xl: 'py-8',   // 32px
    '2xl': 'py-12', // 48px
  },
  
  // Margens externas (margin)
  margin: {
    xs: 'm-2',    // 8px
    sm: 'm-3',    // 12px
    md: 'm-4',    // 16px
    lg: 'm-6',    // 24px
    xl: 'm-8',    // 32px
    '2xl': 'm-12', // 48px
  },
  
  // Margens inferiores (margin-bottom)
  marginBottom: {
    xs: 'mb-2',   // 8px
    sm: 'mb-3',   // 12px
    md: 'mb-4',   // 16px
    lg: 'mb-6',   // 24px
    xl: 'mb-8',   // 32px
    '2xl': 'mb-12', // 48px
    '3xl': 'mb-16', // 64px
    '4xl': 'mb-20', // 80px
  },
  
  // Margens superiores (margin-top)
  marginTop: {
    xs: 'mt-2',   // 8px
    sm: 'mt-3',   // 12px
    md: 'mt-4',   // 16px
    lg: 'mt-6',   // 24px
    xl: 'mt-8',   // 32px
    '2xl': 'mt-12', // 48px
    '3xl': 'mt-16', // 64px
    '4xl': 'mt-20', // 80px
  },
  
  // Gaps para grids e flexbox
  gap: {
    xs: 'gap-2',  // 8px
    sm: 'gap-3',  // 12px
    md: 'gap-4',  // 16px
    lg: 'gap-6',  // 24px
    xl: 'gap-8',  // 32px
    '2xl': 'gap-12', // 48px
  },
  
  // Espaçamentos para seções
  section: {
    padding: 'py-20', // 80px vertical para seções principais
    container: 'px-4 sm:px-6 lg:px-8', // Padding responsivo para containers
    maxWidth: 'max-w-7xl mx-auto', // Largura máxima centralizada
  },
  
  // Espaçamentos para cards
  card: {
    padding: 'p-6',     // 24px para conteúdo de cards
    paddingSmall: 'p-4', // 16px para cards menores
    paddingLarge: 'p-8', // 32px para cards destacados
  },
  
  // Espaçamentos para botões
  button: {
    paddingSmall: 'px-4 py-2',   // Botões pequenos
    paddingMedium: 'px-6 py-3',  // Botões médios
    paddingLarge: 'px-8 py-4',   // Botões grandes
  },
  
  // Espaçamentos para formulários
  form: {
    fieldSpacing: 'space-y-6',    // Espaçamento entre campos
    labelMargin: 'mb-2',          // Margem inferior dos labels
    inputPadding: 'px-3 py-2',    // Padding interno dos inputs
    errorMargin: 'mt-1',          // Margem superior das mensagens de erro
  },
};

// Utilitários para aplicação consistente
export const applySpacing = {
  // Seção padrão
  section: `${spacing.section.padding} ${spacing.section.container} ${spacing.section.maxWidth}`,
  
  // Card padrão
  card: spacing.card.padding,
  
  // Botão padrão
  button: spacing.button.paddingMedium,
  
  // Grid padrão
  grid: spacing.gap.lg,
  
  // Título de seção
  sectionTitle: spacing.marginBottom.lg,
  
  // Parágrafo
  paragraph: spacing.marginBottom.md,
};

// Breakpoints para espaçamento responsivo
export const responsiveSpacing = {
  mobile: {
    section: 'py-12 px-4',
    card: 'p-4',
    button: 'px-4 py-2',
  },
  tablet: {
    section: 'py-16 px-6',
    card: 'p-6',
    button: 'px-6 py-3',
  },
  desktop: {
    section: 'py-20 px-8',
    card: 'p-8',
    button: 'px-8 py-4',
  },
};