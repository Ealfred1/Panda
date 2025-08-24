import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    SlideInRight,
} from 'react-native-reanimated';
import { PremiumButton } from '../../src/components/PremiumButton';
import { PremiumCard } from '../../src/components/PremiumCard';
import { useCurrentTheme } from '../../src/store/themeStore';

const { width } = Dimensions.get('window');

// Dummy data for demonstration
const portfolioSummary = {
  totalValue: '$12,450.80',
  totalChange: '+$1,234.50',
  totalChangePercent: '+11.02%',
  isPositive: true,
  dailyChange: '+$234.50',
  dailyChangePercent: '+1.92%',
  weeklyChange: '+$567.80',
  weeklyChangePercent: '+4.78%',
  monthlyChange: '+$1,234.50',
  monthlyChangePercent: '+11.02%',
};

const portfolioAssets = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: '0.25',
    avgPrice: '$38,500',
    currentPrice: '$43,250',
    totalValue: '$10,812.50',
    change: '+$1,187.50',
    changePercent: '+12.34%',
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: '2.5',
    avgPrice: '$2,200',
    currentPrice: '$2,680',
    totalValue: '$6,700.00',
    change: '+$1,200.00',
    changePercent: '+21.82%',
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: '10',
    avgPrice: '$175.00',
    currentPrice: '$185.50',
    totalValue: '$1,855.00',
    change: '+$105.00',
    changePercent: '+6.00%',
    isPositive: true,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  },
];

const portfolioPerformance = [
  { period: '1D', change: '+1.92%', isPositive: true },
  { period: '1W', change: '+4.78%', isPositive: true },
  { period: '1M', change: '+11.02%', isPositive: true },
  { period: '3M', change: '+18.45%', isPositive: true },
  { period: '1Y', change: '+45.67%', isPositive: true },
];

const recentTransactions = [
  {
    id: '1',
    type: 'buy',
    symbol: 'BTC',
    quantity: '0.1',
    price: '$43,250',
    total: '$4,325.00',
    date: 'Today, 2:30 PM',
    status: 'completed',
  },
  {
    id: '2',
    type: 'sell',
    symbol: 'ETH',
    quantity: '0.5',
    price: '$2,680',
    total: '$1,340.00',
    date: 'Yesterday, 10:15 AM',
    status: 'completed',
  },
  {
    id: '3',
    type: 'buy',
    symbol: 'AAPL',
    quantity: '5',
    price: '$185.50',
    total: '$927.50',
    date: '2 days ago',
    status: 'completed',
  },
];

