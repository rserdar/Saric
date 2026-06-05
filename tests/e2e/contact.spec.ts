import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

const contactScreenshotOptions = {
  maxDiffPixels: 1200,
};

test.describe('contact section', () => {
  test('renders contact form and map wrapper in light mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop smoke check');
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });

    await page.locator('#contact').scrollIntoViewIfNeeded();

    const contactSection = page.locator('#contact');
    await expect(contactSection.getByPlaceholder('Ad Soyad')).toBeVisible();
    await expect(contactSection.getByPlaceholder('E-posta')).toBeVisible();
    await expect(contactSection.getByPlaceholder('Konu')).toBeVisible();
    await expect(contactSection.getByPlaceholder('Mesaj')).toBeVisible();
    await expect(contactSection.getByRole('button', { name: 'Gönder' })).toBeVisible();

    const mapSection = page.locator('section').filter({ has: page.locator('iframe[title="Location Map"]') });
    await expect(mapSection).toBeVisible();
  });

  test('renders contact form in dark mode', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop smoke check');
    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
    });

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact form')).toBeVisible();
    await expect(page.locator('#contact a[href="https://links.serdar.cc"]')).toBeVisible();
  });

  test('matches light theme screenshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
    });

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toHaveScreenshot('tr-contact-light.png', contactScreenshotOptions);
  });

  test('matches dark theme screenshot', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');
    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
    });

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toHaveScreenshot('tr-contact-dark.png', contactScreenshotOptions);
  });
});
