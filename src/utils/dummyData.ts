export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  likes: number;
  comments: number;
  createdAt: string;
  image?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

// Financial/Trading Interfaces
export interface Asset {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
  isFavorite: boolean;
  image?: string;
  category: 'crypto' | 'stock' | 'forex' | 'commodity';
}

export interface PortfolioHolding {
  asset: Asset;
  quantity: number;
  averagePrice: number;
  currentValue: number;
  totalCost: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  image?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  category: string;
}

export interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export interface AssetDetail {
  asset: Asset;
  priceHistory: Array<{
    timestamp: number;
    price: number;
  }>;
  orderBook: {
    bids: OrderBookEntry[];
    asks: OrderBookEntry[];
  };
  description: string;
  website?: string;
  whitepaper?: string;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    discord?: string;
  };
}

export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Product designer and coffee enthusiast ☕️',
    followers: 1240,
    following: 567,
    posts: 89,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Software engineer building amazing apps 🚀',
    followers: 890,
    following: 234,
    posts: 45,
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Photographer capturing life\'s beautiful moments 📸',
    followers: 2100,
    following: 123,
    posts: 156,
  },
];

export const dummyPosts: Post[] = [
  {
    id: '1',
    title: 'Getting Started with React Native',
    content: 'React Native is an amazing framework for building cross-platform mobile applications. In this post, I\'ll share some tips and tricks I\'ve learned along the way...',
    author: dummyUsers[0],
    likes: 234,
    comments: 45,
    createdAt: '2024-01-15T10:30:00Z',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    tags: ['react-native', 'mobile', 'development'],
  },
  {
    id: '2',
    title: 'Design System Best Practices',
    content: 'A well-designed design system is crucial for maintaining consistency across your product. Here are some best practices I\'ve discovered...',
    author: dummyUsers[1],
    likes: 189,
    comments: 32,
    createdAt: '2024-01-14T15:45:00Z',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    tags: ['design', 'ui', 'ux'],
  },
  {
    id: '3',
    title: 'Photography Tips for Beginners',
    content: 'Photography is all about capturing the perfect moment. Here are some essential tips that helped me improve my photography skills...',
    author: dummyUsers[2],
    likes: 456,
    comments: 78,
    createdAt: '2024-01-13T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    tags: ['photography', 'tips', 'beginner'],
  },
  {
    id: '4',
    title: 'The Future of Mobile Development',
    content: 'Mobile development is evolving rapidly. Let\'s explore what the future holds for mobile app development and the technologies that will shape it...',
    author: dummyUsers[0],
    likes: 312,
    comments: 67,
    createdAt: '2024-01-12T14:20:00Z',
    tags: ['mobile', 'future', 'technology'],
  },
  {
    id: '5',
    title: 'Building Accessible Apps',
    content: 'Accessibility should be a priority in every app we build. Here\'s how to make your React Native apps more accessible to all users...',
    author: dummyUsers[1],
    likes: 178,
    comments: 29,
    createdAt: '2024-01-11T11:30:00Z',
    tags: ['accessibility', 'react-native', 'inclusive-design'],
  },
];

export const dummyCategories: Category[] = [
  {
    id: '1',
    name: 'Technology',
    icon: 'laptop',
    color: '#3b82f6',
    count: 156,
  },
  {
    id: '2',
    name: 'Design',
    icon: 'palette',
    color: '#8b5cf6',
    count: 89,
  },
  {
    id: '3',
    name: 'Photography',
    icon: 'camera',
    color: '#10b981',
    count: 234,
  },
  {
    id: '4',
    name: 'Travel',
    icon: 'map-pin',
    color: '#f59e0b',
    count: 67,
  },
  {
    id: '5',
    name: 'Food',
    icon: 'utensils',
    color: '#ef4444',
    count: 123,
  },
  {
    id: '6',
    name: 'Fitness',
    icon: 'dumbbell',
    color: '#06b6d4',
    count: 78,
  },
];

export const dummyNotifications = [
  {
    id: '1',
    title: 'New follower',
    message: 'Sarah Chen started following you',
    type: 'follow',
    isRead: false,
    createdAt: '2024-01-15T08:30:00Z',
    user: dummyUsers[1],
  },
  {
    id: '2',
    title: 'Like on your post',
    message: 'Mike Rodriguez liked your post "Getting Started with React Native"',
    type: 'like',
    isRead: true,
    createdAt: '2024-01-15T07:15:00Z',
    user: dummyUsers[2],
  },
  {
    id: '3',
    title: 'Comment on your post',
    message: 'Alex Johnson commented on your post "Design System Best Practices"',
    type: 'comment',
    isRead: false,
    createdAt: '2024-01-14T16:45:00Z',
    user: dummyUsers[0],
  },
];

export const dummyTrendingTopics = [
  { id: '1', name: '#ReactNative', posts: 1234 },
  { id: '2', name: '#MobileDev', posts: 987 },
  { id: '3', name: '#DesignSystem', posts: 756 },
  { id: '4', name: '#Photography', posts: 543 },
  { id: '5', name: '#TechNews', posts: 432 },
];

