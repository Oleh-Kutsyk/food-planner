import { routing } from '@/services/i18n/routing';
import formats from '@/services/i18n/request';
import messages from '@/services/i18n/dictionaries/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}
