import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppState {
  // Loading States
  isLoading: boolean;
  isInitialized: boolean;
  
  // User State
  user: User | null;
  isAuthenticated: boolean;
  
  // UI State
  showOnboarding: boolean;
  lastActiveTab: string;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setUser: (user: User | null) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setShowOnboarding: (show: boolean) => void;
  setLastActiveTab: (tab: string) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial State
      isLoading: false,
      isInitialized: false,
      user: null,
      isAuthenticated: false,
      showOnboarding: true,
      lastActiveTab: 'home',
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setInitialized: (initialized) => set({ isInitialized: initialized }),
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (authenticated) => set({ isAuthenticated: authenticated }),
      setShowOnboarding: (show) => set({ showOnboarding: show }),
      setLastActiveTab: (tab) => set({ lastActiveTab: tab }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        showOnboarding: false 
      }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        showOnboarding: state.showOnboarding,
        lastActiveTab: state.lastActiveTab,
      }),
    }
  )
);
