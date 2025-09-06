import { test, expect } from '@playwright/test';

test.describe('New Booking Flow', () => {
  test('should complete full booking flow from hero section', async ({ page }) => {
    await page.goto('/');

    // Click on booking button in the hero section
    await page.getByRole('button', { name: /reservar agora/i }).first().click();

    // Wait for booking form to appear
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.getByText('Faça sua Reserva')).toBeVisible();

    // Fill in booking details
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 3);

    const checkInDate = tomorrow.toISOString().split('T')[0];
    const checkOutDate = dayAfter.toISOString().split('T')[0];

    await page.locator('input[id="check-in-input"]').fill(checkInDate);
    await page.locator('input[id="check-out-input"]').fill(checkOutDate);

    // The select elements are not standard select, so we need to click the trigger and then the item
    await page.locator('div:has-text("Adultos") + div').click();
    await page.locator('div[role="option"]:has-text("2")').click();

    await page.locator('div:has-text("Crianças") + div').click();
    await page.locator('div[role="option"]:has-text("1")').click();

    await page.locator('input[placeholder="Criança 1"]').fill('8');

    await page.locator('div:has-text("Tipo de Acomodação") + div').click();
    await page.locator('div[role="option"]:has-text("Standard")').click();

    // Submit form
    const [popup] = await Promise.all([
      page.waitForEvent('popup'),
      page.getByRole('button', { name: /enviar solicitação/i }).click(),
    ]);

    // Check if the new page URL is a WhatsApp URL
    expect(popup.url()).toContain('https://wa.me/');
  });
});
