import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LineChart } from 'react-native-chart-kit';
import { useCurrentTheme } from '../../store';
import { useBotStore } from '../../store/botStore';

const screenWidth = Dimensions.get('window').width;

export const AnalyticsScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const { performance } = useBotStore();
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | 'YTD' | '1Y'>('1M');
  const [activeMetric, setActiveMetric] = useState<'pnl' | 'winRate' | 'volume'>('pnl');

  // Mock chart data
  const chartData = {
    pnl: {
      '1D': {
        labels: ['9AM', '12PM', '3PM', '6PM', '9PM'],
        datasets: [{
          data: [2500, 2700, 2400, 2800, 3100],
          color: () => theme.colors.primary[500],
        }]
      },
      '1W': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [2400, 2700, 2900, 2800, 3200, 3400, 3100],
          color: () => theme.colors.primary[500],
        }]
      },
      '1M': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data: [2200, 2600, 2900, 3100],
          color: () => theme.colors.primary[500],
        }]
      },
      '3M': {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          data: [1800, 2400, 3100],
          color: () => theme.colors.primary[500],
        }]
      },
      'YTD': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [1500, 1800, 2200, 2600, 2900, 3100],
          color: () => theme.colors.primary[500],
        }]
      },
      '1Y': {
        labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
        datasets: [{
          data: [1200, 1600, 2000, 2400, 2800, 3100],
          color: () => theme.colors.primary[500],
        }]
      },
    },
    winRate: {
      '1D': {
        labels: ['9AM', '12PM', '3PM', '6PM', '9PM'],
        datasets: [{
          data: [65, 68, 64, 70, 72],
          color: () => theme.colors.success[500],
        }]
      },
      '1W': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [62, 65, 68, 67, 70, 72, 71],
          color: () => theme.colors.success[500],
        }]
      },
      '1M': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data: [60, 64, 68, 71],
          color: () => theme.colors.success[500],
        }]
      },
      '3M': {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          data: [58, 64, 71],
          color: () => theme.colors.success[500],
        }]
      },
      'YTD': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [55, 58, 62, 65, 68, 71],
          color: () => theme.colors.success[500],
        }]
      },
      '1Y': {
        labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
        datasets: [{
          data: [52, 56, 60, 64, 68, 71],
          color: () => theme.colors.success[500],
        }]
      },
    },
    volume: {
      '1D': {
        labels: ['9AM', '12PM', '3PM', '6PM', '9PM'],
        datasets: [{
          data: [5000, 7500, 6000, 8000, 9500],
          color: () => theme.colors.info[500],
        }]
      },
      '1W': {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [4500, 6000, 7500, 7000, 9000, 10000, 9500],
          color: () => theme.colors.info[500],
        }]
      },
      '1M': {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
          data: [4000, 6000, 8000, 9500],
          color: () => theme.colors.info[500],
        }]
      },
      '3M': {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          data: [3500, 6000, 9500],
          color: () => theme.colors.info[500],
        }]
      },
      'YTD': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          data: [3000, 3500, 4500, 6000, 8000, 9500],
          color: () => theme.colors.info[500],
        }]
      },
      '1Y': {
        labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
        datasets: [{
          data: [2500, 3500, 5000, 6500, 8000, 9500],
          color: () => theme.colors.info[500],
        }]
      },
    },
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'pnl': return theme.colors.primary[500];
      case 'winRate': return theme.colors.success[500];
      case 'volume': return theme.colors.info[500];
      default: return theme.colors.primary[500];
    }
  };

  const getMetricTitle = (metric: string) => {
    switch (metric) {
      case 'pnl': return 'Profit & Loss';
      case 'winRate': return 'Win Rate';
      case 'volume': return 'Trading Volume';
      default: return '';
    }
  };

  const getMetricValue = (metric: string) => {
    switch (metric) {
      case 'pnl': return `$${performance.totalProfitLoss.toLocaleString()}`;
      case 'winRate': return `${performance.winRate}%`;
      case 'volume': return `$${performance.volume.toLocaleString()}`;
      default: return '';
    }
  };

  const renderMetricCards = () => {
    const metrics = [
      { id: 'pnl', title: 'Profit & Loss', icon: 'trending-up', value: `$${performance.totalProfitLoss.toLocaleString()}` },
      { id: 'winRate', title: 'Win Rate', icon: 'stats-chart', value: `${performance.winRate}%` },
      { id: 'volume', title: 'Trading Volume', icon: 'bar-chart', value: `$${performance.volume.toLocaleString()}` },
    ];

    return (
      <View style={styles.metricCardsContainer}>
        {metrics.map((metric, index) => (
          <TouchableOpacity
            key={metric.id}
            style={[
              styles.metricCard,
              { backgroundColor: activeMetric === metric.id ? getMetricColor(metric.id) : theme.colors.background.secondary },
              activeMetric === metric.id && styles.activeMetricCard
            ]}
            onPress={() => setActiveMetric(metric.id as any)}
          >
            <Ionicons
              name={metric.icon as any}
              size={24}
              color={activeMetric === metric.id ? 'white' : theme.colors.text.secondary}
            />
            <Text style={[
              styles.metricTitle,
              { color: activeMetric === metric.id ? 'white' : theme.colors.text.secondary }
            ]}>
              {metric.title}
            </Text>
            <Text style={[
              styles.metricValue,
              { color: activeMetric === metric.id ? 'white' : theme.colors.text.primary }
            ]}>
              {metric.value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderTimeframeSelector = () => {
    const timeframes = ['1D', '1W', '1M', '3M', 'YTD', '1Y'];

    return (
      <View style={styles.timeframeSelector}>
        {timeframes.map((tf) => (
          <TouchableOpacity
            key={tf}
            style={[
              styles.timeframeButton,
              timeframe === tf && { backgroundColor: theme.colors.primary[500] }
            ]}
            onPress={() => setTimeframe(tf as any)}
          >
            <Text style={[
              styles.timeframeText,
              { color: timeframe === tf ? 'white' : theme.colors.text.secondary }
            ]}>
              {tf}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderChart = () => {
    const currentData = chartData[activeMetric][timeframe];

    return (
      <View style={styles.chartContainer}>
        <LineChart
          data={currentData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: theme.colors.background.primary,
            backgroundGradientFrom: theme.colors.background.secondary,
            backgroundGradientTo: theme.colors.background.secondary,
            decimalPlaces: activeMetric === 'winRate' ? 0 : 2,
            color: (opacity = 1) => getMetricColor(activeMetric),
            labelColor: (opacity = 1) => theme.colors.text.secondary,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: getMetricColor(activeMetric),
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };

  const renderPerformanceStats = () => {
    return (
      <Animated.View 
        entering={FadeInUp.delay(300)}
        style={[styles.statsContainer, { backgroundColor: theme.colors.background.secondary }]}
      >
        <Text style={[styles.statsTitle, { color: theme.colors.text.primary }]}>
          Performance Statistics
        </Text>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Total Trades
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
              {performance.totalTrades}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Winning Trades
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.success[500] }]}>
              {performance.winningTrades}
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Losing Trades
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.error[500] }]}>
              {performance.losingTrades}
            </Text>
          </View>
        </View>
        
        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Avg. Return
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
              {performance.averageReturn}%
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Best Return
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.success[500] }]}>
              {performance.bestTrade.profitLossPercent?.toFixed(2)}%
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
              Worst Return
            </Text>
            <Text style={[styles.statValue, { color: theme.colors.error[500] }]}>
              {performance.worstTrade.profitLossPercent?.toFixed(2)}%
            </Text>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderTopPerformers = () => {
    return (
      <Animated.View 
        entering={FadeInUp.delay(400)}
        style={[styles.topPerformersContainer, { backgroundColor: theme.colors.background.secondary }]}
      >
        <Text style={[styles.statsTitle, { color: theme.colors.text.primary }]}>
          Top Performing Assets
        </Text>
        
        {performance.topAssets.map((asset: { symbol: string; name: string; return: number; volume: number }, index: number) => (
          <View 
            key={asset.symbol}
            style={[styles.assetRow, index < performance.topAssets.length - 1 && { 
              borderBottomWidth: 1, 
              borderBottomColor: theme.colors.border.primary 
            }]}
          >
            <View style={styles.assetInfo}>
              <Text style={[styles.assetSymbol, { color: theme.colors.text.primary }]}>
                {asset.symbol}
              </Text>
              <Text style={[styles.assetName, { color: theme.colors.text.secondary }]}>
                {asset.name}
              </Text>
            </View>
            
            <View style={styles.assetStats}>
              <Text style={[styles.assetReturn, { color: theme.colors.success[500] }]}>
                +{asset.return.toFixed(2)}%
              </Text>
              <Text style={[styles.assetVolume, { color: theme.colors.text.secondary }]}>
                ${asset.volume.toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Animated.View 
        entering={FadeInUp.delay(100)}
        style={styles.header}
      >
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Analytics
        </Text>
        <TouchableOpacity style={styles.exportButton}>
          <Ionicons name="download-outline" size={20} color={theme.colors.primary[500]} />
          <Text style={[styles.exportText, { color: theme.colors.primary[500] }]}>
            Export
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.delay(200)}>
          {renderMetricCards()}
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(250)}>
          {renderTimeframeSelector()}
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(300)}
          style={[styles.chartCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <Text style={[styles.chartTitle, { color: theme.colors.text.primary }]}>
            {getMetricTitle(activeMetric)}
          </Text>
          <Text style={[styles.chartValue, { color: getMetricColor(activeMetric) }]}>
            {getMetricValue(activeMetric)}
          </Text>
          {renderChart()}
        </Animated.View>

        {renderPerformanceStats()}
        {renderTopPerformers()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  exportText: {
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  metricCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  metricCard: {
    width: '31%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeMetricCard: {
    shadowOpacity: 0.2,
    elevation: 4,
  },
  metricTitle: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  chartCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  chartValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
  },
  statsContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    width: '30%',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  topPerformersContainer: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  assetName: {
    fontSize: 12,
  },
  assetStats: {
    alignItems: 'flex-end',
  },
  assetReturn: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  assetVolume: {
    fontSize: 12,
  },
});