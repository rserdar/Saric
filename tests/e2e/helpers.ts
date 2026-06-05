import type { Page } from '@playwright/test';

type OpenPageOptions = {
  theme?: 'light' | 'dark';
  localePreference?: 'tr' | 'en' | 'bs';
  navigatorLanguage?: string;
  hideDynamicSections?: boolean;
};

export async function preparePage(
  page: Page,
  {
    theme = 'light',
    localePreference = 'tr',
    navigatorLanguage = 'tr-TR',
  }: OpenPageOptions = {},
) {
  await page.addInitScript(({ selectedTheme, selectedLocale, selectedLanguage }) => {
    window.localStorage.clear();
    window.localStorage.setItem('theme', selectedTheme);
    window.localStorage.setItem('lang-preference', selectedLocale);
    Object.defineProperty(window.navigator, 'language', {
      configurable: true,
      get: () => selectedLanguage,
    });
  }, {
    selectedTheme: theme,
    selectedLocale: localePreference,
    selectedLanguage: navigatorLanguage,
  });
}

export async function stabilizePage(page: Page) {
  await stabilizePageWithOptions(page);
}

export async function stabilizePageWithOptions(
  page: Page,
  { hideDynamicSections = true }: Pick<OpenPageOptions, 'hideDynamicSections'> = {},
) {
  const hiddenSelectors = [
    '#preloader',
    '.cursor-inner',
    '.cursor-outer',
    '#contact iframe',
    '#share-modal',
    '#polaroid-modal',
    '.copy-icon',
    '.check-icon',
    '.fixed.inset-0.w-full.h-full.-z-25',
    '.fixed.inset-0.w-full.h-full.-z-24',
  ];

  if (hideDynamicSections) {
    hiddenSelectors.push('#blog');
  }

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
      [data-animate] {
        opacity: 1 !important;
        transform: none !important;
      }
      ${hiddenSelectors.join(',\n      ')} {
        display: none !important;
      }
      html {
        scroll-behavior: auto !important;
      }
    `,
  });

  await page.evaluate(() => {
    document.querySelectorAll<HTMLElement>('[data-animate]').forEach((element) => {
      element.classList.add('is-visible');
    });

    const linksPage = document.getElementById('links-page');
    if (linksPage) {
      linksPage.querySelectorAll<HTMLElement>('[style*="animation-delay"]').forEach((element) => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.animation = 'none';
      });
    }

    document.querySelectorAll<HTMLElement>('.typer').forEach((element) => {
      const firstWord = element.dataset.words?.split(',').map((word) => word.trim()).filter(Boolean)[0];
      if (!firstWord) return;

      const replacement = document.createElement('span');
      replacement.className = element.className;
      replacement.textContent = firstWord;

      const inlineStyle = element.getAttribute('style');
      if (inlineStyle) {
        replacement.setAttribute('style', inlineStyle);
      }

      element.replaceWith(replacement);
    });

    document.querySelectorAll('.cursor').forEach((element) => element.remove());
  });
}

export async function openPage(page: Page, path: string, options: OpenPageOptions = {}) {
  await preparePage(page, options);
  await page.goto(path, { waitUntil: 'networkidle' });
  await stabilizePageWithOptions(page, options);
}
