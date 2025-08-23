import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack Navigator
export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Splash: undefined;
};

// Onboarding Stack Navigator
export type OnboardingStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingFeatures: undefined;
  OnboardingPermissions: undefined;
};

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  home: undefined;
  explore: undefined;
  subscription: undefined;
  wallet: undefined;
  bot: undefined;
  notifications: undefined;
  profile: undefined;
  settings: undefined;
};

// Screen Props
export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: any;
  route: any;
};

export type OnboardingStackScreenProps<T extends keyof OnboardingStackParamList> = {
  navigation: any;
  route: any;
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any;
  route: any;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> = {
  navigation: any;
  route: any;
};
