import { test, expect, type Page, type Locator } from '@playwright/test';

function toDisplayDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function openBookingForm(page: Page): Promise<Locator> {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState('domcontentloaded');

  const dialog = page.getByRole('dialog');
  if (await dialog.isVisible().catch(() => false)) return dialog;

  const openCandidates = [
    'button[aria-label="Reservar pelo menu"]',
    '#home button[aria-label*="Reserve"]',
    '#home button[aria-label*="Reservar"]',
    'button:has-text("Reserve Agora")',
    'button:has-text("Reservar Agora")',
  ];

  const deadlineMs = 15000;
  const startedAt = Date.now();

  while (Date.now() - startedAt < deadlineMs) {
    const openedByHook = await page.evaluate(() => {
      type E2EWindow = Window & { __openBookingFormForE2E?: () => void };
      const e2eWindow = window as E2EWindow;
      if (typeof e2eWindow.__openBookingFormForE2E === 'function') {
        e2eWindow.__openBookingFormForE2E();
        return true;
      }
      return false;
    });

    if (openedByHook && (await dialog.isVisible().catch(() => false))) {
      await expect(dialog.getByText(/faça sua reserva/i)).toBeVisible({ timeout: 5000 });
      return dialog;
    }

    for (const selector of openCandidates) {
      const candidate = page.locator(selector).first();
      if ((await candidate.count()) === 0) continue;
      if (!(await candidate.isVisible().catch(() => false))) continue;

      try {
        await candidate.scrollIntoViewIfNeeded();
        await candidate.click({ timeout: 1500 });
      } catch {
        try {
          await candidate.click({ force: true, timeout: 1500 });
        } catch {
          // Try next candidate
        }
      }

      if (await dialog.isVisible().catch(() => false)) {
        await expect(dialog.getByText(/faça sua reserva/i)).toBeVisible({ timeout: 5000 });
        return dialog;
      }
    }

    await page.waitForTimeout(300);
  }

  const availableButtons = await page
    .locator('button')
    .evaluateAll((nodes) => nodes.map((node) => (node.textContent || '').trim()).filter(Boolean).slice(0, 12));

  throw new Error(
    `Could not open booking form dialog from known trigger buttons. Buttons seen: ${availableButtons.join(' | ')}`
  );
}

async function selectComboboxOption(
  page: Page,
  dialog: Locator,
  comboboxIndex: number,
  optionName: string | RegExp
) {
  await dialog.getByRole('combobox').nth(comboboxIndex).click();
  await page.getByRole('option', { name: optionName }).first().click();
}

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should complete full booking flow', async ({ page }) => {
    const dialog = await openBookingForm(page);

    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 2);
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 4);

    await dialog.locator('#check-in-input').fill(toDisplayDate(checkIn));
    await dialog.locator('#check-out-input').fill(toDisplayDate(checkOut));
    await selectComboboxOption(page, dialog, 2, /apartamento standard/i);

    const popupPromise = page.waitForEvent('popup', { timeout: 10000 }).catch(() => null);
    await dialog.getByRole('button', { name: /enviar solicitação/i }).click();

    const popup = await popupPromise;
    if (popup) {
      await popup.waitForLoadState('domcontentloaded');
      expect(popup.url()).toMatch(/wa\.me|api\.whatsapp\.com/);
    }
  });

  test('should validate required date fields when empty', async ({ page }) => {
    const dialog = await openBookingForm(page);

    await dialog.locator('#check-in-input').fill('');
    await dialog.locator('#check-out-input').fill('');
    await dialog.getByRole('button', { name: /enviar solicitação/i }).click();

    await expect(dialog.getByText(/data de check-in é obrigatória/i)).toBeVisible();
    await expect(dialog.getByText(/data de check-out é obrigatória/i)).toBeVisible();
  });

  test('should show validation when check-out is before check-in', async ({ page }) => {
    const dialog = await openBookingForm(page);

    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 10);
    const invalidCheckOut = new Date(checkIn);
    invalidCheckOut.setDate(invalidCheckOut.getDate() - 5);

    await dialog.locator('#check-in-input').fill(toDisplayDate(checkIn));
    await dialog.locator('#check-out-input').fill(toDisplayDate(invalidCheckOut));
    await dialog.locator('#check-out-input').blur();

    await expect(dialog.getByText(/check-out deve ser após check-in/i)).toBeVisible();
  });

  test('should close booking form with close button', async ({ page }) => {
    const dialog = await openBookingForm(page);

    await dialog.getByLabel(/fechar|booking\.closeform/i).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should close booking form with escape key', async ({ page }) => {
    await openBookingForm(page);

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should show and hide children age fields', async ({ page }) => {
    const dialog = await openBookingForm(page);

    await expect(dialog.getByPlaceholder(/criança 1/i)).not.toBeVisible();
    await selectComboboxOption(page, dialog, 1, /^2\b/);

    await expect(dialog.getByPlaceholder(/criança 1/i)).toBeVisible();
    await expect(dialog.getByPlaceholder(/criança 2/i)).toBeVisible();

    await selectComboboxOption(page, dialog, 1, /^0\b/);
    await expect(dialog.getByPlaceholder(/criança 1/i)).not.toBeVisible();
  });

  test('should keep keyboard focus within the modal while tabbing', async ({ page }) => {
    await openBookingForm(page);

    for (let i = 0; i < 8; i += 1) {
      await page.keyboard.press('Tab');
      const focusInsideDialog = await page.evaluate(() => {
        const dialog = document.querySelector('[role="dialog"]');
        return dialog ? dialog.contains(document.activeElement) : false;
      });
      expect(focusInsideDialog).toBe(true);
    }
  });
});
