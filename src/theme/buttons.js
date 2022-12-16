import colors from './colors';
import fontSizes from './fontSizes';

const commonStyles = {
  cursor: 'pointer',
  transition: 'all 200ms ease-in-out',
  borderRadius: '4px',
  '.button-icon svg path': {
    transition: 'all 200ms ease-in-out',
  },
  '&[data-size="small"]': {
    padding: '8px 12px',
    fontSize: `${fontSizes[1]}px`,
    lineHeight: '16px',
    '.button-icon': {
      height: '16px',
      svg: {
        height: '16px',
        width: '16px',
      },
    },
  },
  '&[data-size="medium"]': {
    padding: '12px 16px',
    fontSize: `${fontSizes[2]}px`,
    lineHeight: '20px',
    '.button-icon': {
      height: '16px',
      svg: {
        height: '16px',
        width: '16px',
      },
    },
  },
  '&[data-size="large"]': {
    padding: '12px 20px',
    fontSize: `${fontSizes[3]}px`,
    lineHeight: '24px',
    fontWeight: '500',
    '.button-icon': {
      height: '20px',
      svg: {
        height: '20px',
        width: '20px',
      },
    },
  },
};

export default {
  primary: {
    ...commonStyles,
    background: colors.primary,
    color: colors.blue900,
    ':hover': {
      background: colors.primaryHover,
    },
    '&[data-disabled="true"]': {
      background: colors.grey200,
      color: colors.grey500,
      pointerEvents: 'none',
    },
  },
  secondary: {
    ...commonStyles,
    border: `1px solid ${colors.blue900}`,
    background: colors.white,
    color: colors.blue900,
    ':hover': {
      background: colors.blue900,
      color: colors.white,
      '.button-icon svg path': {
        fill: colors.white,
      },
    },
    '&[data-disabled="true"]': {
      border: `1px solid ${colors.grey500}`,
      background: colors.grey100,
      color: colors.grey500,
      pointerEvents: 'none',
    },
  },
};
