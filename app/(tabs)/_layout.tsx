import { Tabs } from 'expo-router';
import React from 'react';
import { CustomTabBar } from '../../src/components/CustomTabBar';
import { useCurrentTheme } from '../../src/store/themeStore';

export default function TabLayout() {
  const theme = useCurrentTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide default tab bar since we're using custom one
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
        }}
      />
      <Tabs.Screen
        name="bot"
        options={{
          title: 'Bot Analysis',
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
        }}
      />
    </Tabs>
  );
}
