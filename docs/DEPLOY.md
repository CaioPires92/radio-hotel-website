# Deploy do Radio Hotel no GitHub Pages

## Configuração Automática

Este projeto está configurado para deploy automático no GitHub Pages através do GitHub Actions.

### Pré-requisitos

1. **Repositório no GitHub**: O código deve estar em um repositório público no GitHub
2. **GitHub Pages habilitado**: Nas configurações do repositório, habilite o GitHub Pages
3. **Source configurado**: Configure o source como "GitHub Actions"

### Configurações Implementadas

#### 1. Next.js para Exportação Estática

O `next.config.ts` foi configurado com:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true,
    // ... outras configurações
  },
};
```

#### 2. Scripts de Build

Novos scripts adicionados ao `package.json`:
- `build:github`: Build otimizado para GitHub Pages
- `deploy`: Alias para build:github
- `export`: Exportação estática (legacy)

#### 3. Workflow GitHub Actions

O arquivo `.github/workflows/deploy.yml` automatiza:
- Build do projeto
- Criação do arquivo `.nojekyll`
- Upload para GitHub Pages
- Deploy automático

### Como Fazer o Deploy

#### Opção 1: Deploy Automático (Recomendado)

1. Faça push para a branch `main` ou `master`
2. O GitHub Actions executará automaticamente
3. O site estará disponível em: `https://[username].github.io/[repository-name]`

#### Opção 2: Deploy Manual Local

```bash
# Build para GitHub Pages
npm run build:github

# Os arquivos estarão na pasta 'out/'
# Faça upload manual desta pasta
```

### Estrutura de Arquivos Gerados

```
out/
├── .nojekyll          # Previne processamento Jekyll
├── index.html         # Página principal
├── _next/             # Assets do Next.js
├── images/            # Imagens otimizadas
└── ...                # Outros arquivos estáticos
```

### Configurações do Repositório

1. **Acesse**: Settings → Pages
2. **Source**: Deploy from a branch → GitHub Actions
3. **Custom domain** (opcional): Configure seu domínio personalizado

### Troubleshooting

#### Problema: Imagens não carregam
- **Solução**: Verificar se `images.unoptimized: true` está configurado

#### Problema: CSS/JS não carrega
- **Solução**: Verificar se `.nojekyll` foi criado

#### Problema: 404 em rotas
- **Solução**: Verificar se `trailingSlash: true` está configurado

#### Problema: Build falha no GitHub Actions
- **Solução**: Verificar logs do Actions e dependências

### URLs de Exemplo

- **Desenvolvimento**: `http://localhost:3000`
- **GitHub Pages**: `https://[username].github.io/radio-hotel-website`
- **Domínio personalizado**: `https://radiohotel.com.br` (se configurado)

### Monitoramento

- **GitHub Actions**: Monitore builds em "Actions" tab
- **Lighthouse CI**: Auditorias automáticas de performance
- **Uptime**: Configure monitoramento de uptime se necessário

### Próximos Passos

1. Criar repositório no GitHub
2. Fazer push do código
3. Habilitar GitHub Pages
4. Configurar domínio personalizado (opcional)
5. Configurar analytics (Google Analytics, etc.)