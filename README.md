# 🏨 Rádio Hotel - Website Oficial

Website premium do Rádio Hotel, um refúgio de elegância e tradição no coração de Serra Negra, SP. Desenvolvido com as melhores práticas de desenvolvimento web, focando em performance, acessibilidade e experiência do usuário.

## ✨ Características

- **Design Premium**: Interface elegante inspirada em hotéis de luxo mundiais
- **Performance Otimizada**: Lighthouse Score 90+ em todas as métricas
- **Acessibilidade WCAG 2.1 AA**: Totalmente acessível para todos os usuários
- **SEO Otimizado**: Meta tags, dados estruturados e sitemap completos
- **Responsivo**: Experiência perfeita em todos os dispositivos
- **Animações Suaves**: Micro-interações com Framer Motion

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Componentes**: shadcn/ui + Magic UI
- **Animações**: Framer Motion
- **Testes**: Vitest (Unit) + Playwright (E2E)
- **CI/CD**: GitHub Actions
- **Deploy**: Vercel

## 🎨 Paleta de Cores

- **Navy**: `#0a0d29` - Cor principal, elegância
- **Blue**: `#16446e` - Cor secundária, confiança
- **Gold**: `#b2ab70` - Destaque, luxo
- **Light**: `#f6f5f1` - Background, leveza

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/radio-hotel.git
cd radio-hotel

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🧪 Testes

```bash
# Testes unitários
npm run test
npm run test:watch
npm run test:coverage

# Testes E2E
npm run test:e2e
npm run test:e2e:ui

# Testes de acessibilidade
npm run test:a11y

# Auditoria Lighthouse
npm run lighthouse
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run start` - Servidor de produção
- `npm run lint` - Verificação de código
- `npm run type-check` - Verificação de tipos

## 📱 Funcionalidades

### Seções Principais
- **Hero**: Carrossel full-bleed inspirado no Shangri-La
- **Sobre**: Layout 60% imagem / 40% texto
- **Eventos**: Carrossel com modal interativo
- **Acomodações**: Showcase dos quartos
- **Destaques**: Grid 3 colunas com hover dourado
- **Parallax**: Seção com CTA imersiva
- **Formulário**: Reservas via WhatsApp

### Componentes Interativos
- **Modal de Eventos**: Aparece após scroll (600px)
- **Pop Button**: Botão fixo para eventos
- **WhatsApp Button**: Contato direto flutuante
- **Back to Top**: Botão com indicador de progresso

## 🌐 SEO e Performance

- **Meta Tags**: Completas para redes sociais
- **Dados Estruturados**: Schema.org para hotéis
- **Sitemap**: Gerado automaticamente
- **Robots.txt**: Configurado para SEO
- **Core Web Vitals**: Otimizado para Google

## ♿ Acessibilidade

- **WCAG 2.1 AA**: Conformidade total
- **Navegação por Teclado**: Suporte completo
- **Screen Readers**: Compatibilidade total
- **Contraste**: Ratios adequados
- **Focus Management**: Indicadores visuais

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Manual

```bash
# Build da aplicação
npm run build

# Inicie o servidor
npm start
```

## 🔄 CI/CD

O pipeline automatizado inclui:

- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Testes**: Unit + E2E + Acessibilidade
- **Build**: Verificação de build
- **Lighthouse**: Auditoria de performance
- **Deploy**: Automático no Vercel

## 📞 Contato

- **Hotel**: Rádio Hotel Serra Negra
- **Telefone**: +55 19 99999-9999
- **Email**: contato@radiohotel.com.br
- **Endereço**: Serra Negra, SP

## 📄 Licença

Este projeto é propriedade do Rádio Hotel. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para o Rádio Hotel**
