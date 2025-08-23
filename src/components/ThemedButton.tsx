import { BlurView } from 'expo-blur';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}) => {
  const theme = useCurrentTheme();
  const scale = useSharedValue(1);
  const pressed = useSharedValue(false);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    pressed.value = withTiming(1, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    pressed.value = withTiming(0, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      ...(fullWidth && { width: '100%' }),
    };

    const sizeStyles = {
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 36,
      },
      md: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
      },
      lg: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        minHeight: 56,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary[500],
        ...theme.shadows.medium,
      },
      secondary: {
        backgroundColor: theme.colors.secondary[900],
        ...theme.shadows.medium,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary[500],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      glass: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled && {
        opacity: 0.5,
        backgroundColor: theme.colors.text.disabled,
      }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const sizeStyles = {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    };

    const variantTextStyles = {
      primary: {
        color: theme.colors.text.inverse,
      },
      secondary: {
        color: theme.colors.text.inverse,
      },
      outline: {
        color: theme.colors.primary[500],
      },
      ghost: {
        color: theme.colors.primary[500],
      },
      glass: {
        color: theme.colors.text.inverse,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantTextStyles[variant],
      ...(disabled && {
        color: theme.colors.text.disabled,
      }),
    };
  };

  const renderContent = () => (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' || variant === 'secondary' || variant === 'glass' 
            ? theme.colors.text.inverse 
            : theme.colors.primary[500]}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Animated.View style={{ marginRight: theme.spacing.sm }}>
              {icon}
            </Animated.View>
          )}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Animated.View style={{ marginLeft: theme.spacing.sm }}>
              {icon}
            </Animated.View>
          )}
        </>
      )}
    </>
  );

  if (variant === 'glass') {
    return (
      <AnimatedTouchable
        style={[getButtonStyle(), animatedStyle, style]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <BlurView intensity={20} style={StyleSheet.absoluteFill} />
        {renderContent()}
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      style={[getButtonStyle(), animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderContent()}
    </AnimatedTouchable>
  );
};
