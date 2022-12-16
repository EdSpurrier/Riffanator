import breakpoints from '../common/breakpoints';
import { presetPalettes } from '@ant-design/colors';
import colors from './colors';
import fontSizes from './fontSizes';
import buttons from './buttons';

const withPalettes = (colors) => ({ ...colors, palettes: presetPalettes });
const mq = Object.entries(breakpoints).reduce((obj, [key, value]) => {
  obj[key] = `@media (min-width: ${value})`;
  obj[`${key}Inverted`] = `@media (max-width: ${value})`;
  return obj;
}, {});

const bpsArray = Object.entries(breakpoints).reduce((arr, bp) => {
  arr.push(bp[1]);
  // eslint-disable-next-line no-param-reassign
  arr[bp[0]] = bp[1];
  return arr;
}, []);

const theme = {
  breakpoints: bpsArray,
  mq,
  colors: withPalettes(colors),
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 128, 256],
  fonts: {
    sans: '"myriad-pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    body: '"myriad-pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    heading: '"myriad-pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontSizes,
  shadows: {
    xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
    s: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
    m: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    l: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
    xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
    '2xl': '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
    '3xl': '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
  },
  buttons,
  borderRadius: '4px',
};

export default theme;
