import { BlurView } from 'expo-blur';
import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl';
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  onPress,
  style,
  disabled = false,
  loading = false,
  padding = 'md',
  margin = 'none',
  borderRadius = 'lg',
}) => {
  const theme = useCurrentTheme();
  const scale = useSharedValue(1);
  const pressed = useSharedValue(false);

  const handlePressIn = () => {
    if (onPress && !disabled && !loading) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
    }
  };

  const handlePressOut = () => {
    if (onPress && !disabled && !loading) {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: theme.colors.background.card,
      borderRadius: theme.borderRadius[borderRadius],
      overflow: 'hidden',
    };

    const sizeStyles = {
      sm: { minHeight: 80 },
      md: { minHeight: 120 },
      lg: { minHeight: 160 },
    };

    const paddingStyles = {
      none: {},
      sm: { padding: theme.spacing.sm },
      md: { padding: theme.spacing.md },
      lg: { padding: theme.spacing.lg },
    };

    const marginStyles = {
      none: {},
      sm: { margin: theme.spacing.sm },
      md: { margin: theme.spacing.md },
      lg: { margin: theme.spacing.lg },
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.background.card,
      },
      elevated: {
        backgroundColor: theme.colors.background.card,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.border.primary,
      },
      glass: {
        backgroundColor: 'transparent',
      },
      gradient: {
        backgroundColor: theme.colors.background.card,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...paddingStyles[padding],
      ...marginStyles[margin],
      ...variantStyles[variant],
      ...(disabled && {
        opacity: 0.5,
      }),
    };
  };

  const renderContent = () => {
    if (variant === 'glass') {
      return (
        <BlurView intensity={20} style={StyleSheet.absoluteFill}>
          <View style={{ padding: padding === 'none' ? 0 : theme.spacing[padding as keyof typeof theme.spacing] }}>
            {children}
          </View>
        </BlurView>
      );
    }

    if (variant === 'gradient') {
      return (
        <View style={getCardStyle()}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              backgroundColor: theme.colors.primary[500],
            }}
          />
          {children}
        </View>
      );
    }

    return children;
  };

  if (onPress) {
    return (
      <AnimatedTouchable
        style={[getCardStyle(), animatedStyle, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        {renderContent()}
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedView style={[getCardStyle(), style]}>
      {renderContent()}
    </AnimatedView>
  );
};
