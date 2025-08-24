import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle
} from 'react-native';
import Animated, {
    FadeIn,
    FadeInUp,
    SlideInUp,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';
import { PremiumButton } from './PremiumButton';
import { PremiumIllustrations } from './PremiumIllustrations';

interface PremiumEmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  illustration?: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'minimal' | 'illustrated';
}

export const PremiumEmptyState: React.FC<PremiumEmptyStateProps> = ({
  icon = 'alert-circle-outline',
  title,
  description,
  actionText,
  onAction,
  illustration,
  style,
  variant = 'default',
}) => {
  const theme = useCurrentTheme();

  const renderIcon = () => {
    if (illustration) {
      return (
        <Animated.View entering={FadeIn.delay(200).springify()}>
          {illustration}
        </Animated.View>
      );
    }

    return (
      <Animated.View
        entering={FadeIn.delay(200).springify()}
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.colors.background.secondary,
            borderColor: theme.colors.border.primary,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={variant === 'minimal' ? 32 : 48}
          color={theme.colors.text.secondary}
        />
      </Animated.View>
    );
  };

  const renderContent = () => (
    <View style={styles.content}>
      {renderIcon()}
      
      <Animated.View entering={FadeInUp.delay(400).springify()}>
        <Text
          style={[
            styles.title,
            { color: theme.colors.text.primary },
          ]}
        >
          {title}
        </Text>
        
        <Text
          style={[
            styles.description,
            { color: theme.colors.text.secondary },
          ]}
        >
          {description}
        </Text>
      </Animated.View>

      {actionText && onAction && (
        <Animated.View entering={SlideInUp.delay(600).springify()}>
          <PremiumButton
            title={actionText}
            onPress={onAction}
            variant="outline"
            size="md"
            style={styles.actionButton}
          />
        </Animated.View>
      )}
    </View>
  );

  if (variant === 'minimal') {
    return (
      <View style={[styles.minimalContainer, style]}>
        {renderContent()}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {renderContent()}
    </View>
  );
};

// Predefined empty states for common scenarios
export const EmptyStates = {
  NoData: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      illustration={<PremiumIllustrations.NoData size={120} />}
      title="No Data Available"
      description="There's no data to display at the moment. Check back later or refresh to see new content."
      actionText={actionText || "Refresh"}
      onAction={onAction}
    />
  ),

  NoResults: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      illustration={<PremiumIllustrations.NoData size={120} />}
      title="No Results Found"
      description="We couldn't find any results matching your search. Try adjusting your filters or search terms."
      actionText={actionText || "Clear Filters"}
      onAction={onAction}
    />
  ),

  NoNotifications: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      icon="notifications-off-outline"
      title="All Caught Up!"
      description="You're all caught up! No new notifications to display at the moment."
      actionText={actionText || "View All"}
      onAction={onAction}
    />
  ),

  NoTransactions: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      illustration={<PremiumIllustrations.Trading size={120} />}
      title="No Transactions Yet"
      description="You haven't made any transactions yet. Start by depositing funds or making your first trade."
      actionText={actionText || "Get Started"}
      onAction={onAction}
    />
  ),

  NoPortfolio: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      illustration={<PremiumIllustrations.EmptyPortfolio size={120} />}
      title="Portfolio is Empty"
      description="Your portfolio is currently empty. Start building your investment portfolio by exploring markets."
      actionText={actionText || "Explore Markets"}
      onAction={onAction}
    />
  ),

  NoMarkets: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      illustration={<PremiumIllustrations.MarketTrends size={120} />}
      title="Markets Unavailable"
      description="Market data is currently unavailable. Please check back later or refresh to see the latest updates."
      actionText={actionText || "Refresh"}
      onAction={onAction}
    />
  ),

  Error: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      illustration={<PremiumIllustrations.Error size={120} />}
      title="Something Went Wrong"
      description="We encountered an error while loading the content. Please try again or contact support if the issue persists."
      actionText={actionText || "Try Again"}
      onAction={onAction}
    />
  ),

  Offline: ({ onAction, actionText }: { onAction?: () => void; actionText?: string }) => (
    <PremiumEmptyState
      icon="wifi-outline"
      title="You're Offline"
      description="Please check your internet connection and try again. Some features may not be available offline."
      actionText={actionText || "Retry"}
      onAction={onAction}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  minimalContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  content: {
    alignItems: 'center',
    maxWidth: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },
  actionButton: {
    minWidth: 120,
  },
});
