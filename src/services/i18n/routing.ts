import { defineRouting } from 'next-intl/routing';
import { locales } from '@/services/i18n/languages';

export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'ua',
});
