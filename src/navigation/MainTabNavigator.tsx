import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CustomTabBar } from '../components/CustomTabBar';
import { useCurrentTheme } from '../store/themeStore';
import { MainTabParamList } from './types';

// Import screens
import { BotAnalysisScreen } from '../screens/bot/BotAnalysisScreen';
import { ExploreScreen } from '../screens/explore/ExploreScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { SettingsScreen } from '../screens/settings/SettingsScreen';
import { SubscriptionScreen } from '../screens/subscription/SubscriptionScreen';
import { WalletScreen } from '../screens/wallet/WalletScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const theme = useCurrentTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: 'none', // Hide default tab bar since we're using custom one
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
        }}
      />
      <Tab.Screen
        name="subscription"
        component={SubscriptionScreen}
        options={{
          title: 'Subscription',
        }}
      />
      <Tab.Screen
        name="wallet"
        component={WalletScreen}
        options={{
          title: 'Wallet',
        }}
      />
      <Tab.Screen
        name="bot"
        component={BotAnalysisScreen}
        options={{
          title: 'Bot Analysis',
        }}
      />
      <Tab.Screen
        name="notifications"
        component={NotificationsScreen}
        options={{
          title: 'Notifications',
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
};
