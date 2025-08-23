import React from 'react';
import {
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  color?: string;
  text?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullScreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  variant = 'spinner',
  color,
  text,
  style,
  textStyle,
  fullScreen = false,
}) => {
  const theme = useCurrentTheme();
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  React.useEffect(() => {
    if (variant === 'spinner') {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1000 }),
        -1,
        false
      );
    } else if (variant === 'pulse') {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        false
      );
    } else if (variant === 'dots') {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 400 }),
          withTiming(1, { duration: 400 })
        ),
        -1,
        false
      );
    }
  }, [variant]);

  const getSize = () => {
    switch (size) {
      case 'sm': return 20;
      case 'md': return 32;
      case 'lg': return 48;
      default: return 32;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 12;
      case 'md': return 14;
      case 'lg': return 16;
      default: return 14;
    }
  };

  const spinnerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotsStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const renderSpinner = () => (
    <Animated.View style={spinnerStyle}>
      <View
        style={{
          width: getSize(),
          height: getSize(),
          borderRadius: getSize() / 2,
          borderWidth: 3,
          borderColor: color || theme.colors.primary[500],
          borderTopColor: 'transparent',
        }}
      />
    </Animated.View>
  );

  const renderDots = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {[0, 1, 2].map((index) => (
        <Animated.View
          key={index}
          style={[
            {
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: color || theme.colors.primary[500],
              marginHorizontal: 4,
            },
            dotsStyle,
            {
              animationDelay: `${index * 200}ms`,
            },
          ]}
        />
      ))}
    </View>
  );

  const renderPulse = () => (
    <Animated.View
      style={[
        {
          width: getSize(),
          height: getSize(),
          borderRadius: getSize() / 2,
          backgroundColor: color || theme.colors.primary[500],
        },
        pulseStyle,
      ]}
    />
  );

  const renderSkeleton = () => (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          width: getSize() * 2,
          height: getSize() / 2,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.md,
          marginBottom: theme.spacing.sm,
        }}
      />
      <View
        style={{
          width: getSize() * 1.5,
          height: getSize() / 3,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.sm,
        }}
      />
    </View>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      default:
        return renderSpinner();
    }
  };

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    ...(fullScreen && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.background.overlay,
      zIndex: 1000,
    }),
  };

  const textContainerStyle: TextStyle = {
    marginTop: theme.spacing.md,
    color: theme.colors.text.secondary,
    fontSize: getTextSize(),
    textAlign: 'center',
  };

  if (fullScreen) {
    return (
      <View style={[containerStyle, style]}>
        {renderLoader()}
        {text && (
          <Text style={[textContainerStyle, textStyle]}>{text}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      {renderLoader()}
      {text && (
        <Text style={[textContainerStyle, textStyle]}>{text}</Text>
      )}
    </View>
  );
};

// Convenience components
export const Spinner: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="spinner" {...props} />
);

export const DotsLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="dots" {...props} />
);

export const PulseLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="pulse" {...props} />
);

export const SkeletonLoader: React.FC<Omit<LoaderProps, 'variant'>> = (props) => (
  <Loader variant="skeleton" {...props} />
);
