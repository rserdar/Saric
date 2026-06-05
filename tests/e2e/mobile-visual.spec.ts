import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

const mobileScreenshotOptions = {
  maxDiffPixels: 1400,
  timeout: 60_000,
};

test.describe('mobile visuals', () => {
  test('tr home matches light screenshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile visual baseline only');
    test.slow();
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });
    await expect(page.locator('#home')).toHaveScreenshot('tr-home-light-mobile.png', mobileScreenshotOptions);
  });

  test('tr home matches dark screenshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile visual baseline only');
    test.slow();
    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
    });
    await expect(page.locator('#home')).toHaveScreenshot('tr-home-dark-mobile.png', mobileScreenshotOptions);
  });

  test('tr portfolio matches light screenshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile visual baseline only');
    test.slow();
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await expect(page.locator('#portfolio')).toHaveScreenshot('tr-portfolio-light-mobile.png', mobileScreenshotOptions);
  });

  test('tr portfolio matches dark screenshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile visual baseline only');
    test.slow();
    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
    });
    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await expect(page.locator('#portfolio')).toHaveScreenshot('tr-portfolio-dark-mobile.png', mobileScreenshotOptions);
  });
});
