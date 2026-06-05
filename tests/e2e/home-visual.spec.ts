import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

const heroScreenshotOptions = {
  maxDiffPixels: 1500,
};

const sectionScreenshotOptions = {
  maxDiffPixels: 1200,
};

const localeRoutes = [
  { name: 'tr', path: '/' },
  { name: 'en', path: '/en/' },
  { name: 'bs', path: '/bs/' },
] as const;

for (const locale of localeRoutes) {
  test.describe(`${locale.name} home visuals`, () => {
    test(`matches light theme screenshot`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
      await openPage(page, locale.path, {
        theme: 'light',
        localePreference: locale.name,
      });
      await expect(page.locator('#home')).toHaveScreenshot(`${locale.name}-home-light.png`, heroScreenshotOptions);
    });

    test(`matches dark theme screenshot`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
      await openPage(page, locale.path, {
        theme: 'dark',
        localePreference: locale.name,
      });
      await expect(page.locator('#home')).toHaveScreenshot(`${locale.name}-home-dark.png`, heroScreenshotOptions);
    });
  });
}

const staticSectionIds = ['about', 'service', 'skills', 'portfolio'] as const;

for (const sectionId of staticSectionIds) {
  test.describe(`tr ${sectionId} visuals`, () => {
    test(`matches light theme screenshot`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
      await openPage(page, '/', {
        theme: 'light',
        localePreference: 'tr',
      });
      await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${sectionId}`)).toHaveScreenshot(`tr-${sectionId}-light.png`, sectionScreenshotOptions);
    });

    test(`matches dark theme screenshot`, async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
      await openPage(page, '/', {
        theme: 'dark',
        localePreference: 'tr',
      });
      await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${sectionId}`)).toHaveScreenshot(`tr-${sectionId}-dark.png`, sectionScreenshotOptions);
    });
  });
}
