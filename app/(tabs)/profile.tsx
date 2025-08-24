import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    SlideInLeft,
} from 'react-native-reanimated';
import { PremiumButton } from '../../src/components/PremiumButton';
import { PremiumCard } from '../../src/components/PremiumCard';
import { useCurrentTheme } from '../../src/store/themeStore';

const { width } = Dimensions.get('window');

// Dummy data for demonstration
const userProfile = {
  name: 'Alex Johnson',
  email: 'alex.johnson@panda.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  bio: 'Passionate investor focused on long-term growth and sustainable returns.',
  joinDate: 'March 2023',
  verificationStatus: 'verified',
  totalTrades: 156,
  successRate: '78%',
  portfolioValue: '$12,450.80',
};

const profileStats = [
  {
    id: '1',
    label: 'Total Trades',
    value: '156',
    icon: 'trending-up',
    color: '#10B981',
  },
  {
    id: '2',
    label: 'Success Rate',
    value: '78%',
    icon: 'checkmark-circle',
    color: '#3B82F6',
  },
  {
    id: '3',
    label: 'Portfolio Value',
    value: '$12,450',
    icon: 'wallet',
    color: '#8B5CF6',
  },
  {
    id: '4',
    label: 'Member Since',
    value: 'Mar 2023',
    icon: 'calendar',
    color: '#F59E0B',
  },
];

const profileMenuItems = [
  {
    id: '1',
    title: 'Account Settings',
    subtitle: 'Manage your personal information',
    icon: 'person-outline',
    color: '#3B82F6',
    onPress: () => {},
  },
  {
    id: '2',
    title: 'Security & Privacy',
    subtitle: 'Password, 2FA, and privacy settings',
    icon: 'shield-outline',
    color: '#10B981',
    onPress: () => {},
  },
  {
    id: '3',
    title: 'Payment Methods',
    subtitle: 'Manage your payment options',
    icon: 'card-outline',
    color: '#8B5CF6',
    onPress: () => {},
  },
  {
    id: '4',
    title: 'Notifications',
    subtitle: 'Customize your notification preferences',
    icon: 'notifications-outline',
    color: '#F59E0B',
    onPress: () => {},
  },
  {
    id: '5',
    title: 'Support & Help',
    subtitle: 'Get help and contact support',
    icon: 'help-circle-outline',
    color: '#EF4444',
    onPress: () => {},
  },
  {
    id: '6',
    title: 'About Panda',
    subtitle: 'App version and legal information',
    icon: 'information-circle-outline',
    color: '#6B7280',
    onPress: () => {},
  },
];

const recentActivity = [
  {
    id: '1',
    type: 'trade',
    title: 'Bought 0.1 BTC',
    subtitle: 'Purchase completed successfully',
    time: '2 hours ago',
    icon: 'trending-up',
    color: '#10B981',
  },
  {
    id: '2',
    type: 'verification',
    title: 'Account Verified',
    subtitle: 'Identity verification completed',
    time: '1 day ago',
    icon: 'checkmark-circle',
    color: '#3B82F6',
  },
  {
    id: '3',
    type: 'deposit',
    title: 'Deposit Added',
    subtitle: '$1,000 added to your account',
    time: '3 days ago',
    icon: 'add-circle',
    color: '#8B5CF6',
  },
];

export default function ProfileScreen() {
  const theme = useCurrentTheme();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    // Implement logout logic
  };

  const renderHeader = () => (
    <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.profileInfo}>
          <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text style={[styles.userName, { color: theme.colors.text.primary }]}>
              {userProfile.name}
            </Text>
            <Text style={[styles.userEmail, { color: theme.colors.text.secondary }]}>
              {userProfile.email}
            </Text>
            <View style={styles.verificationBadge}>
              <Ionicons name="checkmark-circle" size={16} color={theme.colors.success[500]} />
              <Text style={[styles.verificationText, { color: theme.colors.success[500] }]}>
                Verified
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="create-outline" size={20} color={theme.colors.primary[500]} />
        </TouchableOpacity>
      </View>
      
      <Text style={[styles.userBio, { color: theme.colors.text.secondary }]}>
        {userProfile.bio}
      </Text>
    </Animated.View>
  );

  const renderProfileStats = () => (
    <Animated.View entering={FadeInUp.delay(400).springify()}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Profile Statistics
      </Text>
      
      <View style={styles.statsGrid}>
        {profileStats.map((stat) => (
          <PremiumCard
            key={stat.id}
            size="sm"
            style={styles.statCard}
            onPress={() => {}}
          >
            <View style={styles.statContent}>
              <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                <Ionicons name={stat.icon as any} size={20} color="white" />
              </View>
              <Text style={[styles.statValue, { color: theme.colors.text.primary }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.text.secondary }]}>
                {stat.label}
              </Text>
            </View>
          </PremiumCard>
        ))}
      </View>
    </Animated.View>
  );

  const renderProfileMenu = () => (
    <Animated.View entering={FadeInUp.delay(500).springify()}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Account Settings
      </Text>
      
      {profileMenuItems.map((item) => (
        <PremiumCard
          key={item.id}
          size="sm"
          style={styles.menuCard}
          onPress={item.onPress}
        >
          <View style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon as any} size={20} color="white" />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.colors.text.primary }]}>
                {item.title}
              </Text>
              <Text style={[styles.menuSubtitle, { color: theme.colors.text.secondary }]}>
                {item.subtitle}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.tertiary} />
          </View>
        </PremiumCard>
      ))}
    </Animated.View>
  );

  const renderRecentActivity = () => (
    <Animated.View entering={FadeInUp.delay(600).springify()}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Recent Activity
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewAllText, { color: theme.colors.primary[500] }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      
      {recentActivity.map((activity) => (
        <PremiumCard
          key={activity.id}
          size="sm"
          style={styles.activityCard}
          onPress={() => {}}
        >
          <View style={styles.activityItem}>
            <View style={[styles.activityIcon, { backgroundColor: activity.color }]}>
              <Ionicons name={activity.icon as any} size={16} color="white" />
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: theme.colors.text.primary }]}>
                {activity.title}
              </Text>
              <Text style={[styles.activitySubtitle, { color: theme.colors.text.secondary }]}>
                {activity.subtitle}
              </Text>
            </View>
            <Text style={[styles.activityTime, { color: theme.colors.text.tertiary }]}>
              {activity.time}
            </Text>
          </View>
        </PremiumCard>
      ))}
    </Animated.View>
  );

  const renderActionButtons = () => (
    <Animated.View entering={FadeInUp.delay(700).springify()} style={styles.actionButtons}>
      <PremiumButton
        title="Logout"
        onPress={handleLogout}
        variant="outline"
        size="lg"
        style={styles.logoutButton}
        leftIcon={<Ionicons name="log-out-outline" size={20} color={theme.colors.error[500]} />}
      />
    </Animated.View>
  );

  const renderDecorativeElements = () => (
    <>
      <Animated.View
        entering={SlideInLeft.delay(800).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.primary[500] }]}
      />
      <Animated.View
        entering={SlideInLeft.delay(1000).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.secondary[500] }]}
      />
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderProfileStats()}
        {renderProfileMenu()}
        {renderRecentActivity()}
        {renderActionButtons()}
        {renderDecorativeElements()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Space for tab bar
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verificationText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  editButton: {
    padding: 8,
  },
  userBio: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    width: (width - 64) / 2,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
  },
  menuCard: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityCard: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.6,
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
  },
  logoutButton: {
    borderColor: '#EF4444',
  },
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
    left: -60,
    top: 500,
  },
});
