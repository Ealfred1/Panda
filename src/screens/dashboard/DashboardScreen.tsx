import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card } from '../../components/Card';
import { EmptyState } from '../../components/EmptyState';
import { useTheme } from '../../theme';
import { dummyAssets, dummyMarketNews, dummyPortfolioHoldings } from '../../utils/dummyData';

interface DashboardScreenProps {
  navigation: any;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState(
    dummyAssets.filter(asset => asset.isFavorite).map(asset => asset.id)
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleFavorite = (assetId: string) => {
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const totalPortfolioValue = dummyPortfolioHoldings.reduce(
    (sum, holding) => sum + holding.currentValue, 
    0
  );
  
  const totalProfitLoss = dummyPortfolioHoldings.reduce(
    (sum, holding) => sum + holding.profitLoss, 
    0
  );

  const totalProfitLossPercent = totalPortfolioValue > 0 
    ? (totalProfitLoss / (totalPortfolioValue - totalProfitLoss)) * 100 
    : 0;

  const renderPortfolioCard = () => (
    <Card style={styles.portfolioCard}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.secondary]}
        style={styles.portfolioGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.portfolioHeader}>
          <Text style={styles.portfolioTitle}>Portfolio Value</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Portfolio')}>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.surface} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.portfolioValue}>
          ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>
        
        <View style={styles.portfolioChange}>
          <Ionicons 
            name={totalProfitLoss >= 0 ? "trending-up" : "trending-down"} 
            size={16} 
            color={theme.colors.surface} 
          />
          <Text style={styles.portfolioChangeText}>
            {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toLocaleString('en-US', { minimumFractionDigits: 2 })} 
            ({totalProfitLossPercent >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%)
          </Text>
        </View>
        
        <View style={styles.portfolioStats}>
          <View style={styles.portfolioStat}>
            <Text style={styles.portfolioStatLabel}>Holdings</Text>
            <Text style={styles.portfolioStatValue}>{dummyPortfolioHoldings.length}</Text>
          </View>
          <View style={styles.portfolioStat}>
            <Text style={styles.portfolioStatLabel}>Best Performer</Text>
            <Text style={styles.portfolioStatValue}>BTC +2.98%</Text>
          </View>
        </View>
      </LinearGradient>
    </Card>
  );

  const renderWatchlist = () => {
    const watchlistAssets = dummyAssets.filter(asset => favorites.includes(asset.id));
    
    if (watchlistAssets.length === 0) {
      return (
        <EmptyState
          icon="star-outline"
          title="No Watchlist Yet"
          description="Add your favorite assets to keep track of their performance"
          actionTitle="Browse Markets"
          onAction={() => navigation.navigate('Markets')}
        />
      );
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Watchlist
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Markets')}>
            <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.watchlistContainer}
        >
          {watchlistAssets.map((asset) => (
            <TouchableOpacity
              key={asset.id}
              style={[styles.watchlistItem, { backgroundColor: theme.colors.surface }]}
              onPress={() => navigation.navigate('AssetDetail', { assetId: asset.id })}
            >
              <View style={styles.assetHeader}>
                {asset.image ? (
                  <Image source={{ uri: asset.image }} style={styles.assetIcon} />
                ) : (
                  <View style={[styles.assetIconPlaceholder, { backgroundColor: theme.colors.border }]}>
                    <Text style={[styles.assetIconText, { color: theme.colors.textSecondary }]}>
                      {asset.symbol.charAt(0)}
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(asset.id)}
                >
                  <Ionicons 
                    name="heart" 
                    size={16} 
                    color={theme.colors.primary} 
                  />
                </TouchableOpacity>
              </View>
              
              <Text style={[styles.assetSymbol, { color: theme.colors.text }]}>
                {asset.symbol}
              </Text>
              <Text style={[styles.assetPrice, { color: theme.colors.text }]}>
                ${asset.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
              <Text 
                style={[
                  styles.assetChange, 
                  { color: asset.changePercent24h >= 0 ? '#10b981' : '#ef4444' }
                ]}
              >
                {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderNewsSection = () => {
    if (dummyMarketNews.length === 0) {
      return (
        <EmptyState
          icon="newspaper-outline"
          title="No News Yet"
          description="Stay updated with the latest market news and insights"
          actionTitle="Refresh"
          onAction={onRefresh}
        />
      );
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Market News
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAllText, { color: theme.colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        
        {dummyMarketNews.slice(0, 3).map((news) => (
          <TouchableOpacity
            key={news.id}
            style={[styles.newsCard, { backgroundColor: theme.colors.surface }]}
            onPress={() => {/* Navigate to news detail */}}
          >
            {news.image && (
              <Image source={{ uri: news.image }} style={styles.newsImage} />
            )}
            <View style={styles.newsContent}>
              <View style={styles.newsHeader}>
                <Text style={[styles.newsCategory, { color: theme.colors.primary }]}>
                  {news.category.toUpperCase()}
                </Text>
                <View style={[
                  styles.sentimentIndicator, 
                  { backgroundColor: news.sentiment === 'positive' ? '#10b981' : 
                    news.sentiment === 'negative' ? '#ef4444' : '#6b7280' }
                ]} />
              </View>
              <Text style={[styles.newsTitle, { color: theme.colors.text }]} numberOfLines={2}>
                {news.title}
              </Text>
              <Text style={[styles.newsSummary, { color: theme.colors.textSecondary }]} numberOfLines={2}>
                {news.summary}
              </Text>
              <View style={styles.newsFooter}>
                <Text style={[styles.newsSource, { color: theme.colors.textSecondary }]}>
                  {news.source}
                </Text>
                <Text style={[styles.newsTime, { color: theme.colors.textSecondary }]}>
                  {new Date(news.publishedAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
              Good morning
            </Text>
            <Text style={[styles.userName, { color: theme.colors.text }]}>
              Welcome back! 👋
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.profileAvatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.profileInitial}>U</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {renderPortfolioCard()}
      {renderWatchlist()}
      {renderNewsSection()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 8,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  portfolioCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    overflow: 'hidden',
  },
  portfolioGradient: {
    padding: 24,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.9,
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  portfolioChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  portfolioChangeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portfolioStat: {
    alignItems: 'center',
  },
  portfolioStatLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  portfolioStatValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  watchlistContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  watchlistItem: {
    width: 120,
    padding: 16,
    borderRadius: 16,
        shadowOffset: {
      width: 0,
      height: 2,
    },
              },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assetIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  assetIconPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetIconText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: 4,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  assetPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  newsCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
        shadowOffset: {
      width: 0,
      height: 2,
    },
              },
  newsImage: {
    width: '100%',
    height: 120,
  },
  newsContent: {
    padding: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsCategory: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sentimentIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    lineHeight: 22,
  },
  newsSummary: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '500',
  },
  newsTime: {
    fontSize: 12,
  },
});
