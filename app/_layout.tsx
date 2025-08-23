import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAppStore } from '../src/store/appStore';
import { useCurrentTheme } from '../src/store/themeStore';

export default function RootLayout() {
  const theme = useCurrentTheme();
  const { isAuthenticated, isInitialized, showOnboarding, setInitialized } = useAppStore();
  const segments = useSegments();
  const router = useRouter();
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (!isInitialized) {
      // Simulate app initialization
      setTimeout(() => {
        setInitialized(true);
      }, 1000);
    }
  }, [isInitialized, setInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && !inAuthGroup) {
      // Redirect to auth if not authenticated
      if (showOnboarding) {
        router.replace('/(auth)/onboarding');
      } else {
        router.replace('/(auth)/login');
      }
    } else if (isAuthenticated && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isInitialized, segments, showOnboarding, router, setInitialized]);

  if (!loaded || !isInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar
          style={theme.colors.background.primary === '#ffffff' ? 'dark' : 'light'}
          backgroundColor={theme.colors.background.primary}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
