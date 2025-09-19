import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const ORANGE = '#f58220';
const BLUE = '#0a2472';
const BG = '#fff';
const GRAY = '#f5f6fa';
const DARK = '#222';
const LIGHT = '#888';
const BORDER = '#f0f0f0';

export default function MarketsScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Mock market data
  const marketPairs = [
    { 
      symbol: 'EUR/USD', 
      name: 'Euro / US Dollar',
      price: '1.0854', 
      change: '+0.0024', 
      changePercent: '+0.22%', 
      isPositive: true,
      high: '1.0867',
      low: '1.0832',
      volume: '2.4M'
    },
    { 
      symbol: 'GBP/USD', 
      name: 'British Pound / US Dollar',
      price: '1.2647', 
      change: '-0.0018', 
      changePercent: '-0.14%', 
      isPositive: false,
      high: '1.2678',
      low: '1.2621',
      volume: '1.8M'
    },
    { 
      symbol: 'USD/JPY', 
      name: 'US Dollar / Japanese Yen',
      price: '149.85', 
      change: '+0.45', 
      changePercent: '+0.30%', 
      isPositive: true,
      high: '150.12',
      low: '149.23',
      volume: '3.2M'
    },
    { 
      symbol: 'AUD/USD', 
      name: 'Australian Dollar / US Dollar',
      price: '0.6589', 
      change: '+0.0012', 
      changePercent: '+0.18%', 
      isPositive: true,
      high: '0.6601',
      low: '0.6567',
      volume: '1.5M'
    },
    { 
      symbol: 'USD/CAD', 
      name: 'US Dollar / Canadian Dollar',
      price: '1.3524', 
      change: '-0.0008', 
      changePercent: '-0.06%', 
      isPositive: false,
      high: '1.3545',
      low: '1.3501',
      volume: '1.2M'
    },
    { 
      symbol: 'NZD/USD', 
      name: 'New Zealand Dollar / US Dollar',
      price: '0.6123', 
      change: '+0.0009', 
      changePercent: '+0.15%', 
      isPositive: true,
      high: '0.6145',
      low: '0.6101',
      volume: '0.8M'
    },
  ];

  const tradingSignals = [
    { 
      pair: 'EUR/USD', 
      type: 'BUY', 
      entry: '1.0850', 
      target: '1.0900', 
      stopLoss: '1.0800', 
      confidence: '85%',
      timeframe: '4H',
      status: 'Active'
    },
    { 
      pair: 'GBP/USD', 
      type: 'SELL', 
      entry: '1.2650', 
      target: '1.2600', 
      stopLoss: '1.2700', 
      confidence: '78%',
      timeframe: '1H',
      status: 'Active'
    },
    { 
      pair: 'USD/JPY', 
      type: 'BUY', 
      entry: '149.80', 
      target: '150.50', 
      stopLoss: '149.30', 
      confidence: '82%',
      timeframe: 'Daily',
      status: 'Active'
    },
    { 
      pair: 'AUD/USD', 
      type: 'BUY', 
      entry: '0.6580', 
      target: '0.6650', 
      stopLoss: '0.6530', 
      confidence: '75%',
      timeframe: '4H',
      status: 'Pending'
    },
  ];

  const renderHeader = () => (
    <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
      <Text style={styles.headerTitle}>Market Watchlist</Text>
      <Text style={styles.headerSubtitle}>Real-time forex market data and trading signals</Text>
    </Animated.View>
  );

  const renderMarketPairs = () => (
    <Animated.View entering={FadeInUp.delay(400)} style={styles.section}>
      <Text style={styles.sectionTitle}>Live Market Data</Text>
      <View style={styles.card}>
        {marketPairs.map((pair, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.pairRow, index === marketPairs.length - 1 && { borderBottomWidth: 0 }]} 
            activeOpacity={0.7}
          >
            <View style={styles.pairInfo}>
              <Text style={styles.pairSymbol}>{pair.symbol}</Text>
              <Text style={styles.pairName}>{pair.name}</Text>
              <View style={styles.pairStats}>
                <Text style={styles.statText}>H: {pair.high}</Text>
                <Text style={styles.statText}>L: {pair.low}</Text>
                <Text style={styles.statText}>Vol: {pair.volume}</Text>
              </View>
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
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );

  const renderTradingSignals = () => (
    <Animated.View entering={FadeInUp.delay(600)} style={styles.section}>
      <Text style={styles.sectionTitle}>Trading Signals</Text>
      <View style={styles.signalsContainer}>
        {tradingSignals.map((signal, index) => (
          <View key={index} style={styles.signalCard}>
            <View style={styles.signalHeader}>
              <View style={[styles.signalType, { backgroundColor: signal.type === 'BUY' ? '#10b981' : '#ef4444' }]}>
                <Text style={styles.signalTypeText}>{signal.type}</Text>
              </View>
              <Text style={styles.signalPair}>{signal.pair}</Text>
              <View style={[styles.statusBadge, { backgroundColor: signal.status === 'Active' ? '#10b981' : '#f59e0b' }]}>
                <Text style={styles.statusText}>{signal.status}</Text>
              </View>
            </View>
            
            <View style={styles.signalDetails}>
              <View style={styles.signalRow}>
                <Text style={styles.signalLabel}>Entry Point:</Text>
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
              <View style={styles.signalRow}>
                <Text style={styles.signalLabel}>Timeframe:</Text>
                <Text style={styles.signalValue}>{signal.timeframe}</Text>
              </View>
              <View style={styles.signalRow}>
                <Text style={styles.signalLabel}>Confidence:</Text>
                <View style={styles.confidenceBadge}>
                  <Text style={styles.confidenceText}>{signal.confidence}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </Animated.View>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[ORANGE]}
          tintColor={ORANGE}
        />
      }
    >
      {renderHeader()}
      {renderMarketPairs()}
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
  header: {
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
    borderTopWidth: 0,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: DARK,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: LIGHT,
    fontWeight: '500',
    lineHeight: 22,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: BG,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  pairRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  pairInfo: {
    flex: 1,
  },
  pairSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pairName: {
    fontSize: 14,
    color: LIGHT,
    marginBottom: 8,
    fontWeight: '500',
  },
  pairStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
    color: LIGHT,
    fontWeight: '500',
  },
  pairPrice: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  signalsContainer: {
    gap: 16,
  },
  signalCard: {
    backgroundColor: BG,
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },
  signalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  signalType: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    marginRight: 12,
  },
  signalTypeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  signalPair: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    flex: 1,
    letterSpacing: 0.3,
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
  },
  signalDetails: {
    gap: 12,
  },
  signalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signalLabel: {
    fontSize: 15,
    color: LIGHT,
    fontWeight: '500',
  },
  signalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: DARK,
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
    fontSize: 13,
    fontWeight: '600',
    color: ORANGE,
  },
  bottomSpacing: {
    height: 40,
  },
});
