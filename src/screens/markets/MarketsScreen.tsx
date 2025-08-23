import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { EmptyState } from '../../components/EmptyState';
import { useTheme } from '../../theme';
import { dummyAssets } from '../../utils/dummyData';

interface MarketsScreenProps {
  navigation: any;
}

type FilterCategory = 'all' | 'crypto' | 'stock' | 'forex' | 'commodity';

export const MarketsScreen: React.FC<MarketsScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState(
    dummyAssets.filter(asset => asset.isFavorite).map(asset => asset.id)
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const toggleFavorite = (assetId: string) => {
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const filteredAssets = useMemo(() => {
    let filtered = dummyAssets;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(asset => asset.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(asset => 
        asset.name.toLowerCase().includes(query) ||
        asset.symbol.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const categories: { key: FilterCategory; label: string; icon: string }[] = [
    { key: 'all', label: 'All', icon: 'grid' },
    { key: 'crypto', label: 'Crypto', icon: 'logo-bitcoin' },
    { key: 'stock', label: 'Stocks', icon: 'trending-up' },
    { key: 'forex', label: 'Forex', icon: 'swap-horizontal' },
    { key: 'commodity', label: 'Commodities', icon: 'diamond' },
  ];

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.key}
          style={[
            styles.categoryButton,
            {
              backgroundColor: selectedCategory === category.key 
                ? theme.colors.primary 
                : theme.colors.surface,
              borderColor: selectedCategory === category.key 
                ? theme.colors.primary 
                : theme.colors.border,
            }
          ]}
          onPress={() => setSelectedCategory(category.key)}
        >
          <Ionicons 
            name={category.icon as any} 
            size={16} 
            color={selectedCategory === category.key 
              ? theme.colors.surface 
              : theme.colors.textSecondary
            } 
          />
          <Text style={[
            styles.categoryLabel,
            {
              color: selectedCategory === category.key 
                ? theme.colors.surface 
                : theme.colors.textSecondary
            }
          ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSearchBar = () => (
    <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
      <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
      <TextInput
        style={[styles.searchInput, { color: theme.colors.text }]}
        placeholder="Search assets..."
        placeholderTextColor={theme.colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery('')}>
          <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );

  const renderAssetItem = ({ item }: { item: typeof dummyAssets[0] }) => (
    <TouchableOpacity
      style={[styles.assetItem, { backgroundColor: theme.colors.surface }]}
      onPress={() => navigation.navigate('AssetDetail', { assetId: item.id })}
    >
      <View style={styles.assetLeft}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.assetIcon} />
        ) : (
          <View style={[styles.assetIconPlaceholder, { backgroundColor: theme.colors.border }]}>
            <Text style={[styles.assetIconText, { color: theme.colors.textSecondary }]}>
              {item.symbol.charAt(0)}
            </Text>
          </View>
        )}
        
        <View style={styles.assetInfo}>
          <Text style={[styles.assetSymbol, { color: theme.colors.text }]}>
            {item.symbol}
          </Text>
          <Text style={[styles.assetName, { color: theme.colors.textSecondary }]}>
            {item.name}
          </Text>
        </View>
      </View>
      
      <View style={styles.assetRight}>
        <View style={styles.assetPriceInfo}>
          <Text style={[styles.assetPrice, { color: theme.colors.text }]}>
            ${item.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <Text 
            style={[
              styles.assetChange, 
              { color: item.changePercent24h >= 0 ? '#10b981' : '#ef4444' }
            ]}
          >
            {item.changePercent24h >= 0 ? '+' : ''}{item.changePercent24h.toFixed(2)}%
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}
        >
          <Ionicons 
            name={favorites.includes(item.id) ? "heart" : "heart-outline"} 
            size={20} 
            color={favorites.includes(item.id) ? theme.colors.primary : theme.colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    if (searchQuery.trim() || selectedCategory !== 'all') {
      return (
        <EmptyState
          icon="search-outline"
          title="No Results Found"
          description={`No assets found for "${searchQuery}" in ${selectedCategory} category`}
          actionTitle="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
          }}
        />
      );
    }
    
    return (
      <EmptyState
        icon="trending-down-outline"
        title="No Assets Available"
        description="There are currently no assets available in the market"
        actionTitle="Refresh"
        onAction={onRefresh}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Markets
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Explore and track your favorite assets
        </Text>
      </View>

      {renderSearchBar()}
      {renderCategoryFilter()}

      <FlatList
        data={filteredAssets}
        renderItem={renderAssetItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  assetIconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  assetName: {
    fontSize: 14,
  },
  assetRight: {
    alignItems: 'flex-end',
  },
  assetPriceInfo: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 4,
  },
  separator: {
    height: 12,
  },
});
