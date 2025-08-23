import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Card } from '../../components/Card';
import { ThemedButton } from '../../components/ThemedButton';
import { useTheme } from '../../theme';
import { dummyAssetDetails, dummyAssets } from '../../utils/dummyData';

const { width } = Dimensions.get('window');

interface AssetDetailScreenProps {
  navigation: any;
  route: { params: { assetId: string } };
}

export const AssetDetailScreen: React.FC<AssetDetailScreenProps> = ({ navigation, route }) => {
  const theme = useTheme();
  const { assetId } = route.params;
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  
  const asset = dummyAssets.find(a => a.id === assetId);
  const assetDetail = dummyAssetDetails.find(d => d.asset.id === assetId);

  if (!asset || !assetDetail) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.centerContent}>
          <Text style={[styles.errorText, { color: theme.colors.text }]}>
            Asset not found
          </Text>
        </View>
      </View>
    );
  }

  const timeframes = ['1H', '1D', '1W', '1M', '1Y'];

  const renderChart = () => (
    <Card style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
          Price Chart
        </Text>
        <View style={styles.timeframeContainer}>
          {timeframes.map((tf) => (
            <TouchableOpacity
              key={tf}
              style={[
                styles.timeframeButton,
                {
                  backgroundColor: selectedTimeframe === tf 
                    ? theme.colors.primary 
                    : 'transparent',
                }
              ]}
              onPress={() => setSelectedTimeframe(tf)}
            >
              <Text style={[
                styles.timeframeText,
                {
                  color: selectedTimeframe === tf 
                    ? theme.colors.surface 
                    : theme.colors.textSecondary,
                }
              ]}>
                {tf}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.chartPlaceholder}>
        <View style={styles.chartLine} />
        <View style={styles.chartLine} />
        <View style={styles.chartLine} />
        <Text style={[styles.chartPlaceholderText, { color: theme.colors.textSecondary }]}>
          Interactive Chart Coming Soon
        </Text>
      </View>
    </Card>
  );

  const renderOrderBook = () => (
    <Card style={styles.orderBookCard}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
        Order Book
      </Text>
      
      <View style={styles.orderBookHeader}>
        <Text style={[styles.orderBookHeaderText, { color: theme.colors.textSecondary }]}>
          Price
        </Text>
        <Text style={[styles.orderBookHeaderText, { color: theme.colors.textSecondary }]}>
          Size
        </Text>
        <Text style={[styles.orderBookHeaderText, { color: theme.colors.textSecondary }]}>
          Total
        </Text>
      </View>
      
      <View style={styles.orderBookContent}>
        {assetDetail.orderBook.asks.slice(0, 5).reverse().map((ask, index) => (
          <View key={`ask-${index}`} style={styles.orderBookRow}>
            <Text style={[styles.orderBookPrice, { color: '#ef4444' }]}>
              ${ask.price.toFixed(2)}
            </Text>
            <Text style={[styles.orderBookSize, { color: theme.colors.textSecondary }]}>
              {ask.size.toFixed(2)}
            </Text>
            <Text style={[styles.orderBookTotal, { color: theme.colors.textSecondary }]}>
              {(ask.price * ask.size).toFixed(2)}
            </Text>
          </View>
        ))}
        
        <View style={styles.orderBookSpread}>
          <Text style={[styles.spreadText, { color: theme.colors.textSecondary }]}>
            Spread: ${(assetDetail.orderBook.asks[0]?.price - assetDetail.orderBook.bids[0]?.price).toFixed(2)}
          </Text>
        </View>
        
        {assetDetail.orderBook.bids.slice(0, 5).map((bid, index) => (
          <View key={`bid-${index}`} style={styles.orderBookRow}>
            <Text style={[styles.orderBookPrice, { color: '#10b981' }]}>
              ${bid.price.toFixed(2)}
            </Text>
            <Text style={[styles.orderBookSize, { color: theme.colors.textSecondary }]}>
              {bid.size.toFixed(2)}
            </Text>
            <Text style={[styles.orderBookTotal, { color: theme.colors.textSecondary }]}>
              {(bid.price * bid.size).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {asset.image ? (
            <Image source={{ uri: asset.image }} style={styles.assetIcon} />
          ) : (
            <View style={[styles.assetIconPlaceholder, { backgroundColor: theme.colors.border }]}>
              <Text style={[styles.assetIconText, { color: theme.colors.textSecondary }]}>
                {asset.symbol.charAt(0)}
              </Text>
            </View>
          )}
          <View>
            <Text style={[styles.assetSymbol, { color: theme.colors.text }]}>
              {asset.symbol}
            </Text>
            <Text style={[styles.assetName, { color: theme.colors.textSecondary }]}>
              {asset.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.priceSection}>
        <Text style={[styles.currentPrice, { color: theme.colors.text }]}>
          ${asset.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>
        <View style={styles.priceChange}>
          <Ionicons 
            name={asset.changePercent24h >= 0 ? "trending-up" : "trending-down"} 
            size={16} 
            color={asset.changePercent24h >= 0 ? '#10b981' : '#ef4444'} 
          />
          <Text style={[
            styles.priceChangeText, 
            { color: asset.changePercent24h >= 0 ? '#10b981' : '#ef4444' }
          ]}>
            {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}% 
            (${asset.change24h.toFixed(2)})
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <ThemedButton
          title="Buy"
          onPress={() => {/* Navigate to buy screen */}}
          style={[styles.actionButton, { backgroundColor: '#10b981' }]}
        />
        <ThemedButton
          title="Sell"
          onPress={() => {/* Navigate to sell screen */}}
          variant="outline"
          style={styles.actionButton}
        />
      </View>

      {renderChart()}
      {renderOrderBook()}

      <Card style={styles.infoCard}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About {asset.name}
        </Text>
        <Text style={[styles.assetDescription, { color: theme.colors.textSecondary }]}>
          {assetDetail.description}
        </Text>
        
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
              Market Cap
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
              ${(asset.marketCap / 1e9).toFixed(2)}B
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
              24h Volume
            </Text>
            <Text style={[styles.infoValue, { color: theme.colors.text }]}>
              ${(asset.volume24h / 1e6).toFixed(2)}M
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  assetIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assetIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assetSymbol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assetName: {
    fontSize: 14,
    color: '#6b7280',
  },
  priceSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  currentPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  priceChangeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
  },
  chartCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  timeframeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timeframeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  chartLine: {
    width: width - 80,
    height: 2,
    backgroundColor: '#e5e7eb',
    borderRadius: 1,
  },
  chartPlaceholderText: {
    fontSize: 14,
    marginTop: 16,
  },
  orderBookCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderBookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 12,
  },
  orderBookHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  orderBookContent: {
    gap: 8,
  },
  orderBookRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderBookPrice: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  orderBookSize: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  orderBookTotal: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  orderBookSpread: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginVertical: 8,
  },
  spreadText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  infoCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  assetDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 20,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
