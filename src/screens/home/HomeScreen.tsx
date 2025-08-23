import { Bookmark, Heart, MessageCircle, Share } from 'lucide-react-native';
import React from 'react';
import {
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Loader } from '../../components';
import { useCurrentTheme } from '../../store/themeStore';
import { dummyCategories, dummyPosts } from '../../utils/dummyData';
import { formatDate, formatNumber } from '../../utils/helpers';

export const HomeScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const scrollY = useSharedValue(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [1, 0.8]
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 100],
      [0, -20]
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  };

  const headerStyle: ViewStyle = {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.background.primary,
  };

  const greetingStyle = {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  };

  const subtitleStyle = {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.lg,
  };

  const categoryContainerStyle: ViewStyle = {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  };

  const categoryItemStyle: ViewStyle = {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    minWidth: 80,
  };

  const categoryIconStyle: ViewStyle = {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  };

  const categoryTextStyle = {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: theme.colors.text.secondary,
  };

  const postCardStyle: ViewStyle = {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  };

  const postHeaderStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  };

  const avatarStyle: ViewStyle = {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.sm,
  };

  const authorInfoStyle = {
    flex: 1,
  };

  const authorNameStyle = {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  };

  const postDateStyle = {
    fontSize: 14,
    color: theme.colors.text.tertiary,
  };

  const postTitleStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  };

  const postContentStyle = {
    fontSize: 16,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  };

  const postImageStyle: ViewStyle = {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
  };

  const postActionsStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const actionButtonStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  };

  const actionTextStyle = {
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginLeft: theme.spacing.xs,
  };

  const renderCategory = (category: any) => (
    <View key={category.id} style={categoryItemStyle}>
      <View
        style={[
          categoryIconStyle,
          { backgroundColor: category.color + '20' },
        ]}
      >
        <Text style={{ fontSize: 24 }}>🎯</Text>
      </View>
      <Text style={categoryTextStyle}>{category.name}</Text>
      <Text style={[categoryTextStyle, { fontSize: 10 }]}>
        {formatNumber(category.count)}
      </Text>
    </View>
  );

  const renderPost = (post: any) => (
    <Card key={post.id} style={postCardStyle} variant="elevated">
      <View style={postHeaderStyle}>
        <View style={avatarStyle}>
          <Text style={{ fontSize: 20 }}>👤</Text>
        </View>
        <View style={authorInfoStyle}>
          <Text style={authorNameStyle}>{post.author.name}</Text>
          <Text style={postDateStyle}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>

      <Text style={postTitleStyle}>{post.title}</Text>
      <Text style={postContentStyle} numberOfLines={3}>
        {post.content}
      </Text>

      {post.image && (
        <View style={postImageStyle}>
          <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 80 }}>
            📷 Image Placeholder
          </Text>
        </View>
      )}

      <View style={postActionsStyle}>
        <TouchableOpacity style={actionButtonStyle}>
          <Heart size={20} color={theme.colors.text.tertiary} />
          <Text style={actionTextStyle}>{formatNumber(post.likes)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={actionButtonStyle}>
          <MessageCircle size={20} color={theme.colors.text.tertiary} />
          <Text style={actionTextStyle}>{formatNumber(post.comments)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={actionButtonStyle}>
          <Share size={20} color={theme.colors.text.tertiary} />
          <Text style={actionTextStyle}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={actionButtonStyle}>
          <Bookmark size={20} color={theme.colors.text.tertiary} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  if (loading) {
    return <Loader fullScreen text="Loading your feed..." />;
  }

  return (
    <SafeAreaView style={containerStyle}>
      <Animated.View style={[headerStyle, headerAnimatedStyle]}>
        <Text style={greetingStyle}>Good morning! 👋</Text>
        <Text style={subtitleStyle}>Discover amazing content today</Text>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary[500]}
          />
        }
        onScroll={(event) => {
          scrollY.value = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        <View style={categoryContainerStyle}>
          {dummyCategories.slice(0, 4).map(renderCategory)}
        </View>

        {dummyPosts.map(renderPost)}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
