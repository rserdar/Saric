import { expect, test } from '@playwright/test';
import { openPage } from './helpers';

const blogFeedUrlPattern = '**/feeds/posts/default?alt=json-in-script&max-results=3&callback=__serdarBlogFeed';
const newsScreenshotOptions = {
  maxDiffPixels: 1400,
};

const feedPayload = {
  feed: {
    entry: [
      {
        title: { $t: 'Denetim Hazirlik Notlari' },
        published: { $t: '2026-05-11T08:00:00.000Z' },
        category: [{ term: 'Blog' }],
        link: [{ rel: 'alternate', href: 'https://www.serdar.cc/2026/05/denetim-hazirlik-notlari.html' }],
        media$thumbnail: { url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg/test/s72-c/sample.jpg' },
      },
      {
        title: { $t: 'Astro Portfoy Guncellemesi' },
        published: { $t: '2026-04-04T08:00:00.000Z' },
        category: [{ term: 'Astro' }],
        link: [{ rel: 'alternate', href: 'https://www.serdar.cc/2026/04/astro-portfoy-guncellemesi.html' }],
      },
      {
        title: { $t: 'Blog Otomasyonu Ipuclari' },
        published: { $t: '2026-03-18T08:00:00.000Z' },
        category: [{ term: 'Automation' }],
        link: [{ rel: 'alternate', href: 'https://www.serdar.cc/2026/03/blog-otomasyonu-ipuclari.html' }],
      },
    ],
  },
};

test.describe('news section', () => {
  test('renders latest posts from Blogger feed', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop smoke test');

    await page.route(blogFeedUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `__serdarBlogFeed(${JSON.stringify(feedPayload)});`,
      });
    });

    await openPage(page, '/', {
      hideDynamicSections: false,
    });

    await page.locator('#blog').scrollIntoViewIfNeeded();

    const cards = page.locator('#news-grid article');
    await expect(cards).toHaveCount(3);
    await expect(page.locator('#news-grid [data-news-skeleton]')).toHaveCount(0);
    await expect(cards.first()).toContainText('Denetim Hazirlik Notlari');
    await expect(cards.nth(1)).toContainText('Astro Portfoy Guncellemesi');
  });

  test('shows localized fallback when Blogger feed fails', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop smoke test');

    await page.route(blogFeedUrlPattern, async (route) => {
      await route.abort();
    });

    await openPage(page, '/en/', {
      theme: 'dark',
      localePreference: 'en',
      hideDynamicSections: false,
    });

    await page.locator('#blog').scrollIntoViewIfNeeded();
    await expect(page.locator('#news-grid')).toContainText('Latest posts could not be loaded right now.');
  });

  test('matches light theme screenshot with mocked feed', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');

    await page.route(blogFeedUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `__serdarBlogFeed(${JSON.stringify(feedPayload)});`,
      });
    });

    await openPage(page, '/', {
      theme: 'light',
      localePreference: 'tr',
      hideDynamicSections: false,
    });

    await page.locator('#blog').scrollIntoViewIfNeeded();
    await expect(page.locator('#blog')).toHaveScreenshot('tr-news-light.png', newsScreenshotOptions);
  });

  test('matches dark theme screenshot with mocked feed', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-chromium', 'Desktop visual baseline only');

    await page.route(blogFeedUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `__serdarBlogFeed(${JSON.stringify(feedPayload)});`,
      });
    });

    await openPage(page, '/', {
      theme: 'dark',
      localePreference: 'tr',
      hideDynamicSections: false,
    });

    await page.locator('#blog').scrollIntoViewIfNeeded();
    await expect(page.locator('#blog')).toHaveScreenshot('tr-news-dark.png', newsScreenshotOptions);
  });
});
