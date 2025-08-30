// Analytics configuration and utilities

// Google Analytics 4 Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Google Tag Manager Configuration
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Facebook Pixel Configuration
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '';

// Hotjar Configuration
export const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || '';

// Google Analytics 4 Events
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Track page views
export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Hotel-specific tracking events
export const trackBookingStart = () => {
  event({
    action: 'booking_start',
    category: 'engagement',
    label: 'booking_form_opened',
  });
};

export const trackBookingSubmit = (roomType: string, guests: number) => {
  event({
    action: 'booking_submit',
    category: 'conversion',
    label: `${roomType}_${guests}_guests`,
  });
};

export const trackWhatsAppClick = (source: string) => {
  event({
    action: 'whatsapp_click',
    category: 'engagement',
    label: source,
  });
};

export const trackPhoneClick = () => {
  event({
    action: 'phone_click',
    category: 'engagement',
    label: 'header_phone',
  });
};

export const trackEventModalOpen = () => {
  event({
    action: 'event_modal_open',
    category: 'engagement',
    label: 'events_modal',
  });
};

export const trackAccommodationView = (roomType: string) => {
  event({
    action: 'accommodation_view',
    category: 'engagement',
    label: roomType,
  });
};

export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  });
};

export const trackVideoPlay = (videoId: string) => {
  event({
    action: 'video_play',
    category: 'engagement',
    label: videoId,
  });
};

export const trackImageGalleryView = (galleryType: string) => {
  event({
    action: 'gallery_view',
    category: 'engagement',
    label: galleryType,
  });
};

// Facebook Pixel Events
export const fbPixel = {
  track: (eventName: string, parameters?: any) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', eventName, parameters);
    }
  },
  trackCustom: (eventName: string, parameters?: any) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, parameters);
    }
  },
};

// Hotjar Events
export const hotjar = {
  event: (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).hj) {
      (window as any).hj('event', eventName);
    }
  },
  identify: (userId: string, attributes?: any) => {
    if (typeof window !== 'undefined' && (window as any).hj) {
      (window as any).hj('identify', userId, attributes);
    }
  },
};

// Performance monitoring
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      const firstPaint = performance.getEntriesByName('first-paint')[0]?.startTime || 0;
      const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0;
      
      // Track Core Web Vitals
      event({
        action: 'page_load_time',
        category: 'performance',
        value: Math.round(loadTime),
      });
      
      event({
        action: 'dom_content_loaded',
        category: 'performance',
        value: Math.round(domContentLoaded),
      });
      
      if (firstPaint) {
        event({
          action: 'first_paint',
          category: 'performance',
          value: Math.round(firstPaint),
        });
      }
      
      if (firstContentfulPaint) {
        event({
          action: 'first_contentful_paint',
          category: 'performance',
          value: Math.round(firstContentfulPaint),
        });
      }
    }
  }
};

// Error tracking
export const trackError = (error: Error, errorInfo?: any) => {
  event({
    action: 'javascript_error',
    category: 'error',
    label: error.message,
  });
  
  // Send to external error tracking service if needed
  console.error('Tracked error:', error, errorInfo);
};

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  event({
    action: 'conversion',
    category: 'conversion',
    label: conversionType,
    value: value,
  });
  
  // Facebook Pixel conversion
  fbPixel.track('Purchase', {
    value: value,
    currency: 'BRL',
    content_type: conversionType,
  });
};