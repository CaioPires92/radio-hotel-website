import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '@/app/page';
import { describe, it, expect, vi } from 'vitest';

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock embla-carousel-react
vi.mock('embla-carousel-react', () => ({
  default: () => [{ current: null }, { scrollNext: vi.fn(), scrollPrev: vi.fn(), canScrollNext: () => true, canScrollPrev: () => false }],
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

describe('Homepage Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all main sections', () => {
    render(<HomePage />);
    
    // Check if all main sections are present
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/radio hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/sobre o hotel/i)).toBeInTheDocument();
    expect(screen.getByText(/acomodações/i)).toBeInTheDocument();
    expect(screen.getByText(/eventos/i)).toBeInTheDocument();
  });

  it('opens booking form when navbar booking button is clicked', async () => {
    render(<HomePage />);
    
    const bookingButton = screen.getByRole('button', { name: /reservar agora/i });
    fireEvent.click(bookingButton);
    
    await waitFor(() => {
      expect(screen.getByText('Fazer Reserva')).toBeInTheDocument();
    });
  });

  it('closes booking form when close button is clicked', async () => {
    render(<HomePage />);
    
    // Open booking form
    const bookingButton = screen.getByRole('button', { name: /reservar agora/i });
    fireEvent.click(bookingButton);
    
    await waitFor(() => {
      expect(screen.getByText('Fazer Reserva')).toBeInTheDocument();
    });
    
    // Close booking form
    const closeButton = screen.getByLabelText(/fechar formulário/i);
    fireEvent.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText('Fazer Reserva')).not.toBeInTheDocument();
    });
  });

  it('navigates through accommodation carousel', () => {
    render(<HomePage />);
    
    const nextButton = screen.getByLabelText(/próxima acomodação/i);
    const prevButton = screen.getByLabelText(/acomodação anterior/i);
    
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeInTheDocument();
    
    fireEvent.click(nextButton);
    // Carousel navigation is mocked, so we just verify the buttons exist and are clickable
  });

  it('navigates through events carousel', () => {
    render(<HomePage />);
    
    const nextEventButton = screen.getByLabelText(/próximo evento/i);
    const prevEventButton = screen.getByLabelText(/evento anterior/i);
    
    expect(nextEventButton).toBeInTheDocument();
    expect(prevEventButton).toBeInTheDocument();
    
    fireEvent.click(nextEventButton);
    // Carousel navigation is mocked, so we just verify the buttons exist and are clickable
  });

  it('displays highlights section with proper content', () => {
    render(<HomePage />);
    
    // Check if highlights section exists
    const highlightsSection = screen.getByText(/destaques/i).closest('section');
    expect(highlightsSection).toBeInTheDocument();
  });

  it('shows parallax section with CTA', () => {
    render(<HomePage />);
    
    // Check if parallax section with CTA exists
    const ctaButton = screen.getByText(/reserve sua experiência/i);
    expect(ctaButton).toBeInTheDocument();
  });

  it('renders footer with all sections', () => {
    render(<HomePage />);
    
    // Check footer sections
    expect(screen.getByText(/links rápidos/i)).toBeInTheDocument();
    expect(screen.getByText(/serviços/i)).toBeInTheDocument();
    expect(screen.getByText(/contato/i)).toBeInTheDocument();
  });

  it('handles mobile responsive behavior', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    });
    
    render(<HomePage />);
    
    // Check if mobile menu button exists
    const mobileMenuButton = screen.getByLabelText(/abrir menu/i);
    expect(mobileMenuButton).toBeInTheDocument();
  });

  it('maintains accessibility standards', () => {
    render(<HomePage />);
    
    // Check for proper heading hierarchy
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements.length).toBeGreaterThan(0);
    
    // Check for proper button labels
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label');
    });
  });
});