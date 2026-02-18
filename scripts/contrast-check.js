// Script para verificar contraste de cores
// Executa: node scripts/contrast-check.js

// Função para calcular luminância relativa
function getLuminance(hex) {
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
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// Cores do design system
const colors = {
  navy: '#0D1B4C',
  blue: '#16446e',
  gold: '#C5A253',
  goldOnLight: '#7D6436',
  cream: '#F5F5F5',
  white: '#ffffff',
  black: '#000000',
  grayLight: '#f3f4f6',
  grayDark: '#374151'
};

console.log('🎨 RELATÓRIO DE CONTRASTE - Radio Hotel\n');
console.log('='.repeat(60));

// Testa combinações principais
const testCombinations = [
  { fg: 'white', bg: 'navy', context: 'Texto Hero/Footer', severity: 'critical' },
  { fg: 'navy', bg: 'cream', context: 'Texto principal', severity: 'critical' },
  { fg: 'navy', bg: 'white', context: 'Texto em cards', severity: 'critical' },
  { fg: 'gold', bg: 'navy', context: 'Destaques/CTAs em fundo escuro', severity: 'critical' },
  { fg: 'white', bg: 'blue', context: 'Botões secundários', severity: 'critical' },
  { fg: 'goldOnLight', bg: 'cream', context: 'Destaques em fundo claro', severity: 'critical' },
  { fg: 'navy', bg: 'gold', context: 'Texto escuro em dourado', severity: 'critical' },
  { fg: 'white', bg: 'cream', context: 'Decorativo apenas (não usar para texto)', severity: 'advisory' },
  { fg: 'gold', bg: 'cream', context: 'Decorativo apenas (usar goldOnLight para texto)', severity: 'advisory' }
];

let passedTests = 0;
let totalTests = testCombinations.length;
let criticalIssues = [];
let advisoryIssues = [];

console.log('\n📊 ANÁLISE DE COMBINAÇÕES:\n');

testCombinations.forEach(({ fg, bg, context, severity }) => {
  const ratio = getContrastRatio(colors[fg], colors[bg]);
  let level = '❌ Inadequado';
  let status = '❌';

  if (ratio >= 7) {
    level = '🏆 AAA (Excelente)';
    status = '✅';
    passedTests++;
  } else if (ratio >= 4.5) {
    level = '✅ AA (Bom)';
    status = '✅';
    passedTests++;
  } else if (ratio >= 3) {
    level = '⚠️  AA Large (Apenas texto grande)';
    status = '⚠️ ';
  } else {
    if (severity === 'critical') {
      criticalIssues.push({ fg, bg, context, ratio });
    } else {
      advisoryIssues.push({ fg, bg, context, ratio });
      status = 'ℹ️ ';
      level = 'Informativo (combinação não recomendada para texto)';
      passedTests++;
    }
  }

  console.log(`${status} ${fg.toUpperCase()}/${bg.toUpperCase()}: ${ratio.toFixed(2)} - ${level}`);
  console.log(`   Contexto: ${context}`);
  console.log('');
});

console.log('='.repeat(60));
console.log(`\n📈 RESUMO: ${passedTests}/${totalTests} combinações aprovadas\n`);

if (criticalIssues.length > 0) {
  console.log('🚨 PROBLEMAS CRÍTICOS ENCONTRADOS:\n');
  criticalIssues.forEach(issue => {
    console.log(`❌ ${issue.fg.toUpperCase()}/${issue.bg.toUpperCase()} (${issue.ratio.toFixed(2)})`);
    console.log(`   ${issue.context}`);
    console.log(`   ⚡ AÇÃO: Evitar esta combinação ou usar apenas para elementos decorativos\n`);
  });
}

if (advisoryIssues.length > 0) {
  console.log('ℹ️  COMBINAÇÕES INFORMATIVAS (NÃO RECOMENDADAS PARA TEXTO):\n');
  advisoryIssues.forEach(issue => {
    console.log(`ℹ️  ${issue.fg.toUpperCase()}/${issue.bg.toUpperCase()} (${issue.ratio.toFixed(2)})`);
    console.log(`   ${issue.context}`);
    console.log('   ✅ Permitido apenas para elementos decorativos/ícones sem conteúdo textual crítico\n');
  });
}

console.log('\n🎯 RECOMENDAÇÕES PARA O DESIGN SYSTEM:\n');
console.log('✅ USAR SEMPRE:');
console.log('   • Texto branco em fundo navy/blue (contraste excelente)');
console.log('   • Texto navy em fundo cream/white (contraste adequado)');
console.log('   • Texto gold em fundo navy (contraste adequado)');

console.log('\n⚠️  USAR COM CUIDADO:');
console.log('   • Texto gold em fundo cream (usar goldOnLight para texto pequeno)');
console.log('   • Sempre testar em dispositivos reais');

console.log('\n❌ NUNCA USAR:');
console.log('   • Texto branco em fundo cream/white');
console.log('   • Texto claro em fundos claros');

console.log('\n🔧 FERRAMENTAS DE VERIFICAÇÃO:');
console.log('   • Execute: node scripts/contrast-check.js');
console.log('   • Use extensões de acessibilidade no navegador');
console.log('   • Teste com usuários reais');

console.log('\n' + '='.repeat(60));

if (criticalIssues.length === 0) {
  console.log('🎉 PARABÉNS! Nenhum problema crítico de contraste encontrado!');
  process.exit(0);
} else {
  console.log(`⚠️  ${criticalIssues.length} problema(s) crítico(s) encontrado(s). Revisar antes do deploy.`);
  process.exit(1);
}
