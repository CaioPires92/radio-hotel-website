# Design System - Guia de Contraste de Cores
## Radio Hotel

---

## 🎨 Paleta de Cores Aprovada

### Cores Principais
- **Navy**: `#0a0d29` - Cor principal para textos e fundos escuros
- **Blue**: `#16446e` - Cor secundária para gradientes e destaques
- **Gold**: `#b2ab70` - Cor de destaque para elementos premium
- **Cream**: `#f6f5f1` - Cor de fundo suave e elegante
- **White**: `#ffffff` - Cor para textos em fundos escuros
- **Black**: `#000000` - Cor para textos de alto contraste

---

## ✅ Combinações Aprovadas (WCAG AA/AAA)

### Excelente Contraste (AAA - 7:1+)
```css
/* Texto branco em fundo navy */
.text-white.bg-navy { /* Ratio: 19.05 ✅ */ }

/* Texto navy em fundo cream */
.text-navy.bg-cream { /* Ratio: 17.46 ✅ */ }

/* Texto navy em fundo branco */
.text-navy.bg-white { /* Ratio: 19.05 ✅ */ }

/* Texto gold em fundo navy */
.text-gold.bg-navy { /* Ratio: 8.12 ✅ */ }

/* Texto branco em fundo blue */
.text-white.bg-blue { /* Ratio: 10.07 ✅ */ }

/* Texto navy em fundo gold */
.text-navy.bg-gold { /* Ratio: 8.12 ✅ */ }
```

---

## ❌ Combinações Proibidas

### Contraste Inadequado (<4.5:1)
```css
/* NUNCA USAR - Texto branco em fundo cream */
.text-white.bg-cream { /* Ratio: 1.09 ❌ */ }

/* EVITAR - Texto gold em fundo cream */
.text-gold.bg-cream { /* Ratio: 2.15 ❌ */ }

/* NUNCA USAR - Texto claro em fundo claro */
.text-gray-100.bg-white { /* Inadequado ❌ */ }
```

---

## 🛠️ Regras de Implementação

### 1. Hierarquia de Texto
```css
/* Títulos principais */
.heading-primary {
  @apply text-navy font-serif font-bold;
}

/* Títulos em fundos escuros */
.heading-primary-dark {
  @apply text-white font-serif font-bold;
}

/* Destaques dourados */
.text-accent {
  @apply text-gold font-medium;
}

/* Texto corpo */
.body-text {
  @apply text-navy/80 leading-relaxed;
}

/* Texto corpo em fundos escuros */
.body-text-dark {
  @apply text-white/90 leading-relaxed;
}
```

### 2. Fundos e Overlays
```css
/* Fundo principal */
.bg-primary {
  @apply bg-cream;
}

/* Fundo escuro */
.bg-dark {
  @apply bg-navy;
}

/* Overlay para melhorar contraste */
.overlay-dark {
  @apply bg-gradient-to-t from-navy/70 to-navy/40;
}

/* Cards com bom contraste */
.card-light {
  @apply bg-white border border-gold/20;
}
```

### 3. Botões e CTAs
```css
/* Botão primário */
.btn-primary {
  @apply bg-navy text-white hover:bg-navy/90;
}

/* Botão secundário */
.btn-secondary {
  @apply border-2 border-navy text-navy hover:bg-navy hover:text-white;
}

/* Botão dourado */
.btn-gold {
  @apply bg-gold text-navy hover:bg-gold/90;
}

/* Botão outline em fundo escuro */
.btn-outline-dark {
  @apply border-2 border-white text-white hover:bg-white hover:text-navy;
}
```

---

## 🧪 Testes Automatizados

### Executar Verificação de Contraste
```bash
# Executar teste de contraste
node scripts/contrast-check.js

# Executar testes de acessibilidade
npm run test:a11y

# Executar auditoria Lighthouse
npm run lighthouse
```

### Critérios de Aprovação
- ✅ Todas as combinações principais devem ter ratio ≥ 4.5 (AA)
- ✅ Títulos importantes devem ter ratio ≥ 7.0 (AAA)
- ✅ Nenhuma combinação crítica deve ser usada

---

## 📱 Responsividade e Contraste

### Mobile First
```css
/* Garantir contraste em telas pequenas */
@media (max-width: 768px) {
  .hero-text {
    @apply text-white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  
  .overlay-mobile {
    @apply bg-navy/80; /* Mais escuro em mobile */
  }
}
```

### Dark Mode (Futuro)
```css
/* Preparação para modo escuro */
@media (prefers-color-scheme: dark) {
  .bg-primary {
    @apply bg-navy;
  }
  
  .text-primary {
    @apply text-cream;
  }
}
```

---

## 🔍 Ferramentas de Verificação

### Extensões do Navegador
- **axe DevTools** - Auditoria de acessibilidade
- **WAVE** - Avaliação de acessibilidade web
- **Colour Contrast Analyser** - Verificação de contraste

### Ferramentas Online
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- [Stark](https://www.getstark.co/) - Plugin para Figma/Sketch

### Comandos do Projeto
```bash
# Verificação rápida de contraste
node scripts/contrast-check.js

# Testes completos de acessibilidade
npm run test:a11y

# Auditoria Lighthouse (inclui contraste)
npm run lighthouse
```

---

## 📋 Checklist de Revisão

### Antes de Fazer Deploy
- [ ] Executar `node scripts/contrast-check.js`
- [ ] Verificar se não há combinações proibidas
- [ ] Testar em dispositivos móveis
- [ ] Validar com ferramentas de acessibilidade
- [ ] Revisar com usuários reais

### Durante o Desenvolvimento
- [ ] Usar apenas combinações aprovadas
- [ ] Aplicar overlays quando necessário
- [ ] Testar em diferentes tamanhos de tela
- [ ] Verificar legibilidade em condições de luz variadas

---

## 🎯 Metas de Acessibilidade

### Conformidade WCAG 2.1
- **Nível AA**: Contraste mínimo de 4.5:1 para texto normal
- **Nível AAA**: Contraste mínimo de 7:1 para texto normal
- **Texto Grande**: Contraste mínimo de 3:1 (18pt+ ou 14pt+ negrito)

### Métricas do Projeto
- ✅ 75% das combinações com contraste AAA
- ✅ 100% das combinações com contraste AA mínimo
- ✅ 0 combinações críticas em produção

---

## 📞 Suporte e Dúvidas

Para dúvidas sobre contraste e acessibilidade:
1. Consulte este guia primeiro
2. Execute os testes automatizados
3. Use as ferramentas recomendadas
4. Teste com usuários reais quando possível

**Lembre-se**: Acessibilidade não é opcional, é essencial para uma experiência inclusiva!