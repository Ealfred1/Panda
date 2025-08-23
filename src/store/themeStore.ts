import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { ThemeMode, themes } from '../theme';

interface ThemeState {
  theme: ThemeMode;
  isSystemTheme: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setSystemTheme: (enabled: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      isSystemTheme: true,
      setTheme: (theme: ThemeMode) => set({ theme, isSystemTheme: false }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme, isSystemTheme: false });
      },
      setSystemTheme: (enabled: boolean) => set({ isSystemTheme: enabled }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useCurrentTheme = () => {
  const { theme } = useThemeStore();
  return themes[theme] || themes.light;
};
