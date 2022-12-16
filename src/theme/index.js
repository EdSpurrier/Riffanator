import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

export { default as theme } from './theme';
export const useTheme = () => useContext(ThemeContext);
