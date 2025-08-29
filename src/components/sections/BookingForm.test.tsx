import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingForm } from './BookingForm';
import { describe, it, expect, vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock window.open
Object.defineProperty(window, 'open', {
  writable: true,
  value: vi.fn(),
});

describe('BookingForm Component', () => {
  const mockProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders booking form when open', () => {
    render(<BookingForm {...mockProps} />);
    
    expect(screen.getByText('Fazer Reserva')).toBeInTheDocument();
    expect(screen.getByLabelText(/check-in/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/check-out/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/adultos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/crianças/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<BookingForm {...mockProps} isOpen={false} />);
    
    expect(screen.queryByText('Fazer Reserva')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<BookingForm {...mockProps} />);
    
    const closeButton = screen.getByLabelText(/fechar formulário/i);
    fireEvent.click(closeButton);
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('validates required fields', async () => {
    render(<BookingForm {...mockProps} />);
    
    const submitButton = screen.getByRole('button', { name: /enviar solicitação/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/check-in é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/check-out é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('validates check-out date is after check-in', async () => {
    render(<BookingForm {...mockProps} />);
    
    const checkInInput = screen.getByLabelText(/check-in/i);
    const checkOutInput = screen.getByLabelText(/check-out/i);
    
    fireEvent.change(checkInInput, { target: { value: '2024-12-25' } });
    fireEvent.change(checkOutInput, { target: { value: '2024-12-20' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar solicitação/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/check-out deve ser posterior ao check-in/i)).toBeInTheDocument();
    });
  });

  it('shows children age fields when children count > 0', () => {
    render(<BookingForm {...mockProps} />);
    
    const childrenSelect = screen.getByLabelText(/crianças/i);
    fireEvent.change(childrenSelect, { target: { value: '2' } });
    
    expect(screen.getByLabelText(/idade da criança 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/idade da criança 2/i)).toBeInTheDocument();
  });

  it('submits form with valid data and opens WhatsApp', async () => {
    render(<BookingForm {...mockProps} />);
    
    // Fill form with valid data
    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '2024-12-25' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '2024-12-27' } });
    fireEvent.change(screen.getByLabelText(/adultos/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/tipo de quarto/i), { target: { value: 'standard' } });
    
    const submitButton = screen.getByRole('button', { name: /enviar solicitação/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(
        expect.stringContaining('https://wa.me/'),
        '_blank'
      );
    });
  });

  it('has proper accessibility attributes', () => {
    render(<BookingForm {...mockProps} />);
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby');
  });
});