import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { CustomTabBar } from '../components/CustomTabBar';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { MarketsScreen } from '../screens/markets/MarketsScreen';

export type AppTabParamList = {
  Dashboard: undefined;
  Markets: undefined;
  Portfolio: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Markets" 
        component={MarketsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Portfolio" 
        component={DashboardScreen} // Placeholder for now
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={DashboardScreen} // Placeholder for now
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
