'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/services/i18n/languages';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (locale: string) => {
    if (locale === currentLocale) return;

    const segments = pathname.split('/');
    segments[1] = locale; // Replace the locale in the URL
    const newPath = segments.join('/');

    router.push(newPath);
  };

  return (
    <div className='inline-flex items-center gap-2 bg-[#d7d5d545] dark:bg-[#00000033] p-1 rounded-full'>
      {locales.map(locale => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-200 ${
            locale === currentLocale
              ? 'bg-main shadow'
              : 'text-gray-700 dark:text-white hover:bg-gray-400'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
