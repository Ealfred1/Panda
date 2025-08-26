import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { PremiumButton } from '../../src/components/PremiumButton';
import { PremiumCard } from '../../src/components/PremiumCard';
import { useCurrentTheme } from '../../src/store/themeStore';

export default function WalletScreen() {
  const theme = useCurrentTheme();

const portfolioSummary = {
    totalValue: '$24,567.89',
    totalChange: '+$1,234.56',
    changePercentage: '+5.28%',
    isPositive: true,
  };

  const assets = [
    { symbol: 'EUR/USD', amount: '€15,000', value: '$16,275.00', change: '+$675.00', isPositive: true },
    { symbol: 'GBP/USD', amount: '£8,000', value: '$10,117.60', change: '-$182.40', isPositive: false },
    { symbol: 'USD/JPY', amount: '$2,000', value: '$2,000.00', change: '+$0.00', isPositive: true },
];

const recentTransactions = [
    { type: 'buy', symbol: 'EUR/USD', amount: '€5,000', price: '1.0850', time: '2 hours ago', status: 'completed' },
    { type: 'sell', symbol: 'GBP/USD', amount: '£3,000', price: '1.2645', time: '1 day ago', status: 'completed' },
    { type: 'deposit', amount: '$10,000', time: '3 days ago', status: 'completed' },
  ];

  const renderPortfolioHeader = () => (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
      <LinearGradient
        colors={[theme.colors.primary[500], theme.colors.primary[600]]}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>Portfolio</Text>
        <Text style={styles.headerSubtitle}>Your forex trading overview</Text>
        
        <View style={styles.portfolioStats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Value</Text>
            <Text style={styles.statValue}>{portfolioSummary.totalValue}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Today's Change</Text>
            <View style={styles.changeRow}>
              <Text style={[
                styles.changeValue,
                { color: portfolioSummary.isPositive ? '#10b981' : '#ef4444' }
              ]}>
                {portfolioSummary.totalChange}
          </Text>
              <Text style={[
                styles.changePercentage,
                { color: portfolioSummary.isPositive ? '#10b981' : '#ef4444' }
              ]}>
                {portfolioSummary.changePercentage}
          </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const renderAsset = (asset: any, index: number) => (
    <Animated.View 
      key={index}
      entering={FadeInUp.delay(400 + index * 100).springify()}
    >
      <PremiumCard
        variant="elevated"
        size="sm"
        style={styles.assetCard}
        onPress={() => {}}
      >
        <View style={styles.assetRow}>
          <View style={styles.assetInfo}>
            <Text style={[styles.assetSymbol, { color: theme.colors.text.primary }]}>
              {asset.symbol}
            </Text>
            <Text style={[styles.assetAmount, { color: theme.colors.text.secondary }]}>
              {asset.amount}
            </Text>
          </View>
          
          <View style={styles.assetValue}>
            <Text style={[styles.assetValueText, { color: theme.colors.text.primary }]}>
              {asset.value}
                </Text>
            <View style={[
              styles.changeContainer,
              { backgroundColor: asset.isPositive ? '#10b981' : '#ef4444' }
            ]}>
              <Ionicons 
                name={asset.isPositive ? 'trending-up' : 'trending-down'} 
                size={16} 
                color="white" 
              />
              <Text style={styles.changeText}>{asset.change}</Text>
              </View>
          </View>
        </View>
      </PremiumCard>
    </Animated.View>
  );

  const renderTransaction = (transaction: any, index: number) => (
    <Animated.View 
      key={index}
      entering={FadeInUp.delay(600 + index * 100).springify()}
    >
        <PremiumCard
        variant="default"
        size="sm"
        style={styles.transactionCard}
          onPress={() => {}}
        >
        <View style={styles.transactionRow}>
          <View style={[
            styles.transactionIcon,
            { backgroundColor: transaction.type === 'buy' ? '#10b981' : 
                             transaction.type === 'sell' ? '#ef4444' : '#3b82f6' }
          ]}>
            <Ionicons 
              name={transaction.type === 'buy' ? 'arrow-up' : 
                     transaction.type === 'sell' ? 'arrow-down' : 'add'} 
              size={20} 
              color="white" 
            />
          </View>
          
          <View style={styles.transactionInfo}>
            <Text style={[styles.transactionTitle, { color: theme.colors.text.primary }]}>
              {transaction.type === 'buy' ? `Buy ${transaction.symbol}` :
               transaction.type === 'sell' ? `Sell ${transaction.symbol}` :
               'Deposit'}
              </Text>
            <Text style={[styles.transactionDetails, { color: theme.colors.text.secondary }]}>
              {transaction.type !== 'deposit' ? `${transaction.amount} @ ${transaction.price}` : transaction.amount}
              </Text>
            <Text style={[styles.transactionTime, { color: theme.colors.text.tertiary }]}>
              {transaction.time}
              </Text>
            </View>
            
          <View style={[
            styles.statusBadge,
            { backgroundColor: transaction.status === 'completed' ? '#10b981' : '#f59e0b' }
          ]}>
            <Text style={styles.statusText}>
              {transaction.status}
              </Text>
            </View>
          </View>
        </PremiumCard>
    </Animated.View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {renderPortfolioHeader()}

      {/* Quick Actions */}
      <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Quick Actions
        </Text>
        
        <View style={styles.quickActions}>
          <PremiumButton
            title="Buy"
            variant="primary"
            size="md"
            leftIcon={<Ionicons name="arrow-up" size={20} color="white" />}
            onPress={() => {}}
            style={styles.actionButton}
          />
          
          <PremiumButton
            title="Sell"
            variant="outline"
            size="md"
            leftIcon={<Ionicons name="arrow-down" size={20} color={theme.colors.primary[500]} />}
            onPress={() => {}}
            style={styles.actionButton}
          />
          
          <PremiumButton
            title="Deposit"
            variant="ghost"
            size="md"
            leftIcon={<Ionicons name="add" size={20} color={theme.colors.primary[500]} />}
            onPress={() => {}}
            style={styles.actionButton}
          />
        </View>
      </Animated.View>

      {/* Assets */}
      <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Your Assets
          </Text>
          <PremiumButton
            title="View All"
            variant="ghost"
            size="sm"
            onPress={() => {}}
          />
      </View>
      
        {assets.map(renderAsset)}
      </Animated.View>

      {/* Recent Transactions */}
      <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Recent Transactions
          </Text>
          <PremiumButton
            title="View All"
            variant="ghost"
          size="sm"
          onPress={() => {}}
                />
              </View>
        
        {recentTransactions.map(renderTransaction)}
      </Animated.View>

      {/* Performance Chart Placeholder */}
      <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Performance
                </Text>
        
        <PremiumCard variant="glassmorphism" size="lg" style={styles.chartCard}>
          <View style={styles.chartPlaceholder}>
            <Ionicons name="trending-up" size={48} color={theme.colors.primary[500]} />
            <Text style={[styles.chartText, { color: theme.colors.text.secondary }]}>
              Performance chart will be displayed here
              </Text>
          </View>
        </PremiumCard>
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
    marginBottom: 24,
  },
  portfolioStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  changePercentage: {
    fontSize: 14,
    fontWeight: '500',
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
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  assetCard: {
    marginBottom: 12,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetAmount: {
    fontSize: 14,
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  assetValueText: {
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
  transactionCard: {
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  chartCard: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartPlaceholder: {
    alignItems: 'center',
  },
  chartText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
