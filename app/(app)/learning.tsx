import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const ORANGE = '#f58220';
const BLUE = '#0a2472';
const BG = '#fff';
const GRAY = '#f5f6fa';
const DARK = '#222';
const LIGHT = '#888';
const BORDER = '#f0f0f0';

export default function Learning() {
  // Mock forex account data
  const accountData = {
    balance: '$25,000.00',
    equity: '$25,450.00',
    margin: '$2,500.00',
    freeMargin: '$22,950.00',
    profit: '+$450.00',
    profitPercentage: '+1.8%',
  };

  // Mock market watchlist
  const marketWatchlist = [
    { symbol: 'EUR/USD', price: '1.0854', change: '+0.0024', changePercent: '+0.22%', isPositive: true },
    { symbol: 'GBP/USD', price: '1.2647', change: '-0.0018', changePercent: '-0.14%', isPositive: false },
    { symbol: 'USD/JPY', price: '149.85', change: '+0.45', changePercent: '+0.30%', isPositive: true },
    { symbol: 'AUD/USD', price: '0.6589', change: '+0.0012', changePercent: '+0.18%', isPositive: true },
  ];

  // Mock trading signals
  const tradingSignals = [
    { pair: 'EUR/USD', type: 'BUY', entry: '1.0850', target: '1.0900', stopLoss: '1.0800', confidence: '85%' },
    { pair: 'GBP/USD', type: 'SELL', entry: '1.2650', target: '1.2600', stopLoss: '1.2700', confidence: '78%' },
    { pair: 'USD/JPY', type: 'BUY', entry: '149.80', target: '150.50', stopLoss: '149.30', confidence: '82%' },
  ];

  // Account overview cards
  const renderAccountOverview = () => (
    <Animated.View entering={FadeInUp.delay(300).springify()}>
      <Text style={styles.sectionTitle}>Account Overview</Text>
      <View style={styles.accountGrid}>
        <View style={styles.accountCard}>
          <View style={styles.accountCardHeader}>
            <Ionicons name="wallet" size={20} color={ORANGE} />
            <Text style={styles.accountCardTitle}>Balance</Text>
          </View>
          <Text style={styles.accountCardValue}>{accountData.balance}</Text>
        </View>
        
        <View style={styles.accountCard}>
          <View style={styles.accountCardHeader}>
            <Ionicons name="trending-up" size={20} color={ORANGE} />
            <Text style={styles.accountCardTitle}>Equity</Text>
          </View>
          <Text style={styles.accountCardValue}>{accountData.equity}</Text>
        </View>
        
        <View style={styles.accountCard}>
          <View style={styles.accountCardHeader}>
            <Ionicons name="shield" size={20} color={ORANGE} />
            <Text style={styles.accountCardTitle}>Margin</Text>
          </View>
          <Text style={styles.accountCardValue}>{accountData.margin}</Text>
        </View>
        
        <View style={styles.accountCard}>
          <View style={styles.accountCardHeader}>
            <Ionicons name="checkmark-circle" size={20} color={ORANGE} />
            <Text style={styles.accountCardTitle}>Free Margin</Text>
          </View>
          <Text style={styles.accountCardValue}>{accountData.freeMargin}</Text>
        </View>
      </View>
      
      <View style={styles.profitCard}>
        <View style={styles.profitInfo}>
          <Text style={styles.profitLabel}>Today&apos;s Profit</Text>
          <Text style={[styles.profitValue, { color: accountData.profit.startsWith('+') ? '#10b981' : '#ef4444' }]}>
            {accountData.profit}
          </Text>
        </View>
        <Text style={[styles.profitPercentage, { color: accountData.profit.startsWith('+') ? '#10b981' : '#ef4444' }]}>
          {accountData.profitPercentage}
        </Text>
      </View>
    </Animated.View>
  );

  // Market watchlist
  const renderMarketWatchlist = () => (
    <Animated.View entering={FadeInUp.delay(400).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Market Watchlist</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.card}>
        {marketWatchlist.map((pair, index) => (
          <View key={index} style={[styles.pairRow, index === marketWatchlist.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={styles.pairInfo}>
              <Text style={styles.pairSymbol}>{pair.symbol}</Text>
              <Text style={styles.pairName}>
                {pair.symbol === 'EUR/USD' ? 'Euro / US Dollar' :
                 pair.symbol === 'GBP/USD' ? 'British Pound / US Dollar' :
                 pair.symbol === 'USD/JPY' ? 'US Dollar / Japanese Yen' :
                 'Australian Dollar / US Dollar'}
              </Text>
            </View>
            
            <View style={styles.pairPrice}>
              <Text style={styles.priceValue}>{pair.price}</Text>
              <View style={styles.changeContainer}>
                <Ionicons 
                  name={pair.isPositive ? 'trending-up' : 'trending-down'} 
                  size={16} 
                  color={pair.isPositive ? '#10b981' : '#ef4444'} 
                />
                <Text style={[styles.changeText, { color: pair.isPositive ? '#10b981' : '#ef4444' }]}>
                  {pair.change} ({pair.changePercent})
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  // Trading signals
  const renderTradingSignals = () => (
    <Animated.View entering={FadeInUp.delay(500).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trading Signals</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.signalsContainer}>
        {tradingSignals.map((signal, index) => (
          <View key={index} style={styles.signalCard}>
            <View style={styles.signalHeader}>
              <View style={[styles.signalType, { backgroundColor: signal.type === 'BUY' ? '#10b981' : '#ef4444' }]}>
                <Text style={styles.signalTypeText}>{signal.type}</Text>
              </View>
              <Text style={styles.signalPair}>{signal.pair}</Text>
              <View style={styles.confidenceBadge}>
                <Text style={styles.confidenceText}>{signal.confidence}</Text>
              </View>
            </View>
            
            <View style={styles.signalDetails}>
              <View style={styles.signalRow}>
                <Text style={styles.signalLabel}>Entry:</Text>
                <Text style={styles.signalValue}>{signal.entry}</Text>
              </View>
              <View style={styles.signalRow}>
                <Text style={styles.signalLabel}>Target:</Text>
                <Text style={styles.signalValue}>{signal.target}</Text>
              </View>
              <View style={styles.signalRow}>
                <Text style={styles.signalLabel}>Stop Loss:</Text>
                <Text style={styles.signalValue}>{signal.stopLoss}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderAccountOverview()}
      {renderMarketWatchlist()}
      {renderTradingSignals()}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  viewAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: GRAY,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },
  viewAllText: {
    color: ORANGE,
    fontSize: 14,
    fontWeight: '600',
  },
  accountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  accountCard: {
    width: '48%',
    backgroundColor: BG,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  accountCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  accountCardTitle: {
    fontSize: 12,
    color: LIGHT,
    fontWeight: '500',
    marginLeft: 8,
  },
  accountCardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK,
  },
  profitCard: {
    backgroundColor: BG,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 24,
  },
  profitInfo: {
    flex: 1,
  },
  profitLabel: {
    fontSize: 14,
    color: LIGHT,
    marginBottom: 4,
  },
  profitValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  profitPercentage: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: BG,
    marginHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
    marginBottom: 24,
  },
  pairRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  pairInfo: {
    flex: 1,
  },
  pairSymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK,
    marginBottom: 4,
  },
  pairName: {
    fontSize: 12,
    color: LIGHT,
  },
  pairPrice: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK,
    marginBottom: 4,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  signalsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  signalCard: {
    backgroundColor: BG,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  signalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  signalType: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 12,
  },
  signalTypeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  signalPair: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK,
    flex: 1,
  },
  confidenceBadge: {
    backgroundColor: GRAY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BORDER,
  },
  confidenceText: {
    fontSize: 12,
    fontWeight: '600',
    color: ORANGE,
  },
  signalDetails: {
    gap: 8,
  },
  signalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signalLabel: {
    fontSize: 14,
    color: LIGHT,
  },
  signalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK,
  },
  bottomSpacing: {
    height: 100,
  },
});