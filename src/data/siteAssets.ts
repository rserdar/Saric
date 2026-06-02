import avatar from '../assets/img/slider/avatar.webp';
import aboutLight from '../assets/img/about/1.jpg';
import aboutDark from '../assets/img/about/2.jpg';
import skillsLight from '../assets/img/skills/1.jpg';
import skillsDark from '../assets/img/skills/2.jpg';
import logoMain from '../assets/img/logo/logo.webp';

export const siteAssets = {
  hero: {
    avatar,
  },
  about: {
    light: aboutLight,
    dark: aboutDark,
  },
  skills: {
    light: skillsLight,
    dark: skillsDark,
  },
  logo: {
    main: logoMain,
  },
} as const;
