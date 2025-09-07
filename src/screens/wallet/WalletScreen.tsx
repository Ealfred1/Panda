import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
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
import { EmptyState } from '../../components/EmptyState';
import { ThemedButton } from '../../components/ThemedButton';
import { useCurrentTheme } from '../../store/themeStore';
import { useWalletStore } from '../../store/walletStore';

const { width } = Dimensions.get('window');

export const WalletScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const { 
    totalBalance, 
    assets, 
    transactions, 
    depositMethods, 
    withdrawalMethods,
    isLoading 
  } = useWalletStore();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'deposit' | 'withdraw' | 'history'>('overview');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedDepositMethod, setSelectedDepositMethod] = useState<string | null>(null);
  const [selectedWithdrawMethod, setSelectedWithdrawMethod] = useState<string | null>(null);

  const handleDeposit = (methodId: string) => {
    setSelectedDepositMethod(methodId);
    setShowDepositModal(true);
  };

  const handleWithdraw = (methodId: string) => {
    setSelectedWithdrawMethod(methodId);
    setShowWithdrawModal(true);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return 'arrow-down-circle';
      case 'withdrawal': return 'arrow-up-circle';
      case 'transfer': return 'swap-horizontal';
      case 'fee': return 'card';
      default: return 'help-circle';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'deposit': return theme.colors.success[500];
      case 'withdrawal': return theme.colors.error[500];
      case 'transfer': return theme.colors.warning[500];
      case 'fee': return theme.colors.text.secondary;
      default: return theme.colors.text.secondary;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return theme.colors.success[500];
      case 'pending': return theme.colors.warning[500];
      case 'failed': return theme.colors.error[500];
      case 'cancelled': return theme.colors.text.secondary;
      default: return theme.colors.text.secondary;
    }
  };

  const renderOverview = () => (
    <Animated.View entering={FadeInUp.delay(200)} style={styles.overviewSection}>
      <View style={[styles.balanceCard, { backgroundColor: theme.colors.background.card }]}>
        <View style={styles.balanceHeader}>
          <Text style={[styles.balanceLabel, { color: theme.colors.text.secondary }]}>
            Total Portfolio Value
          </Text>
          <TouchableOpacity style={styles.balanceToggle}>
            <Ionicons name="eye-outline" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.balanceAmount, { color: theme.colors.text.primary }]}>
          ${totalBalance.toLocaleString()}
        </Text>
        <View style={styles.balanceChangeContainer}>
          <Ionicons name="trending-up" size={16} color={theme.colors.success[500]} />
          <Text style={[styles.balanceChange, { color: theme.colors.success[500] }]}>
            +$1,245.50 (+8.8%) today
          </Text>
        </View>
      </View>

      <View style={styles.assetsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Asset Breakdown
        </Text>
        {assets.map((asset, index) => (
          <Animated.View 
            key={asset.id}
            entering={FadeInUp.delay(300 + index * 100)}
            style={[styles.assetCard, { backgroundColor: theme.colors.background.secondary }]}
          >
            <View style={styles.assetHeader}>
              <View style={[styles.assetIcon, { backgroundColor: theme.colors.primary[500] + '20' }]}>
                <Text style={styles.assetIconText}>{asset.icon}</Text>
              </View>
              <View style={styles.assetInfo}>
                <Text style={[styles.assetName, { color: theme.colors.text.primary }]}>
                  {asset.name}
                </Text>
                <Text style={[styles.assetSymbol, { color: theme.colors.text.secondary }]}>
                  {asset.symbol}
                </Text>
              </View>
              <View style={styles.assetValue}>
                <Text style={[styles.assetValueText, { color: theme.colors.text.primary }]}>
                  ${asset.value.toLocaleString()}
                </Text>
                <Text style={[
                  styles.assetChange,
                  { color: asset.changePercent24h >= 0 ? theme.colors.success[500] : theme.colors.error[500] }
                ]}>
                  {asset.changePercent24h >= 0 ? '+' : ''}{asset.changePercent24h.toFixed(2)}%
                </Text>
              </View>
            </View>
            <View style={styles.assetDetails}>
              <Text style={[styles.assetBalance, { color: theme.colors.text.secondary }]}>
                Balance: {asset.balance} {asset.symbol}
              </Text>
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.primaryActionButton, { backgroundColor: theme.colors.primary[500] }]}
          onPress={() => setActiveTab('deposit')}
        >
          <Ionicons name="arrow-down" size={20} color="white" />
          <Text style={styles.primaryActionButtonText}>Deposit Funds</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.secondaryActionButton, { backgroundColor: theme.colors.background.tertiary, borderColor: theme.colors.primary[500] }]}
          onPress={() => setActiveTab('withdraw')}
        >
          <Ionicons name="arrow-up" size={20} color={theme.colors.primary[500]} />
          <Text style={[styles.secondaryActionButtonText, { color: theme.colors.primary[500] }]}>Withdraw</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderDeposit = () => (
    <Animated.View entering={SlideInRight} style={styles.methodsSection}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Deposit Methods
      </Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.text.secondary }]}>
        Choose your preferred deposit method
      </Text>
      
      {depositMethods.map((method, index) => (
        <Animated.View 
          key={method.id}
          entering={FadeInUp.delay(200 + index * 100)}
          style={[styles.methodCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <View style={styles.methodHeader}>
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <View style={styles.methodInfo}>
              <Text style={[styles.methodName, { color: theme.colors.text.primary }]}>
                {method.name}
              </Text>
              <Text style={[styles.methodDetails, { color: theme.colors.text.secondary }]}>
                {method.processingTime} • Fee: {method.fee === 0 ? 'Free' : `${method.fee}%`}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.methodButton, { backgroundColor: theme.colors.primary[500] }]}
              onPress={() => handleDeposit(method.id)}
            >
              <Text style={styles.methodButtonText}>Deposit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.methodLimits}>
            <Text style={[styles.limitText, { color: theme.colors.text.secondary }]}>
              Min: ${method.minAmount.toLocaleString()} • Max: ${method.maxAmount.toLocaleString()}
            </Text>
          </View>
        </Animated.View>
      ))}
    </Animated.View>
  );

  const renderWithdraw = () => (
    <Animated.View entering={SlideInRight} style={styles.methodsSection}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Withdrawal Methods
      </Text>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.text.secondary }]}>
        Choose your preferred withdrawal method
      </Text>
      
      {withdrawalMethods.map((method, index) => (
        <Animated.View 
          key={method.id}
          entering={FadeInUp.delay(200 + index * 100)}
          style={[styles.methodCard, { backgroundColor: theme.colors.background.secondary }]}
        >
          <View style={styles.methodHeader}>
            <Text style={styles.methodIcon}>{method.icon}</Text>
            <View style={styles.methodInfo}>
              <Text style={[styles.methodName, { color: theme.colors.text.primary }]}>
                {method.name}
              </Text>
              <Text style={[styles.methodDetails, { color: theme.colors.text.secondary }]}>
                {method.processingTime} • Fee: ${method.fee.toLocaleString()}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.methodButton, { backgroundColor: theme.colors.primary[500] }]}
              onPress={() => handleWithdraw(method.id)}
            >
              <Text style={styles.methodButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.methodLimits}>
            <Text style={[styles.limitText, { color: theme.colors.text.secondary }]}>
              Min: ${method.minAmount.toLocaleString()} • Max: ${method.maxAmount.toLocaleString()}
            </Text>
          </View>
        </Animated.View>
      ))}
    </Animated.View>
  );

  const renderHistory = () => (
    <Animated.View entering={SlideInRight} style={styles.historySection}>
      <View style={styles.historyHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Transaction History
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>
      </View>
      
      {transactions.length === 0 ? (
        <EmptyState
          title="No Transactions"
          message="You haven't made any transactions yet. Start by depositing funds."
          actionText="Make First Deposit"
          onAction={() => setActiveTab('deposit')}
        />
      ) : (
        transactions.map((transaction, index) => (
          <Animated.View 
            key={transaction.id}
            entering={FadeInUp.delay(200 + index * 100)}
            style={[styles.transactionCard, { backgroundColor: theme.colors.background.secondary }]}
          >
            <View style={styles.transactionHeader}>
              <View style={[styles.transactionIcon, { backgroundColor: getTransactionColor(transaction.type) + '20' }]}>
                <Ionicons 
                  name={getTransactionIcon(transaction.type) as any} 
                  size={20} 
                  color={getTransactionColor(transaction.type)} 
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionType, { color: theme.colors.text.primary }]}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </Text>
                <Text style={[styles.transactionDescription, { color: theme.colors.text.secondary }]}>
                  {transaction.description}
                </Text>
                <Text style={[styles.transactionDate, { color: theme.colors.text.secondary }]}>
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.transactionAmountText,
                  { color: getTransactionColor(transaction.type) }
                ]}>
                  {transaction.type === 'withdrawal' || transaction.type === 'fee' ? '-' : '+'}
                  ${transaction.value.toLocaleString()}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(transaction.status) }]}>
                  <Text style={styles.statusText}>{transaction.status}</Text>
                </View>
              </View>
            </View>
            
            {transaction.fee && (
              <View style={styles.transactionFee}>
                <Text style={[styles.feeText, { color: theme.colors.text.secondary }]}>
                  Fee: ${transaction.fee.toLocaleString()}
                </Text>
              </View>
            )}
          </Animated.View>
        ))
      )}
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Wallet
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Manage your funds and transactions
        </Text>
      </Animated.View>

      <View style={styles.tabBar}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {[
            { key: 'overview', label: 'Overview', icon: 'pie-chart-outline' },
            { key: 'deposit', label: 'Deposit', icon: 'arrow-down-circle-outline' },
            { key: 'withdraw', label: 'Withdraw', icon: 'arrow-up-circle-outline' },
            { key: 'history', label: 'History', icon: 'time-outline' }
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && { 
                  backgroundColor: theme.colors.primary[500]
                }
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Ionicons 
                name={tab.icon as any} 
                size={18} 
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
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'deposit' && renderDeposit()}
        {activeTab === 'withdraw' && renderWithdraw()}
        {activeTab === 'history' && renderHistory()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  tabBar: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabScrollContent: {
    gap: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    gap: 6,
    minWidth: 100,
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
  overviewSection: {
    paddingHorizontal: 20,
  },
  balanceCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceToggle: {
    padding: 4,
  },
  balanceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  balanceLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 700,
  },
  balanceChange: {
    fontSize: 16,
    fontWeight: '600',
  },
  assetsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  assetCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  assetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 24,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  assetSymbol: {
    fontSize: 14,
  },
  assetValue: {
    alignItems: 'flex-end',
  },
  assetValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  assetDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 12,
  },
  assetBalance: {
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  primaryActionButtonText: {
    fontSize: 15,
    fontWeight: 600,
    color: 'white',
  },
  secondaryActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  secondaryActionButtonText: {
    fontSize: 15,
    fontWeight: 600,
  },
  methodsSection: {
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  methodCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodIcon: {
    fontSize: 20,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  methodDetails: {
    fontSize: 14,
  },
  methodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  methodButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  methodLimits: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 12,
  },
  limitText: {
    fontSize: 12,
  },
  historySection: {
    paddingHorizontal: 20,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterButton: {
    padding: 8,
  },
  transactionCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  transactionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 14,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  transactionAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
  transactionFee: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 12,
  },
  feeText: {
    fontSize: 12,
  },
});
