import { create } from 'zustand';

export interface TradingSignal {
  id: string;
  symbol: string;
  action: 'buy' | 'sell' | 'hold';
  confidence: number; // 0-100
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  status: 'active' | 'completed' | 'cancelled' | 'expired';
  timestamp: string;
  completedAt?: string;
  profitLoss?: number;
  profitLossPercent?: number;
  strategy: string;
  timeframe: string;
  volume: number;
  marketCap: number;
  description: string;
  tags: string[];
}

export interface BotPerformance {
  totalSignals: number;
  successfulSignals: number;
  successRate: number;
  totalProfitLoss: number;
  averageReturn: number;
  bestTrade: TradingSignal;
  worstTrade: TradingSignal;
  monthlyReturns: Array<{
    month: string;
    return: number;
    signals: number;
  }>;
  winRate: number;
  volume: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  topAssets: Array<{
    symbol: string;
    name: string;
    return: number;
    volume: number;
  }>;
}

interface BotState {
  signals: TradingSignal[];
  performance: BotPerformance;
  isLoading: boolean;
  
  // Actions
  setSignals: (signals: TradingSignal[]) => void;
  setPerformance: (performance: BotPerformance) => void;
  setLoading: (loading: boolean) => void;
  addSignal: (signal: TradingSignal) => void;
  updateSignalStatus: (id: string, status: TradingSignal['status']) => void;
  exportSignals: () => void;
  copySignal: (id: string) => void;
}

export const useBotStore = create<BotState>((set, get) => ({
  signals: [
    {
      id: '1',
      symbol: 'BTC/USD',
      action: 'buy',
      confidence: 87,
      entryPrice: 43250,
      targetPrice: 46500,
      stopLoss: 41500,
      status: 'completed',
      timestamp: '2024-01-15T08:00:00Z',
      completedAt: '2024-01-15T14:30:00Z',
      profitLoss: 3250,
      profitLossPercent: 7.51,
      strategy: 'Breakout Strategy',
      timeframe: '4H',
      volume: 28000000000,
      marketCap: 850000000000,
      description: 'Bitcoin showing strong bullish momentum with volume confirmation. Key resistance at $46,500.',
      tags: ['breakout', 'volume', 'momentum']
    },
    {
      id: '2',
      symbol: 'ETH/USD',
      action: 'sell',
      confidence: 72,
      entryPrice: 2700,
      targetPrice: 2550,
      stopLoss: 2800,
      status: 'active',
      timestamp: '2024-01-15T10:00:00Z',
      strategy: 'Mean Reversion',
      timeframe: '1H',
      volume: 15000000000,
      marketCap: 320000000000,
      description: 'Ethereum overbought on RSI, expecting pullback to support levels.',
      tags: ['mean-reversion', 'RSI', 'overbought']
    },
    {
      id: '3',
      symbol: 'SOL/USD',
      action: 'buy',
      confidence: 94,
      entryPrice: 98.45,
      targetPrice: 115.00,
      stopLoss: 92.00,
      status: 'active',
      timestamp: '2024-01-15T12:00:00Z',
      strategy: 'Trend Following',
      timeframe: '1D',
      volume: 2800000000,
      marketCap: 45000000000,
      description: 'Solana breaking out of consolidation with strong fundamentals and institutional interest.',
      tags: ['trend-following', 'breakout', 'fundamentals']
    },
    {
      id: '4',
      symbol: 'AAPL/USD',
      action: 'hold',
      confidence: 65,
      entryPrice: 185.75,
      targetPrice: 190.00,
      stopLoss: 180.00,
      status: 'active',
      timestamp: '2024-01-15T09:00:00Z',
      strategy: 'Range Trading',
      timeframe: '4H',
      volume: 4500000000,
      marketCap: 2900000000000,
      description: 'Apple consolidating in range, waiting for earnings catalyst.',
      tags: ['range-trading', 'consolidation', 'earnings']
    }
  ],
  performance: {
    totalSignals: 156,
    successfulSignals: 127,
    successRate: 81.4,
    totalProfitLoss: 28450.75,
    averageReturn: 4.2,
    bestTrade: {
      id: 'best',
      symbol: 'SOL/USD',
      action: 'buy',
      confidence: 95,
      entryPrice: 45.20,
      targetPrice: 98.45,
      stopLoss: 42.00,
      status: 'completed',
      timestamp: '2024-01-01T00:00:00Z',
      completedAt: '2024-01-15T00:00:00Z',
      profitLoss: 53.25,
      profitLossPercent: 117.8,
      strategy: 'Trend Following',
      timeframe: '1D',
      volume: 2800000000,
      marketCap: 45000000000,
      description: 'Best trade of the month',
      tags: ['trend-following']
    },
    worstTrade: {
      id: 'worst',
      symbol: 'ADA/USD',
      action: 'buy',
      confidence: 78,
      entryPrice: 0.52,
      targetPrice: 0.60,
      stopLoss: 0.48,
      status: 'completed',
      timestamp: '2024-01-10T00:00:00Z',
      completedAt: '2024-01-12T00:00:00Z',
      profitLoss: -0.04,
      profitLossPercent: -7.7,
      strategy: 'Breakout Strategy',
      timeframe: '4H',
      volume: 850000000,
      marketCap: 17000000000,
      description: 'Worst trade of the month',
      tags: ['breakout']
    },
    monthlyReturns: [
      { month: 'Jan 2024', return: 12.4, signals: 45 },
      { month: 'Dec 2023', return: 8.7, signals: 38 },
      { month: 'Nov 2023', return: 15.2, signals: 42 },
      { month: 'Oct 2023', return: 6.8, signals: 31 }
    ],
    winRate: 0,
    volume: 0,
    totalTrades: 0,
    winningTrades: 0,
    losingTrades: 0,
    topAssets: []
  },
  isLoading: false,

  setSignals: (signals) => set({ signals }),
  setPerformance: (performance) => set({ performance }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  addSignal: (signal) => {
    const { signals } = get();
    set({ signals: [signal, ...signals] });
  },
  
  updateSignalStatus: (id, status) => {
    const { signals } = get();
    const updatedSignals = signals.map(signal => 
      signal.id === id ? { ...signal, status } : signal
    );
    set({ signals: updatedSignals });
  },
  
  exportSignals: () => {
    const { signals } = get();
    // Simulate export functionality
    console.log('Exporting signals:', signals);
    // In a real app, this would generate and download a CSV/PDF
  },
  
  copySignal: (id) => {
    const { signals } = get();
    const signal = signals.find(s => s.id === id);
    if (signal) {
      // Simulate copying to clipboard
      console.log('Copied signal:', signal);
      // In a real app, this would copy to clipboard
    }
  }
}));
