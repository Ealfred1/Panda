import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useCurrentTheme } from '../../store/themeStore';

interface SavedSession {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  duration: string;
  category: string;
  thumbnail: string;
  savedDate: string;
  watched: boolean;
}

export const SavedSessionsScreen = () => {
  const router = useRouter();
  const theme = useCurrentTheme();
  const [savedSessions] = useState<SavedSession[]>([
    {
      id: '1',
      title: 'Advanced Forex Trading Strategies',
      instructor: 'John Trader',
      instructorAvatar: 'JT',
      date: '2024-12-10',
      duration: '2:15:30',
      category: 'Technical Analysis',
      thumbnail: 'https://img.youtube.com/vi/eynxyoKgpng/maxresdefault.jpg',
      savedDate: '2024-12-12',
      watched: false,
    },
    {
      id: '2',
      title: 'Risk Management Masterclass',
      instructor: 'Sarah Forex',
      instructorAvatar: 'SF',
      date: '2024-12-08',
      duration: '1:45:20',
      category: 'Risk Management',
      thumbnail: 'https://img.youtube.com/vi/uFrmG5yn3Ps/maxresdefault.jpg',
      savedDate: '2024-12-11',
      watched: true,
    },
    {
      id: '3',
      title: 'Price Action Trading Techniques',
      instructor: 'David Chart',
      instructorAvatar: 'DC',
      date: '2024-12-05',
      duration: '2:30:15',
      category: 'Technical Analysis',
      thumbnail: 'https://img.youtube.com/vi/9vJRopau0g0/maxresdefault.jpg',
      savedDate: '2024-12-06',
      watched: false,
    },
    {
      id: '4',
      title: 'Beginner Forex Trading Guide',
      instructor: 'Mike Expert',
      instructorAvatar: 'ME',
      date: '2024-12-03',
      duration: '3:20:45',
      category: 'Basics',
      thumbnail: 'https://img.youtube.com/vi/7m4sL8qQ1YI/maxresdefault.jpg',
      savedDate: '2024-12-04',
      watched: true,
    },
  ]);

  const renderSavedSession = ({ item, index }: { item: SavedSession; index: number }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[styles.sessionCard, { backgroundColor: theme.colors.background.secondary }]}
    >
      {/* Thumbnail and Content Row */}
      <View style={styles.cardContent}>
        {/* Thumbnail */}
        <TouchableOpacity
          onPress={() => router.push(`/(app)/learning?videoId=${item.id}`)}
          activeOpacity={0.8}
          style={styles.thumbnailContainer}
        >
          <View style={[styles.thumbnailPlaceholder, { backgroundColor: theme.colors.primary[100] }]}>
            <Ionicons name="play-circle" size={40} color={theme.colors.primary[500]} />
          </View>
          <View style={styles.overlay}>
            <View style={[styles.durationBadge, { backgroundColor: 'rgba(0,0,0,0.7)' }]}>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Content */}
        <View style={styles.sessionInfo}>
          <View style={styles.sessionHeader}>
            <Text style={[styles.sessionTitle, { color: theme.colors.text.primary }]} numberOfLines={2}>
              {item.title}
            </Text>
            {item.watched && (
              <View style={[styles.watchedBadge, { backgroundColor: theme.colors.success[500] }]}>
                <Ionicons name="checkmark-circle" size={12} color="white" />
                <Text style={styles.watchedText}>Watched</Text>
              </View>
            )}
          </View>

          <View style={styles.instructorRow}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={styles.avatarText}>{item.instructorAvatar}</Text>
            </View>
            <Text style={[styles.instructorName, { color: theme.colors.text.secondary }]}>
              {item.instructor}
            </Text>
          </View>

          <View style={styles.sessionMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={12} color={theme.colors.text.tertiary} />
              <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
                Saved {new Date(item.savedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Actions - Properly Aligned */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.playButton, { backgroundColor: theme.colors.primary[500] }]}
          onPress={() => router.push(`/(app)/learning?videoId=${item.id}`)}
        >
          <Ionicons name="play" size={18} color="white" />
          <Text style={styles.playButtonText}>Watch</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.removeButton}>
          <Ionicons name="trash-outline" size={18} color={theme.colors.error[500]} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background.secondary }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
              Saved Sessions
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
              {savedSessions.length} saved sessions
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: theme.colors.primary[500] }]}
            onPress={() => router.push('/(app)/upcoming-sessions')}
          >
            <Ionicons name="videocam" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sessions List */}
      {savedSessions.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bookmark-outline" size={64} color={theme.colors.text.tertiary} />
          <Text style={[styles.emptyTitle, { color: theme.colors.text.primary }]}>
            No Saved Sessions
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.text.secondary }]}>
            Save sessions to watch them later
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedSessions}
          renderItem={renderSavedSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sessionCard: {
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    overflow: 'hidden',
    padding: 16,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  thumbnailContainer: {
    width: 140,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    position: 'relative',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 4,
  },
  durationBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  durationText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  sessionInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 8,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    lineHeight: 22,
  },
  watchedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  watchedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '700',
  },
  instructorName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  sessionMeta: {
    marginTop: 0,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 0,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  playButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

