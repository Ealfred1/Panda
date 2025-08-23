import { create } from 'zustand';

export interface WalletAsset {
  id: string;
  symbol: string;
  name: string;
  balance: number;
  value: number;
  change24h: number;
  changePercent24h: number;
  icon?: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'fee';
  asset: string;
  amount: number;
  value: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  timestamp: string;
  txHash?: string;
  fee?: number;
  description?: string;
}

export interface DepositMethod {
  id: string;
  name: string;
  type: 'bank' | 'card' | 'crypto';
  icon: string;
  isAvailable: boolean;
  processingTime: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
}

export interface WithdrawalMethod {
  id: string;
  name: string;
  type: 'bank' | 'crypto';
  icon: string;
  isAvailable: boolean;
  processingTime: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
  address?: string;
}

interface WalletState {
  totalBalance: number;
  assets: WalletAsset[];
  transactions: Transaction[];
  depositMethods: DepositMethod[];
  withdrawalMethods: WithdrawalMethod[];
  isLoading: boolean;
  
  // Actions
  setTotalBalance: (balance: number) => void;
  setAssets: (assets: WalletAsset[]) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransactionStatus: (id: string, status: Transaction['status']) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  totalBalance: 15420.75,
  assets: [
    {
      id: '1',
      symbol: 'USD',
      name: 'US Dollar',
      balance: 12500.00,
      value: 12500.00,
      change24h: 0,
      changePercent24h: 0,
      icon: '💵'
    },
    {
      id: '2',
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.067,
      value: 2890.75,
      change24h: 125.50,
      changePercent24h: 4.54,
      icon: '₿'
    },
    {
      id: '3',
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 2.5,
      value: 6625.63,
      change24h: -124.37,
      changePercent24h: -1.84,
      icon: 'Ξ'
    }
  ],
  transactions: [
    {
      id: '1',
      type: 'deposit',
      asset: 'USD',
      amount: 10000,
      value: 10000,
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      description: 'Bank transfer from Chase Bank'
    },
    {
      id: '2',
      type: 'withdrawal',
      asset: 'USD',
      amount: 2500,
      value: 2500,
      status: 'completed',
      timestamp: '2024-01-14T15:45:00Z',
      description: 'Withdrawal to Bank of America',
      fee: 25
    },
    {
      id: '3',
      type: 'transfer',
      asset: 'BTC',
      amount: 0.01,
      value: 432.50,
      status: 'completed',
      timestamp: '2024-01-13T09:15:00Z',
      description: 'Transfer to external wallet',
      txHash: '0x1234...5678',
      fee: 0.0001
    },
    {
      id: '4',
      type: 'deposit',
      asset: 'ETH',
      amount: 1.5,
      value: 3975.38,
      status: 'completed',
      timestamp: '2024-01-12T14:20:00Z',
      description: 'Crypto deposit from Coinbase'
    }
  ],
  depositMethods: [
    {
      id: 'bank',
      name: 'Bank Transfer',
      type: 'bank',
      icon: '🏦',
      isAvailable: true,
      processingTime: '1-3 business days',
      minAmount: 100,
      maxAmount: 50000,
      fee: 0
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      type: 'card',
      icon: '💳',
      isAvailable: true,
      processingTime: 'Instant',
      minAmount: 10,
      maxAmount: 5000,
      fee: 2.9
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      type: 'crypto',
      icon: '₿',
      isAvailable: true,
      processingTime: '10-30 minutes',
      minAmount: 0.001,
      maxAmount: 100000,
      fee: 0.0001
    }
  ],
  withdrawalMethods: [
    {
      id: 'bank',
      name: 'Bank Transfer',
      type: 'bank',
      icon: '🏦',
      isAvailable: true,
      processingTime: '1-3 business days',
      minAmount: 100,
      maxAmount: 50000,
      fee: 25
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      type: 'crypto',
      icon: '₿',
      isAvailable: true,
      processingTime: '10-30 minutes',
      minAmount: 0.001,
      maxAmount: 100000,
      fee: 0.0001
    }
  ],
  isLoading: false,

  setTotalBalance: (balance) => set({ totalBalance: balance }),
  setAssets: (assets) => set({ assets }),
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  addTransaction: (transaction) => {
    const { transactions } = get();
    set({ transactions: [transaction, ...transactions] });
  },
  
  updateTransactionStatus: (id, status) => {
    const { transactions } = get();
    const updatedTransactions = transactions.map(tx => 
      tx.id === id ? { ...tx, status } : tx
    );
    set({ transactions: updatedTransactions });
  }
}));
