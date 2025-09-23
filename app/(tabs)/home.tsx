import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { useCurrentTheme } from '../../src/store/themeStore';

const ORANGE = '#f58220';
const BLUE = '#0a2472';
const BG = '#fff';
const GRAY = '#f5f6fa';
const DARK = '#222';
const LIGHT = '#888';
const BORDER = '#f0f0f0';

export default function HomeScreen() {
  const theme = useCurrentTheme();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock user data for forex trading
  const user = {
    first_name: 'John',
    last_name: 'Trader',
    email: 'john.trader@forex.com',
  };

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

  // Bot Analysis data
  const botAnalysis = [
    { pair: 'EUR/USD', status: 'active', profit: '+$456', trades: 23, confidence: '85%' },
    { pair: 'GBP/USD', status: 'active', profit: '+$234', trades: 18, confidence: '78%' },
    { pair: 'USD/JPY', status: 'active', profit: '+$789', trades: 31, confidence: '82%' },
    { pair: 'AUD/USD', status: 'paused', profit: '-$123', trades: 12, confidence: '65%' },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    setIsRefreshing(false);
  };

  // Header with avatar and greeting
  const renderHeader = () => (
    <Animated.View entering={FadeInDown.delay(200).springify()}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.first_name?.[0] || 'U'}
              </Text>
            </View>
            <View style={styles.profileText}>
              <Text style={styles.greetingText}>Hello {user.first_name || 'User'},</Text>
              <Text style={styles.welcomeText}>Welcome to Panda Forex!</Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="notifications-outline" size={20} color={DARK} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="settings-outline" size={20} color={DARK} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );

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

  // Bot Analysis
  const renderBotAnalysis = () => (
    <Animated.View entering={FadeInUp.delay(400).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Bot Analysis</Text>
        <TouchableOpacity 
          style={styles.viewAllButton}
          onPress={() => router.push('/(app)/bot')}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.botStatsGrid}>
        <View style={styles.botStatCard}>
          <View style={styles.botStatHeader}>
            <Ionicons name="hardware-chip" size={20} color={ORANGE} />
            <Text style={styles.botStatTitle}>Active Bots</Text>
          </View>
          <Text style={styles.botStatValue}>3</Text>
          <Text style={styles.botStatSubtext}>Running</Text>
        </View>
        
        <View style={styles.botStatCard}>
          <View style={styles.botStatHeader}>
            <Ionicons name="trending-up" size={20} color="#10b981" />
            <Text style={styles.botStatTitle}>Total Profit</Text>
          </View>
          <Text style={[styles.botStatValue, { color: '#10b981' }]}>+$1,456</Text>
          <Text style={styles.botStatSubtext}>Today</Text>
        </View>
      </View>
    </Animated.View>
  );

  // Quick actions
  const renderQuickActions = () => (
    <Animated.View entering={FadeInUp.delay(600).springify()}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/(app)/subscription')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#8b5cf6' }]}>
            <Ionicons name="card" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Subscriptions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/(tabs)/wallet')}
        >
          <View style={[styles.actionIcon, { backgroundColor: BLUE }]}>
            <Ionicons name="arrow-down-circle" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Deposit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/(app)/learning')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#10b981' }]}>
            <Ionicons name="book" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Learning Center</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => router.push('/(app)/analytics')}
        >
          <View style={[styles.actionIcon, { backgroundColor: '#f59e0b' }]}>
            <Ionicons name="analytics" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>Analysis</Text>
        </TouchableOpacity>
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
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {renderHeader()}
        {renderAccountOverview()}
        {renderQuickActions()}
        {renderBotAnalysis()}
        <View style={styles.bottomSpacing} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GRAY,
  },
  headerContainer: {
    backgroundColor: BG,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
    marginBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderWidth: 1,
    borderColor: BORDER,
    borderTopWidth: 0,
    paddingRight: 80,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileText: {
    flex: 1,
  },
  greetingText: {
    fontSize: 16,
    color: LIGHT,
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
    marginRight: 20,
    paddingRight: 20,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  botStatsGrid: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  botStatCard: {
    flex: 1,
    backgroundColor: BG,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
  },
  botStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  botStatTitle: {
    fontSize: 12,
    color: LIGHT,
    fontWeight: '500',
    marginLeft: 8,
  },
  botStatValue: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    marginBottom: 4,
  },
  botStatSubtext: {
    fontSize: 11,
    color: LIGHT,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    backgroundColor: BG,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: DARK,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
