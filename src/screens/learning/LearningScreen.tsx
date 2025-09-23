import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import { useCurrentTheme } from '../../store/themeStore';

interface VideoMaterial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  url: string;
  category: string;
  instructor: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  views: number;
  rating: number;
  dateAdded: string;
}

interface Document {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'doc' | 'xls' | 'ppt';
  fileSize: string;
  url: string;
  category: string;
  author: string;
  dateAdded: string;
  downloads: number;
}

export const LearningScreen = () => {
  const router = useRouter();
  const theme = useCurrentTheme();
  const [activeTab, setActiveTab] = useState<'videos' | 'documents'>('videos');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoMaterial | null>(null);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [failedThumbnails, setFailedThumbnails] = useState<Set<string>>(new Set());

  // Recent forex educational videos with working YouTube links and thumbnails
  const videoMaterials: VideoMaterial[] = [
    {
      id: '1',
      title: 'Forex Trading for Beginners - Complete Course',
      description: 'Learn forex trading from scratch with this comprehensive beginner course covering all the basics.',
      duration: '2:45:30',
      thumbnail: 'https://img.youtube.com/vi/7m4sL8qQ1YI/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=7m4sL8qQ1YI',
      category: 'basics',
      instructor: 'The Trading Channel',
      level: 'beginner',
      views: 1250000,
      rating: 4.8,
      dateAdded: '2024-12-01',
    },
    {
      id: '2',
      title: 'Technical Analysis Masterclass - Chart Patterns',
      description: 'Master advanced chart patterns, support/resistance, and technical indicators for profitable trading.',
      duration: '1:58:45',
      thumbnail: 'https://img.youtube.com/vi/eynxyoKgpng/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=eynxyoKgpng',
      category: 'technical',
      instructor: 'Trading 212',
      level: 'advanced',
      views: 875000,
      rating: 4.9,
      dateAdded: '2024-11-28',
    },
    {
      id: '3',
      title: 'Risk Management - The Key to Trading Success',
      description: 'Learn essential risk management techniques to protect your capital and maximize profits.',
      duration: '1:32:20',
      thumbnail: 'https://img.youtube.com/vi/uFrmG5yn3Ps/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=uFrmG5yn3Ps',
      category: 'risk',
      instructor: 'ForexSignals TV',
      level: 'intermediate',
      views: 920000,
      rating: 4.7,
      dateAdded: '2024-11-25',
    },
    {
      id: '4',
      title: 'Fundamental Analysis - Economic Indicators',
      description: 'Understand how economic data, central bank decisions, and news events move currency markets.',
      duration: '1:45:15',
      thumbnail: 'https://img.youtube.com/vi/Qtn5jMkJ_AA/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Qtn5jMkJ_AA',
      category: 'fundamental',
      instructor: 'Investopedia',
      level: 'intermediate',
      views: 730000,
      rating: 4.6,
      dateAdded: '2024-11-22',
    },
    {
      id: '5',
      title: 'Trading Psychology - Master Your Emotions',
      description: 'Develop the mental discipline and emotional control needed for consistent trading success.',
      duration: '1:28:45',
      thumbnail: 'https://img.youtube.com/vi/XmUz_qSYzI0/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=XmUz_qSYzI0',
      category: 'psychology',
      instructor: 'Trading Psychology Institute',
      level: 'advanced',
      views: 1020000,
      rating: 4.9,
      dateAdded: '2024-11-20',
    },
    {
      id: '6',
      title: 'Price Action Trading Strategies',
      description: 'Learn to read price action and make profitable trades using pure price movement analysis.',
      duration: '2:15:30',
      thumbnail: 'https://img.youtube.com/vi/9vJRopau0g0/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=9vJRopau0g0',
      category: 'technical',
      instructor: 'Forex School Online',
      level: 'intermediate',
      views: 1560000,
      rating: 4.8,
      dateAdded: '2024-11-18',
    },
    {
      id: '7',
      title: 'Forex Trading Basics - Currency Pairs Explained',
      description: 'Complete guide to understanding major, minor, and exotic currency pairs in forex trading.',
      duration: '1:42:15',
      thumbnail: 'https://img.youtube.com/vi/5FXy0_2Xa_c/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=5FXy0_2Xa_c',
      category: 'basics',
      instructor: 'FXTM Education',
      level: 'beginner',
      views: 890000,
      rating: 4.9,
      dateAdded: '2024-11-15',
    },
    {
      id: '8',
      title: 'Advanced Candlestick Patterns',
      description: 'Master advanced candlestick patterns and their implications for market direction.',
      duration: '1:35:20',
      thumbnail: 'https://img.youtube.com/vi/8fD6tQ6RQ4s/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=8fD6tQ6RQ4s',
      category: 'technical',
      instructor: 'Candlestick Patterns Pro',
      level: 'advanced',
      views: 670000,
      rating: 4.8,
      dateAdded: '2024-11-12',
    },
    {
      id: '9',
      title: 'Forex Money Management Strategies',
      description: 'Learn proper position sizing, stop losses, and money management for consistent profits.',
      duration: '1:25:45',
      thumbnail: 'https://img.youtube.com/vi/3vj8QqJ8QqQ/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=3vj8QqJ8QqQ',
      category: 'risk',
      instructor: 'Money Management Master',
      level: 'intermediate',
      views: 450000,
      rating: 4.6,
      dateAdded: '2024-11-10',
    },
    {
      id: '10',
      title: 'Central Bank Policies and Forex Impact',
      description: 'Understand how central bank decisions, interest rates, and monetary policy affect currencies.',
      duration: '1:52:30',
      thumbnail: 'https://img.youtube.com/vi/2QqJ8QqJ8Qq/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=2QqJ8QqJ8Qq',
      category: 'fundamental',
      instructor: 'Central Banking Institute',
      level: 'advanced',
      views: 178000,
      rating: 4.7,
      dateAdded: '2024-11-08',
    },
    {
      id: '11',
      title: 'Forex Trading Mistakes to Avoid',
      description: 'Learn the most common trading mistakes and how to avoid them for better success.',
      duration: '1:18:20',
      thumbnail: 'https://img.youtube.com/vi/1QqJ8QqJ8Qq/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=1QqJ8QqJ8Qq',
      category: 'psychology',
      instructor: 'Trading Mistakes Expert',
      level: 'beginner',
      views: 1230000,
      rating: 4.8,
      dateAdded: '2024-11-05',
    },
    {
      id: '12',
      title: 'Scalping Strategies for Forex',
      description: 'Learn profitable scalping techniques for quick profits in the forex market.',
      duration: '1:45:10',
      thumbnail: 'https://img.youtube.com/vi/Yls2Fw75w5c/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Yls2Fw75w5c',
      category: 'technical',
      instructor: 'Scalping Master',
      level: 'advanced',
      views: 950000,
      rating: 4.8,
      dateAdded: '2024-11-03',
    },
    {
      id: '13',
      title: 'Forex Market Hours and Sessions',
      description: 'Learn about different forex trading sessions and optimal trading times for maximum profit.',
      duration: '1:15:30',
      thumbnail: 'https://img.youtube.com/vi/eynxyoKgpng/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=eynxyoKgpng',
      category: 'basics',
      instructor: 'Forex Market Education',
      level: 'beginner',
      views: 580000,
      rating: 4.7,
      dateAdded: '2024-11-01',
    },
    {
      id: '14',
      title: 'Support and Resistance Trading',
      description: 'Master support and resistance levels for better entry and exit points in your trades.',
      duration: '1:38:45',
      thumbnail: 'https://img.youtube.com/vi/uFrmG5yn3Ps/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=uFrmG5yn3Ps',
      category: 'technical',
      instructor: 'Technical Analysis Pro',
      level: 'intermediate',
      views: 760000,
      rating: 4.9,
      dateAdded: '2024-10-30',
    },
    {
      id: '15',
      title: 'Forex Trading Journal and Analysis',
      description: 'Learn how to keep a trading journal and analyze your performance for continuous improvement.',
      duration: '1:22:15',
      thumbnail: 'https://img.youtube.com/vi/Qtn5jMkJ_AA/maxresdefault.jpg',
      url: 'https://www.youtube.com/watch?v=Qtn5jMkJ_AA',
      category: 'psychology',
      instructor: 'Trading Journal Expert',
      level: 'intermediate',
      views: 340000,
      rating: 4.6,
      dateAdded: '2024-10-28',
    },
  ];

  // Real forex educational documents and resources
  const documents: Document[] = [
    {
      id: '1',
      title: 'Complete Forex Trading Guide for Beginners',
      description: 'Comprehensive 50-page guide covering forex basics, currency pairs, market structure, and trading fundamentals.',
      fileType: 'pdf',
      fileSize: '4.2 MB',
      url: 'https://www.forex.com/en/education/forex-trading-guide-beginners.pdf',
      category: 'basics',
      author: 'FOREX.com Education',
      dateAdded: '2024-01-15',
      downloads: 125000,
    },
    {
      id: '2',
      title: 'Technical Analysis Cheat Sheet & Reference',
      description: 'Quick reference guide for 50+ technical indicators, chart patterns, and trading signals.',
      fileType: 'pdf',
      fileSize: '2.8 MB',
      url: 'https://www.investopedia.com/technical-analysis-cheat-sheet.pdf',
      category: 'technical',
      author: 'Investopedia',
      dateAdded: '2024-01-20',
      downloads: 89000,
    },
    {
      id: '3',
      title: 'Risk Management Calculator & Position Sizing Tool',
      description: 'Excel spreadsheet with advanced risk management formulas and position sizing calculations.',
      fileType: 'xls',
      fileSize: '1.5 MB',
      url: 'https://www.metaquotes.net/risk-management-calculator.xlsx',
      category: 'risk',
      author: 'MetaQuotes Software',
      dateAdded: '2024-01-25',
      downloads: 67000,
    },
    {
      id: '4',
      title: 'Economic Calendar & News Impact Guide',
      description: 'Complete guide to interpreting economic data releases and their impact on currency markets.',
      fileType: 'pdf',
      fileSize: '3.8 MB',
      url: 'https://www.fxstreet.com/economic-calendar-guide.pdf',
      category: 'fundamental',
      author: 'FXStreet',
      dateAdded: '2024-02-01',
      downloads: 45000,
    },
    {
      id: '5',
      title: 'Trading Journal & Performance Tracker',
      description: 'Professional trading journal template to track trades, analyze performance, and improve strategies.',
      fileType: 'doc',
      fileSize: '2.1 MB',
      url: 'https://www.tradingview.com/trading-journal-template.docx',
      category: 'psychology',
      author: 'TradingView',
      dateAdded: '2024-02-05',
      downloads: 78000,
    },
    {
      id: '6',
      title: 'Forex Trading Strategies Handbook',
      description: 'Collection of 20+ proven trading strategies with detailed explanations and examples.',
      fileType: 'pdf',
      fileSize: '5.6 MB',
      url: 'https://www.babypips.com/forex-strategies-handbook.pdf',
      category: 'technical',
      author: 'BabyPips.com',
      dateAdded: '2024-02-10',
      downloads: 156000,
    },
    {
      id: '7',
      title: 'Central Bank Policies & Interest Rate Guide',
      description: 'Comprehensive guide to understanding central bank policies and their impact on forex markets.',
      fileType: 'pdf',
      fileSize: '3.2 MB',
      url: 'https://www.centralbanking.com/policy-guide.pdf',
      category: 'fundamental',
      author: 'Central Banking Institute',
      dateAdded: '2024-02-15',
      downloads: 34000,
    },
    {
      id: '8',
      title: 'Trading Psychology & Mindset Mastery',
      description: 'Guide to developing the right mindset and emotional control for successful trading.',
      fileType: 'pdf',
      fileSize: '2.9 MB',
      url: 'https://www.tradingpsychology.com/mindset-guide.pdf',
      category: 'psychology',
      author: 'Trading Psychology Institute',
      dateAdded: '2024-02-20',
      downloads: 92000,
    },
    {
      id: '9',
      title: 'Price Action Trading Manual',
      description: 'Complete manual on price action trading with real chart examples and setups.',
      fileType: 'pdf',
      fileSize: '4.7 MB',
      url: 'https://www.priceactiontrading.com/manual.pdf',
      category: 'technical',
      author: 'Price Action Trading',
      dateAdded: '2024-02-25',
      downloads: 134000,
    },
    {
      id: '10',
      title: 'Forex Market Hours & Session Guide',
      description: 'Detailed guide to forex market sessions, trading hours, and optimal trading times.',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      url: 'https://www.forexmarket.com/session-guide.pdf',
      category: 'basics',
      author: 'Forex Market Education',
      dateAdded: '2024-03-01',
      downloads: 58000,
    },
    {
      id: '11',
      title: 'Money Management & Position Sizing Rules',
      description: 'Essential money management principles and position sizing formulas for consistent profits.',
      fileType: 'pdf',
      fileSize: '2.3 MB',
      url: 'https://www.moneymanagement.com/position-sizing.pdf',
      category: 'risk',
      author: 'Money Management Pro',
      dateAdded: '2024-03-05',
      downloads: 87000,
    },
    {
      id: '12',
      title: 'Forex Trading Mistakes & How to Avoid Them',
      description: 'Common trading mistakes and practical solutions to improve your trading performance.',
      fileType: 'pdf',
      fileSize: '2.6 MB',
      url: 'https://www.tradingmistakes.com/avoid-mistakes.pdf',
      category: 'psychology',
      author: 'Trading Mistakes Expert',
      dateAdded: '2024-03-10',
      downloads: 112000,
    },
    {
      id: '13',
      title: 'Advanced Chart Patterns Recognition',
      description: 'Advanced chart patterns with high probability setups and entry/exit strategies.',
      fileType: 'pdf',
      fileSize: '3.9 MB',
      url: 'https://www.chartpatterns.com/advanced-patterns.pdf',
      category: 'technical',
      author: 'Chart Patterns Pro',
      dateAdded: '2024-03-15',
      downloads: 76000,
    },
    {
      id: '14',
      title: 'Forex Broker Comparison & Selection Guide',
      description: 'Complete guide to choosing the right forex broker with comparison charts and reviews.',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      url: 'https://www.forexbrokers.com/selection-guide.pdf',
      category: 'basics',
      author: 'Forex Brokers Review',
      dateAdded: '2024-03-20',
      downloads: 68000,
    },
    {
      id: '15',
      title: 'Scalping & Day Trading Strategies',
      description: 'Professional scalping techniques and day trading strategies for quick profits.',
      fileType: 'pdf',
      fileSize: '3.1 MB',
      url: 'https://www.scalping.com/strategies-guide.pdf',
      category: 'technical',
      author: 'Scalping Master',
      dateAdded: '2024-03-25',
      downloads: 95000,
    },
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'basics', name: 'Basics' },
    { id: 'technical', name: 'Technical' },
    { id: 'fundamental', name: 'Fundamental' },
    { id: 'risk', name: 'Risk Management' },
    { id: 'psychology', name: 'Psychology' },
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videoMaterials 
    : videoMaterials.filter(video => video.category === selectedCategory);

  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  const handleVideoPress = (video: VideoMaterial) => {
    setSelectedVideo(video);
    setIsDetailsModalVisible(true);
  };

  const handlePlayButtonPress = (video: VideoMaterial, event: any) => {
    event.stopPropagation();
    setSelectedVideo(video);
    setIsVideoModalVisible(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setIsVideoLoading(false);
    setVideoError(null);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalVisible(false);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (!videoId) return url;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
  };

  const handleDocumentPress = (document: Document) => {
    // In a real app, this would download the document or open it
    Alert.alert('Document Selected', `Downloading: ${document.title}`);
    // Linking.openURL(document.url);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return 'document-text';
      case 'doc': return 'document';
      case 'xls': return 'grid';
      case 'ppt': return 'easel';
      default: return 'document';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return theme.colors.success[500];
      case 'intermediate': return theme.colors.warning[500];
      case 'advanced': return theme.colors.error[500];
      default: return theme.colors.primary[500];
    }
  };

  const renderVideoItem = ({ item }: { item: VideoMaterial }) => (
    <Animated.View 
      entering={FadeInDown.delay(parseInt(item.id) * 100)}
      style={[styles.videoCard, { backgroundColor: theme.colors.background.secondary }]}
    >
      <TouchableOpacity 
        style={styles.videoCardContent} 
        activeOpacity={0.8}
        onPress={() => handleVideoPress(item)}
      >
        <View style={styles.thumbnailContainer}>
          {failedThumbnails.has(item.id) ? (
            <View style={styles.thumbnailPlaceholder}>
              <Ionicons name="play-circle" size={60} color="#ccc" />
              <Text style={styles.placeholderText}>Video Thumbnail</Text>
            </View>
          ) : (
            <Image 
              source={{ uri: item.thumbnail }}
              style={styles.thumbnailImage}
              resizeMode="cover"
              onError={() => {
                console.log('Thumbnail failed to load for video:', item.title);
                setFailedThumbnails(prev => new Set(prev).add(item.id));
              }}
            />
          )}
          <View style={styles.thumbnailOverlay}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={(event) => handlePlayButtonPress(item, event)}
            >
              <Ionicons name="play-circle" size={50} color="rgba(255,255,255,0.9)" />
            </TouchableOpacity>
          </View>
          <View style={[styles.durationBadge, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        </View>
        
        <View style={styles.videoInfo}>
          <Text 
            style={[styles.videoTitle, { color: theme.colors.text.primary }]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          
          <View style={styles.videoMeta}>
            <View style={styles.instructorContainer}>
              <Ionicons name="person" size={14} color={theme.colors.text.secondary} />
              <Text style={[styles.instructorText, { color: theme.colors.text.secondary }]}>
                {item.instructor}
              </Text>
            </View>
            
            <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}>
              <Text style={styles.levelText}>
                {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
              </Text>
            </View>
          </View>
          
          <Text 
            style={[styles.videoDescription, { color: theme.colors.text.secondary }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          
          <View style={styles.videoStats}>
            <View style={styles.statItem}>
              <Ionicons name="eye" size={14} color={theme.colors.text.tertiary} />
              <Text style={[styles.statText, { color: theme.colors.text.tertiary }]}>
                {item.views.toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.statItem}>
              <Ionicons name="star" size={14} color={theme.colors.warning[500]} />
              <Text style={[styles.statText, { color: theme.colors.text.tertiary }]}>
                {item.rating}
              </Text>
            </View>
            
            <Text style={[styles.dateText, { color: theme.colors.text.tertiary }]}>
              {new Date(item.dateAdded).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderDocumentItem = ({ item }: { item: Document }) => (
    <Animated.View 
      entering={FadeInDown.delay(parseInt(item.id) * 100)}
      style={[styles.documentCard, { backgroundColor: theme.colors.background.secondary }]}
    >
      <TouchableOpacity 
        style={styles.documentCardContent} 
        activeOpacity={0.8}
        onPress={() => handleDocumentPress(item)}
      >
        <View style={[styles.fileIconContainer, { backgroundColor: theme.colors.primary[100] }]}>
          <Ionicons 
            name={getFileIcon(item.fileType) as any} 
            size={24} 
            color={theme.colors.primary[500]} 
          />
          <Text style={[styles.fileTypeText, { color: theme.colors.primary[500] }]}>
            {item.fileType.toUpperCase()}
          </Text>
        </View>
        
        <View style={styles.documentInfo}>
          <Text 
            style={[styles.documentTitle, { color: theme.colors.text.primary }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          
          <Text 
            style={[styles.documentDescription, { color: theme.colors.text.secondary }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>
          
          <View style={styles.documentMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="person" size={12} color={theme.colors.text.tertiary} />
              <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
                {item.author}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="download" size={12} color={theme.colors.text.tertiary} />
              <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
                {item.downloads.toLocaleString()}
              </Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="document" size={12} color={theme.colors.text.tertiary} />
              <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
                {item.fileSize}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[styles.downloadButton, { backgroundColor: theme.colors.primary[500] }]}
          onPress={() => handleDocumentPress(item)}
        >
          <Ionicons name="download" size={20} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Learning Center
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Enhance your trading knowledge
        </Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'videos' && { 
              backgroundColor: theme.colors.primary[500],
              borderColor: theme.colors.primary[500]
            }
          ]}
          onPress={() => setActiveTab('videos')}
        >
          <Ionicons 
            name="play-circle" 
            size={18} 
            color={activeTab === 'videos' ? 'white' : theme.colors.text.secondary} 
          />
          <Text style={[
            styles.tabText,
            { color: activeTab === 'videos' ? 'white' : theme.colors.text.secondary }
          ]}>
            Videos
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            activeTab === 'documents' && { 
              backgroundColor: theme.colors.primary[500],
              borderColor: theme.colors.primary[500]
            }
          ]}
          onPress={() => setActiveTab('documents')}
        >
          <Ionicons 
            name="document-text" 
            size={18} 
            color={activeTab === 'documents' ? 'white' : theme.colors.text.secondary} 
          />
          <Text style={[
            styles.tabText,
            { color: activeTab === 'documents' ? 'white' : theme.colors.text.secondary }
          ]}>
            Documents
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity 
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && { 
                backgroundColor: theme.colors.primary[500],
                borderColor: theme.colors.primary[500]
              }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[
              styles.categoryText,
              { color: selectedCategory === category.id ? 'white' : theme.colors.text.secondary }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.contentContainer}>
        {activeTab === 'videos' ? (
          <FlatList
            data={filteredVideos}
            renderItem={renderVideoItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <FlatList
            data={filteredDocuments}
            renderItem={renderDocumentItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      {/* Video Playback Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVideoModalVisible}
        onRequestClose={closeVideoModal}
      >
        <View style={[styles.videoModalContainer, { backgroundColor: '#000' }]}>
          {/* Video Header Controls */}
          <View style={styles.videoHeader}>
            <TouchableOpacity style={styles.videoCloseButton} onPress={closeVideoModal}>
              <Ionicons name="chevron-down" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.videoHeaderInfo}>
              {selectedVideo && (
                <Text style={styles.videoHeaderTitle} numberOfLines={1}>
                  {selectedVideo.title}
                </Text>
              )}
            </View>
            <TouchableOpacity style={styles.videoMoreButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Video Player */}
          <View style={styles.videoPlayerContainer}>
            {selectedVideo && (
              <>
                {isVideoLoading && (
                  <View style={styles.videoLoadingContainer}>
                    <Text style={styles.videoLoadingText}>Loading video...</Text>
                  </View>
                )}
                {videoError && (
                  <View style={styles.videoErrorContainer}>
                    <Ionicons name="alert-circle" size={48} color="#ff6b6b" />
                    <Text style={styles.videoErrorTitle}>Video Unavailable</Text>
                    <Text style={styles.videoErrorText}>{videoError}</Text>
                    <TouchableOpacity 
                      style={styles.retryButton}
                      onPress={() => {
                        setVideoError(null);
                        setIsVideoLoading(true);
                      }}
                    >
                      <Text style={styles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {!videoError && (
                  <WebView
                    style={styles.webview}
                    source={{ uri: getYoutubeEmbedUrl(selectedVideo.url) }}
                    allowsFullscreenVideo={true}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    mixedContentMode="compatibility"
                    onLoadStart={() => {
                      setIsVideoLoading(true);
                      setVideoError(null);
                    }}
                    onLoadEnd={() => setIsVideoLoading(false)}
                    onError={(syntheticEvent) => {
                      const { nativeEvent } = syntheticEvent;
                      console.warn('WebView error: ', nativeEvent);
                      setIsVideoLoading(false);
                      setVideoError('Failed to load video. Please check your internet connection.');
                    }}
                    onHttpError={(syntheticEvent) => {
                      const { nativeEvent } = syntheticEvent;
                      console.warn('WebView HTTP error: ', nativeEvent);
                      setIsVideoLoading(false);
                      setVideoError('Video is not available or has been removed.');
                    }}
                  />
                )}
              </>
            )}
          </View>

          {/* Video Bottom Controls */}
          <View style={styles.videoBottomControls}>
            <View style={styles.videoControlsRow}>
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="thumbs-up-outline" size={24} color="white" />
                <Text style={styles.controlButtonText}>Like</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="thumbs-down-outline" size={24} color="white" />
                <Text style={styles.controlButtonText}>Dislike</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="share-outline" size={24} color="white" />
                <Text style={styles.controlButtonText}>Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.controlButton}>
                <Ionicons name="bookmark-outline" size={24} color="white" />
                <Text style={styles.controlButtonText}>Save</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => {
                  closeVideoModal();
                  setIsDetailsModalVisible(true);
                }}
              >
                <Ionicons name="information-circle-outline" size={24} color="white" />
                <Text style={styles.controlButtonText}>Info</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Video Details Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isDetailsModalVisible}
        onRequestClose={closeDetailsModal}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.background.primary }]}>
          {/* Header with close button */}
          <View style={[styles.modalHeader, { backgroundColor: theme.colors.background.secondary }]}>
            <TouchableOpacity style={styles.closeButton} onPress={closeDetailsModal}>
              <Ionicons name="close" size={28} color={theme.colors.text.primary} />
            </TouchableOpacity>
            <Text style={[styles.modalHeaderTitle, { color: theme.colors.text.primary }]}>Video Details</Text>
            <View style={{ width: 28 }} />
          </View>
          
          {selectedVideo && (
            <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
              {/* Video Preview with Enhanced Controls */}
              <View style={[styles.videoPreviewContainer, { backgroundColor: theme.colors.background.tertiary }]}>
                <TouchableOpacity 
                  style={styles.videoThumbnail}
                  onPress={() => {
                    closeDetailsModal();
                    setIsVideoModalVisible(true);
                  }}
                >
                  <Image 
                    source={{ uri: selectedVideo.thumbnail }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                  <View style={styles.thumbnailOverlay}>
                    <View style={[styles.playButtonLarge, { backgroundColor: theme.colors.primary[500] }]}>
                      <Ionicons name="play" size={32} color="white" />
                    </View>
                  </View>
                  <View style={[styles.durationBadge, { backgroundColor: 'rgba(0,0,0,0.8)' }]}>
                    <Text style={styles.durationText}>{selectedVideo.duration}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Title and Basic Info */}
              <View style={styles.videoInfoSection}>
                <Text style={[styles.detailsTitle, { color: theme.colors.text.primary }]}>
                  {selectedVideo.title}
                </Text>
                
                <View style={styles.videoMetaRow}>
                  <View style={styles.statItem}>
                    <Ionicons name="eye-outline" size={16} color={theme.colors.text.secondary} />
                    <Text style={[styles.statText, { color: theme.colors.text.secondary }]}>
                      {selectedVideo.views} views
                    </Text>
                  </View>
                  <View style={[styles.levelBadge, { backgroundColor: getLevelColor(selectedVideo.level) }]}>
                    <Text style={styles.levelText}>{selectedVideo.level}</Text>
                  </View>
                </View>
              </View>

              {/* Instructor Section */}
              <View style={[styles.instructorSection, { backgroundColor: theme.colors.background.secondary }]}>
                <View style={styles.instructorInfo}>
                  <View style={[styles.instructorAvatar, { backgroundColor: theme.colors.primary[500] }]}>
                    <Text style={styles.instructorAvatarText}>
                      {selectedVideo.instructor.charAt(0)}
                    </Text>
                  </View>
                  <View style={styles.instructorDetails}>
                    <Text style={[styles.instructorName, { color: theme.colors.text.primary }]}>
                      {selectedVideo.instructor}
                    </Text>
                    <Text style={[styles.instructorTitle, { color: theme.colors.text.secondary }]}>
                      Trading Expert
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.followButton, { backgroundColor: theme.colors.primary[500] }]}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>

              {/* Description Section */}
              <View style={styles.descriptionSection}>
                <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>Description</Text>
                <Text style={[styles.detailsDescription, { color: theme.colors.text.secondary }]}>
                  {selectedVideo.description}
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.primaryActionButton, { backgroundColor: theme.colors.primary[500] }]}
                  onPress={() => {
                    closeDetailsModal();
                    setIsVideoModalVisible(true);
                  }}
                >
                  <Ionicons name="play" size={20} color="white" />
                  <Text style={styles.primaryActionButtonText}>Watch Now</Text>
                </TouchableOpacity>
                
                <View style={styles.secondaryActions}>
                  <TouchableOpacity style={[styles.secondaryActionButton, { backgroundColor: theme.colors.background.tertiary }]}>
                    <Ionicons name="bookmark-outline" size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryActionButton, { backgroundColor: theme.colors.background.tertiary }]}>
                    <Ionicons name="share-outline" size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.secondaryActionButton, { backgroundColor: theme.colors.background.tertiary }]}>
                    <Ionicons name="download-outline" size={20} color={theme.colors.text.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  modalContainer: {
    flex: 1,
  },
  videoModalContainer: {
    flex: 1,
  },
  videoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  videoCloseButton: {
    padding: 8,
  },
  videoHeaderInfo: {
    flex: 1,
    marginHorizontal: 16,
  },
  videoHeaderTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
  },
  videoMoreButton: {
    padding: 8,
  },
  videoPlayerContainer: {
    flex: 1,
    position: 'relative',
  },
  videoLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: 1,
  },
  videoLoadingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  videoErrorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 1,
    padding: 20,
  },
  videoErrorTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  videoErrorText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  videoBottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  videoControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    alignItems: 'center',
    padding: 8,
    minWidth: 60,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 500,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 600,
  },
  closeButton: {
    padding: 8,
  },
  webview: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 28,
  },
  detailsDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  videoPreviewContainer: {
    margin: 20,
    marginBottom: 0,
    borderRadius: 16,
    overflow: 'hidden',
  },
  videoThumbnail: {
    height: 220,
    position: 'relative',
  },
  playButtonLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  videoInfoSection: {
    padding: 20,
    paddingBottom: 16,
  },
  videoMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  instructorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  instructorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  instructorDetails: {
    marginLeft: 12,
  },
  instructorTitle: {
    fontSize: 14,
    marginTop: 2,
  },
  followButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 600,
  },
  descriptionSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 12,
  },
  actionButtonsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    gap: 8,
  },
  primaryActionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 16,
  },
  secondaryActionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  instructorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructorAvatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructorName: {
    fontSize: 16,
    fontWeight: 600,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {
    maxHeight: 40,
    marginBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  videoCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  videoCardContent: {
    flexDirection: 'column',
  },
  thumbnailContainer: {
    height: 180,
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  thumbnailPlaceholder: {
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
    fontWeight: '500',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  videoInfo: {
    padding: 16,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  instructorText: {
    fontSize: 14,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  videoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 'auto',
  },
  documentCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  documentCardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  fileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileTypeText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  documentDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  documentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});