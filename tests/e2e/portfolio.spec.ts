import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

test.describe('portfolio behavior', () => {
  test('desktop filtering updates visible cards', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop interaction');
    await openPage(page, '/');
    await page.locator('#portfolio').scrollIntoViewIfNeeded();

    const visibleCards = page.locator('.portfolio-card:not(.hidden)');
    await expect(visibleCards.first()).toBeVisible();

    const firstNonAllFilter = page.locator('.portfolio-filter-btn').nth(1);
    const filterKey = await firstNonAllFilter.getAttribute('data-filter');
    await firstNonAllFilter.click();

    const visibleCategories = await page.locator('.portfolio-card:not(.hidden)').evaluateAll((cards) =>
      cards.map((card) => card.getAttribute('data-category')),
    );
    expect(visibleCategories.length).toBeGreaterThan(0);
    expect(visibleCategories.every((category) => category === filterKey)).toBeTruthy();
  });

  test('mobile portfolio pagination shows at most three cards per page', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Mobile interaction');
    await openPage(page, '/');
    await page.locator('#portfolio').scrollIntoViewIfNeeded();

    const visibleCards = page.locator('.portfolio-card:not(.hidden)');
    await expect(visibleCards).toHaveCount(3);

    const nextButton = page.locator('#portfolio-next');
    await nextButton.click();
    await expect(page.locator('#portfolio-page-indicator')).toContainText('2 /');
    await expect(visibleCards).toHaveCount(3);
  });
});
