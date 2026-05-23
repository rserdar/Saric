import avatar from '../assets/img/slider/avatar.webp';
import aboutLight from '../assets/img/about/1.jpg';
import aboutDark from '../assets/img/about/2.jpg';
import skillsLight from '../assets/img/skills/1.jpg';
import skillsDark from '../assets/img/skills/2.jpg';
import logoSerdar from '../assets/img/logo/serdar.webp';
import logoYavuz from '../assets/img/logo/yavuz.webp';

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
    serdar: logoSerdar,
    yavuz: logoYavuz,
  },
} as const;
