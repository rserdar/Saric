import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

test.describe('skills behavior', () => {
  test('mobile accordions keep only one panel open at a time', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile interaction');
    await openPage(page, '/');
    await page.locator('#skills').scrollIntoViewIfNeeded();

    const accordions = page.locator('#skills [data-mobile-accordion]');
    await expect(accordions).toHaveCount(4);

    const firstAccordion = accordions.nth(0);
    const secondAccordion = accordions.nth(1);
    const thirdAccordion = accordions.nth(2);

    await expect(firstAccordion).toHaveAttribute('open', '');

    await secondAccordion.locator('summary').click();
    await expect(secondAccordion).toHaveAttribute('open', '');
    await expect(firstAccordion).not.toHaveAttribute('open', '');

    await thirdAccordion.locator('summary').click();
    await expect(thirdAccordion).toHaveAttribute('open', '');
    await expect(secondAccordion).not.toHaveAttribute('open', '');
  });
});
