import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated';
import { useBotStore } from '../../store/botStore';
import { useCurrentTheme } from '../../store/themeStore';
import { EmptyState } from '../../components/EmptyState';
import { ThemedButton } from '../../components/ThemedButton';

export const BotAnalysisScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const { signals, performance, isLoading, exportSignals, copySignal } = useBotStore();
  const [activeTab, setActiveTab] = useState<'signals' | 'performance'>('signals');
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null);

  const handleExport = () => {
    exportSignals();
    Alert.alert('Export Successful', 'Your trading signals have been exported successfully.');
  };

  const handleCopySignal = (signalId: string) => {
    copySignal(signalId);
    Alert.alert('Signal Copied', 'Trading signal details copied to clipboard.');
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'buy': return theme.colors.success[500];
      case 'sell': return theme.colors.error[500];
      case 'hold': return theme.colors.warning[500];
      default: return theme.colors.text.secondary;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy': return 'trending-up';
      case 'sell': return 'trending-down';
      case 'hold': return 'remove';
      default: return 'help';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return theme.colors.primary[500];
      case 'completed': return theme.colors.success[500];
      case 'cancelled': return theme.colors.error[500];
      case 'expired': return theme.colors.warning[500];
      default: return theme.colors.text.secondary;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return theme.colors.success[500];
    if (confidence >= 60) return theme.colors.warning[500];
    return theme.colors.error[500];
  };

  const renderSignals = () => (
    <Animated.View entering={SlideInRight} style={styles.signalsSection}>
      <View style={styles.signalsHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Trading Signals
        </Text>
        <TouchableOpacity
          style={[styles.exportButton, { backgroundColor: theme.colors.primary[500] }]}
          onPress={handleExport}
        >
          <Ionicons name="download" size={20} color="white" />
          <Text style={styles.exportButtonText}>Export</Text>
        </TouchableOpacity>
      </View>

      {signals.length === 0 ? (
        <EmptyState
          icon="📊"
          title="No Trading Signals"
          message="No trading signals are currently available. Check back later for new opportunities."
          actionText="Refresh"
          onAction={() => {}}
        />
      ) : (
        signals.map((signal, index) => (
          <Animated.View 
            key={signal.id}
            entering={FadeInUp.delay(200 + index * 100)}
            style={[styles.signalCard, { backgroundColor: theme.colors.background.secondary }]}
          >
            <View style={styles.signalHeader}>
              <View style={styles.signalMain}>
                <View style={styles.signalAction}>
                  <View style={[
                    styles.actionBadge,
                    { backgroundColor: getActionColor(signal.action) }
                  ]}>
                    <Ionicons 
                      name={getActionIcon(signal.action) as any} 
                      size={16} 
                      color="white" 
                    />
                    <Text style={styles.actionText}>
                      {signal.action.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[styles.signalSymbol, { color: theme.colors.text.primary }]}>
                    {signal.symbol}
                  </Text>
                </View>
                
                <View style={styles.signalStatus}>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(signal.status) }
                  ]}>
                    <Text style={styles.statusText}>{signal.status}</Text>
                  </View>
                  <View style={[
                    styles.confidenceBadge,
                    { backgroundColor: getConfidenceColor(signal.confidence) }
                  ]}>
                    <Text style={styles.confidenceText}>{signal.confidence}%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.signalMetrics}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Entry Price
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.text.primary }]}>
                    ${signal.entryPrice.toLocaleString()}
                  </Text>
                </View>
                
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Target
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.success[500] }]}>
                    ${signal.targetPrice.toLocaleString()}
                  </Text>
                </View>
                
                <View style={styles.metricItem}>
                  <Text style={[styles.metricLabel, { color: theme.colors.text.secondary }]}>
                    Stop Loss
                  </Text>
                  <Text style={[styles.metricValue, { color: theme.colors.error[500] }]}>
                    ${signal.stopLoss.toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.signalDetails}>
              <View style={styles.signalInfo}>
                <Text style={[styles.signalDescription, { color: theme.colors.text.secondary }]}>
                  {signal.description}
                </Text>
                
                <View style={styles.signalTags}>
                  {signal.tags.map((tag, tagIndex) => (
                    <View 
                      key={tagIndex}
                      style={[styles.tag, { backgroundColor: theme.colors.background.tertiary }]}
                    >
                      <Text style={[styles.tagText, { color: theme.colors.text.secondary }]}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.signalActions}>
                <TouchableOpacity
                  style={[styles.actionButton, { borderColor: theme.colors.primary[500] }]}
                  onPress={() => handleCopySignal(signal.id)}
                >
                  <Ionicons name="copy" size={16} color={theme.colors.primary[500]} />
                  <Text style={[styles.actionButtonText, { color: theme.colors.primary[500] }]}>
                    Copy
                  </Text>
                </TouchableOpacity>
                
                {signal.status === 'completed' && signal.profitLoss && (
                  <View style={[
                    styles.profitLossBadge,
                    { backgroundColor: signal.profitLoss >= 0 ? theme.colors.success[500] : theme.colors.error[500] }
                  ]}>
                    <Text style={styles.profitLossText}>
                      {signal.profitLoss >= 0 ? '+' : ''}{signal.profitLossPercent?.toFixed(2)}%
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.signalFooter}>
              <View style={styles.signalMeta}>
                <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>
                  Strategy: {signal.strategy}
                </Text>
                <Text style={[styles.metaText, { color: theme.colors.text.secondary }]}>
                  Timeframe: {signal.timeframe}
                </Text>
              </View>
              
              <Text style={[styles.signalTime, { color: theme.colors.text.secondary }]}>
                {new Date(signal.timestamp).toLocaleDateString()}
              </Text>
            </View>
          </Animated.View>
        ))
      )}
    </Animated.View>
  );

  const renderPerformance = () => (
    <Animated.View entering={SlideInRight} style={styles.performanceSection}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Performance Overview
      </Text>

      <View style={styles.performanceGrid}>
        <Animated.View 
          entering={FadeInUp.delay(200)}
          style={[styles.performanceCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <Text style={[styles.performanceLabel, { color: theme.colors.text.secondary }]}>
            Total Signals
          </Text>
          <Text style={[styles.performanceValue, { color: theme.colors.text.primary }]}>
            {performance.totalSignals}
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(300)}
          style={[styles.performanceCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <Text style={[styles.performanceLabel, { color: theme.colors.text.secondary }]}>
            Success Rate
          </Text>
          <Text style={[styles.performanceValue, { color: theme.colors.success[500] }]}>
            {performance.successRate}%
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(400)}
          style={[styles.performanceCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <Text style={[styles.performanceLabel, { color: theme.colors.text.secondary }]}>
            Total P&L
          </Text>
          <Text style={[
            styles.performanceValue,
            { color: performance.totalProfitLoss >= 0 ? theme.colors.success[500] : theme.colors.error[500] }
          ]}>
            ${performance.totalProfitLoss.toLocaleString()}
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(500)}
          style={[styles.performanceCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <Text style={[styles.performanceLabel, { color: theme.colors.text.secondary }]}>
            Avg Return
          </Text>
          <Text style={[styles.performanceValue, { color: theme.colors.primary[500] }]}>
            {performance.averageReturn}%
          </Text>
        </Animated.View>
      </View>

      <View style={styles.bestWorstSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Best & Worst Trades
        </Text>
        
        <View style={styles.tradeComparison}>
          <View style={[styles.tradeCard, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.tradeLabel, { color: theme.colors.success[500] }]}>
              Best Trade
            </Text>
            <Text style={[styles.tradeSymbol, { color: theme.colors.text.primary }]}>
              {performance.bestTrade.symbol}
            </Text>
            <Text style={[styles.tradeReturn, { color: theme.colors.success[500] }]}>
              +{performance.bestTrade.profitLossPercent?.toFixed(2)}%
            </Text>
            <Text style={[styles.tradeStrategy, { color: theme.colors.text.secondary }]}>
              {performance.bestTrade.strategy}
            </Text>
          </View>

          <View style={[styles.tradeCard, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.tradeLabel, { color: theme.colors.error[500] }]}>
              Worst Trade
            </Text>
            <Text style={[styles.tradeSymbol, { color: theme.colors.text.primary }]}>
              {performance.worstTrade.symbol}
            </Text>
            <Text style={[styles.tradeReturn, { color: theme.colors.error[500] }]}>
              {performance.worstTrade.profitLossPercent?.toFixed(2)}%
            </Text>
            <Text style={[styles.tradeStrategy, { color: theme.colors.text.secondary }]}>
              {performance.worstTrade.strategy}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.monthlySection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Monthly Performance
        </Text>
        
        {performance.monthlyReturns.map((month, index) => (
          <Animated.View 
            key={month.month}
            entering={FadeInUp.delay(600 + index * 100)}
            style={[styles.monthlyCard, { backgroundColor: theme.colors.background.secondary }]}
          >
            <View style={styles.monthlyHeader}>
              <Text style={[styles.monthlyName, { color: theme.colors.text.primary }]}>
                {month.month}
              </Text>
              <Text style={[
                styles.monthlyReturn,
                { color: month.return >= 0 ? theme.colors.success[500] : theme.colors.error[500] }
              ]}>
                {month.return >= 0 ? '+' : ''}{month.return}%
              </Text>
            </View>
            <Text style={[styles.monthlySignals, { color: theme.colors.text.secondary }]}>
              {month.signals} signals
            </Text>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Bot Analysis
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          AI-powered trading signals and performance insights
        </Text>
      </Animated.View>

      <View style={styles.tabBar}>
        {[
          { key: 'signals', label: 'Signals', icon: 'trending-up' },
          { key: 'performance', label: 'Performance', icon: 'analytics' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && { 
                backgroundColor: theme.colors.primary[500],
                borderColor: theme.colors.primary[500]
              }
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={activeTab === tab.key ? 'white' : theme.colors.text.secondary} 
            />
            <Text style={[
              styles.tabLabel,
              { color: activeTab === tab.key ? 'white' : theme.colors.text.secondary }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'signals' && renderSignals()}
        {activeTab === 'performance' && renderPerformance()}
      </ScrollView>
    </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  signalsSection: {
    paddingHorizontal: 20,
  },
  signalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  exportButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  signalCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
        shadowOffset: {
      width: 0,
      height: 2,
    },
              },
  signalHeader: {
    marginBottom: 16,
  },
  signalMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  signalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  signalSymbol: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signalStatus: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  signalMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  signalDetails: {
    marginBottom: 16,
  },
  signalInfo: {
    marginBottom: 16,
  },
  signalDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  signalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
  },
  signalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  profitLossBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  profitLossText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  signalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  signalMeta: {
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  signalTime: {
    fontSize: 12,
  },
  performanceSection: {
    paddingHorizontal: 20,
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  performanceCard: {
    width: '47%',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
        shadowOffset: {
      width: 0,
      height: 2,
    },
              },
  performanceLabel: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bestWorstSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tradeComparison: {
    flexDirection: 'row',
    gap: 16,
  },
  tradeCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
        shadowOffset: {
      width: 0,
      height: 2,
    },
              },
  tradeLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  tradeSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tradeReturn: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tradeStrategy: {
    fontSize: 12,
    textAlign: 'center',
  },
  monthlySection: {
    marginBottom: 24,
  },
  monthlyCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
        shadowOffset: {
      width: 0,
      height: 2,
    },
              },
  monthlyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  monthlyName: {
    fontSize: 16,
    fontWeight: '600',
  },
  monthlyReturn: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthlySignals: {
    fontSize: 14,
  },
});
