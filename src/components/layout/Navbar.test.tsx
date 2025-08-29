import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
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
    nav: ({ children, ...props }: any) => {
      const { initial, animate, transition, whileHover, ...restProps } = props;
      return <nav {...restProps}>{children}</nav>;
    },
    div: ({ children, ...props }: any) => {
      const { initial, animate, transition, whileHover, ...restProps } = props;
      return <div {...restProps}>{children}</div>;
    },
    button: ({ children, ...props }: any) => {
      const { initial, animate, transition, whileHover, ...restProps } = props;
      return <button {...restProps}>{children}</button>;
    },
    a: ({ children, ...props }: any) => {
      const { initial, animate, transition, whileHover, ...restProps } = props;
      return <a {...restProps}>{children}</a>;
    },
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('Navbar Component', () => {
  it('renders navbar with logo', () => {
    render(<Navbar />);
    
    const logo = screen.getByAltText('Rádio Hotel Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation menu items', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Sobre')).toBeInTheDocument();
    expect(screen.getByText('Acomodações')).toBeInTheDocument();
    expect(screen.getByText('Eventos')).toBeInTheDocument();
    expect(screen.getByText('Contato')).toBeInTheDocument();
  });

  it('renders booking button', () => {
    render(<Navbar />);
 
    const bookingButtons = screen.getAllByText(/reservar agora/i);
    expect(bookingButtons.length).toBeGreaterThan(0);
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />);
    
    const mobileMenuButton = screen.getByLabelText(/abrir menu/i);
    expect(mobileMenuButton).toBeInTheDocument();
    
    fireEvent.click(mobileMenuButton);
    
    // Check if menu items are visible in mobile menu
    const mobileMenuItems = screen.getAllByText('Início');
    expect(mobileMenuItems.length).toBeGreaterThan(1); // Desktop + Mobile
  });

  it('has proper accessibility attributes', () => {
    render(<Navbar />);
    
    const mobileMenuButton = screen.getByLabelText(/abrir menu/i);
    expect(mobileMenuButton).toHaveAttribute('aria-expanded');
    expect(mobileMenuButton).toHaveAttribute('aria-controls');
  });

  it('applies scroll effect classes', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('fixed', 'top-0', 'z-50');
  });
});