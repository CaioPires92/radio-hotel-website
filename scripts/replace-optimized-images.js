/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);

const optimizedDir = './public/optimized';
const publicDir = './public';
const backupDir = './public/backup-original';

// Função para obter todos os arquivos recursivamente
async function getAllFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    
    if (fileStat.isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

// Função para criar backup das imagens originais
async function createBackup() {
  console.log('📦 Criando backup das imagens originais...');
  
  try {
    // Criar diretório de backup
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Obter todas as imagens originais
    const originalImages = await getAllFiles(publicDir);
    const imageFiles = originalImages.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file) && 
      !file.includes('optimized') && 
      !file.includes('backup')
    );
    
    let backupCount = 0;
    
    for (const originalPath of imageFiles) {
      const relativePath = path.relative(publicDir, originalPath);
      const backupPath = path.join(backupDir, relativePath);
      
      // Criar diretório de backup se necessário
      const backupDirPath = path.dirname(backupPath);
      if (!fs.existsSync(backupDirPath)) {
        fs.mkdirSync(backupDirPath, { recursive: true });
      }
      
      // Copiar arquivo original para backup
      await copyFile(originalPath, backupPath);
      backupCount++;
      
      console.log(`✅ Backup: ${relativePath}`);
    }
    
    console.log(`\n📦 Backup concluído: ${backupCount} arquivos salvos em ${backupDir}\n`);
    
  } catch (error) {
    console.error('❌ Erro ao criar backup:', error);
    throw error;
  }
}

// Função para substituir imagens originais pelas otimizadas
async function replaceWithOptimized() {
  console.log('🔄 Substituindo imagens originais pelas otimizadas...');
  
  try {
    // Obter todas as imagens otimizadas
    const optimizedImages = await getAllFiles(optimizedDir);
    const imageFiles = optimizedImages.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    
    let replacedCount = 0;
    let totalSavings = 0;
    
    for (const optimizedPath of imageFiles) {
      const relativePath = path.relative(optimizedDir, optimizedPath);
      const originalPath = path.join(publicDir, relativePath);
      
      if (fs.existsSync(originalPath)) {
        // Obter tamanhos dos arquivos
        const originalStats = fs.statSync(originalPath);
        const optimizedStats = fs.statSync(optimizedPath);
        const savings = originalStats.size - optimizedStats.size;
        
        // Substituir arquivo original pelo otimizado
        await copyFile(optimizedPath, originalPath);
        replacedCount++;
        totalSavings += savings;
        
        console.log(`✅ Substituído: ${relativePath}`);
        console.log(`   ${(originalStats.size / 1024 / 1024).toFixed(2)}MB → ${(optimizedStats.size / 1024 / 1024).toFixed(2)}MB`);
      }
    }
    
    console.log(`\n🎉 Substituição concluída!`);
    console.log(`✅ Arquivos substituídos: ${replacedCount}`);
    console.log(`💾 Economia total: ${(totalSavings / 1024 / 1024).toFixed(2)}MB`);
    
  } catch (error) {
    console.error('❌ Erro ao substituir imagens:', error);
    throw error;
  }
}

// Função para limpar diretório de imagens otimizadas
async function cleanupOptimizedDir() {
  console.log('\n🧹 Limpando diretório de imagens otimizadas...');
  
  try {
    if (fs.existsSync(optimizedDir)) {
      fs.rmSync(optimizedDir, { recursive: true, force: true });
      console.log('✅ Diretório optimized removido');
    }
  } catch (error) {
    console.error('❌ Erro ao limpar diretório:', error);
  }
}

// Função principal
async function replaceOptimizedImages() {
  console.log('🖼️  Iniciando substituição de imagens otimizadas...\n');
  
  try {
    // Verificar se o diretório de imagens otimizadas existe
    if (!fs.existsSync(optimizedDir)) {
      console.error('❌ Diretório de imagens otimizadas não encontrado.');
      console.log('💡 Execute primeiro: npm run optimize-images');
      process.exit(1);
    }
    
    // Criar backup das imagens originais
    await createBackup();
    
    // Substituir imagens originais pelas otimizadas
    await replaceWithOptimized();
    
    // Limpar diretório de imagens otimizadas
    await cleanupOptimizedDir();
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 PROCESSO CONCLUÍDO COM SUCESSO!');
    console.log('='.repeat(50));
    console.log('✅ Imagens originais foram substituídas pelas otimizadas');
    console.log('📦 Backup das originais salvo em ./public/backup-original/');
    console.log('\n💡 Próximos passos:');
    console.log('   1. Habilitar otimização do Next.js no next.config.ts');
    console.log('   2. Usar componente <Image> do Next.js nos componentes');
    console.log('   3. Testar o site para verificar se tudo está funcionando');
    console.log('   4. Executar Lighthouse para verificar melhorias de performance');
    
  } catch (error) {
    console.error('❌ Erro durante o processo:', error);
    console.log('\n🔄 Para restaurar as imagens originais:');
    console.log('   Execute: node scripts/restore-original-images.js');
    process.exit(1);
  }
}

// Executar substituição
replaceOptimizedImages();
