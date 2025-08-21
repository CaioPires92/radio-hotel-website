import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Rádio Hotel/);
    
    // Check if main navigation is visible
    await expect(page.locator('nav')).toBeVisible();
    
    // Check if hero section is visible
    await expect(page.locator('section').first()).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Check if navigation items are clickable
    const navItems = ['Início', 'Sobre', 'Acomodações', 'Eventos', 'Contato'];
    
    for (const item of navItems) {
      const navLink = page.getByText(item);
      await expect(navLink).toBeVisible();
    }
  });

  test('should display booking form', async ({ page }) => {
    // Scroll to booking form section
    await page.locator('[data-testid="booking-form"]').scrollIntoViewIfNeeded();
    
    // Check if booking form is visible
    await expect(page.locator('[data-testid="booking-form"]')).toBeVisible();
    
    // Check if form fields are present
    await expect(page.locator('input[type="date"]').first()).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible();
  });

  test('should show WhatsApp button', async ({ page }) => {
    // Wait for WhatsApp button to appear (it has a delay)
    await page.waitForTimeout(2000);
    
    // Check if WhatsApp button is visible
    const whatsappButton = page.locator('[data-testid="whatsapp-button"]');
    await expect(whatsappButton).toBeVisible();
  });

  test('should show events modal when scrolling', async ({ page }) => {
    // Scroll down to trigger the events modal
    await page.evaluate(() => window.scrollTo(0, 700));
    
    // Wait for the modal to appear
    await page.waitForTimeout(1000);
    
    // Check if pop button appears
    const popButton = page.locator('[data-testid="pop-button"]');
    await expect(popButton).toBeVisible();
  });

  test('should show back to top button when scrolling', async ({ page }) => {
    // Scroll down to trigger back to top button
    await page.evaluate(() => window.scrollTo(0, 400));
    
    // Wait for button to appear
    await page.waitForTimeout(500);
    
    // Check if back to top button is visible
    const backToTopButton = page.locator('[data-testid="back-to-top"]');
    await expect(backToTopButton).toBeVisible();
    
    // Click the button and check if it scrolls to top
    await backToTopButton.click();
    await page.waitForTimeout(1000);
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(100);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile navigation works
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      // Check if mobile menu opens
      const mobileMenu = page.locator('[data-testid="mobile-menu"]');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should pass accessibility tests', async ({ page }) => {
    // Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Rádio Hotel/);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /Rádio Hotel/);
    
    // Check structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toBeAttached();
  });
});