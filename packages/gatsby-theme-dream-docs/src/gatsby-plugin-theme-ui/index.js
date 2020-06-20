import { base } from '@theme-ui/presets';
import nightOwl from '@theme-ui/prism/presets/night-owl.json';

// console.log(base);

export default {
  ...base,
  colors: {
    ...base.colors,
    highlight: '#efeffe',
  },
  links: {
    ...base.links,
    nav: {
      display: 'block',
      width: '100%',
      p: 2,
      color: 'text',
      textDecoration: 'none',
      fontSize: 1,
      fontWeight: 'bold',
      bg: 'transparent',
      transitionProperty: 'background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '.2s',
      borderRadius: 2,
      '&:hover': {
        color: 'text',
        bg: 'highlight',
      },
      '&.active': {
        color: 'primary',
        bg: 'highlight',
      },
    },
  },
  styles: {
    ...base.styles,
    code: {
      ...nightOwl,
      p: 3,
      borderRadius: 16,
    },
  },
};
