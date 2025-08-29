import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete full booking flow', async ({ page }) => {
    // Click on booking button in navbar
    await page.getByRole('button', { name: /reservar agora/i }).click();

    // Wait for booking form to appear
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect(page.getByText('Fazer Reserva')).toBeVisible();

    // Fill in booking details
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 3);

    const checkInDate = tomorrow.toISOString().split('T')[0];
    const checkOutDate = dayAfter.toISOString().split('T')[0];

    await page.fill('input[name="checkIn"]', checkInDate);
    await page.fill('input[name="checkOut"]', checkOutDate);
    await page.selectOption('select[name="adults"]', '2');
    await page.selectOption('select[name="children"]', '1');
    
    // Fill child age when children > 0
    await expect(page.locator('select[name="childAge0"]')).toBeVisible();
    await page.selectOption('select[name="childAge0"]', '8');
    
    await page.selectOption('select[name="roomType"]', 'standard');

    // Submit form
    await page.getByRole('button', { name: /enviar solicitação/i }).click();

    // Should redirect to WhatsApp (we can't test the actual redirect, but we can check if window.open was called)
    // In a real test, you might want to mock window.open or check for specific behavior
  });

  test('should validate form fields', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Try to submit without filling required fields
    await page.getByRole('button', { name: /enviar solicitação/i }).click();

    // Should show validation errors
    await expect(page.getByText(/check-in é obrigatório/i)).toBeVisible();
    await expect(page.getByText(/check-out é obrigatório/i)).toBeVisible();
  });

  test('should validate check-out date is after check-in', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Fill with invalid dates (check-out before check-in)
    await page.fill('input[name="checkIn"]', '2024-12-25');
    await page.fill('input[name="checkOut"]', '2024-12-20');

    // Submit form
    await page.getByRole('button', { name: /enviar solicitação/i }).click();

    // Should show validation error
    await expect(page.getByText(/check-out deve ser posterior ao check-in/i)).toBeVisible();
  });

  test('should close booking form with close button', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Close form
    await page.getByLabel(/fechar formulário/i).click();

    // Form should be closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('should close booking form with escape key', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Press escape key
    await page.keyboard.press('Escape');

    // Form should be closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test('should show/hide children age fields based on children count', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Initially no children age fields should be visible
    await expect(page.locator('select[name="childAge0"]')).not.toBeVisible();

    // Select 2 children
    await page.selectOption('select[name="children"]', '2');

    // Should show 2 age fields
    await expect(page.locator('select[name="childAge0"]')).toBeVisible();
    await expect(page.locator('select[name="childAge1"]')).toBeVisible();
    await expect(page.locator('select[name="childAge2"]')).not.toBeVisible();

    // Change to 0 children
    await page.selectOption('select[name="children"]', '0');

    // Age fields should be hidden
    await expect(page.locator('select[name="childAge0"]')).not.toBeVisible();
    await expect(page.locator('select[name="childAge1"]')).not.toBeVisible();
  });

  test('should be accessible via keyboard navigation', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Tab through form elements
    await page.keyboard.press('Tab'); // Check-in field
    await expect(page.locator('input[name="checkIn"]')).toBeFocused();

    await page.keyboard.press('Tab'); // Check-out field
    await expect(page.locator('input[name="checkOut"]')).toBeFocused();

    await page.keyboard.press('Tab'); // Adults select
    await expect(page.locator('select[name="adults"]')).toBeFocused();

    await page.keyboard.press('Tab'); // Children select
    await expect(page.locator('select[name="children"]')).toBeFocused();

    await page.keyboard.press('Tab'); // Room type select
    await expect(page.locator('select[name="roomType"]')).toBeFocused();

    await page.keyboard.press('Tab'); // Submit button
    await expect(page.getByRole('button', { name: /enviar solicitação/i })).toBeFocused();
  });

  test('should maintain focus trap within modal', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Focus should be trapped within the modal
    // Tab to the last focusable element (submit button)
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /enviar solicitação/i })).toBeFocused();

    // Tab again should go to close button or first field
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['INPUT', 'BUTTON']).toContain(focusedElement);
  });
});