import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toast } from './components/Toast';
import { RootNavigator } from './navigation/RootNavigator';
import { useAppStore } from './store/appStore';
import { ThemeProvider } from './theme';

export default function App() {
  const { setInitialized } = useAppStore();

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="auto" />
        <RootNavigator />
        <Toast />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
