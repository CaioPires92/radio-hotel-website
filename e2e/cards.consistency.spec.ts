import { test, expect } from '@playwright/test'

test.describe('Consistência visual de cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('SeasonalPackages: cards com mesma altura', async ({ page }) => {
    const cards = page.locator('#pacotes .group.card-standard')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
    const heights = [] as number[]
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox()
      heights.push(Math.round((box?.height || 0)))
    }
    const min = Math.min(...heights)
    const max = Math.max(...heights)
    expect(max - min).toBeLessThanOrEqual(2)
  })

  test('Accommodations: imagem principal 16:9 preenchida', async ({ page }) => {
    const wrappers = page.locator('#accommodations .card-media-16x9')
    await expect(wrappers.first()).toBeVisible()
    const img = wrappers.first().locator('img')
    await expect(img).toHaveClass(/object-cover/)
    await expect(img).toHaveClass(/object-center/)
  })

  test('Highlights: cards usam padrão de card-standard', async ({ page }) => {
    const cards = page.locator('#highlights .card-standard')
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)

    const heights: number[] = []
    for (let i = 0; i < count; i++) {
      const box = await cards.nth(i).boundingBox()
      heights.push(Math.round(box?.height || 0))
    }

    const min = Math.min(...heights)
    const max = Math.max(...heights)
    expect(max - min).toBeLessThanOrEqual(2)
  })
})
