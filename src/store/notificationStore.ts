import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'signal' | 'trade' | 'news' | 'system' | 'security' | 'market';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  metadata?: {
    symbol?: string;
    price?: number;
    change?: number;
    strategy?: string;
    tradeId?: string;
  };
}

export interface NotificationGroup {
  type: Notification['type'];
  title: string;
  icon: string;
  count: number;
  notifications: Notification[];
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  
  // Actions
  setNotifications: (notifications: Notification[]) => void;
  setLoading: (loading: boolean) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  getGroupedNotifications: () => NotificationGroup[];
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: '1',
      title: 'New Trading Signal',
      message: 'BTC/USD: Strong buy signal detected with 87% confidence',
      type: 'signal',
      priority: 'high',
      isRead: false,
      timestamp: '2024-01-15T14:30:00Z',
      actionUrl: '/signals/1',
      metadata: {
        symbol: 'BTC/USD',
        price: 43250,
        change: 2.98,
        strategy: 'Breakout Strategy'
      }
    },
    {
      id: '2',
      title: 'Trade Executed',
      message: 'Your BTC buy order has been filled at $43,250',
      type: 'trade',
      priority: 'medium',
      isRead: false,
      timestamp: '2024-01-15T14:25:00Z',
      actionUrl: '/trades/1',
      metadata: {
        symbol: 'BTC/USD',
        price: 43250,
        tradeId: 'TRADE_001'
      }
    },
    {
      id: '3',
      title: 'Market Alert',
      message: 'Bitcoin has reached resistance level at $46,500',
      type: 'market',
      priority: 'medium',
      isRead: true,
      timestamp: '2024-01-15T14:20:00Z',
      actionUrl: '/markets/btc',
      metadata: {
        symbol: 'BTC/USD',
        price: 46500
      }
    },
    {
      id: '4',
      title: 'News Update',
      message: 'Major financial institution announces Bitcoin ETF approval',
      type: 'news',
      priority: 'high',
      isRead: false,
      timestamp: '2024-01-15T14:15:00Z',
      actionUrl: '/news/1'
    },
    {
      id: '5',
      title: 'Security Alert',
      message: 'New device logged into your account from New York',
      type: 'security',
      priority: 'urgent',
      isRead: false,
      timestamp: '2024-01-15T14:10:00Z',
      actionUrl: '/security/devices'
    },
    {
      id: '6',
      title: 'Portfolio Update',
      message: 'Your portfolio value increased by 2.4% today',
      type: 'system',
      priority: 'low',
      isRead: true,
      timestamp: '2024-01-15T14:00:00Z',
      actionUrl: '/portfolio'
    },
    {
      id: '7',
      title: 'Signal Expired',
      message: 'ETH/USD sell signal has expired without execution',
      type: 'signal',
      priority: 'low',
      isRead: true,
      timestamp: '2024-01-15T13:45:00Z',
      actionUrl: '/signals/2',
      metadata: {
        symbol: 'ETH/USD',
        price: 2650,
        strategy: 'Mean Reversion'
      }
    },
    {
      id: '8',
      title: 'Withdrawal Complete',
      message: 'Your $2,500 withdrawal has been processed successfully',
      type: 'trade',
      priority: 'medium',
      isRead: true,
      timestamp: '2024-01-15T13:30:00Z',
      actionUrl: '/wallet/transactions',
      metadata: {
        price: 2500
      }
    }
  ],
  unreadCount: 4,
  isLoading: false,

  setNotifications: (notifications) => set({ 
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  addNotification: (notification) => {
    const { notifications } = get();
    const newNotifications = [notification, ...notifications];
    set({ 
      notifications: newNotifications,
      unreadCount: newNotifications.filter(n => !n.isRead).length
    });
  },
  
  markAsRead: (id) => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    );
    set({ 
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter(n => !n.isRead).length
    });
  },
  
  markAllAsRead: () => {
    const { notifications } = get();
    const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }));
    set({ 
      notifications: updatedNotifications,
      unreadCount: 0
    });
  },
  
  deleteNotification: (id) => {
    const { notifications } = get();
    const updatedNotifications = notifications.filter(n => n.id !== id);
    set({ 
      notifications: updatedNotifications,
      unreadCount: updatedNotifications.filter(n => !n.isRead).length
    });
  },
  
  clearAll: () => set({ notifications: [], unreadCount: 0 }),
  
  getGroupedNotifications: () => {
    const { notifications } = get();
    const groups: NotificationGroup[] = [
      {
        type: 'signal',
        title: 'Trading Signals',
        icon: '📊',
        count: notifications.filter(n => n.type === 'signal').length,
        notifications: notifications.filter(n => n.type === 'signal')
      },
      {
        type: 'trade',
        title: 'Trade Updates',
        icon: '💱',
        count: notifications.filter(n => n.type === 'trade').length,
        notifications: notifications.filter(n => n.type === 'trade')
      },
      {
        type: 'market',
        title: 'Market Alerts',
        icon: '📈',
        count: notifications.filter(n => n.type === 'market').length,
        notifications: notifications.filter(n => n.type === 'market')
      },
      {
        type: 'news',
        title: 'News & Updates',
        icon: '📰',
        count: notifications.filter(n => n.type === 'news').length,
        notifications: notifications.filter(n => n.type === 'news')
      },
      {
        type: 'security',
        title: 'Security',
        icon: '🔒',
        count: notifications.filter(n => n.type === 'security').length,
        notifications: notifications.filter(n => n.type === 'security')
      },
      {
        type: 'system',
        title: 'System',
        icon: '⚙️',
        count: notifications.filter(n => n.type === 'system').length,
        notifications: notifications.filter(n => n.type === 'system')
      }
    ];
    
    return groups.filter(group => group.count > 0);
  }
}));
