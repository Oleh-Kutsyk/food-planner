import nextJest from 'next/jest';

const createJestConfig = nextJest({ dir: './' });

module.exports = async () => ({
  ...(await createJestConfig({
    testEnvironment: 'jsdom',
    rootDir: 'src',
  })()),
  // https://github.com/vercel/next.js/issues/40183
  transformIgnorePatterns: ['node_modules/(?!next-intl)/'],
});
