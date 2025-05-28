'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/services/i18n/navigation';
import { useLocale } from 'next-intl';

export const NavigationLinks = () => {
  const pathname = usePathname();
  const locale = useLocale();

  const currentPath = pathname.replace(`/${locale}`, '') || '/';

  const links = [
    { href: '/', label: 'Home' },
    { href: '/auth/login', label: 'Log in' },
    { href: '/auth/signup', label: 'Sign up' },
  ];
  console.log(pathname);
  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`ml-4 ${currentPath.endsWith(href) ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}
        >
          {label}
        </Link>
      ))}
    </>
  );
};
