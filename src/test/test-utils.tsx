import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { I18nProvider } from '@/components/i18n/I18nProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  // Use a simplified I18nProvider for tests or mock the context directly
  // For now, we use the actual provider, assuming dictionaries are accessible
  return (
    <I18nProvider initialLocale="pt-BR">
      {children}
    </I18nProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
