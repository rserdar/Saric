import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

test.describe('header interactions', () => {
  test('desktop theme toggle persists dark mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop interaction');
    await openPage(page, '/');

    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await page.locator('#theme-toggle').click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect.poll(async () => page.evaluate(() => localStorage.getItem('theme'))).toBe('dark');
  });

  test('mobile menu opens and closes from navigation click', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile interaction');
    await openPage(page, '/');

    const menu = page.locator('.mobile-menu');
    await expect.poll(async () => menu.evaluate((element) => element.classList.contains('hidden'))).toBe(true);

    await page.locator('.mobile-menu-button').click();
    await expect.poll(async () => menu.evaluate((element) => element.classList.contains('hidden'))).toBe(false);

    await page.locator('[data-mobile-nav-list] a[href="/#about"]').click();
    await expect.poll(async () => menu.evaluate((element) => element.classList.contains('hidden'))).toBe(true);
  });

  test('sticky header compacts after scroll', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop interaction');
    await openPage(page, '/');

    const nav = page.locator('#main-nav');
    await expect(nav).not.toHaveClass(/!py-4/);

    await page.evaluate(() => {
      window.scrollTo(0, 900);
      window.dispatchEvent(new Event('scroll'));
    });
    await expect(nav).toHaveClass(/!py-4/);
  });
});
