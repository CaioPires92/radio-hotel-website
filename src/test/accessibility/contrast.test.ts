import { describe, it, expect } from 'vitest';

// Utility function to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 0;
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Color palette from the design system
const colors = {
  navy: '#0a0d29',
  blue: '#16446e',
  gold: '#b2ab70',
  cream: '#f6f5f1',
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  }
};

describe('Color Contrast Accessibility Tests', () => {
  describe('WCAG AA Compliance (4.5:1 ratio)', () => {
    it('navy text on cream background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('navy text on white background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.white);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('blue text on cream background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.blue, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('blue text on white background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.blue, colors.white);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('white text on navy background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.white, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('white text on blue background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.white, colors.blue);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('cream text on navy background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.cream, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('WCAG AAA Compliance (7:1 ratio)', () => {
    it('navy text on white background should meet AAA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.white);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('white text on navy background should meet AAA standards', () => {
      const ratio = getContrastRatio(colors.white, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('black text on white background should meet AAA standards', () => {
      const ratio = getContrastRatio(colors.black, colors.white);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });
  });

  describe('Large Text Compliance (3:1 ratio)', () => {
    it('gold text on navy background should meet large text standards', () => {
      const ratio = getContrastRatio(colors.gold, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });

    it('gold text on blue background should meet large text standards', () => {
      const ratio = getContrastRatio(colors.gold, colors.blue);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });

    it('cream text on blue background should meet large text standards', () => {
      const ratio = getContrastRatio(colors.cream, colors.blue);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Button and Interactive Elements', () => {
    it('primary button (navy background, white text) should meet AA standards', () => {
      const ratio = getContrastRatio(colors.white, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('secondary button (gold background, navy text) should meet AA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.gold);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('link text (blue) on cream background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.blue, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Form Elements', () => {
    it('form labels (navy) on cream background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('placeholder text (gray-500) on white background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.gray[500], colors.white);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('error text (red would be tested here, using navy as fallback)', () => {
      const ratio = getContrastRatio(colors.navy, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Navigation Elements', () => {
    it('navigation text (white) on navy background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.white, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('active navigation item (gold) on navy background should meet large text standards', () => {
      const ratio = getContrastRatio(colors.gold, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Content Areas', () => {
    it('body text (navy) on cream background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('heading text (navy) on white background should meet AAA standards', () => {
      const ratio = getContrastRatio(colors.navy, colors.white);
      expect(ratio).toBeGreaterThanOrEqual(7);
    });

    it('subtitle text (blue) on cream background should meet AA standards', () => {
      const ratio = getContrastRatio(colors.blue, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Utility Functions', () => {
    it('should correctly convert hex to RGB', () => {
      const rgb = hexToRgb('#ffffff');
      expect(rgb).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should calculate correct luminance for white', () => {
      const luminance = getLuminance(255, 255, 255);
      expect(luminance).toBe(1);
    });

    it('should calculate correct luminance for black', () => {
      const luminance = getLuminance(0, 0, 0);
      expect(luminance).toBe(0);
    });

    it('should calculate correct contrast ratio for black and white', () => {
      const ratio = getContrastRatio('#000000', '#ffffff');
      expect(ratio).toBe(21);
    });
  });
});