export const dummyAssets: Asset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 43250.50,
    change24h: 1250.75,
    changePercent24h: 2.98,
    marketCap: 850000000000,
    volume24h: 28000000000,
    isFavorite: true,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    category: 'crypto',
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    currentPrice: 2650.25,
    change24h: -45.80,
    changePercent24h: -1.70,
    marketCap: 320000000000,
    volume24h: 15000000000,
    isFavorite: true,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    category: 'crypto',
  },
  {
    id: '3',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 185.75,
    change24h: 2.45,
    changePercent24h: 1.34,
    marketCap: 2900000000000,
    volume24h: 4500000000,
    isFavorite: false,
    category: 'stock',
  },
  {
    id: '4',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 245.80,
    change24h: -8.20,
    changePercent24h: -3.23,
    marketCap: 780000000000,
    volume24h: 3200000000,
    isFavorite: true,
    category: 'stock',
  },
  {
    id: '5',
    symbol: 'SOL',
    name: 'Solana',
    currentPrice: 98.45,
    change24h: 12.30,
    changePercent24h: 14.28,
    marketCap: 45000000000,
    volume24h: 2800000000,
    isFavorite: false,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    category: 'crypto',
  },
  {
    id: '6',
    symbol: 'ADA',
    name: 'Cardano',
    currentPrice: 0.485,
    change24h: 0.025,
    changePercent24h: 5.43,
    marketCap: 17000000000,
    volume24h: 850000000,
    isFavorite: false,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    category: 'crypto',
  },
];

export const dummyPortfolioHoldings: PortfolioHolding[] = [
  {
    asset: dummyAssets[0],
    quantity: 0.5,
    averagePrice: 42000,
    currentValue: 21625.25,
    totalCost: 21000,
    profitLoss: 625.25,
    profitLossPercent: 2.98,
  },
  {
    asset: dummyAssets[1],
    quantity: 2.5,
    averagePrice: 2700,
    currentValue: 6625.63,
    totalCost: 6750,
    profitLoss: -124.37,
    profitLossPercent: -1.84,
  },
  {
    asset: dummyAssets[3],
    quantity: 10,
    averagePrice: 250,
    currentValue: 2458,
    totalCost: 2500,
    profitLoss: -42,
    profitLossPercent: -1.68,
  },
];

export const dummyMarketNews: MarketNews[] = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $43,000 as Institutional Adoption Grows',
    summary: 'Major financial institutions continue to show interest in cryptocurrency as Bitcoin reaches new yearly highs.',
    source: 'CryptoNews',
    publishedAt: '2024-01-15T10:30:00Z',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop',
    sentiment: 'positive',
    category: 'crypto',
  },
  {
    id: '2',
    title: 'Ethereum Layer 2 Solutions See Record Growth',
    summary: 'Transaction volume on Ethereum scaling solutions reaches all-time high, reducing gas fees significantly.',
    source: 'DeFi Pulse',
    publishedAt: '2024-01-15T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    sentiment: 'positive',
    category: 'crypto',
  },
  {
    id: '3',
    title: 'Tech Stocks Face Pressure from Rising Interest Rates',
    summary: 'Federal Reserve signals potential rate hikes, causing volatility in technology sector stocks.',
    source: 'MarketWatch',
    publishedAt: '2024-01-15T08:45:00Z',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    sentiment: 'negative',
    category: 'stock',
  },
  {
    id: '4',
    title: 'Solana Network Achieves 100,000 TPS Milestone',
    summary: 'Blockchain platform demonstrates impressive scalability improvements in recent network upgrade.',
    source: 'Blockchain News',
    publishedAt: '2024-01-15T07:30:00Z',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52174e2b?w=400&h=300&fit=crop',
    sentiment: 'positive',
    category: 'crypto',
  },
];

export const dummyAssetDetails: AssetDetail[] = [
  {
    asset: dummyAssets[0],
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      price: 42000 + Math.sin(i * 0.3) * 2000 + Math.random() * 1000,
    })),
    orderBook: {
      bids: Array.from({ length: 10 }, (_, i) => ({
        price: 43250 - i * 5,
        size: Math.random() * 2 + 0.1,
        total: 0,
      })),
      asks: Array.from({ length: 10 }, (_, i) => ({
        price: 43250 + i * 5,
        size: Math.random() * 2 + 0.1,
        total: 0,
      })),
    },
    description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without intermediaries.',
    website: 'https://bitcoin.org',
    whitepaper: 'https://bitcoin.org/bitcoin.pdf',
    socialLinks: {
      twitter: 'https://twitter.com/bitcoin',
      telegram: 'https://t.me/bitcoin',
    },
  },
  {
    asset: dummyAssets[1],
    priceHistory: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      price: 2700 + Math.sin(i * 0.4) * 300 + Math.random() * 100,
    })),
    orderBook: {
      bids: Array.from({ length: 10 }, (_, i) => ({
        price: 2650 - i * 2,
        size: Math.random() * 5 + 0.5,
        total: 0,
      })),
      asks: Array.from({ length: 10 }, (_, i) => ({
        price: 2650 + i * 2,
        size: Math.random() * 5 + 0.5,
        total: 0,
      })),
    },
    description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.',
    website: 'https://ethereum.org',
    whitepaper: 'https://ethereum.org/en/whitepaper/',
    socialLinks: {
      twitter: 'https://twitter.com/ethereum',
      discord: 'https://discord.gg/ethereum',
    },
  },
];
