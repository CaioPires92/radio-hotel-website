'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  Baby,
  Bed,
  Phone,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useTranslation } from '@/components/i18n/I18nProvider';
import { WHATSAPP_NUMBER } from '@/lib/config';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  // Debug log (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('BookingForm - isOpen:', isOpen);
  }
  const { t } = useTranslation();

  // =====================
  // Helpers de Data (pt-BR)
  // =====================
  const pad2 = (n: number) => String(n).padStart(2, '0');

  const isoToDisplay = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    const dd = pad2(d.getDate());
    const mm = pad2(d.getMonth() + 1);
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const displayToISO = (display?: string) => {
    if (!display) return '';
    const digits = display.replace(/\D/g, '').slice(0, 8);
    if (digits.length < 8) return '';
    const dd = parseInt(digits.slice(0, 2), 10);
    const mm = parseInt(digits.slice(2, 4), 10);
    const yyyy = parseInt(digits.slice(4, 8), 10);
    const test = new Date(yyyy, mm - 1, dd);
    const valid = test.getFullYear() === yyyy && (test.getMonth() + 1) === mm && test.getDate() === dd;
    if (!valid) return '';
    return `${yyyy}-${pad2(mm)}-${pad2(dd)}`;
  };

  const maskDisplay = (value: string) => {
    const onlyDigits = value.replace(/\D/g, '').slice(0, 8);
    let out = '';
    if (onlyDigits.length > 0) out += onlyDigits.slice(0, 2);
    if (onlyDigits.length >= 3) out += '/' + onlyDigits.slice(2, 4);
    if (onlyDigits.length >= 5) out += '/' + onlyDigits.slice(4, 8);
    return out.replace(/\/{2,}/g, '/');
  };

  const addDaysISO = (iso: string, days: number) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  // Get today and tomorrow dates in YYYY-MM-DD format
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return {
      checkIn: today.toISOString().split('T')[0],
      checkOut: tomorrow.toISOString().split('T')[0]
    };
  };
  
  const [formData, setFormData] = useState(() => {
    const defaultDates = getDefaultDates();
    return {
      checkIn: defaultDates.checkIn,
      checkOut: defaultDates.checkOut,
      adults: '2',
      children: '0',
      childrenAges: [] as string[],
      roomType: '',
      specialRequests: '',
    };
  });

  // Estados de exibição (dd/mm/aaaa) para evitar // e manter ISO internamente
  const [checkInDisplay, setCheckInDisplay] = useState('');
  const [checkOutDisplay, setCheckOutDisplay] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const checkInPickerRef = useRef<HTMLInputElement>(null);
  const checkOutPickerRef = useRef<HTMLInputElement>(null);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const checkInPopRef = useRef<HTMLDivElement>(null);
  const checkOutPopRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus management - focus first input when modal opens
      const firstInput = document.querySelector('#booking-form input, #booking-form select') as HTMLElement;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Inicializa displays quando o componente monta e quando datas mudam
  useEffect(() => {
    setCheckInDisplay(isoToDisplay(formData.checkIn));
    setCheckOutDisplay(isoToDisplay(formData.checkOut));
  }, []);

  // Atualiza display quando formData é alterado programaticamente
  useEffect(() => {
    setCheckInDisplay(isoToDisplay(formData.checkIn));
  }, [formData.checkIn]);

  useEffect(() => {
    setCheckOutDisplay(isoToDisplay(formData.checkOut));
  }, [formData.checkOut]);

  // Garante que o check-out seja sempre após o check-in
  useEffect(() => {
    if (!formData.checkIn) return;
    const minCheckOut = addDaysISO(formData.checkIn, 1);
    const checkOut = formData.checkOut;
    if (!checkOut || new Date(checkOut) <= new Date(formData.checkIn)) {
      setFormData(prev => ({ ...prev, checkOut: minCheckOut }));
      setCheckOutDisplay(isoToDisplay(minCheckOut));
      setErrors(prev => { const n = { ...prev }; delete n.checkOut; return n; });
    }
  }, [formData.checkIn]);

  const roomTypes = [
    { value: 'standard', label: t('booking.roomTypes.standard'), price: 100 },
    { value: 'deluxe', label: t('booking.roomTypes.deluxe'), price: 150 },
    { value: 'suite-master', label: t('booking.roomTypes.suiteMaster'), price: 200 },
    { value: 'suite-familia', label: t('booking.roomTypes.suiteFamily'), price: 250 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Handle children ages array
    if (field === 'children') {
      const childrenCount = parseInt(value) || 0;
      const ages = Array(childrenCount).fill('');
      setFormData(prev => ({ ...prev, childrenAges: ages }));
    }

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChildAgeChange = (index: number, age: string) => {
    const newAges = [...formData.childrenAges];
    newAges[index] = age;
    setFormData(prev => ({ ...prev, childrenAges: newAges }));

    // Clear children ages error when user starts typing
    if (errors.childrenAges) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.childrenAges;
        return newErrors;
      });
    }
  };

  const calculateNights = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const selectedRoom = roomTypes.find(room => room.value === formData.roomType);
    return nights * (selectedRoom?.price || 0);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    // Sanitiza barras duplicadas caso algum ambiente/localização gere //
    return formatted.replace(/\/{2,}/g, '/');
  };

  // Validação de intervalo
  const withinRange = (iso: string, minIso?: string, maxIso?: string) => {
    if (!iso) return false;
    const d = new Date(iso);
    if (isNaN(d.getTime())) return false;
    if (minIso) {
      const min = new Date(minIso);
      if (d < min) return false;
    }
    if (maxIso) {
      const max = new Date(maxIso);
      if (d > max) return false;
    }
    return true;
  };

  // Fechar popovers ao clicar fora ou pressionar ESC
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (checkInOpen && checkInPopRef.current && !checkInPopRef.current.contains(t)) {
        setCheckInOpen(false);
      }
      if (checkOutOpen && checkOutPopRef.current && !checkOutPopRef.current.contains(t)) {
        setCheckOutOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCheckInOpen(false);
        setCheckOutOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown, true);
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('mousedown', onDown, true);
      document.removeEventListener('keydown', onKey, true);
    };
  }, [checkInOpen, checkOutOpen]);

  // Componente simples de calendário
  const DatePopover = ({
    anchorRef,
    containerRef,
    isOpen,
    selectedIso,
    minIso,
    onSelect,
  }: {
    anchorRef?: React.RefObject<HTMLElement>;
    containerRef: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
    selectedIso?: string;
    minIso?: string;
    onSelect: (iso: string) => void;
  }) => {
    if (!isOpen) return null;
    const base = selectedIso ? new Date(selectedIso) : (minIso ? new Date(minIso) : new Date());
    const [viewYear, setViewYear] = useState(base.getFullYear());
    const [viewMonth, setViewMonth] = useState(base.getMonth());

    const firstDay = new Date(viewYear, viewMonth, 1);
    const lastDay = new Date(viewYear, viewMonth + 1, 0);
    const startWeekday = firstDay.getDay(); // 0..6
    const daysInMonth = lastDay.getDate();
    const weeks: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) weeks.push(null);
    for (let d = 1; d <= daysInMonth; d++) weeks.push(new Date(viewYear, viewMonth, d));

    const header = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(firstDay);
    const weekdayShort = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Dom..Sáb simplificado

    const isDisabled = (d?: Date | null) => {
      if (!d) return true;
      if (!minIso) return false;
      const min = new Date(minIso);
      return d < min;
    };

    const isSelected = (d?: Date | null) => {
      if (!d || !selectedIso) return false;
      const di = new Date(selectedIso);
      return d.getFullYear() === di.getFullYear() && d.getMonth() === di.getMonth() && d.getDate() === di.getDate();
    };

    const isToday = (d?: Date | null) => {
      if (!d) return false;
      const t = new Date();
      return d.getFullYear() === t.getFullYear() && d.getMonth() === t.getMonth() && d.getDate() === t.getDate();
    };

    const toIso = (d: Date) => d.toISOString().split('T')[0];

    const prevMonth = () => {
      const m = new Date(viewYear, viewMonth - 1, 1);
      setViewYear(m.getFullYear());
      setViewMonth(m.getMonth());
    };
    const nextMonth = () => {
      const m = new Date(viewYear, viewMonth + 1, 1);
      setViewYear(m.getFullYear());
      setViewMonth(m.getMonth());
    };

    return (
      <div ref={containerRef} className="absolute z-50 mt-2 w-72 rounded-xl bg-white shadow-2xl border border-gray-200 p-3">
        <div className="flex items-center justify-between mb-2">
          <button type="button" onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Mês anterior">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-sm font-semibold capitalize">{header}</div>
          <button type="button" onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Próximo mês">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-1">
          {weekdayShort.map((w, i) => (
            <div key={i} className="py-1">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {weeks.map((d, idx) => {
            const disabled = isDisabled(d || undefined);
            const selected = isSelected(d || undefined);
            const today = isToday(d || undefined);
            return (
              <button
                key={idx}
                type="button"
                disabled={disabled || !d}
                onClick={() => d && onSelect(toIso(d))}
                className={[
                  'h-9 rounded-md text-sm',
                  d ? 'hover:bg-gold/20' : '',
                  disabled ? 'text-gray-300 cursor-not-allowed hover:bg-transparent' : 'text-navy',
                  selected ? 'bg-gold text-navy font-semibold' : '',
                  today && !selected ? 'ring-1 ring-gold/60' : ''
                ].join(' ')}
              >
                {d ? d.getDate() : ''}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const newErrors: { [key: string]: string } = {};

    if (!formData.checkIn) {
      newErrors.checkIn = t('booking.validation.checkInRequired');
    }

    if (!formData.checkOut) {
      newErrors.checkOut = t('booking.validation.checkOutRequired');
    }

    if (!formData.roomType) {
      newErrors.roomType = t('booking.validation.roomTypeRequired');
    }

    // Validate date logic
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkInDate < today) {
        newErrors.checkIn = t('booking.validation.checkInPastDate');
      }

      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = t('booking.validation.checkOutAfterCheckIn');
      }
    }

    // Validate children ages if children > 0
    if (parseInt(formData.children) > 0) {
      const missingAges = formData.childrenAges.some(age => !age);
      if (missingAges) {
        newErrors.childrenAges = t('booking.validation.childrenAgesRequired');
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Create WhatsApp message
    const selectedRoom = roomTypes.find(room => room.value === formData.roomType);
    const nights = calculateNights();
    const total = calculateTotal();

    let message = `🏨 *${t('booking.whatsapp.title')}*\n\n`;
    message = message.replace(/\\n/g, "\n");
    message += `📅 *${t('booking.whatsapp.checkIn')}:* ${formatDate(formData.checkIn)}\n`;
    message += `📅 *${t('booking.whatsapp.checkOut')}:* ${formatDate(formData.checkOut)}\n`;
    message += `🌙 *${t('booking.whatsapp.nights')}:* ${nights}\n\n`;
    message += `👥 *${t('booking.whatsapp.guests')}:*\n`;
    message += `• ${t('booking.whatsapp.adults')}: ${formData.adults}\n`;
    message += `• ${t('booking.whatsapp.children')}: ${formData.children}\n`;

    if (formData.childrenAges.length > 0 && formData.childrenAges.some(age => age)) {
      message += `• ${t('booking.whatsapp.childrenAges')}: ${formData.childrenAges.filter(age => age).join(', ')} ${t('booking.whatsapp.years')}\n`;
    }

    message += `\n🛏️ *${t('booking.whatsapp.accommodation')}:* ${selectedRoom?.label}\n`;
    message += `💰 *${t('booking.whatsapp.estimatedValue')}:* ${t('booking.currency')} ${total.toLocaleString('pt-BR')}\n`;

    if (formData.specialRequests) {
      message += `\n📝 *${t('booking.whatsapp.observations')}:* ${formData.specialRequests}\n`;
    }

    message += `\n✨ ${t('booking.whatsapp.confirmation')}.`;

    // Normaliza quebras de linha (caso strings tenham sido escapadas como \\n)
    message = message.replace(/\\n/g, "\n");

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Reset form and close
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      setFormData({
        checkIn: '',
        checkOut: '',
        adults: '2',
        children: '0',
        childrenAges: [],
        roomType: '',
        specialRequests: '',
      });
    }, 1000);
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const openCheckInPicker = () => {
    const el = checkInPickerRef.current as any;
    if (el && typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      const v = document.getElementById('check-in-input');
      (v as HTMLInputElement | null)?.focus?.();
    }
  };

  const openCheckOutPicker = () => {
    const el = checkOutPickerRef.current as any;
    if (el && typeof el.showPicker === 'function') {
      el.showPicker();
    } else {
      const v = document.getElementById('check-out-input');
      (v as HTMLInputElement | null)?.focus?.();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Form Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Card
              id="booking-form"
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-form-title"
            >
              <CardHeader className="bg-gradient-to-r from-navy to-blue text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gold"
                  aria-label={t('booking.closeForm')}
                  tabIndex={0}
                >
                  <X className="w-5 h-5" />
                </button>

                <CardTitle id="booking-form-title" className="text-2xl font-serif flex items-center space-x-2">
                  <Calendar className="w-6 h-6 text-gold" />
                  <span>{t('booking.title')}</span>
                </CardTitle>

                <p className="text-white/95 mt-2 text-sm md:text-base leading-tight">
                  {t('booking.subtitle')}
                </p>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="check-in-input" className="block text-sm font-medium text-navy mb-2 cursor-pointer" onClick={() => document.getElementById('check-in-input')?.focus()}>
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {t('booking.checkIn')} *
                      </label>
                      <div className="relative">
                        <input
                          id="check-in-input"
                          type="text"
                          inputMode="numeric"
                          placeholder="dd/mm/aaaa"
                          lang="pt-BR"
                          value={checkInDisplay}
                          onChange={(e) => {
                            const masked = maskDisplay(e.target.value);
                            setCheckInDisplay(masked);
                            // Converte para ISO quando completo
                            const iso = displayToISO(masked);
                            if (iso) {
                              // Valida min (hoje)
                              const minIso = getTodayDate();
                              if (!withinRange(iso, minIso)) {
                                setErrors(prev => ({ ...prev, checkIn: t('booking.validation.checkInPastDate') }));
                              } else {
                                setErrors(prev => { const n = { ...prev }; delete n.checkIn; return n; });
                                handleInputChange('checkIn', iso);
                              }
                            }
                          }}
                          onBlur={() => {
                            const iso = displayToISO(checkInDisplay);
                            if (!iso) {
                              setErrors(prev => ({ ...prev, checkIn: t('booking.validation.checkInRequired') }));
                            }
                          }}
                          className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${errors.checkIn ? 'border-red-500' : 'border-gray-300'}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setCheckInOpen(o => !o)}
                          aria-label="Abrir seletor de data"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/60 hover:text-gold"
                        >
                          <Calendar className="w-5 h-5" />
                        </button>
                        <DatePopover
                          containerRef={checkInPopRef}
                          isOpen={checkInOpen}
                          selectedIso={formData.checkIn}
                          minIso={getTodayDate()}
                          onSelect={(iso) => {
                            handleInputChange('checkIn', iso);
                            setCheckInDisplay(isoToDisplay(iso));
                            setCheckInOpen(false);
                          }}
                        />
                      </div>
                      {errors.checkIn && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="check-out-input" className="block text-sm font-medium text-navy mb-2 cursor-pointer" onClick={() => document.getElementById('check-out-input')?.focus()}>
                        <Calendar className="w-4 h-4 inline mr-1" />
                        {t('booking.checkOut')} *
                      </label>
                      <div className="relative">
                        <input
                          id="check-out-input"
                          type="text"
                          inputMode="numeric"
                          placeholder="dd/mm/aaaa"
                          lang="pt-BR"
                          value={checkOutDisplay}
                          onChange={(e) => {
                            const masked = maskDisplay(e.target.value);
                            setCheckOutDisplay(masked);
                            const iso = displayToISO(masked);
                            if (iso) {
                              // Mínimo: check-in selecionado ou amanhã
                              const minIso = formData.checkIn || getTomorrowDate();
                              if (!withinRange(iso, minIso)) {
                                setErrors(prev => ({ ...prev, checkOut: t('booking.validation.checkOutAfterCheckIn') }));
                              } else {
                                setErrors(prev => { const n = { ...prev }; delete n.checkOut; return n; });
                                handleInputChange('checkOut', iso);
                              }
                            }
                          }}
                          onBlur={() => {
                            const iso = displayToISO(checkOutDisplay);
                            if (!iso) {
                              setErrors(prev => ({ ...prev, checkOut: t('booking.validation.checkOutRequired') }));
                            } else {
                              const minIso = formData.checkIn || getTomorrowDate();
                              if (!withinRange(iso, minIso)) {
                                setErrors(prev => ({ ...prev, checkOut: t('booking.validation.checkOutAfterCheckIn') }));
                              }
                            }
                          }}
                          className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${errors.checkOut ? 'border-red-500' : 'border-gray-300'}`}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setCheckOutOpen(o => !o)}
                          aria-label="Abrir seletor de data"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/60 hover:text-gold"
                        >
                          <Calendar className="w-5 h-5" />
                        </button>
                        <DatePopover
                          containerRef={checkOutPopRef}
                          isOpen={checkOutOpen}
                          selectedIso={formData.checkOut}
                          minIso={formData.checkIn || getTomorrowDate()}
                          onSelect={(iso) => {
                            handleInputChange('checkOut', iso);
                            setCheckOutDisplay(isoToDisplay(iso));
                            setCheckOutOpen(false);
                          }}
                        />
                      </div>
                      {errors.checkOut && (
                        <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                      )}
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        <Users className="w-4 h-4 inline mr-1" />
                        {t('booking.adults')} *
                      </label>
                      <Select value={formData.adults} onValueChange={(value) => handleInputChange('adults', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? t('booking.adultSingular') : t('booking.adultPlural')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">
                        <Baby className="w-4 h-4 inline mr-1" />
                        {t('booking.children')}
                      </label>
                      <Select value={formData.children} onValueChange={(value) => handleInputChange('children', value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? t('booking.childSingular') : t('booking.childPlural')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Children Ages */}
                  {parseInt(formData.children) > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-navy">
                        {t('booking.childrenAges')}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {formData.childrenAges.map((age, index) => (
                          <input
                            key={index}
                            type="number"
                            placeholder={`${t('booking.child')} ${index + 1}`}
                            value={age}
                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                            min="0"
                            max="17"
                            className={`px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent text-sm ${errors.childrenAges ? 'border-red-500' : 'border-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      {errors.childrenAges && (
                        <p className="text-red-500 text-sm mt-1">{errors.childrenAges}</p>
                      )}
                    </motion.div>
                  )}

                  {/* Room Type */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      <Bed className="w-4 h-4 inline mr-1" />
                      {t('booking.accommodationType')} *
                    </label>
                    <Select value={formData.roomType} onValueChange={(value) => handleInputChange('roomType', value)}>
                      <SelectTrigger className={`w-full ${errors.roomType ? 'border-red-500' : ''
                        }`}>
                        <SelectValue placeholder={t('booking.selectAccommodation')} />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map(room => (
                          <SelectItem key={room.value} value={room.value}>
                            {room.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.roomType && (
                      <p className="text-red-500 text-sm mt-1">{errors.roomType}</p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      {t('booking.specialRequests')}
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder={t('booking.specialRequestsPlaceholder')}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Summary */}
                  {formData.checkIn && formData.checkOut && formData.roomType && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-cream p-4 rounded-lg border border-gold/20"
                    >
                      <h4 className="font-semibold text-navy mb-3 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {t('booking.summary.title')}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-navy/70">{t('booking.summary.period')}:</span>
                          <span className="font-medium text-navy">
                            {formatDate(formData.checkIn)} - {formatDate(formData.checkOut)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy/70">{t('booking.summary.nights')}:</span>
                          <span className="font-medium text-navy">{calculateNights()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-navy/70">{t('booking.summary.guests')}:</span>
                          <span className="font-medium text-navy">
                            {formData.adults} {t('booking.summary.adults')} + {formData.children} {t('booking.summary.children')}
                          </span>
                        </div>
                        {/* Valor Estimado - Comentado para futura reabilitação */}
                        {/* <div className="flex justify-between border-t border-gold/20 pt-2">
                          <span className="font-semibold text-navy">{t('booking.summary.estimatedValue')}:</span>
                          <span className="font-bold text-gold text-lg">
                            {t('booking.currency')} {calculateTotal().toLocaleString('pt-BR')}
                          </span>
                        </div> */}
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.checkIn || !formData.checkOut || !formData.roomType}
                    className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label={t('booking.submitAriaLabel')}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <LoadingSpinner size="md" color="navy" />
                        <span>{t('booking.sending')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-5 h-5" />
                        <span>{t('booking.submitButton')}</span>
                      </div>
                    )}
                  </Button>

                  {/* Info */}
                  <div className="text-center text-sm text-navy/60">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {t('booking.whatsappRedirect')}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingForm;
