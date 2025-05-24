import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

const nextConfig: NextConfig = {
  /* config options here */
};

const withNextIntl = createNextIntlPlugin(
  path.join(__dirname, 'src', 'services', 'i18n', 'request.ts')
);
export default withNextIntl(nextConfig);
