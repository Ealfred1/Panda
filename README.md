# Panda - Modern React Native App

A sophisticated React Native application built with Expo, featuring modern design, theming, and architecture.

## 🎨 Features

### Design System
- **Brand Colors**: Vibrant Orange (#FF6B00) and Deep Dark-Blue (#0A1931)
- **Adaptive Theming**: Light & "Low-Light" Dark modes with smooth transitions
- **Modern UI**: Rounded corners, soft shadows, blur effects, and micro-interactions
- **Typography**: Expressive, bold typography with consistent spacing

### Architecture
- **Expo Router**: File-based routing with stack and tab navigation
- **NativeWind**: TailwindCSS for React Native with custom theme tokens
- **Zustand**: Lightweight state management with persistence
- **TypeScript**: Full type safety throughout the application

### UI Components
- **ThemedButton**: Multiple variants (primary, secondary, outline, ghost, glass)
- **Input**: Form inputs with validation, icons, and animations
- **Card**: Versatile card component with multiple styles
- **Loader**: Multiple loading animations (spinner, dots, pulse, skeleton)
- **EmptyState**: Beautiful empty states with illustrations
- **Toast**: Notification system with multiple types
- **CustomTabBar**: Floating animated bottom tab bar with blur effects

### Navigation
- **Root Stack Navigator**: Handles onboarding, auth, and main app flow
- **Tab Navigator**: Custom animated bottom tabs with floating design
- **Stack Navigation**: Screen transitions with custom animations

### State Management
- **Theme Store**: Global theme state with persistence
- **App Store**: User data, loading states, and app configuration
- **Form Validation**: React Hook Form + Yup integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Run on your preferred platform**:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

```
src/
├── components/          # Shared UI components
│   ├── ThemedButton.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Loader.tsx
│   ├── EmptyState.tsx
│   ├── Toast.tsx
│   ├── CustomTabBar.tsx
│   └── index.ts
├── screens/            # Feature screens
│   ├── home/
│   ├── explore/
│   ├── profile/
│   └── settings/
├── navigation/         # Navigation configuration
│   ├── types.ts
│   └── MainTabNavigator.tsx
├── store/             # Zustand stores
│   ├── themeStore.ts
│   ├── appStore.ts
│   └── index.ts
├── theme/             # Theme configuration
│   ├── light.ts
│   ├── dark.ts
│   └── index.ts
├── utils/             # Utilities and helpers
│   ├── constants.ts
│   ├── helpers.ts
│   └── dummyData.ts
└── App.tsx            # Main app component
```

## 🎯 Key Components

### ThemedButton
```tsx
<ThemedButton
  title="Get Started"
  onPress={handlePress}
  variant="primary"
  size="lg"
  icon={<ArrowRight size={16} />}
  fullWidth
/>
```

### Input
```tsx
<Input
  label="Email"
  placeholder="Enter your email"
  leftIcon={<Mail size={20} />}
  variant="outlined"
  required
/>
```

### Card
```tsx
<Card
  variant="elevated"
  onPress={handlePress}
  padding="lg"
  shadow="large"
>
  <Text>Card content</Text>
</Card>
```

### Custom Tab Bar
The app features a custom floating tab bar with:
- Blur effects and glassmorphism
- Smooth animations and micro-interactions
- Active tab highlighting
- Theme-aware styling

## 🎨 Theming

The app uses a comprehensive theming system with:

### Color Palette
- **Primary**: Orange (#FF6B00) - Brand color for CTAs and highlights
- **Secondary**: Dark Blue (#0A1931) - Secondary brand color
- **Neutral**: Gray scale for text and backgrounds
- **Status**: Success, warning, error, and info colors

### Theme Modes
- **Light Mode**: Clean, bright interface
- **Dark Mode**: "Low-light" dark mode for reduced eye strain

### Usage
```tsx
import { useCurrentTheme } from '../store/themeStore';

const MyComponent = () => {
  const theme = useCurrentTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background.primary }}>
      <Text style={{ color: theme.colors.text.primary }}>
        Hello World
      </Text>
    </View>
  );
};
```

## 🔧 Configuration

### TailwindCSS
The app uses NativeWind (TailwindCSS for React Native) with custom configuration in `tailwind.config.js`.

### Babel
Babel is configured with NativeWind and Reanimated plugins in `babel.config.js`.

### TypeScript
Full TypeScript support with custom type definitions for navigation and components.

## 📱 Screenshots

The app includes four main screens:
1. **Home**: Feed with posts, categories, and pull-to-refresh
2. **Explore**: Search, categories, and trending topics
3. **Profile**: User profile with stats and activity
4. **Settings**: App settings with theme toggle

## 🚀 Performance

- **Reanimated 3**: Hardware-accelerated animations
- **Expo Blur**: Native blur effects
- **Optimized Images**: Expo Image for better performance
- **Lazy Loading**: Components loaded on demand

## 🔮 Future Enhancements

- [ ] Authentication flow with onboarding
- [ ] Real-time notifications
- [ ] Offline support
- [ ] Push notifications
- [ ] Deep linking
- [ ] Unit and integration tests
- [ ] CI/CD pipeline

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

Built with ❤️ using React Native, Expo, and modern development practices.
