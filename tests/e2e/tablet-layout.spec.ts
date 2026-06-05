import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

const tabletViewport = { width: 768, height: 1024 };
const tabletScreenshotOptions = {
  maxDiffPixels: 1500,
};

test.describe('tablet layout', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Tablet visual baseline only runs on desktop Chromium');
    await page.setViewportSize(tabletViewport);
  });

  test('uses desktop navigation shell on tablet breakpoint', async ({ page }) => {
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });

    await expect(page.locator('[data-nav-list]')).toBeVisible();
    await expect(page.locator('.mobile-menu-button')).toBeHidden();
    await expect(page.locator('#theme-toggle')).toBeVisible();
  });

  test('matches tablet hero screenshot in light theme', async ({ page }) => {
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });

    await expect(page.locator('#home')).toHaveScreenshot('tr-home-tablet-light.png', tabletScreenshotOptions);
  });

  test('matches tablet hero screenshot in dark theme', async ({ page }) => {
    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
    });

    await expect(page.locator('#home')).toHaveScreenshot('tr-home-tablet-dark.png', tabletScreenshotOptions);
  });

  test('matches tablet portfolio screenshot in light theme', async ({ page }) => {
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });

    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await expect(page.locator('#portfolio')).toHaveScreenshot('tr-portfolio-tablet-light.png', tabletScreenshotOptions);
  });

  test('matches tablet portfolio screenshot in dark theme', async ({ page }) => {
    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
    });

    await page.locator('#portfolio').scrollIntoViewIfNeeded();
    await expect(page.locator('#portfolio')).toHaveScreenshot('tr-portfolio-tablet-dark.png', tabletScreenshotOptions);
  });
});
