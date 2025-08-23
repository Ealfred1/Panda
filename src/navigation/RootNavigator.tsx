import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AssetDetailScreen } from '../screens/markets/AssetDetailScreen';
import { useAppStore } from '../store/appStore';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  AssetDetail: { assetId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { isAuthenticated, isInitialized } = useAppStore();

  if (!isInitialized) {
    return null; // Show loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="App" component={AppNavigator} />
            <Stack.Screen name="AssetDetail" component={AssetDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
