import { expect, test } from '@playwright/test';

test.describe('locale routing', () => {
  test('redirects root to english when browser language is english and no preference exists', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop routing check');

    await page.addInitScript(() => {
      window.localStorage.clear();
      Object.defineProperty(window.navigator, 'language', {
        configurable: true,
        get: () => 'en-US',
      });
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/en\/$/);
  });

  test('redirects links root to english when browser language is english and no preference exists', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop routing check');

    await page.addInitScript(() => {
      window.localStorage.clear();
      Object.defineProperty(window.navigator, 'language', {
        configurable: true,
        get: () => 'en-US',
      });
    });

    await page.goto('/links', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/en\/links$/);
  });

  test('stays on root when language preference already exists', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop routing check');

    await page.addInitScript(() => {
      window.localStorage.setItem('lang-preference', 'tr');
      Object.defineProperty(window.navigator, 'language', {
        configurable: true,
        get: () => 'en-US',
      });
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/$/);
  });

  test('stays on links root when language preference already exists', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop routing check');

    await page.addInitScript(() => {
      window.localStorage.setItem('lang-preference', 'tr');
      Object.defineProperty(window.navigator, 'language', {
        configurable: true,
        get: () => 'en-US',
      });
    });

    await page.goto('/links', { waitUntil: 'networkidle' });
    await expect(page).toHaveURL(/\/links$/);
  });
});
