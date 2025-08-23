// App Configuration
export const APP_CONFIG = {
  name: 'Panda',
  version: '1.0.0',
  buildNumber: '1',
} as const;

// Navigation Constants
export const NAVIGATION = {
  // Stack Names
  ROOT: 'Root',
  AUTH: 'Auth',
  MAIN: 'Main',
  ONBOARDING: 'Onboarding',
  
  // Tab Names
  HOME: 'home',
  EXPLORE: 'explore',
  PROFILE: 'profile',
  SETTINGS: 'settings',
  
  // Screen Names
  SPLASH: 'Splash',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  ONBOARDING_WELCOME: 'OnboardingWelcome',
  ONBOARDING_FEATURES: 'OnboardingFeatures',
  ONBOARDING_PERMISSIONS: 'OnboardingPermissions',
  HOME_SCREEN: 'HomeScreen',
  EXPLORE_SCREEN: 'ExploreScreen',
  PROFILE_SCREEN: 'ProfileScreen',
  SETTINGS_SCREEN: 'SettingsScreen',
} as const;

// Animation Constants
export const ANIMATION = {
  DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
  },
  EASING: {
    EASE_IN_OUT: 'ease-in-out',
    EASE_OUT: 'ease-out',
    EASE_IN: 'ease-in',
  },
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'theme-storage',
  APP: 'app-storage',
  USER_TOKEN: 'user-token',
  USER_PREFERENCES: 'user-preferences',
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
} as const;
