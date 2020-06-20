import { base } from '@theme-ui/presets';

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
      px: 2,
      py: 2,
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
};
