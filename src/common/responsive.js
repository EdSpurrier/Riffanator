import { useMediaQuery } from 'react-responsive';
import breakpoints from './breakpoints';

export const useDesktopOrLaptop = () =>
  useMediaQuery({
    query: `(min-device-width: ${breakpoints.lg})`,
  });

export const useBigScreen = () => useMediaQuery({ query: `(min-device-width: ${breakpoints.xl})` });

export const useMobileScreen = () =>
  useMediaQuery({
    query: `(max-width: ${breakpoints.md})`,
  });

export const usePortrait = () => useMediaQuery({ query: '(orientation: portrait)' });

export const useRetina = () => useMediaQuery({ query: '(min-resolution: 2dppx)' });
