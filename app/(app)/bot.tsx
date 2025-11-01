import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

const ORANGE = '#f58220';
const BLUE = '#0a2472';
const BG = '#fff';
const GRAY = '#f5f6fa';
const DARK = '#222';
const LIGHT = '#888';
const BORDER = '#f0f0f0';

export default function BotScreen() {
  const [isBotActive, setIsBotActive] = useState(false);
  const [isAutoTrading, setIsAutoTrading] = useState(false);

  const botStats = [
    { label: 'Total Trades', value: '847', change: '+12%', isPositive: true },
    { label: 'Success Rate', value: '82.3%', change: '+2.1%', isPositive: true },
    { label: 'Total Profit', value: '$23,456', change: '+$1,234', isPositive: true },
    { label: 'Active Pairs', value: '6', change: '0', isPositive: true },
  ];

  const tradingPairs = [
    { pair: 'EUR/USD', status: 'active', profit: '+$456', trades: 23 },
    { pair: 'GBP/USD', status: 'active', profit: '+$234', trades: 18 },
    { pair: 'USD/JPY', status: 'active', profit: '+$789', trades: 31 },
    { pair: 'AUD/USD', status: 'paused', profit: '-$123', trades: 12 },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <LinearGradient
        colors={[ORANGE, '#e67e22']}
        style={styles.headerGradient}
      >
        <Text style={styles.headerTitle}>AI Trading Bot</Text>
        <Text style={styles.headerSubtitle}>Automated forex trading with advanced algorithms</Text>
        
        <View style={styles.botStatus}>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, { backgroundColor: isBotActive ? '#10b981' : '#ef4444' }]} />
            <Text style={styles.statusText}>
              {isBotActive ? 'Bot Active' : 'Bot Inactive'}
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.toggleButton, { backgroundColor: isBotActive ? '#10b981' : '#ef4444' }]}
            onPress={() => setIsBotActive(!isBotActive)}
          >
            <Text style={styles.toggleText}>
              {isBotActive ? 'Stop Bot' : 'Start Bot'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  const renderStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bot Performance</Text>
      <View style={styles.statsGrid}>
        {botStats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <View style={styles.changeRow}>
              <Ionicons 
                name={stat.isPositive ? 'trending-up' : 'trending-down'} 
                size={16} 
                color={stat.isPositive ? '#10b981' : '#ef4444'} 
              />
              <Text style={[styles.changeText, { color: stat.isPositive ? '#10b981' : '#ef4444' }]}>
                {stat.change}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTradingPairs = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Active Trading Pairs</Text>
      <View style={styles.card}>
        {tradingPairs.map((pair, index) => (
          <View key={index} style={[styles.pairRow, index === tradingPairs.length - 1 && { borderBottomWidth: 0 }]}>
            <View style={styles.pairInfo}>
              <Text style={styles.pairName}>{pair.pair}</Text>
              <View style={[styles.statusBadge, { backgroundColor: pair.status === 'active' ? '#10b981' : '#f59e0b' }]}>
                <Text style={styles.statusBadgeText}>{pair.status}</Text>
              </View>
            </View>
            
            <View style={styles.pairStats}>
              <Text style={[styles.profitText, { color: pair.profit.startsWith('+') ? '#10b981' : '#ef4444' }]}>
                {pair.profit}
              </Text>
              <Text style={styles.tradesText}>{pair.trades} trades</Text>
            </View>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="ellipsis-vertical" size={20} color={LIGHT} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSettings = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Bot Settings</Text>
      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="play-circle" size={24} color={BLUE} />
            <Text style={styles.settingText}>Auto Trading</Text>
          </View>
          <Switch
            value={isAutoTrading}
            onValueChange={setIsAutoTrading}
            trackColor={{ false: '#e5e5e5', true: ORANGE }}
            thumbColor={isAutoTrading ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="shield-checkmark" size={24} color={BLUE} />
            <Text style={styles.settingText}>Risk Management</Text>
          </View>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Configure</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Ionicons name="time" size={24} color={BLUE} />
            <Text style={styles.settingText}>Trading Hours</Text>
          </View>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>Set Hours</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
          <View style={styles.settingInfo}>
            <Ionicons name="analytics" size={24} color={BLUE} />
            <Text style={styles.settingText}>Performance Analytics</Text>
          </View>
          <TouchableOpacity style={styles.settingButton}>
            <Text style={styles.settingButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="add-circle" size={32} color={ORANGE} />
          <Text style={styles.actionText}>Add Pair</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="settings" size={32} color={BLUE} />
          <Text style={styles.actionText}>Bot Settings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="analytics" size={32} color={ORANGE} />
          <Text style={styles.actionText}>Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <Ionicons name="help-circle" size={32} color={BLUE} />
          <Text style={styles.actionText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderHeader()}
      {renderStats()}
      {renderTradingPairs()}
      {renderSettings()}
      {renderQuickActions()}
      
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
    marginBottom: 24,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  botStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: BG,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: DARK,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: LIGHT,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  card: {
    backgroundColor: BG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  pairName: {
    fontSize: 18,
    fontWeight: '600',
    color: DARK,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  pairStats: {
    alignItems: 'flex-end',
    marginRight: 16,
  },
  profitText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  tradesText: {
    fontSize: 12,
    color: LIGHT,
  },
  actionButton: {
    padding: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: DARK,
    fontWeight: '500',
    marginLeft: 16,
  },
  settingButton: {
    backgroundColor: GRAY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  settingButtonText: {
    color: ORANGE,
    fontSize: 14,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
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
  actionText: {
    fontSize: 14,
    color: DARK,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
