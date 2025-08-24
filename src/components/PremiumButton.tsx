import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface PremiumButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  gradient?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: any;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  gradient = true,
  containerStyle,
  textStyle,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const theme = useCurrentTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(0.8, { damping: 15, stiffness: 150 });
    onPressIn?.(null as any);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
    opacity.value = withSpring(1, { damping: 15, stiffness: 150 });
    onPressOut?.(null as any);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.xl,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 8,
    };

    const sizeStyles = {
      sm: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 44,
      },
      md: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        minHeight: 56,
      },
      lg: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        minHeight: 64,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary[500],
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: theme.colors.secondary[500],
        borderWidth: 0,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary[500],
      },
      ghost: {
        backgroundColor: 'transparent',
        borderWidth: 0,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled && {
        opacity: 0.5,
        shadowOpacity: 0.05,
      }),
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: size === 'sm' ? 14 : size === 'md' ? 16 : 18,
      fontWeight: '600',
    };

    const variantTextStyles = {
      primary: { color: theme.colors.text.inverse },
      secondary: { color: theme.colors.text.inverse },
      outline: { color: theme.colors.primary[500] },
      ghost: { color: theme.colors.primary[500] },
    };

    return {
      ...baseStyle,
      ...variantTextStyles[variant],
      ...textStyle,
    };
  };

  const getGradientColors = (): [string, string] => {
    if (variant === 'primary') {
      return [theme.colors.primary[500], theme.colors.primary[600]];
    } else if (variant === 'secondary') {
      return [theme.colors.secondary[500], theme.colors.secondary[600]];
    }
    return [theme.colors.primary[500], theme.colors.primary[600]];
  };

  const renderContent = () => (
    <>
      {leftIcon && !loading && (
        <Animated.View style={{ 
          marginRight: theme.spacing.sm,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {leftIcon}
        </Animated.View>
      )}
      
      <View style={{ flex: 1, alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary[500] : theme.colors.text.inverse} 
          />
        ) : (
          <Text style={getTextStyle()}>{title}</Text>
        )}
      </View>
      
      {rightIcon && !loading && (
        <Animated.View style={{ 
          marginLeft: theme.spacing.sm,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {rightIcon}
        </Animated.View>
      )}
    </>
  );

  if (gradient && (variant === 'primary' || variant === 'secondary')) {
    return (
      <AnimatedTouchableOpacity
        style={[getButtonStyle(), containerStyle, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
        {...props}
      >
        <AnimatedLinearGradient
          colors={getGradientColors()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
          borderRadius={theme.borderRadius.xl}
        />
        {renderContent()}
      </AnimatedTouchableOpacity>
    );
  }

  return (
    <AnimatedTouchableOpacity
      style={[getButtonStyle(), containerStyle, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.9}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchableOpacity>
  );
};
