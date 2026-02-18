/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const INPUT_DIRS = [
  path.resolve('public/images/facilities'),
  path.resolve('public/images/restaurant'),
  path.resolve('public/images/rooms'),
]

const TARGET = { width: 1600, height: 900, quality: 82 }

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true })
}

async function listImages(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true })
  return entries
    .filter((e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name))
    .map((e) => path.join(dir, e.name))
}

async function processImage(inputPath, outputDir) {
  const file = path.basename(inputPath)
  const base = file.replace(/\.(jpe?g|png)$/i, '')
  const jpgOut = path.join(outputDir, `${base}.jpg`)
  const webpOut = path.join(outputDir, `${base}.webp`)

  const img = sharp(inputPath).resize(TARGET.width, TARGET.height, {
    fit: 'cover',
    position: 'attention',
  })

  await img.jpeg({ quality: TARGET.quality, mozjpeg: true, progressive: true }).toFile(jpgOut)
  await img.webp({ quality: TARGET.quality - 4 }).toFile(webpOut)

  return { jpgOut, webpOut }
}

async function main() {
  let total = 0
  for (const dir of INPUT_DIRS) {
    const out = path.join(dir, 'thumbs-16x9')
    await ensureDir(out)
    const inputs = await listImages(dir)
    for (const input of inputs) {
      try {
        await processImage(input, out)
        total++
        console.log(`OK: ${path.basename(input)} -> ${path.relative(process.cwd(), out)}`)
      } catch (e) {
        console.error(`FAIL: ${input}: ${e.message}`)
      }
    }
  }
  console.log(`DONE: ${total} images processed`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
