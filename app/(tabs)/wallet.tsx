import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
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
      <View style={styles.headerContent}>
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceValue}>{portfolioSummary.totalValue}</Text>
            <View style={styles.changeRow}>
            <Ionicons 
              name={portfolioSummary.isPositive ? 'trending-up' : 'trending-down'} 
              size={16} 
              color={portfolioSummary.isPositive ? '#f58220' : '#ef4444'} 
            />
              <Text style={[
              styles.changeText,
              { color: portfolioSummary.isPositive ? '#f58220' : '#ef4444' }
            ]}>
              {portfolioSummary.totalChange} ({portfolioSummary.changePercentage})
          </Text>
            </View>
          </View>
        </View>
    </Animated.View>
  );

  const renderAsset = (asset: any, index: number) => (
    <Animated.View 
      key={index}
      entering={FadeInUp.delay(400 + index * 100).springify()}
    >
      <TouchableOpacity style={styles.assetCard} activeOpacity={0.7}>
        <View style={styles.assetRow}>
          <View style={styles.assetInfo}>
            <Text style={styles.assetSymbol}>{asset.symbol}</Text>
            <Text style={styles.assetAmount}>{asset.amount}</Text>
          </View>
          
          <View style={styles.assetValue}>
            <Text style={styles.assetValueText}>{asset.value}</Text>
            <View style={styles.changeContainer}>
              <Ionicons 
                name={asset.isPositive ? 'trending-up' : 'trending-down'} 
                size={14} 
                color={asset.isPositive ? '#f58220' : '#ef4444'} 
              />
              <Text style={[
                styles.assetChangeText,
                { color: asset.isPositive ? '#f58220' : '#ef4444' }
              ]}>
                {asset.change}
              </Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderTransaction = (transaction: any, index: number) => (
    <Animated.View 
      key={index}
      entering={FadeInUp.delay(600 + index * 100).springify()}
    >
      <TouchableOpacity style={styles.transactionCard} activeOpacity={0.7}>
        <View style={styles.transactionRow}>
          <View style={[
            styles.transactionIcon,
            { backgroundColor: transaction.type === 'buy' ? '#f58220' : 
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
            <Text style={styles.transactionTitle}>
              {transaction.type === 'buy' ? `Buy ${transaction.symbol}` :
               transaction.type === 'sell' ? `Sell ${transaction.symbol}` :
               'Deposit'}
              </Text>
            <Text style={styles.transactionDetails}>
              {transaction.type !== 'deposit' ? `${transaction.amount} @ ${transaction.price}` : transaction.amount}
              </Text>
            <Text style={styles.transactionTime}>
              {transaction.time}
              </Text>
            </View>
            
          <View style={[
            styles.statusBadge,
            { backgroundColor: transaction.status === 'completed' ? '#f58220' : '#f59e0b' }
          ]}>
            <Text style={styles.statusText}>
              {transaction.status}
              </Text>
            </View>
          </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {renderPortfolioHeader()}

      {/* Quick Actions */}
      <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.section}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <View style={[styles.actionIcon, { backgroundColor: '#f58220' }]}>
              <Ionicons name="arrow-up" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Buy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <View style={[styles.actionIcon, { backgroundColor: '#ef4444' }]}>
              <Ionicons name="arrow-down" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Sell</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <View style={[styles.actionIcon, { backgroundColor: '#3b82f6' }]}>
              <Ionicons name="add" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Deposit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <View style={[styles.actionIcon, { backgroundColor: '#8b5cf6' }]}>
              <Ionicons name="swap-horizontal" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Swap</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Assets */}
      <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Assets</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
      </View>
      
        <View style={styles.assetsList}>
        {assets.map(renderAsset)}
        </View>
      </Animated.View>

      {/* Recent Transactions */}
      <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
              </View>
        
        <View style={styles.transactionsList}>
        {recentTransactions.map(renderTransaction)}
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
    backgroundColor: '#f5f6fa',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  balanceSection: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
    fontWeight: '500',
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f58220',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  assetsList: {
    gap: 12,
  },
  assetCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
    color: '#222',
    marginBottom: 4,
  },
  assetAmount: {
    fontSize: 14,
    color: '#888',
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  assetValueText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  assetChangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
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
    color: '#222',
    marginBottom: 4,
  },
  transactionDetails: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  transactionTime: {
    fontSize: 12,
    color: '#888',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  bottomSpacing: {
    height: 100,
  },
});
