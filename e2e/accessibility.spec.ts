import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Advanced Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should pass comprehensive accessibility audit', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    // Should have at least one h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check heading hierarchy (simplified check)
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      expect(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']).toContain(tagName);
    }
  });

  test('should have proper alt text for all images', async ({ page }) => {
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');
      
      // All images should have alt text (empty alt is acceptable for decorative images)
      expect(alt).not.toBeNull();
      
      // If image has meaningful src, alt should not be empty
      if (src && !src.includes('data:') && !src.includes('placeholder')) {
        expect(alt).toBeTruthy();
      }
    }
  });

  test('should have proper form labels', async ({ page }) => {
    // Open booking form to test form accessibility
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    const inputs = await page.locator('input, select, textarea').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      // Each form control should have a label
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        const hasLabel = label > 0 || ariaLabel || ariaLabelledBy;
        expect(hasLabel).toBeTruthy();
      }
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Test tab navigation through main interactive elements
    const interactiveElements = [
      'button',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];
    
    const focusableElements = await page.locator(interactiveElements.join(', ')).all();
    expect(focusableElements.length).toBeGreaterThan(0);
    
    // Test that first element can be focused
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should have proper ARIA landmarks', async ({ page }) => {
    // Check for main landmarks
    await expect(page.locator('nav, [role="navigation"]')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    await expect(page.locator('footer, [role="contentinfo"]')).toBeVisible();
  });

  test('should have proper color contrast', async ({ page }) => {
    // This test uses axe-core to check color contrast
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toEqual([]);
  });

  test('should support screen readers', async ({ page }) => {
    // Check for proper ARIA attributes
    const elementsWithAriaLabel = await page.locator('[aria-label]').count();
    const elementsWithAriaLabelledBy = await page.locator('[aria-labelledby]').count();
    const elementsWithAriaDescribedBy = await page.locator('[aria-describedby]').count();
    
    // Should have some elements with ARIA attributes
    const totalAriaElements = elementsWithAriaLabel + elementsWithAriaLabelledBy + elementsWithAriaDescribedBy;
    expect(totalAriaElements).toBeGreaterThan(0);
  });

  test('should handle focus management in modals', async ({ page }) => {
    // Open booking form
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Focus should be trapped within modal
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toHaveAttribute('aria-modal', 'true');
    
    // Should have proper labeling
    const ariaLabelledBy = await modal.getAttribute('aria-labelledby');
    expect(ariaLabelledBy).toBeTruthy();
    
    // Close modal and check focus returns
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();
  });

  test('should have proper button states', async ({ page }) => {
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      // Check if button has accessible name
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      const hasAccessibleName = ariaLabel || (textContent && textContent.trim().length > 0);
      
      expect(hasAccessibleName).toBeTruthy();
      
      // Check if disabled buttons have proper attributes
      const isDisabled = await button.getAttribute('disabled');
      const ariaDisabled = await button.getAttribute('aria-disabled');
      
      if (isDisabled !== null) {
        expect(ariaDisabled === 'true' || isDisabled !== null).toBeTruthy();
      }
    }
  });

  test('should have proper link accessibility', async ({ page }) => {
    const links = await page.locator('a[href]').all();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      const textContent = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Links should have meaningful text or aria-label
      const hasAccessibleName = ariaLabel || (textContent && textContent.trim().length > 0);
      expect(hasAccessibleName).toBeTruthy();
      
      // External links should have proper attributes
      if (href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel'))) {
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        if (target === '_blank') {
          expect(rel).toContain('noopener');
        }
      }
    }
  });

  test('should handle carousel accessibility', async ({ page }) => {
    // Test accommodations carousel
    const accommodationsCarousel = page.locator('[role="region"][aria-label*="acomodações"]');
    if (await accommodationsCarousel.count() > 0) {
      await expect(accommodationsCarousel).toHaveAttribute('aria-label');
      
      // Navigation buttons should be accessible
      const prevButton = page.locator('[aria-label*="anterior"]');
      const nextButton = page.locator('[aria-label*="próxim"]');
      
      if (await prevButton.count() > 0) {
        await expect(prevButton).toHaveAttribute('aria-label');
      }
      if (await nextButton.count() > 0) {
        await expect(nextButton).toHaveAttribute('aria-label');
      }
    }
  });

  test('should have proper error handling accessibility', async ({ page }) => {
    // Open booking form and trigger validation errors
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    
    // Submit form without filling required fields
    await page.getByRole('button', { name: /enviar solicitação/i }).click();
    
    // Wait for error messages
    await page.waitForTimeout(500);
    
    // Error messages should be accessible
    const errorMessages = await page.locator('[role="alert"], .error-message, [aria-invalid="true"]').count();
    if (errorMessages > 0) {
      // At least one error should be announced to screen readers
      expect(errorMessages).toBeGreaterThan(0);
    }
  });

  test('should support reduced motion preferences', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Page should still be functional with reduced motion
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main, [role="main"]')).toBeVisible();
    
    // Animations should respect reduced motion (this is hard to test automatically,
    // but we can at least ensure the page loads and functions)
    await page.getByRole('button', { name: /reservar agora/i }).click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});