import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '@/components/ui/custom/BookingForm';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Calendar: () => <div data-testid="calendar">📅</div>,
  Users: () => <div data-testid="users">👥</div>,
  Baby: () => <div data-testid="baby">👶</div>,
  Bed: () => <div data-testid="bed">🛏️</div>,
  Phone: () => <div data-testid="phone">📞</div>,
  X: () => <div data-testid="x">✕</div>,
  ChevronDown: () => <div data-testid="chevron-down">⌄</div>,
  MapPin: () => <div data-testid="map-pin">📍</div>,
  Clock: () => <div data-testid="clock">🕐</div>,
}));

// Mock UI components
vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, value }: any) => (
    <select onChange={(e) => onValueChange(e.target.value)} value={value} data-testid="select">
      {children}
    </select>
  ),
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ children, ...props }: any) => <option {...props}>{children}</option>,
  SelectTrigger: ({ children }: any) => <button>{children}</button>,
  SelectValue: ({ placeholder }: any) => <span>{placeholder}</span>,
}));

vi.mock('@/components/ui/LoadingSpinner', () => ({
  default: () => <div data-testid="loading-spinner">Loading...</div>,
}));

// Mock i18n
vi.mock('@/components/i18n/I18nProvider', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'booking.title': 'Faça sua Reserva',
        'booking.subtitle': 'Selecione as datas e o número de hóspedes',
        'booking.closeForm': 'Fechar',
        'booking.checkIn': 'Check-in',
        'booking.checkOut': 'Check-out',
        'booking.adults': 'Adultos',
        'booking.children': 'Crianças',
        'booking.specialRequestsPlaceholder': 'Observações especiais',
        'booking.summary.title': 'Resumo',
        'booking.summary.period': 'Período',
        'booking.summary.nights': 'Noites',
        'booking.summary.guests': 'Hóspedes',
        'booking.summary.adults': 'adultos',
        'booking.summary.children': 'crianças',
        'booking.validation.checkInRequired': 'Check-in é obrigatório',
        'booking.validation.checkOutRequired': 'Check-out é obrigatório',
        'booking.validation.roomTypeRequired': 'Tipo de quarto é obrigatório',
        'booking.validation.checkOutAfterCheckIn': 'Check-out deve ser posterior ao check-in',
        'booking.validation.checkInPastDate': 'Check-in não pode ser anterior a hoje',
        'booking.selectAccommodation': 'Selecione uma acomodação',
      };
      return translations[key] || key;
    },
  }),
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
    expect(screen.getByText('Faça sua Reserva')).toBeInTheDocument();
    expect(screen.getByLabelText(/check-in/i)).toBeInTheDocument();
  });

  it('validates required fields on submit', async () => {
    render(<BookingForm {...mockProps} />);
    const submitButton = screen.getByText('Enviar Solicitação');
    
    // Clear default dates to test validation
    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check-in é obrigatório')).toBeInTheDocument();
      expect(screen.getByText('Check-out é obrigatório')).toBeInTheDocument();
    });
  });

  it('submits the form and opens whatsapp with correct data', async () => {
    render(<BookingForm {...mockProps} />);
    
    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: '2025-12-25' } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: '2025-12-27' } });
    
    const selects = screen.getAllByTestId('select');
    fireEvent.change(selects[0], { target: { value: '2' } }); // Adults
    
    const submitButton = screen.getByText('Enviar Solicitação');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/'), '_blank');
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining('Standard'), '_blank');
    });
  });

  it('bloqueia check-in anterior a hoje', async () => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const toLocalYYYYMMDD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    render(<BookingForm {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: toLocalYYYYMMDD(yesterday) } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: toLocalYYYYMMDD(tomorrow) } });

    const submitButton = screen.getByText('Enviar Solicitação');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Check-in não pode ser anterior a hoje')).toBeInTheDocument();
    });
  });

  it('permite check-in hoje', async () => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const toLocalYYYYMMDD = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    render(<BookingForm {...mockProps} />);

    fireEvent.change(screen.getByLabelText(/check-in/i), { target: { value: toLocalYYYYMMDD(today) } });
    fireEvent.change(screen.getByLabelText(/check-out/i), { target: { value: toLocalYYYYMMDD(tomorrow) } });

    const submitButton = screen.getByText('Enviar Solicitação');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/'), '_blank');
    });
  });
});