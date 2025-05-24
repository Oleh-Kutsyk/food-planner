import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from './page';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/services/i18n/dictionaries/en.json';

describe('Page', () => {
  it('renders a heading', () => {
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <Page />
      </NextIntlClientProvider>
    );

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
