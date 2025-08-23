import { darkTheme } from './dark';
import { lightTheme } from './light';

export { colors } from './colors';
export { darkTheme } from './dark';
export { lightTheme } from './light';
export { ThemeProvider, useTheme } from './ThemeProvider';

export type ThemeMode = 'light' | 'dark';

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

