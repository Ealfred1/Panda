import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useCurrentTheme } from '../../store/themeStore';

interface Session {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar: string;
  date: string;
  time: string;
  duration: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  enrolled: number;
  maxEnrolled: number;
  description: string;
  status: 'upcoming' | 'live' | 'ended';
}

export const UpcomingSessionsScreen = () => {
  const router = useRouter();
  const theme = useCurrentTheme();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const sessions: Session[] = [
    {
      id: '1',
      title: 'Advanced Forex Trading Strategies',
      instructor: 'John Trader',
      instructorAvatar: 'JT',
      date: '2024-12-15',
      time: '10:00 AM',
      duration: '2 hours',
      category: 'Technical Analysis',
      level: 'advanced',
      enrolled: 45,
      maxEnrolled: 100,
      description: 'Learn advanced trading strategies from a professional trader with 15+ years of experience.',
      status: 'upcoming',
    },
    {
      id: '2',
      title: 'Risk Management Masterclass',
      instructor: 'Sarah Forex',
      instructorAvatar: 'SF',
      date: '2024-12-15',
      time: '2:00 PM',
      duration: '1.5 hours',
      category: 'Risk Management',
      level: 'intermediate',
      enrolled: 78,
      maxEnrolled: 100,
      description: 'Master the art of risk management and protect your capital while maximizing profits.',
      status: 'upcoming',
    },
    {
      id: '3',
      title: 'Beginner Forex Trading Guide',
      instructor: 'Mike Expert',
      instructorAvatar: 'ME',
      date: '2024-12-16',
      time: '11:00 AM',
      duration: '2.5 hours',
      category: 'Basics',
      level: 'beginner',
      enrolled: 92,
      maxEnrolled: 100,
      description: 'Perfect for absolute beginners. Learn the fundamentals of forex trading from scratch.',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Live Trading Session - EUR/USD',
      instructor: 'Emma Pro',
      instructorAvatar: 'EP',
      date: '2024-12-16',
      time: '3:00 PM',
      duration: '1 hour',
      category: 'Live Trading',
      level: 'intermediate',
      enrolled: 65,
      maxEnrolled: 100,
      description: 'Watch a professional trader analyze and trade EUR/USD in real-time.',
      status: 'live',
    },
    {
      id: '5',
      title: 'Price Action Trading Techniques',
      instructor: 'David Chart',
      instructorAvatar: 'DC',
      date: '2024-12-17',
      time: '9:00 AM',
      duration: '2 hours',
      category: 'Technical Analysis',
      level: 'advanced',
      enrolled: 38,
      maxEnrolled: 50,
      description: 'Deep dive into price action trading with practical examples and live chart analysis.',
      status: 'upcoming',
    },
  ];

  const filteredSessions = sessions.filter(session => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'today') return session.date === '2024-12-15';
    if (selectedFilter === 'week') return true; // Simplified for demo
    if (selectedFilter === 'month') return true; // Simplified for demo
    return true;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#10b981';
      case 'intermediate': return '#f59e0b';
      case 'advanced': return '#ef4444';
      default: return theme.colors.primary[500];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return '#ef4444';
      case 'upcoming': return '#10b981';
      case 'ended': return '#9ca3af';
      default: return theme.colors.primary[500];
    }
  };

  const renderSessionCard = ({ item, index }: { item: Session; index: number }) => (
    <Animated.View
      entering={FadeInUp.delay(index * 100)}
      style={[styles.sessionCard, { backgroundColor: theme.colors.background.secondary }]}
    >
      <TouchableOpacity
        onPress={() => router.push(`/(app)/video-call?sessionId=${item.id}`)}
        activeOpacity={0.8}
      >
        {/* Header */}
        <View style={styles.sessionHeader}>
          <View style={styles.sessionInfo}>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
              <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
            </View>
            <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}>
              <Text style={styles.levelText}>{item.level.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Title and Instructor */}
        <View style={styles.sessionContent}>
          <Text style={[styles.sessionTitle, { color: theme.colors.text.primary }]}>
            {item.title}
          </Text>
          
          <View style={styles.instructorRow}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={styles.avatarText}>{item.instructorAvatar}</Text>
            </View>
            <Text style={[styles.instructorName, { color: theme.colors.text.secondary }]}>
              {item.instructor}
            </Text>
          </View>

          <Text style={[styles.description, { color: theme.colors.text.secondary }]}>
            {item.description}
          </Text>
        </View>

        {/* Date and Time */}
        <View style={styles.sessionMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={theme.colors.text.tertiary} />
            <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={16} color={theme.colors.text.tertiary} />
            <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
              {item.time}
            </Text>
          </View>
          
          <View style={styles.metaItem}>
            <Ionicons name="hourglass-outline" size={16} color={theme.colors.text.tertiary} />
            <Text style={[styles.metaText, { color: theme.colors.text.tertiary }]}>
              {item.duration}
            </Text>
          </View>
        </View>

        {/* Enrolled and Action */}
        <View style={styles.sessionFooter}>
          <View style={styles.enrollmentInfo}>
            <Ionicons name="people-outline" size={16} color={theme.colors.text.tertiary} />
            <Text style={[styles.enrollmentText, { color: theme.colors.text.tertiary }]}>
              {item.enrolled}/{item.maxEnrolled} enrolled
            </Text>
          </View>
          
          <View style={styles.sessionActions}>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: theme.colors.background.tertiary }]}
              onPress={() => router.push('/(app)/saved-sessions')}
            >
              <Ionicons name="bookmark-outline" size={18} color={theme.colors.primary[500]} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.joinButton, { backgroundColor: theme.colors.primary[500] }]}
              onPress={() => router.push(`/(app)/video-call?sessionId=${item.id}`)}
            >
              <Text style={styles.joinButtonText}>
                {item.status === 'live' ? 'Join Now' : 'Join Session'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
              Upcoming Sessions
            </Text>
            <Text style={[styles.headerSubtitle, { color: theme.colors.text.secondary }]}>
              Join live trading classes
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: theme.colors.primary[500] }]}
            onPress={() => router.push('/(app)/saved-sessions')}
          >
            <Ionicons name="bookmark" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {['all', 'today', 'week', 'month'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && { backgroundColor: theme.colors.primary[500] }
            ]}
            onPress={() => setSelectedFilter(filter as any)}
          >
            <Text
              style={[
                styles.filterText,
                { color: selectedFilter === filter ? 'white' : theme.colors.text.secondary }
              ]}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sessions List */}
      <FlatList
        data={filteredSessions}
        renderItem={renderSessionCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  filtersContainer: {
    maxHeight: 50,
    paddingVertical: 12,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sessionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sessionInfo: {
    flexDirection: 'row',
    gap: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
  },
  sessionContent: {
    marginBottom: 16,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 28,
  },
  instructorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  instructorName: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  sessionMeta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
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
  sessionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  enrollmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  enrollmentText: {
    fontSize: 12,
    fontWeight: '500',
  },
  joinButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

