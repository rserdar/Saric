import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

const localeRoutes = [
  { name: 'tr', path: '/links' },
  { name: 'en', path: '/en/links' },
  { name: 'bs', path: '/bs/links' },
] as const;

for (const locale of localeRoutes) {
  test.describe(`${locale.name} links visuals`, () => {
    test(`matches light theme screenshot`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
      await openPage(page, locale.path, {
        theme: 'light',
        localePreference: locale.name,
      });
      await expect(page.locator('.w-full.max-w-xl')).toHaveScreenshot(`${locale.name}-links-light.png`);
    });

    test(`matches dark theme screenshot`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
      await openPage(page, locale.path, {
        theme: 'dark',
        localePreference: locale.name,
      });
      await expect(page.locator('.w-full.max-w-xl')).toHaveScreenshot(`${locale.name}-links-dark.png`);
    });
  });
}
