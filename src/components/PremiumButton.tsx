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
      borderRadius: 16, // Match profile logout button
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: '100%',
      borderWidth: 1,
      borderColor: '#f0f0f0', // Match profile border color
    };

    const sizeStyles = {
      sm: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        minHeight: 48,
      },
      md: {
        paddingVertical: 16, // Match profile logout button
        paddingHorizontal: 20,
        minHeight: 56,
      },
      lg: {
        paddingVertical: 18,
        paddingHorizontal: 24,
        minHeight: 64,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: '#f58220', // Match profile orange color
        borderColor: '#f0f0f0',
      },
      secondary: {
        backgroundColor: '#0a2472', // Match profile blue color
        borderColor: '#f0f0f0',
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: '#f58220',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled && {
        opacity: 0.5,
      }),
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontSize: size === 'sm' ? 14 : size === 'md' ? 17 : 18, // Match profile font size
      fontWeight: '700', // Match profile font weight
      letterSpacing: 0.2, // Match profile letter spacing
    };

    const variantTextStyles = {
      primary: { color: '#fff' }, // Match profile white text
      secondary: { color: '#fff' },
      outline: { color: '#f58220' }, // Match profile orange color
      ghost: { color: '#f58220' },
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
          marginRight: 10, // Match profile spacing
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: 24,
          height: 24,
        }}>
          {leftIcon}
        </Animated.View>
      )}
      
      <View style={{ 
        flex: 1, 
        alignItems: 'center',
        flexDirection: 'row', // Ensure inline layout
        justifyContent: 'center',
      }}>
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
          marginLeft: 10, // Match profile spacing
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: 24,
          height: 24,
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
          style={[StyleSheet.absoluteFill, { borderRadius: 16 }]}
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
