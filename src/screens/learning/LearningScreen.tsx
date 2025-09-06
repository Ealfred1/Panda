import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Animated, { FadeInDown } from 'react-native-reanimated';
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

  // Mock data for videos with YouTube links
  const videoMaterials: VideoMaterial[] = [
    {
      id: '1',
      title: 'Introduction to Forex Trading',
      description: 'Learn the basics of forex trading and how to get started with your first trades.',
      duration: '45:30',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      url: 'https://www.youtube.com/watch?v=Yls2Fw75w5c',
      category: 'basics',
      instructor: 'John Smith',
      level: 'beginner',
      views: 12500,
      rating: 4.8,
      dateAdded: '2023-12-15',
    },
    {
      id: '2',
      title: 'Advanced Technical Analysis',
      description: 'Master the art of technical analysis with advanced chart patterns and indicators.',
      duration: '1:12:45',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      url: 'https://www.youtube.com/watch?v=eynxyoKgpng',
      category: 'technical',
      instructor: 'Sarah Johnson',
      level: 'advanced',
      views: 8750,
      rating: 4.9,
      dateAdded: '2024-01-10',
    },
    {
      id: '3',
      title: 'Risk Management Strategies',
      description: 'Learn how to protect your capital with effective risk management techniques.',
      duration: '38:15',
      thumbnail: 'https://example.com/thumbnail3.jpg',
      url: 'https://www.youtube.com/watch?v=uFrmG5yn3Ps',
      category: 'risk',
      instructor: 'Michael Brown',
      level: 'intermediate',
      views: 9200,
      rating: 4.7,
      dateAdded: '2024-02-05',
    },
    {
      id: '4',
      title: 'Fundamental Analysis for Forex',
      description: 'Understand how economic factors and news events impact currency markets.',
      duration: '52:20',
      thumbnail: 'https://example.com/thumbnail4.jpg',
      url: 'https://www.youtube.com/watch?v=Qtn5jMkJ_AA',
      category: 'fundamental',
      instructor: 'Emily Davis',
      level: 'intermediate',
      views: 7300,
      rating: 4.6,
      dateAdded: '2024-02-20',
    },
    {
      id: '5',
      title: 'Trading Psychology Mastery',
      description: 'Master your emotions and develop the mindset of successful traders.',
      duration: '1:05:10',
      thumbnail: 'https://example.com/thumbnail5.jpg',
      url: 'https://www.youtube.com/watch?v=XmUz_qSYzI0',
      category: 'psychology',
      instructor: 'Robert Wilson',
      level: 'advanced',
      views: 10200,
      rating: 4.9,
      dateAdded: '2024-03-01',
    },
  ];

  // Mock data for documents
  const documents: Document[] = [
    {
      id: '1',
      title: 'Forex Trading Guide for Beginners',
      description: 'A comprehensive guide to help beginners understand forex trading fundamentals.',
      fileType: 'pdf',
      fileSize: '2.4 MB',
      url: 'https://example.com/doc1',
      category: 'basics',
      author: 'Trading Academy',
      dateAdded: '2023-11-20',
      downloads: 3450,
    },
    {
      id: '2',
      title: 'Technical Analysis Cheat Sheet',
      description: 'Quick reference guide for common technical indicators and chart patterns.',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      url: 'https://example.com/doc2',
      category: 'technical',
      author: 'Chart Masters',
      dateAdded: '2023-12-05',
      downloads: 5200,
    },
    {
      id: '3',
      title: 'Risk Management Calculator',
      description: 'Excel spreadsheet to calculate position sizes and risk per trade.',
      fileType: 'xls',
      fileSize: '750 KB',
      url: 'https://example.com/doc3',
      category: 'risk',
      author: 'Risk Smart Trading',
      dateAdded: '2024-01-15',
      downloads: 2800,
    },
    {
      id: '4',
      title: 'Economic Calendar Interpretation Guide',
      description: 'Learn how to interpret economic data releases and their impact on forex markets.',
      fileType: 'pdf',
      fileSize: '3.2 MB',
      url: 'https://example.com/doc4',
      category: 'fundamental',
      author: 'Macro Economics Team',
      dateAdded: '2024-02-10',
      downloads: 1950,
    },
    {
      id: '5',
      title: 'Trading Journal Template',
      description: 'Document template to track and analyze your trading performance.',
      fileType: 'doc',
      fileSize: '1.2 MB',
      url: 'https://example.com/doc5',
      category: 'psychology',
      author: 'Trading Psychology Institute',
      dateAdded: '2024-03-05',
      downloads: 4100,
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
  };

  const closeDetailsModal = () => {
    setIsDetailsModalVisible(false);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
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
          <View style={styles.thumbnailPlaceholder}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={(event) => handlePlayButtonPress(item, event)}
            >
              <Ionicons name="play-circle" size={40} color={theme.colors.primary[500]} />
            </TouchableOpacity>
          </View>
          <View style={[styles.durationBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
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
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeVideoModal}>
            <Ionicons name="close" size={30} color={theme.colors.text.primary} />
          </TouchableOpacity>
          {selectedVideo && (
            <WebView
              style={styles.webview}
              source={{ uri: getYoutubeEmbedUrl(selectedVideo.url) }}
              allowsFullscreenVideo
            />
          )}
        </View>
      </Modal>

      {/* Video Details Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isDetailsModalVisible}
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeDetailsModal}>
            <Ionicons name="close" size={30} color={theme.colors.text.primary} />
          </TouchableOpacity>
          {selectedVideo && (
            <ScrollView style={styles.detailsContainer}>
              <Text style={[styles.detailsTitle, { color: theme.colors.text.primary }]}>
                {selectedVideo.title}
              </Text>
              
              <TouchableOpacity 
                style={styles.videoPreviewContainer}
                onPress={() => {
                  closeDetailsModal();
                  setIsVideoModalVisible(true);
                }}
              >
                <View style={styles.thumbnailPlaceholder}>
                  <Ionicons name="play-circle" size={60} color={theme.colors.primary[500]} />
                </View>
              </TouchableOpacity>
              
              <View style={styles.instructorContainer}>
                <Image
                  source={{ uri: selectedVideo.instructor.avatar }}
                  style={styles.instructorAvatar}
                />
                <Text style={[styles.instructorName, { color: theme.colors.text.primary }]}>
                  {selectedVideo.instructor.name}
                </Text>
              </View>
              
              <View style={[styles.levelBadge, { backgroundColor: getLevelColor(selectedVideo.level) }]}>
                <Text style={styles.levelText}>{selectedVideo.level}</Text>
              </View>
              
              <Text style={[styles.detailsDescription, { color: theme.colors.text.secondary }]}>
                {selectedVideo.description}
              </Text>
              
              <View style={styles.videoStats}>
                <View style={styles.statItem}>
                  <Ionicons name="time-outline" size={16} color={theme.colors.text.secondary} />
                  <Text style={[styles.statText, { color: theme.colors.text.secondary }]}>
                    {selectedVideo.duration}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="eye-outline" size={16} color={theme.colors.text.secondary} />
                  <Text style={[styles.statText, { color: theme.colors.text.secondary }]}>
                    {selectedVideo.views} views
                  </Text>
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
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  webview: {
    flex: 1,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 16,
  },
  videoPreviewContainer: {
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: '500',
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
    paddingBottom: 20,
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
  thumbnailPlaceholder: {
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
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