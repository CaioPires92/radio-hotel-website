# Deploy na Vercel - Radio Hotel

Guia completo para configurar o deploy do Radio Hotel na Vercel.

## 📋 Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Repositório no GitHub (já configurado)
- Projeto Next.js pronto para produção

## 🚀 Configuração do Deploy

### 1. Conectar Repositório

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "New Project"
3. Conecte sua conta do GitHub
4. Selecione o repositório `CaioPires92/radio-hotel-website`
5. Clique em "Import"

### 2. Configurações do Projeto

#### Framework Preset
- **Framework**: Next.js
- **Root Directory**: `./` (raiz do projeto)
- **Build Command**: `npm run build`
- **Output Directory**: `out` (para exportação estática)
- **Install Command**: `npm install`

#### Variáveis de Ambiente

Adicione as seguintes variáveis no painel da Vercel:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_HOTJAR_ID=1234567

# SEO
NEXT_PUBLIC_SITE_URL=https://radio-hotel-website.vercel.app

# Configurações
NEXT_PUBLIC_ENVIRONMENT=production
```

### 3. Configuração Automática

A Vercel detectará automaticamente:
- `package.json` para dependências
- `next.config.ts` para configurações do Next.js
- Scripts de build definidos

### 4. Deploy Manual (Primeira vez)

```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Login na Vercel
vercel login

# Deploy do projeto
vercel

# Deploy para produção
vercel --prod
```

## ⚙️ Configurações Específicas

### next.config.ts (Já configurado)

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Outras configurações...
};
```

### vercel.json (Opcional)

Crie um arquivo `vercel.json` na raiz para configurações avançadas:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "regions": ["gru1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/sitemap.xml"
    },
    {
      "source": "/robots.txt",
      "destination": "/robots.txt"
    }
  ]
}
```

## 🔄 Deploy Automático

### GitHub Integration

Após conectar o repositório:

1. **Push para `main`** → Deploy automático em produção
2. **Push para outras branches** → Deploy de preview
3. **Pull Requests** → Deploy de preview automático

### Comandos Git

```bash
# Fazer alterações e commit
git add .
git commit -m "feat: nova funcionalidade"
git push origin main

# A Vercel fará deploy automaticamente
```

## 🌐 Domínio Personalizado

### Configurar Domínio

1. No painel da Vercel, vá em "Settings" → "Domains"
2. Adicione seu domínio: `radiohotelserranegra.com.br`
3. Configure os DNS:

```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com

Tipo: A
Nome: @
Valor: 76.76.19.61
```

### SSL Automático

- A Vercel configura SSL automaticamente
- Certificado Let's Encrypt renovado automaticamente
- HTTPS forçado por padrão

## 📊 Monitoramento

### Analytics da Vercel

- Acesse "Analytics" no painel
- Monitore performance, visitantes e Core Web Vitals
- Relatórios de velocidade e SEO

### Logs de Deploy

- Visualize logs em tempo real
- Debug de erros de build
- Histórico de deploys

## 🚨 Troubleshooting

### Problemas Comuns

#### 1. Erro de Build
```bash
# Verificar localmente
npm run build
npm run start
```

#### 2. Imagens não carregam
- Verificar `next.config.ts` → `images.unoptimized: true`
- Confirmar paths das imagens em `/public`

#### 3. Rotas não funcionam
- Verificar `trailingSlash: true` no config
- Confirmar exportação estática

#### 4. Variáveis de ambiente
- Prefixar com `NEXT_PUBLIC_` para client-side
- Configurar no painel da Vercel

### Comandos de Debug

```bash
# Verificar build local
npm run build
npm run start

# Verificar exportação estática
npm run build
npx serve out

# Logs da Vercel
vercel logs [deployment-url]
```

## 📈 Otimizações

### Performance

- **Edge Functions**: Para APIs dinâmicas
- **Image Optimization**: Automática na Vercel
- **CDN Global**: Distribuição mundial
- **Caching**: Automático para assets estáticos

### SEO

- **Meta tags**: Já configuradas
- **Sitemap**: Gerado automaticamente
- **Robots.txt**: Configurado
- **Schema.org**: Implementado

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Next.js + Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Domínios Personalizados](https://vercel.com/docs/concepts/projects/custom-domains)
- [Variáveis de Ambiente](https://vercel.com/docs/concepts/projects/environment-variables)

## 📝 Checklist de Deploy

- [ ] Repositório conectado à Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build funcionando localmente
- [ ] Domínio personalizado configurado (opcional)
- [ ] SSL ativo
- [ ] Analytics configurado
- [ ] Monitoramento ativo

---

**Projeto**: Radio Hotel Website  
**Tecnologia**: Next.js 15 + TypeScript  
**Deploy**: Vercel  
**Repositório**: https://github.com/CaioPires92/radio-hotel-website