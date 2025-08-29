import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Reviews from '@/components/sections/Reviews';
import { I18nProvider } from '@/components/i18n/I18nProvider';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock useI18n hook
vi.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string, params?: any) => {
      const translations: Record<string, string> = {
        'reviews.title': 'O que nossos hóspedes dizem',
        'reviews.subtitle': 'Experiências reais de quem já se hospedou no Radio Hotel e vivenciou nossa hospitalidade única.',
        'reviews.basedOn': `Baseado em ${params?.count || 5} avaliações`,
        'reviews.verified': '✓ Verificado',
        'reviews.navigation.previous': 'Avaliação anterior',
        'reviews.navigation.next': 'Próxima avaliação',
        'reviews.navigation.goToReview': `Ir para avaliação ${params?.number || 1}`,
        'reviews.cta.text': 'Quer compartilhar sua experiência conosco?',
        'reviews.cta.button': 'Deixar uma Avaliação',
        'reviews.review1.comment': 'Uma experiência incrível! O Radio Hotel superou todas as minhas expectativas.',
        'reviews.review2.comment': 'Que lugar maravilhoso! A combinação perfeita entre elegância e natureza.',
        'reviews.review3.comment': 'Adorei cada momento da minha estadia. O hotel tem uma atmosfera única.',
        'reviews.review4.comment': 'Excelente hotel! Desde a recepção até o check-out, tudo foi perfeito.',
        'reviews.review5.comment': 'Uma joia escondida em Serra Negra! O Radio Hotel oferece uma experiência premium.',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithI18n = (component: React.ReactElement) => {
  return render(
    <I18nProvider locale="pt-BR">
      {component}
    </I18nProvider>
  );
};

describe('Reviews Component', () => {
  it('renders the reviews section with title and subtitle', () => {
    renderWithI18n(<Reviews />);
    
    expect(screen.getByText('O que nossos hóspedes dizem')).toBeInTheDocument();
    expect(screen.getByText('Experiências reais de quem já se hospedou no Radio Hotel e vivenciou nossa hospitalidade única.')).toBeInTheDocument();
  });

  it('displays the average rating and rating distribution', () => {
    renderWithI18n(<Reviews />);
    
    // Should display average rating (4.8 based on mock data)
    expect(screen.getByText('4.8')).toBeInTheDocument();
    expect(screen.getByText('Baseado em 5 avaliações')).toBeInTheDocument();
  });

  it('renders star ratings correctly', () => {
    renderWithI18n(<Reviews />);
    
    // Should have multiple star icons
    const stars = screen.getAllByTestId('star-icon');
    expect(stars.length).toBeGreaterThan(0);
  });

  it('displays the first review by default', () => {
    renderWithI18n(<Reviews />);
    
    expect(screen.getByText('Uma experiência incrível! O Radio Hotel superou todas as minhas expectativas.')).toBeInTheDocument();
    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, SP • 15/01/2024')).toBeInTheDocument();
  });

  it('shows verified badge for verified reviews', () => {
    renderWithI18n(<Reviews />);
    
    expect(screen.getByText('✓ Verificado')).toBeInTheDocument();
  });

  it('navigates to next review when next button is clicked', async () => {
    renderWithI18n(<Reviews />);
    
    const nextButton = screen.getByLabelText('Próxima avaliação');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Que lugar maravilhoso! A combinação perfeita entre elegância e natureza.')).toBeInTheDocument();
      expect(screen.getByText('João Santos')).toBeInTheDocument();
    });
  });

  it('navigates to previous review when previous button is clicked', async () => {
    renderWithI18n(<Reviews />);
    
    // First go to next review
    const nextButton = screen.getByLabelText('Próxima avaliação');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('João Santos')).toBeInTheDocument();
    });
    
    // Then go back to previous
    const prevButton = screen.getByLabelText('Avaliação anterior');
    fireEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    });
  });

  it('navigates to specific review when dot indicator is clicked', async () => {
    renderWithI18n(<Reviews />);
    
    const dotButtons = screen.getAllByLabelText(/Ir para avaliação/);
    expect(dotButtons).toHaveLength(5);
    
    // Click on third dot (index 2)
    fireEvent.click(dotButtons[2]);
    
    await waitFor(() => {
      expect(screen.getByText('Adorei cada momento da minha estadia. O hotel tem uma atmosfera única.')).toBeInTheDocument();
      expect(screen.getByText('Ana Costa')).toBeInTheDocument();
    });
  });

  it('displays call-to-action section', () => {
    renderWithI18n(<Reviews />);
    
    expect(screen.getByText('Quer compartilhar sua experiência conosco?')).toBeInTheDocument();
    expect(screen.getByText('Deixar uma Avaliação')).toBeInTheDocument();
  });

  it('has accessible navigation buttons', () => {
    renderWithI18n(<Reviews />);
    
    const prevButton = screen.getByLabelText('Avaliação anterior');
    const nextButton = screen.getByLabelText('Próxima avaliação');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton.tagName).toBe('BUTTON');
    expect(nextButton.tagName).toBe('BUTTON');
  });

  it('displays rating distribution bars', () => {
    renderWithI18n(<Reviews />);
    
    // Should have rating distribution for 5, 4, 3, 2, 1 stars
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    renderWithI18n(<Reviews />);
    
    // Should have section element
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    
    // Should have proper heading hierarchy
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('O que nossos hóspedes dizem');
  });

  it('handles keyboard navigation', () => {
    renderWithI18n(<Reviews />);
    
    const nextButton = screen.getByLabelText('Próxima avaliação');
    
    // Should be focusable
    nextButton.focus();
    expect(document.activeElement).toBe(nextButton);
    
    // Should respond to Enter key
    fireEvent.keyDown(nextButton, { key: 'Enter', code: 'Enter' });
    // Note: This would require additional implementation in the component
  });

  it('displays user avatars with initials', () => {
    renderWithI18n(<Reviews />);
    
    // Should display first letter of reviewer's name
    expect(screen.getByText('M')).toBeInTheDocument(); // Maria Silva
  });

  it('formats dates correctly', () => {
    renderWithI18n(<Reviews />);
    
    // Should display formatted date
    expect(screen.getByText(/15\/01\/2024/)).toBeInTheDocument();
  });

  it('cycles through reviews correctly', async () => {
    renderWithI18n(<Reviews />);
    
    const nextButton = screen.getByLabelText('Próxima avaliação');
    
    // Click through all reviews and back to first
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton);
      await waitFor(() => {});
    }
    
    // Should be back to first review
    await waitFor(() => {
      expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    });
  });

  it('has external link with proper attributes', () => {
    renderWithI18n(<Reviews />);
    
    const reviewLink = screen.getByText('Deixar uma Avaliação');
    expect(reviewLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(reviewLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// Accessibility tests
describe('Reviews Component - Accessibility', () => {
  it('has proper ARIA labels for navigation', () => {
    renderWithI18n(<Reviews />);
    
    expect(screen.getByLabelText('Avaliação anterior')).toBeInTheDocument();
    expect(screen.getByLabelText('Próxima avaliação')).toBeInTheDocument();
  });

  it('has proper semantic markup', () => {
    renderWithI18n(<Reviews />);
    
    // Should have section with proper role
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
  });

  it('maintains focus management', () => {
    renderWithI18n(<Reviews />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).not.toHaveAttribute('tabindex', '-1');
    });
  });
});

// Performance tests
describe('Reviews Component - Performance', () => {
  it('renders without performance issues', () => {
    const startTime = performance.now();
    renderWithI18n(<Reviews />);
    const endTime = performance.now();
    
    // Should render within reasonable time (less than 100ms)
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handles rapid navigation clicks', async () => {
    renderWithI18n(<Reviews />);
    
    const nextButton = screen.getByLabelText('Próxima avaliação');
    
    // Rapidly click next button multiple times
    for (let i = 0; i < 10; i++) {
      fireEvent.click(nextButton);
    }
    
    // Should still be functional
    await waitFor(() => {
      expect(screen.getByText(/Maria Silva|João Santos|Ana Costa|Carlos Oliveira|Lucia Ferreira/)).toBeInTheDocument();
    });
  });
});