export default function PortfolioScreen() {
  const theme = useCurrentTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const handleAddFunds = () => {
    // Implement add funds logic
  };

  const renderHeader = () => (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
      <View style={styles.headerContent}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            Portfolio
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
            Track your investments and performance
          </Text>
        </View>
        
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderPortfolioOverview = () => (
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
              Total Portfolio Value
            </Text>
            <Ionicons name="trending-up" size={24} color={theme.colors.text.inverse} />
          </View>
          
          <Text style={[styles.portfolioValue, { color: theme.colors.text.inverse }]}>
            {portfolioSummary.totalValue}
          </Text>
          
          <View style={styles.portfolioChange}>
            <Text style={[styles.changeText, { color: theme.colors.text.inverse }]}>
              {portfolioSummary.totalChange} ({portfolioSummary.totalChangePercent})
            </Text>
            <Text style={[styles.changeLabel, { color: theme.colors.text.inverse }]}>
              All Time
            </Text>
          </View>
          
          <View style={styles.performanceGrid}>
            {portfolioPerformance.map((item) => (
              <View key={item.period} style={styles.performanceItem}>
                <Text style={[styles.performancePeriod, { color: theme.colors.text.inverse }]}>
                  {item.period}
                </Text>
                <Text style={[styles.performanceChange, { color: theme.colors.text.inverse }]}>
                  {item.change}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </PremiumCard>
    </Animated.View>
  );

  const renderPortfolioAssets = () => (
    <Animated.View entering={FadeInUp.delay(500).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Your Assets
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.colors.primary[500] }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      {portfolioAssets.map((asset) => (
        <PremiumCard
          key={asset.id}
          size="md"
          style={styles.assetCard}
          onPress={() => {}}
        >
          <View style={styles.assetHeader}>
            <Image source={{ uri: asset.image }} style={styles.assetImage} />
            <View style={styles.assetInfo}>
              <Text style={[styles.assetSymbol, { color: theme.colors.text.primary }]}>
                {asset.symbol}
              </Text>
              <Text style={[styles.assetName, { color: theme.colors.text.secondary }]}>
                {asset.name}
              </Text>
            </View>
            <View style={styles.assetChange}>
              <Text
                style={[
                  styles.changeValue,
                  { color: asset.isPositive ? theme.colors.success[500] : theme.colors.error[500] },
                ]}
              >
                {asset.change}
              </Text>
              <Text
                style={[
                  styles.changePercent,
                  { color: asset.isPositive ? theme.colors.success[500] : theme.colors.error[500] },
                ]}
              >
                {asset.changePercent}
              </Text>
            </View>
          </View>
          
          <View style={styles.assetDetails}>
            <View style={styles.assetDetail}>
              <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                Quantity
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                {asset.quantity}
              </Text>
            </View>
            
            <View style={styles.assetDetail}>
              <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                Avg Price
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                {asset.avgPrice}
              </Text>
            </View>
            
            <View style={styles.assetDetail}>
              <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                Current Price
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                {asset.currentPrice}
              </Text>
            </View>
            
            <View style={styles.assetDetail}>
              <Text style={[styles.detailLabel, { color: theme.colors.text.secondary }]}>
                Total Value
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text.primary }]}>
                {asset.totalValue}
              </Text>
            </View>
          </View>
        </PremiumCard>
      ))}
    </Animated.View>
  );

  const renderRecentTransactions = () => (
    <Animated.View entering={FadeInUp.delay(600).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Recent Transactions
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.colors.primary[500] }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      {recentTransactions.map((transaction) => (
        <PremiumCard
          key={transaction.id}
          size="sm"
          style={styles.transactionCard}
          onPress={() => {}}
        >
          <View style={styles.transactionHeader}>
            <View style={styles.transactionInfo}>
              <View style={[
                styles.transactionType,
                { backgroundColor: transaction.type === 'buy' ? theme.colors.success[500] : theme.colors.error[500] }
              ]}>
                <Ionicons
                  name={transaction.type === 'buy' ? 'add-circle' : 'remove-circle'}
                  size={16}
                  color="white"
                />
              </View>
              <View>
                <Text style={[styles.transactionSymbol, { color: theme.colors.text.primary }]}>
                  {transaction.symbol}
                </Text>
                <Text style={[styles.transactionDate, { color: theme.colors.text.secondary }]}>
                  {transaction.date}
                </Text>
              </View>
            </View>
            
            <View style={styles.transactionAmounts}>
              <Text style={[styles.transactionQuantity, { color: theme.colors.text.primary }]}>
                {transaction.quantity} @ {transaction.price}
              </Text>
              <Text style={[styles.transactionTotal, { color: theme.colors.text.primary }]}>
                {transaction.total}
              </Text>
            </View>
          </View>
        </PremiumCard>
      ))}
    </Animated.View>
  );

  const renderActionButtons = () => (
    <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.actionButtons}>
      <PremiumButton
        title="Add Funds"
        onPress={handleAddFunds}
        variant="outline"
        size="lg"
        style={styles.actionButton}
        leftIcon={<Ionicons name="add-circle" size={20} color={theme.colors.primary[500]} />}
      />
      
      <PremiumButton
        title="Trade"
        onPress={() => {}}
        size="lg"
        style={styles.actionButton}
        leftIcon={<Ionicons name="trending-up" size={20} color={theme.colors.text.inverse} />}
      />
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
        {renderPortfolioOverview()}
        {renderPortfolioAssets()}
        {renderRecentTransactions()}
        {renderActionButtons()}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  refreshButton: {
    padding: 8,
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
    marginBottom: 24,
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
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  performanceItem: {
    alignItems: 'center',
  },
  performancePeriod: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
  performanceChange: {
    fontSize: 14,
    fontWeight: '600',
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
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  assetCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  assetImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetName: {
    fontSize: 14,
    opacity: 0.8,
  },
  assetChange: {
    alignItems: 'flex-end',
  },
  changeValue: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  changePercent: {
    fontSize: 14,
    fontWeight: '600',
  },
  assetDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  assetDetail: {
    width: '48%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.7,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionCard: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionType: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  transactionAmounts: {
    alignItems: 'flex-end',
  },
  transactionQuantity: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8,
  },
  transactionTotal: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
    gap: 16,
  },
  actionButton: {
    flex: 1,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
    right: -60,
    top: 600,
  },
});
