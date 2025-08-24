import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface PremiumCardProps {
  title?: string;
  subtitle?: string;
  image?: string;
  gradient?: boolean;
  gradientColors?: [string, string];
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glassmorphism';
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const PremiumCard: React.FC<PremiumCardProps> = ({
  title,
  subtitle,
  image,
  gradient = false,
  gradientColors,
  onPress,
  style,
  children,
  variant = 'default',
  size = 'md',
}) => {
  const theme = useCurrentTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 150 });
      opacity.value = withSpring(0.9, { damping: 15, stiffness: 150 });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      opacity.value = withSpring(1, { damping: 15, stiffness: 150 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.xl,
      overflow: 'hidden',
    };

    const sizeStyles = {
      sm: { padding: theme.spacing.md },
      md: { padding: theme.spacing.lg },
      lg: { padding: theme.spacing.xl },
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.background.card,
        borderWidth: 1,
        borderColor: theme.colors.border.primary,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      },
      elevated: {
        backgroundColor: theme.colors.background.card,
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
      },
      glassmorphism: {
        backgroundColor: 'rgba(45, 45, 45, 0.8)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTitleStyle = () => ({
    fontSize: size === 'sm' ? 16 : size === 'md' ? 18 : 20,
    fontWeight: '600' as const,
    color: theme.colors.text.primary,
    marginBottom: size === 'sm' ? 4 : 6,
  });

  const getSubtitleStyle = () => ({
    fontSize: size === 'sm' ? 14 : size === 'md' ? 15 : 16,
    color: theme.colors.text.secondary,
    lineHeight: size === 'sm' ? 18 : size === 'md' ? 20 : 22,
  });

  const getImageStyle = () => ({
    width: '100%' as const,
    height: size === 'sm' ? 120 : size === 'md' ? 160 : 200,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  });

  const renderContent = () => (
    <>
      {image && (
        <Image source={{ uri: image }} style={getImageStyle()} resizeMode="cover" />
      )}
      
      {(title || subtitle) && (
        <View style={styles.textContainer}>
          {title && <Text style={getTitleStyle()}>{title}</Text>}
          {subtitle && <Text style={getSubtitleStyle()}>{subtitle}</Text>}
        </View>
      )}
      
      {children}
    </>
  );

  if (gradient && gradientColors) {
    return (
      <AnimatedPressable
        style={[getCardStyle(), style, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={!onPress}
      >
        <AnimatedLinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {renderContent()}
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[getCardStyle(), style, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={!onPress}
    >
      {renderContent()}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 8,
  },
});
