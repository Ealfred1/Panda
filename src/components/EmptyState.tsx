import React from 'react';
import {
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';
import { ThemedButton } from './ThemedButton';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
  variant?: 'default' | 'search' | 'error' | 'success' | 'custom';
  style?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  showAnimation?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  actionText,
  onAction,
  variant = 'default',
  style,
  titleStyle,
  descriptionStyle,
  showAnimation = true,
}) => {
  const theme = useCurrentTheme();
  const floatAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);

  React.useEffect(() => {
    if (showAnimation) {
      floatAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ),
        -1,
        true
      );

      scaleAnim.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500 }),
          withTiming(1, { duration: 1500 })
        ),
        -1,
        true
      );
    }
  }, [showAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          floatAnim.value,
          [0, 1],
          [0, -10]
        ),
      },
      {
        scale: scaleAnim.value,
      },
    ],
  }));

  const getVariantStyles = () => {
    switch (variant) {
      case 'search':
        return {
          iconColor: theme.colors.text.tertiary,
          titleColor: theme.colors.text.primary,
          descriptionColor: theme.colors.text.secondary,
        };
      case 'error':
        return {
          iconColor: theme.colors.error[500],
          titleColor: theme.colors.error[600],
          descriptionColor: theme.colors.text.secondary,
        };
      case 'success':
        return {
          iconColor: theme.colors.success[500],
          titleColor: theme.colors.success[600],
          descriptionColor: theme.colors.text.secondary,
        };
      default:
        return {
          iconColor: theme.colors.primary[500],
          titleColor: theme.colors.text.primary,
          descriptionColor: theme.colors.text.secondary,
        };
    }
  };

  const variantStyles = getVariantStyles();

  const containerStyle: ViewStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing['2xl'],
  };

  const iconContainerStyle: ViewStyle = {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleContainerStyle: TextStyle = {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: variantStyles.titleColor,
  };

  const descriptionContainerStyle: TextStyle = {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    color: variantStyles.descriptionColor,
    lineHeight: 24,
  };

  const actionContainerStyle: ViewStyle = {
    width: '100%',
    maxWidth: 200,
  };

  const renderDefaultIcon = () => {
    const iconSize = 80;
    const iconColor = variantStyles.iconColor;

    switch (variant) {
      case 'search':
        return (
          <View
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              backgroundColor: theme.colors.background.secondary,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: iconColor,
              borderStyle: 'dashed',
            }}
          >
            <Text style={{ fontSize: 32, color: iconColor }}>🔍</Text>
          </View>
        );
      case 'error':
        return (
          <View
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              backgroundColor: theme.colors.error[50],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32 }}>❌</Text>
          </View>
        );
      case 'success':
        return (
          <View
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              backgroundColor: theme.colors.success[50],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32 }}>✅</Text>
          </View>
        );
      default:
        return (
          <View
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: iconSize / 2,
              backgroundColor: theme.colors.primary[50],
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 32 }}>📭</Text>
          </View>
        );
    }
  };

  return (
    <View style={[containerStyle, style]}>
      <Animated.View style={[iconContainerStyle, animatedStyle]}>
        {icon || renderDefaultIcon()}
      </Animated.View>

      <Text style={[titleContainerStyle, titleStyle]}>
        {title}
      </Text>

      {description && (
        <Text style={[descriptionContainerStyle, descriptionStyle]}>
          {description}
        </Text>
      )}

      {actionText && onAction && (
        <View style={actionContainerStyle}>
          <ThemedButton
            title={actionText}
            onPress={onAction}
            variant={variant === 'error' ? 'outline' : 'primary'}
            fullWidth
          />
        </View>
      )}
    </View>
  );
};

// Convenience components
export const SearchEmptyState: React.FC<Omit<EmptyStateProps, 'variant'>> = (props) => (
  <EmptyState
    variant="search"
    title="No results found"
    description="Try adjusting your search terms or filters to find what you're looking for."
    {...props}
  />
);

export const ErrorEmptyState: React.FC<Omit<EmptyStateProps, 'variant'> & { onRetry?: () => void }> = ({
  onRetry,
  ...props
}) => (
  <EmptyState
    variant="error"
    title="Something went wrong"
    description="We encountered an error while loading your content. Please try again."
    actionText="Try Again"
    onAction={onRetry}
    {...props}
  />
);

export const SuccessEmptyState: React.FC<Omit<EmptyStateProps, 'variant'>> = (props) => (
  <EmptyState
    variant="success"
    title="All caught up!"
    description="You've seen all the latest updates. Check back later for more content."
    {...props}
  />
);
