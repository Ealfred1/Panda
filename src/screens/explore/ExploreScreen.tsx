import { Hash, Search } from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Input } from '../../components';
import { useCurrentTheme } from '../../store/themeStore';
import { dummyCategories, dummyTrendingTopics } from '../../utils/dummyData';

export const ExploreScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  };

  const headerStyle: ViewStyle = {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  };

  const titleStyle = {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
  };

  const sectionStyle: ViewStyle = {
    marginBottom: theme.spacing.xl,
  };

  const sectionTitleStyle = {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  };

  const categoryGridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
  };

  const categoryItemStyle: ViewStyle = {
    width: '48%',
    marginBottom: theme.spacing.md,
    marginRight: '2%',
  };

  const trendingItemStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  };

  const trendingTextStyle = {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  };

  const trendingCountStyle = {
    fontSize: 14,
    color: theme.colors.text.tertiary,
  };

  const renderCategory = (category: any) => (
    <Card key={category.id} style={categoryItemStyle} variant="outlined">
      <View style={{ alignItems: 'center', padding: theme.spacing.md }}>
        <View
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: category.color + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing.sm,
          }}
        >
          <Text style={{ fontSize: 24 }}>🎯</Text>
        </View>
        <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.text.primary }}>
          {category.name}
        </Text>
        <Text style={{ fontSize: 12, color: theme.colors.text.tertiary }}>
          {category.count} posts
        </Text>
      </View>
    </Card>
  );

  const renderTrendingTopic = (topic: any, index: number) => (
    <TouchableOpacity key={topic.id} style={trendingItemStyle}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: theme.colors.text.tertiary }}>
        #{index + 1}
      </Text>
      <Hash size={16} color={theme.colors.primary[500]} />
      <Text style={trendingTextStyle}>{topic.name}</Text>
      <Text style={trendingCountStyle}>{topic.posts} posts</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={containerStyle}>
      <View style={headerStyle}>
        <Text style={titleStyle}>Explore</Text>
        <Input
          placeholder="Search topics, people, or posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={20} color={theme.colors.text.tertiary} />}
          variant="filled"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={sectionStyle}>
          <Text style={sectionTitleStyle}>Categories</Text>
          <View style={categoryGridStyle}>
            {dummyCategories.map(renderCategory)}
          </View>
        </View>

        <View style={sectionStyle}>
          <Text style={sectionTitleStyle}>Trending Topics</Text>
          <Card variant="outlined" margin="lg">
            {dummyTrendingTopics.map(renderTrendingTopic)}
          </Card>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
