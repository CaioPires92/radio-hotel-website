/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const inputDir = './public';
const outputDir = './public/optimized';

// Configurações de otimização por tipo de imagem
const optimizationConfig = {
  hero: { width: 1920, height: 1080, quality: 85 },
  rooms: { width: 800, height: 600, quality: 80 },
  restaurant: { width: 800, height: 600, quality: 80 },
  facilities: { width: 800, height: 600, quality: 80 },
  events: { width: 600, height: 400, quality: 80 },
  default: { width: 1200, height: 800, quality: 80 }
};

// Função para determinar o tipo de imagem baseado no caminho
function getImageType(filePath) {
  const pathLower = filePath.toLowerCase();
  if (pathLower.includes('hero')) return 'hero';
  if (pathLower.includes('room') || pathLower.includes('suite')) return 'rooms';
  if (pathLower.includes('restaurant') || pathLower.includes('restaurante')) return 'restaurant';
  if (pathLower.includes('facilities') || pathLower.includes('facilidades')) return 'facilities';
  if (pathLower.includes('event') || pathLower.includes('evento')) return 'events';
  return 'default';
}

// Função para obter todos os arquivos de imagem recursivamente
async function getImageFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await getImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Função para otimizar uma imagem
async function optimizeImage(inputPath, outputPath, config) {
  try {
    const { width, height, quality } = config;
    
    // Criar diretório de saída se não existir
    const outputDirPath = path.dirname(outputPath);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    
    // Obter informações da imagem original
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    // Otimizar JPEG/PNG
    const sharpInstance = sharp(inputPath)
      .resize(width, height, { 
        fit: 'inside', 
        withoutEnlargement: true 
      });
    
    if (inputPath.toLowerCase().includes('.png')) {
      await sharpInstance
        .png({ 
          quality, 
          compressionLevel: 9,
          progressive: true 
        })
        .toFile(outputPath);
    } else {
      await sharpInstance
        .jpeg({ 
          quality, 
          progressive: true,
          mozjpeg: true 
        })
        .toFile(outputPath);
    }
    
    // Criar versão WebP
    const webpPath = outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await sharp(inputPath)
      .resize(width, height, { 
        fit: 'inside', 
        withoutEnlargement: true 
      })
      .webp({ quality: quality - 5 })
      .toFile(webpPath);
    
    // Calcular economia de espaço
    const optimizedStats = fs.statSync(outputPath);
    const optimizedSize = optimizedStats.size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.relative(inputDir, inputPath)}`);
    console.log(`   Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Otimizada: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Economia: ${savings}%\n`);
    
    return { originalSize, optimizedSize, savings: parseFloat(savings) };
    
  } catch (error) {
    console.error(`❌ Erro ao otimizar ${inputPath}:`, error.message);
    return null;
  }
}

// Função principal
async function optimizeAllImages() {
  console.log('🖼️  Iniciando otimização de imagens...\n');
  
  try {
    // Obter todas as imagens
    const imageFiles = await getImageFiles(inputDir);
    console.log(`📁 Encontradas ${imageFiles.length} imagens para otimizar\n`);
    
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;
    
    // Processar cada imagem
    for (const inputPath of imageFiles) {
      const relativePath = path.relative(inputDir, inputPath);
      const outputPath = path.join(outputDir, relativePath);
      
      // Determinar configuração baseada no tipo de imagem
      const imageType = getImageType(relativePath);
      const config = optimizationConfig[imageType];
      
      console.log(`🔄 Processando: ${relativePath} (${imageType})`);
      
      const result = await optimizeImage(inputPath, outputPath, config);
      
      if (result) {
        totalOriginalSize += result.originalSize;
        totalOptimizedSize += result.optimizedSize;
        processedCount++;
      }
    }
    
    // Relatório final
    const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(50));
    console.log('📊 RELATÓRIO FINAL');
    console.log('='.repeat(50));
    console.log(`✅ Imagens processadas: ${processedCount}/${imageFiles.length}`);
    console.log(`📦 Tamanho original: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`🗜️  Tamanho otimizado: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`💾 Economia total: ${((totalOriginalSize - totalOptimizedSize) / 1024 / 1024).toFixed(2)}MB (${totalSavings}%)`);
    console.log('\n🎉 Otimização concluída com sucesso!');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Revisar as imagens otimizadas em ./public/optimized/');
    console.log('   2. Substituir as imagens originais pelas otimizadas');
    console.log('   3. Habilitar otimização do Next.js no next.config.ts');
    console.log('   4. Usar componente <Image> do Next.js nos componentes');
    
  } catch (error) {
    console.error('❌ Erro durante a otimização:', error);
    process.exit(1);
  }
}

// Verificar se Sharp está instalado
try {
  require('sharp');
} catch {
  console.error('❌ Sharp não está instalado. Execute: npm install sharp --save-dev');
  process.exit(1);
}

// Executar otimização
optimizeAllImages();
