import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    SlideInRight,
} from 'react-native-reanimated';
import { PremiumCard } from '../../src/components/PremiumCard';
import { useCurrentTheme } from '../../src/store/themeStore';

const { width } = Dimensions.get('window');

// Dummy data for demonstration
const marketTrends = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$43,250',
    change: '+2.45%',
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,680',
    change: '+1.23%',
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$185.50',
    change: '-0.85%',
    isPositive: false,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
];

const portfolioSummary = {
  totalValue: '$12,450.80',
  dailyChange: '+$234.50',
  dailyChangePercent: '+1.92%',
  isPositive: true,
};

const quickActions = [
  {
    id: '1',
    title: 'Buy Crypto',
    subtitle: 'Purchase digital assets',
    icon: 'add-circle-outline',
    color: '#10B981',
    onPress: () => {},
  },
  {
    id: '2',
    title: 'Trade Stocks',
    subtitle: 'Invest in companies',
    icon: 'trending-up-outline',
    color: '#3B82F6',
    onPress: () => {},
  },
  {
    id: '3',
    title: 'View Portfolio',
    subtitle: 'Check your investments',
    icon: 'pie-chart-outline',
    color: '#8B5CF6',
    onPress: () => {},
  },
  {
    id: '4',
    title: 'Market News',
    subtitle: 'Stay informed',
    icon: 'newspaper-outline',
    color: '#F59E0B',
    onPress: () => {},
  },
];

const newsItems = [
  {
    id: '1',
    title: 'Bitcoin Reaches New All-Time High',
    subtitle: 'Cryptocurrency market shows strong momentum',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
    time: '2 hours ago',
  },
  {
    id: '2',
    title: 'Tech Stocks Rally on AI Breakthrough',
    subtitle: 'Major tech companies lead market gains',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
    time: '4 hours ago',
  },
];

export default function HomeScreen() {
  const theme = useCurrentTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const renderHeader = () => (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
      <View style={styles.headerContent}>
        <View>
          <Text style={[styles.greeting, { color: theme.colors.text.primary }]}>
            Good morning! 👋
          </Text>
          <Text style={[styles.userName, { color: theme.colors.text.secondary }]}>
            Welcome back, Alex
          </Text>
        </View>
        
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={theme.colors.text.primary} />
          <View style={[styles.notificationBadge, { backgroundColor: theme.colors.primary[500] }]} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderPortfolioCard = () => (
    <Animated.View entering={FadeInUp.delay(400).springify()}>
      <PremiumCard
        variant="elevated"
        size="lg"
        style={styles.portfolioCard}
        gradient
        gradientColors={[theme.colors.primary[500], theme.colors.primary[600]]}
      >
        <View style={styles.portfolioContent}>
          <View style={styles.portfolioHeader}>
            <Text style={[styles.portfolioTitle, { color: theme.colors.text.inverse }]}>
              Portfolio Value
            </Text>
            <Ionicons name="trending-up" size={24} color={theme.colors.text.inverse} />
          </View>
          
          <Text style={[styles.portfolioValue, { color: theme.colors.text.inverse }]}>
            {portfolioSummary.totalValue}
          </Text>
          
          <View style={styles.portfolioChange}>
            <Text style={[styles.changeText, { color: theme.colors.text.inverse }]}>
              {portfolioSummary.dailyChange} ({portfolioSummary.dailyChangePercent})
            </Text>
            <Text style={[styles.changeLabel, { color: theme.colors.text.inverse }]}>
              Today
            </Text>
          </View>
        </View>
      </PremiumCard>
    </Animated.View>
  );

  const renderQuickActions = () => (
    <Animated.View entering={FadeInUp.delay(500).springify()}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Quick Actions
      </Text>
      
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.quickActionItem}
            onPress={action.onPress}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <Ionicons name={action.icon as any} size={20} color="white" />
            </View>
            <Text style={[styles.actionTitle, { color: theme.colors.text.primary }]}>
              {action.title}
            </Text>
            <Text style={[styles.actionSubtitle, { color: theme.colors.text.secondary }]}>
              {action.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  const renderMarketTrends = () => (
    <Animated.View entering={FadeInUp.delay(600).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Market Trends
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.colors.primary[500] }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={marketTrends}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.marketTrendsList}
        renderItem={({ item }) => (
          <PremiumCard
            size="sm"
            style={styles.marketTrendCard}
            onPress={() => {}}
          >
            <Image source={{ uri: item.image }} style={styles.marketImage} />
            <View style={styles.marketInfo}>
              <Text style={[styles.marketSymbol, { color: theme.colors.text.primary }]}>
                {item.symbol}
              </Text>
              <Text style={[styles.marketName, { color: theme.colors.text.secondary }]}>
                {item.name}
              </Text>
              <Text style={[styles.marketPrice, { color: theme.colors.text.primary }]}>
                {item.price}
              </Text>
              <Text
                style={[
                  styles.marketChange,
                  { color: item.isPositive ? theme.colors.success[500] : theme.colors.error[500] },
                ]}
              >
                {item.change}
              </Text>
            </View>
          </PremiumCard>
        )}
        keyExtractor={(item) => item.id}
      />
    </Animated.View>
  );

  const renderNewsSection = () => (
    <Animated.View entering={FadeInUp.delay(700).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Latest News
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.colors.primary[500] }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      {newsItems.map((news) => (
        <PremiumCard
          key={news.id}
          size="md"
          style={styles.newsCard}
          onPress={() => {}}
        >
          <Image source={{ uri: news.image }} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <Text style={[styles.newsTitle, { color: theme.colors.text.primary }]}>
              {news.title}
            </Text>
            <Text style={[styles.newsSubtitle, { color: theme.colors.text.secondary }]}>
              {news.subtitle}
            </Text>
            <Text style={[styles.newsTime, { color: theme.colors.text.tertiary }]}>
              {news.time}
            </Text>
          </View>
        </PremiumCard>
      ))}
    </Animated.View>
  );

  const renderDecorativeElements = () => (
    <>
      <Animated.View
        entering={SlideInRight.delay(800).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.primary[500] }]}
      />
      <Animated.View
        entering={SlideInRight.delay(1000).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.secondary[500] }]}
      />
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderPortfolioCard()}
        {renderQuickActions()}
        {renderMarketTrends()}
        {renderNewsSection()}
        {renderDecorativeElements()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for tab bar
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    opacity: 0.8,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  portfolioCard: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  portfolioContent: {
    alignItems: 'center',
  },
  portfolioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  portfolioChange: {
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  changeLabel: {
    fontSize: 14,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  quickActionItem: {
    width: (width - 48) / 2,
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  marketTrendsList: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  marketTrendCard: {
    width: 160,
    marginRight: 16,
  },
  marketImage: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 12,
  },
  marketInfo: {
    alignItems: 'center',
  },
  marketSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  marketName: {
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  marketPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  marketChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  newsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  newsImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsSubtitle: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
    opacity: 0.8,
  },
  newsTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
    right: -60,
    top: 400,
  },
});
