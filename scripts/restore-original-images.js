const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);

const backupDir = './public/backup-original';
const publicDir = './public';

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

// Função principal para restaurar imagens originais
async function restoreOriginalImages() {
  console.log('🔄 Restaurando imagens originais do backup...\n');
  
  try {
    // Verificar se o diretório de backup existe
    if (!fs.existsSync(backupDir)) {
      console.error('❌ Diretório de backup não encontrado.');
      console.log('💡 Não há backup disponível para restaurar.');
      process.exit(1);
    }
    
    // Obter todas as imagens do backup
    const backupImages = await getAllFiles(backupDir);
    const imageFiles = backupImages.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
    
    let restoredCount = 0;
    
    for (const backupPath of imageFiles) {
      const relativePath = path.relative(backupDir, backupPath);
      const originalPath = path.join(publicDir, relativePath);
      
      // Criar diretório se necessário
      const originalDirPath = path.dirname(originalPath);
      if (!fs.existsSync(originalDirPath)) {
        fs.mkdirSync(originalDirPath, { recursive: true });
      }
      
      // Restaurar arquivo do backup
      await copyFile(backupPath, originalPath);
      restoredCount++;
      
      console.log(`✅ Restaurado: ${relativePath}`);
    }
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 RESTAURAÇÃO CONCLUÍDA!');
    console.log('='.repeat(50));
    console.log(`✅ Imagens restauradas: ${restoredCount}`);
    console.log('📦 Imagens originais foram restauradas do backup');
    console.log('\n💡 Lembre-se de:');
    console.log('   1. Desabilitar otimização do Next.js se necessário');
    console.log('   2. Reiniciar o servidor de desenvolvimento');
    
  } catch (error) {
    console.error('❌ Erro durante a restauração:', error);
    process.exit(1);
  }
}

// Executar restauração
restoreOriginalImages();