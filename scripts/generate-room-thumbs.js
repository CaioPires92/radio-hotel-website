/* eslint-disable @typescript-eslint/no-require-imports */
/*
  Gera thumbnails padronizadas (4:3, cover) para imagens de quartos.
  Saída: public/images/rooms/thumbs/<arquivo>.jpg e .webp

  Uso:
    node scripts/generate-room-thumbs.js

  Ou via npm:
    npm run thumbs:rooms
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = path.resolve('public/images/rooms');
const OUTPUT_DIR = path.resolve('public/images/rooms/thumbs');

const TARGET = { width: 1200, height: 900, quality: 82 }; // 4:3 alta definição

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true });
}

async function listImages(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name))
    .map((e) => path.join(dir, e.name));
}

async function processImage(inputPath) {
  const file = path.basename(inputPath);
  const base = file.replace(/\.(jpe?g|png)$/i, '');
  const jpgOut = path.join(OUTPUT_DIR, `${base}.jpg`);
  const webpOut = path.join(OUTPUT_DIR, `${base}.webp`);

  const img = sharp(inputPath).resize(TARGET.width, TARGET.height, {
    fit: 'cover',
    position: 'attention', // prioriza rosto/área de interesse
  });

  await img.jpeg({ quality: TARGET.quality, mozjpeg: true, progressive: true }).toFile(jpgOut);
  await img.webp({ quality: TARGET.quality - 4 }).toFile(webpOut);

  return { file, jpgOut, webpOut };
}

async function main() {
  console.log('🖼️  Gerando thumbnails 4:3 para rooms...');
  await ensureDir(OUTPUT_DIR);
  const inputs = await listImages(INPUT_DIR);
  let ok = 0;
  for (const input of inputs) {
    try {
      const res = await processImage(input);
      ok++;
      console.log(`✅ ${path.basename(res.jpgOut)}`);
    } catch (err) {
      console.error(`❌ Falha em ${input}:`, err.message);
    }
  }
  console.log(`\n🎉 Concluído: ${ok} thumbs geradas em ${path.relative(process.cwd(), OUTPUT_DIR)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

