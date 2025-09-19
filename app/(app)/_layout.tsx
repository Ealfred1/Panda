import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="bot" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="more" />
      <Stack.Screen name="markets" />
      <Stack.Screen name="analytics" />
      <Stack.Screen name="learning" />
    </Stack>
  );
}
