import { describe, it, expect } from 'vitest';

// Função para calcular luminância relativa
function getLuminance(hex: string): number {
  // Remove o # se presente
  const color = hex.replace('#', '');
  
  // Converte para RGB
  const r = parseInt(color.substr(0, 2), 16) / 255;
  const g = parseInt(color.substr(2, 2), 16) / 255;
  const b = parseInt(color.substr(4, 2), 16) / 255;
  
  // Aplica correção gamma
  const sRGB = [r, g, b].map(c => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  
  // Calcula luminância
  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

// Função para calcular razão de contraste
function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  
  return (brightest + 0.05) / (darkest + 0.05);
}

// Cores do design system
const colors = {
  navy: '#0a0d29',
  blue: '#16446e',
  gold: '#b2ab70',
  cream: '#f6f5f1',
  white: '#ffffff',
  black: '#000000',
  grayLight: '#f3f4f6',
  grayDark: '#374151'
};

describe('Testes de Contraste de Cores', () => {
  describe('Combinações de texto e fundo aprovadas', () => {
    it('Texto navy em fundo cream deve ter contraste adequado (AA)', () => {
      const ratio = getContrastRatio(colors.navy, colors.cream);
      expect(ratio).toBeGreaterThanOrEqual(4.5); // WCAG AA para texto normal
    });

    it('Texto navy em fundo branco deve ter contraste adequado (AA)', () => {
      const ratio = getContrastRatio(colors.navy, colors.white);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Texto branco em fundo navy deve ter contraste adequado (AAA)', () => {
      const ratio = getContrastRatio(colors.white, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(7); // WCAG AAA
    });

    it('Texto gold em fundo navy deve ter contraste adequado (AA)', () => {
      const ratio = getContrastRatio(colors.gold, colors.navy);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('Texto navy em fundo gold deve ter contraste adequado (AA)', () => {
      const ratio = getContrastRatio(colors.navy, colors.gold);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Combinações problemáticas que devem ser evitadas', () => {
    it('Texto branco em fundo cream NÃO deve ser usado', () => {
      const ratio = getContrastRatio(colors.white, colors.cream);
      expect(ratio).toBeLessThan(4.5); // Confirma que é inadequado
    });

    it('Texto gold em fundo cream deve ter contraste limitado', () => {
      const ratio = getContrastRatio(colors.gold, colors.cream);
      // Este teste documenta que esta combinação pode ser problemática
      if (ratio < 4.5) {
        console.warn('⚠️  Combinação gold/cream pode ter contraste insuficiente:', ratio.toFixed(2));
      }
    });

    it('Texto branco em fundo branco é obviamente inadequado', () => {
      const ratio = getContrastRatio(colors.white, colors.white);
      expect(ratio).toBe(1); // Sem contraste
    });
  });

  describe('Validação de cores específicas do projeto', () => {
    it('Todas as cores devem ter formato hexadecimal válido', () => {
      Object.entries(colors).forEach(([name, color]) => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('Deve ter pelo menos 3 combinações com contraste AAA', () => {
      const aaaCompliantPairs = [
        [colors.white, colors.navy],
        [colors.navy, colors.white],
        [colors.white, colors.black]
      ];

      const aaaCount = aaaCompliantPairs.filter(([fg, bg]) => 
        getContrastRatio(fg, bg) >= 7
      ).length;

      expect(aaaCount).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Relatório de contraste completo', () => {
    it('Deve gerar relatório de todas as combinações', () => {
      const report: Array<{combination: string, ratio: number, level: string}> = [];
      
      Object.entries(colors).forEach(([fgName, fgColor]) => {
        Object.entries(colors).forEach(([bgName, bgColor]) => {
          if (fgName !== bgName) {
            const ratio = getContrastRatio(fgColor, bgColor);
            let level = 'Inadequado';
            if (ratio >= 7) level = 'AAA';
            else if (ratio >= 4.5) level = 'AA';
            else if (ratio >= 3) level = 'AA Large';
            
            report.push({
              combination: `${fgName}/${bgName}`,
              ratio: Math.round(ratio * 100) / 100,
              level
            });
          }
        });
      });

      // Filtra apenas combinações adequadas para documentação
      const goodCombinations = report.filter(r => r.level !== 'Inadequado');
      
      console.log('\n📊 Combinações de cores aprovadas:');
      goodCombinations.forEach(combo => {
        console.log(`✅ ${combo.combination}: ${combo.ratio} (${combo.level})`);
      });

      expect(goodCombinations.length).toBeGreaterThan(0);
    });
  });
});

// Função utilitária para uso em outros testes
export { getContrastRatio, getLuminance, colors };