import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { PremiumButton } from '../../src/components/PremiumButton';
import { PremiumCard } from '../../src/components/PremiumCard';
import { useCurrentTheme } from '../../src/store/themeStore';

export default function MarketsScreen() {
  const theme = useCurrentTheme();

  const forexPairs = [
    { symbol: 'EUR/USD', price: '1.0854', change: '+0.12%', trend: 'up' },
    { symbol: 'GBP/USD', price: '1.2647', change: '-0.08%', trend: 'down' },
    { symbol: 'USD/JPY', price: '149.23', change: '+0.25%', trend: 'up' },
    { symbol: 'USD/CHF', price: '0.8923', change: '-0.15%', trend: 'down' },
    { symbol: 'AUD/USD', price: '0.6589', change: '+0.18%', trend: 'up' },
    { symbol: 'USD/CAD', price: '1.3547', change: '-0.22%', trend: 'down' },
  ];

  const marketNews = [
    {
      title: 'Fed Signals Potential Rate Cuts in 2024',
      summary: 'Federal Reserve hints at monetary policy changes affecting forex markets',
      time: '2 hours ago',
      category: 'Central Banks'
    },
    {
      title: 'ECB Maintains Current Interest Rates',
      summary: 'European Central Bank keeps rates unchanged, EUR shows stability',
      time: '4 hours ago',
      category: 'Central Banks'
    },
    {
      title: 'UK Inflation Data Surprises Markets',
      summary: 'Lower than expected inflation figures boost GBP performance',
      time: '6 hours ago',
      category: 'Economic Data'
    }
  ];

  const renderForexPair = (pair: any, index: number) => (
    <Animated.View 
      key={index}
      entering={FadeInUp.delay(400 + index * 100).springify()}
          >
            <PremiumCard
        variant="elevated"
              size="sm"
        style={styles.forexCard}
            onPress={() => {}}
          >
        <View style={styles.forexRow}>
          <View style={styles.symbolContainer}>
            <Text style={[styles.symbol, { color: theme.colors.text.primary }]}>
              {pair.symbol}
                </Text>
            <Text style={[styles.pairName, { color: theme.colors.text.secondary }]}>
              {pair.symbol === 'EUR/USD' ? 'Euro / US Dollar' :
               pair.symbol === 'GBP/USD' ? 'British Pound / US Dollar' :
               pair.symbol === 'USD/JPY' ? 'US Dollar / Japanese Yen' :
               pair.symbol === 'USD/CHF' ? 'US Dollar / Swiss Franc' :
               pair.symbol === 'AUD/USD' ? 'Australian Dollar / US Dollar' :
               'US Dollar / Canadian Dollar'}
                </Text>
              </View>
              
          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: theme.colors.text.primary }]}>
              {pair.price}
              </Text>
            <View style={[
              styles.changeContainer,
              { backgroundColor: pair.trend === 'up' ? '#10b981' : '#ef4444' }
            ]}>
              <Ionicons 
                name={pair.trend === 'up' ? 'trending-up' : 'trending-down'} 
                size={16} 
                color="white" 
              />
              <Text style={styles.changeText}>{pair.change}</Text>
            </View>
              </View>
            </View>
          </PremiumCard>
    </Animated.View>
  );

  const renderNewsItem = (news: any, index: number) => (
    <Animated.View 
      key={index}
      entering={FadeInUp.delay(600 + index * 100).springify()}
    >
        <PremiumCard
        variant="default"
        size="sm"
          style={styles.newsCard}
          onPress={() => {}}
        >
            <View style={styles.newsHeader}>
          <View style={styles.newsCategory}>
            <Text style={[styles.categoryText, { color: theme.colors.primary[500] }]}>
                {news.category}
              </Text>
          </View>
          <Text style={[styles.newsTime, { color: theme.colors.text.secondary }]}>
                {news.time}
              </Text>
            </View>
            
            <Text style={[styles.newsTitle, { color: theme.colors.text.primary }]}>
              {news.title}
            </Text>
            
        <Text style={[styles.newsSummary, { color: theme.colors.text.secondary }]}>
          {news.summary}
        </Text>
      </PremiumCard>
    </Animated.View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
        <LinearGradient
          colors={[theme.colors.primary[500], theme.colors.primary[600]]}
          style={styles.headerGradient}
        >
          <Text style={styles.headerTitle}>Forex Markets</Text>
          <Text style={styles.headerSubtitle}>Real-time currency pairs & market analysis</Text>
        </LinearGradient>
      </Animated.View>

      {/* Search Bar */}
      <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.searchContainer}>
        <PremiumCard variant="glassmorphism" size="sm" style={styles.searchCard}>
          <View style={styles.searchRow}>
            <Ionicons name="search" size={20} color={theme.colors.text.secondary} />
            <Text style={[styles.searchPlaceholder, { color: theme.colors.text.secondary }]}>
              Search currency pairs...
            </Text>
          </View>
        </PremiumCard>
    </Animated.View>

      {/* Forex Pairs */}
      <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Major Currency Pairs
          </Text>
          <PremiumButton
            title="View All"
            variant="ghost"
            size="sm"
            onPress={() => {}}
          />
        </View>
        
        {forexPairs.map(renderForexPair)}
      </Animated.View>

      {/* Market News */}
      <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Market News
          </Text>
          <PremiumButton
            title="More News"
            variant="ghost"
            size="sm"
            onPress={() => {}}
          />
        </View>
        
        {marketNews.map(renderNewsItem)}
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Quick Actions
        </Text>
        
        <View style={styles.quickActions}>
          <PremiumButton
            title="Watchlist"
            variant="outline"
            size="md"
            leftIcon={<Ionicons name="star" size={20} color={theme.colors.primary[500]} />}
            onPress={() => {}}
            style={styles.actionButton}
          />
          
          <PremiumButton
            title="Market Calendar"
            variant="outline"
            size="md"
            leftIcon={<Ionicons name="calendar" size={20} color={theme.colors.primary[500]} />}
            onPress={() => {}}
            style={styles.actionButton}
          />
        </View>
      </Animated.View>

      <View style={styles.bottomSpacing} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 24,
  },
  headerGradient: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  searchContainer: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  searchCard: {
    marginBottom: 0,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 16,
  },
  section: {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  forexCard: {
    marginBottom: 12,
  },
  forexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbolContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  pairName: {
    fontSize: 14,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  newsCard: {
    marginBottom: 12,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsCategory: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  newsTime: {
    fontSize: 12,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsSummary: {
    fontSize: 14,
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  bottomSpacing: {
    height: 100,
  },
});
