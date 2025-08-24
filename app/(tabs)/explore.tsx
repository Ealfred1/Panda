import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    SlideInLeft,
} from 'react-native-reanimated';
import { PremiumCard } from '../../src/components/PremiumCard';
import { useCurrentTheme } from '../../src/store/themeStore';

const { width } = Dimensions.get('window');

// Dummy data for demonstration
const categories = [
  {
    id: '1',
    title: 'Cryptocurrency',
    subtitle: 'Digital assets & blockchain',
    icon: 'logo-bitcoin',
    color: '#F7931A',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Stocks',
    subtitle: 'Public company shares',
    icon: 'trending-up',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Commodities',
    subtitle: 'Gold, oil & natural resources',
    icon: 'diamond',
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Forex',
    subtitle: 'Currency trading',
    icon: 'globe',
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  },
];

const trendingAssets = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: '$43,250',
    change: '+2.45%',
    isPositive: true,
    marketCap: '$845.2B',
    volume: '$28.5B',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: '$2,680',
    change: '+1.23%',
    isPositive: true,
    marketCap: '$322.1B',
    volume: '$15.8B',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: '$185.50',
    change: '-0.85%',
    isPositive: false,
    marketCap: '$589.3B',
    volume: '$8.2B',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$185.50',
    change: '+0.65%',
    isPositive: true,
    marketCap: '$2.9T',
    volume: '$12.1B',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
];

const featuredNews = [
  {
    id: '1',
    title: 'Bitcoin ETF Approval Expected Soon',
    subtitle: 'Major financial institutions prepare for crypto ETF launch',
    category: 'Cryptocurrency',
    time: '1 hour ago',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Tech Giants Report Strong Q4 Earnings',
    subtitle: 'AI investments drive revenue growth across sector',
    category: 'Stocks',
    time: '3 hours ago',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
];

export default function ExploreScreen() {
  const theme = useCurrentTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Implement category filtering here
  };

  const renderHeader = () => (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
      <Text style={[styles.title, { color: theme.colors.text.primary }]}>
        Explore Markets
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
        Discover investment opportunities across all asset classes
      </Text>
    </Animated.View>
  );

  const renderSearchBar = () => (
    <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.searchContainer}>
      <View style={[styles.searchBar, { backgroundColor: theme.colors.background.secondary }]}>
        <Ionicons name="search" size={20} color={theme.colors.text.secondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.colors.text.primary }]}
          placeholder="Search assets, companies, or markets..."
          placeholderTextColor={theme.colors.text.tertiary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );

  const renderCategories = () => (
    <Animated.View entering={FadeInUp.delay(400).springify()}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Asset Categories
      </Text>
      
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleCategorySelect(item.id)}
          >
            <PremiumCard
              size="sm"
              style={styles.categoryCard}
              onPress={() => handleCategorySelect(item.id)}
            >
              <Image source={{ uri: item.image }} style={styles.categoryImage} />
              <View style={styles.categoryContent}>
                <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon as any} size={20} color="white" />
                </View>
                <Text style={[styles.categoryTitle, { color: theme.colors.text.primary }]}>
                  {item.title}
                </Text>
                <Text style={[styles.categorySubtitle, { color: theme.colors.text.secondary }]}>
                  {item.subtitle}
                </Text>
              </View>
            </PremiumCard>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </Animated.View>
  );

  const renderTrendingAssets = () => (
    <Animated.View entering={FadeInUp.delay(500).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Trending Assets
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.colors.primary[500] }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={trendingAssets}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingList}
        renderItem={({ item }) => (
          <PremiumCard
            size="md"
            style={styles.trendingCard}
            onPress={() => {}}
          >
            <Image source={{ uri: item.image }} style={styles.trendingImage} />
            <View style={styles.trendingContent}>
              <View style={styles.trendingHeader}>
                <Text style={[styles.trendingSymbol, { color: theme.colors.text.primary }]}>
                  {item.symbol}
                </Text>
                <Text
                  style={[
                    styles.trendingChange,
                    { color: item.isPositive ? theme.colors.success[500] : theme.colors.error[500] },
                  ]}
                >
                  {item.change}
                </Text>
              </View>
              
              <Text style={[styles.trendingName, { color: theme.colors.text.secondary }]}>
                {item.name}
              </Text>
              
              <Text style={[styles.trendingPrice, { color: theme.colors.text.primary }]}>
                {item.price}
              </Text>
              
              <View style={styles.trendingStats}>
                <Text style={[styles.trendingStat, { color: theme.colors.text.tertiary }]}>
                  MC: {item.marketCap}
                </Text>
                <Text style={[styles.trendingStat, { color: theme.colors.text.tertiary }]}>
                  Vol: {item.volume}
                </Text>
              </View>
            </View>
          </PremiumCard>
        )}
        keyExtractor={(item) => item.id}
      />
    </Animated.View>
  );

  const renderFeaturedNews = () => (
    <Animated.View entering={FadeInUp.delay(600).springify()}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Featured News
      </Text>
      
      {featuredNews.map((news) => (
        <PremiumCard
          key={news.id}
          size="lg"
          style={styles.newsCard}
          onPress={() => {}}
        >
          <Image source={{ uri: news.image }} style={styles.newsImage} />
          <View style={styles.newsContent}>
            <View style={styles.newsHeader}>
              <Text style={[styles.newsCategory, { color: theme.colors.primary[500] }]}>
                {news.category}
              </Text>
              <Text style={[styles.newsTime, { color: theme.colors.text.tertiary }]}>
                {news.time}
              </Text>
            </View>
            
            <Text style={[styles.newsTitle, { color: theme.colors.text.primary }]}>
              {news.title}
            </Text>
            
            <Text style={[styles.newsSubtitle, { color: theme.colors.text.secondary }]}>
              {news.subtitle}
            </Text>
            
            <TouchableOpacity style={styles.readMoreButton}>
              <Text style={[styles.readMoreText, { color: theme.colors.primary[500] }]}>
                Read More
              </Text>
              <Ionicons name="arrow-forward" size={16} color={theme.colors.primary[500]} />
            </TouchableOpacity>
          </View>
        </PremiumCard>
      ))}
    </Animated.View>
  );

  const renderDecorativeElements = () => (
    <>
      <Animated.View
        entering={SlideInLeft.delay(700).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.primary[500] }]}
      />
      <Animated.View
        entering={SlideInLeft.delay(900).springify()}
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
        {renderSearchBar()}
        {renderCategories()}
        {renderTrendingAssets()}
        {renderFeaturedNews()}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  categoryItem: {
    marginRight: 16,
  },
  categoryCard: {
    width: 160,
  },
  categoryImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryContent: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  categorySubtitle: {
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
  trendingList: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  trendingCard: {
    width: 200,
    marginRight: 16,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  trendingContent: {
    flex: 1,
  },
  trendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendingSymbol: {
    fontSize: 18,
    fontWeight: '600',
  },
  trendingChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  trendingName: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.8,
  },
  trendingPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  trendingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendingStat: {
    fontSize: 11,
    opacity: 0.6,
  },
  newsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  newsImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 16,
  },
  newsContent: {
    flex: 1,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  newsCategory: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  newsTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
    opacity: 0.8,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
    left: -60,
    top: 500,
  },
});
