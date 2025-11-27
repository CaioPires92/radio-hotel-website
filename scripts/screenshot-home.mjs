import { chromium } from 'playwright'

const url = process.env.SCREENSHOT_URL || 'https://radio-hotel.vercel.app/'

async function shot(path, width, height) {
  const browser = await chromium.launch()
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 })
  const page = await context.newPage()
  await page.goto(url, { timeout: 60000 })
  await page.waitForLoadState('domcontentloaded')
  await page.waitForTimeout(2000)
  await page.screenshot({ path, fullPage: true })
  await browser.close()
}

await shot('public/images/screenshots/desktop-home.png', 1920, 1080)
await shot('public/images/screenshots/mobile-home.png', 390, 844)