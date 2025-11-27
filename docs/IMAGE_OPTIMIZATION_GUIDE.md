# Guia de Otimização de Imagens - Radio Hotel

## 📊 Situação Atual
O projeto possui **343MB+ de imagens** não otimizadas, impactando significativamente a performance:
- `restaurante3.jpg`: 23.8MB
- `restaurante2.jpg`: 19.45MB
- `bosque1.jpg`: 18.2MB
- Múltiplas imagens entre 5-15MB

## 🎯 Objetivos
- Reduzir tamanho total das imagens em 70-80%
- Manter qualidade visual adequada
- Implementar formatos modernos (WebP, AVIF)
- Habilitar otimização automática do Next.js

## 🛠️ Métodos de Otimização

### 1. Ferramentas Online (Mais Fácil)

#### TinyPNG/TinyJPG
- **Site**: https://tinypng.com/
- **Suporte**: PNG, JPG, WebP
- **Redução**: 60-80% sem perda visual
- **Limite**: 5MB por arquivo (gratuito)

#### Squoosh (Google)
- **Site**: https://squoosh.app/
- **Vantagens**: Comparação lado a lado, múltiplos formatos
- **Formatos**: WebP, AVIF, MozJPEG, OxiPNG

#### Compressor.io
- **Site**: https://compressor.io/
- **Suporte**: JPG, PNG, SVG, GIF
- **Redução**: Até 90%

### 2. Ferramentas Desktop

#### ImageOptim (Mac) / FileOptimizer (Windows)
- **Windows**: https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer
- **Processamento em lote**
- **Múltiplos algoritmos**

#### GIMP (Gratuito)
1. Abrir imagem
2. Arquivo → Exportar Como
3. Escolher qualidade 75-85%
4. Ativar "Progressive"

### 3. Ferramentas de Linha de Comando

#### ImageMagick
```bash
# Instalar
winget install ImageMagick.ImageMagick

# Redimensionar e comprimir
magick input.jpg -resize 1920x1080> -quality 80 output.jpg

# Converter para WebP
magick input.jpg -quality 80 output.webp

# Processamento em lote
for %f in (*.jpg) do magick "%f" -quality 80 "optimized/%f"
```

#### Sharp (Node.js)
```bash
npm install -g sharp-cli

# Comprimir JPEG
sharp -i input.jpg -o output.jpg --jpeg-quality 80

# Converter para WebP
sharp -i input.jpg -o output.webp --webp-quality 80
```

## 🔧 Implementação no Projeto

### Passo 1: Scripts NPM Disponíveis

O projeto já possui scripts automatizados para otimização:

```bash
# Otimizar todas as imagens (cria versões otimizadas)
npm run optimize-images

# Substituir imagens originais pelas otimizadas (com backup)
npm run optimize-images:replace

# Restaurar imagens originais do backup
npm run restore-images
```

### Passo 2: Habilitar Otimização do Next.js

**Editar `next.config.ts`:**
```typescript
const nextConfig: NextConfig = {
  // Remover esta linha:
  // images: { unoptimized: true },
  
  // Adicionar configurações de imagem:
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 ano
  },
};
```

### Passo 3: Usar Componente Image do Next.js

**Substituir tags `<img>` por `<Image>`:**
```tsx
import Image from 'next/image';

// Antes
<img src="/hero/hero1.jpg" alt="Hotel" />

// Depois
<Image
  src="/hero/hero1.jpg"
  alt="Hotel"
  width={1920}
  height={1080}
  priority // Para imagens above-the-fold
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
/>
```

### Passo 4: Script de Otimização Automática

**Criar `scripts/optimize-images.js`:**
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public';
const outputDir = './public/optimized';

const optimizeImages = async () => {
  const files = fs.readdirSync(inputDir, { recursive: true })
    .filter(file => /\.(jpg|jpeg|png)$/i.test(file));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    // Criar diretório se não existir
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    
    // Otimizar JPEG/PNG
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath);
    
    // Criar versão WebP
    await sharp(inputPath)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    
    console.log(`Otimizado: ${file}`);
  }
};

optimizeImages().catch(console.error);
```

**Adicionar ao `package.json`:**
```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js"
  },
  "devDependencies": {
    "sharp": "^0.33.0"
  }
}
```

## 📋 Plano de Ação Recomendado

### Fase 1: Otimização Manual (Imediata)
1. **Identificar imagens críticas** (hero, above-the-fold)
2. **Usar TinyPNG** para otimização rápida
3. **Redimensionar** para tamanhos apropriados:
   - Hero: 1920x1080
   - Cards: 800x600
   - Thumbnails: 400x300

### Fase 2: Implementação Técnica
1. **Habilitar otimização do Next.js**
2. **Substituir tags `<img>` por `<Image>`**
3. **Implementar lazy loading**
4. **Adicionar placeholders blur**

### Fase 3: Automação
1. **Instalar Sharp**
2. **Criar script de otimização**
3. **Integrar ao workflow de build**
4. **Configurar CI/CD para otimização automática**

## 🎯 Resultados Esperados

### Antes da Otimização
- **Tamanho total**: 343MB+
- **Lighthouse Performance**: 35/100 (mobile)
- **LCP**: >4s

### Após Otimização
- **Tamanho total**: ~70MB (80% redução)
- **Lighthouse Performance**: 70-80/100
- **LCP**: <2.5s
- **Economia de banda**: ~270MB por usuário

## 🔍 Monitoramento

### Ferramentas de Análise
- **Lighthouse**: Performance e métricas Core Web Vitals
- **WebPageTest**: Análise detalhada de carregamento
- **GTmetrix**: Monitoramento contínuo

### Métricas Importantes
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **Tamanho total da página**: <3MB

## 💡 Dicas Extras

1. **Priorize imagens above-the-fold** com `priority={true}`
2. **Use lazy loading** para imagens below-the-fold
3. **Implemente Progressive JPEG** para melhor experiência
4. **Configure CDN** (Vercel já otimiza automaticamente)
5. **Monitore Core Web Vitals** regularmente

---

**Próximos passos**: Comece pela otimização manual das 5 maiores imagens usando TinyPNG, depois implemente as mudanças técnicas no código.