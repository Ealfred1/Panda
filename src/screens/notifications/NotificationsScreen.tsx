import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
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
import { useNotificationStore } from '../../store/notificationStore';
import { useCurrentTheme } from '../../store/themeStore';

export const NotificationsScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    getGroupedNotifications 
  } = useNotificationStore();
  
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const groupedNotifications = getGroupedNotifications();
  const filteredNotifications = activeFilter === 'unread' 
    ? groupedNotifications.map(group => ({
        ...group,
        notifications: group.notifications.filter(n => !n.isRead)
      })).filter(group => group.count > 0)
    : groupedNotifications;

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
  };

  const handleDeleteNotification = (notificationId: string) => {
    Alert.alert(
      'Delete Notification',
      'Are you sure you want to delete this notification?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteNotification(notificationId) }
      ]
    );
  };

  const toggleGroupExpansion = (groupType: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupType)) {
      newExpanded.delete(groupType);
    } else {
      newExpanded.add(groupType);
    }
    setExpandedGroups(newExpanded);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return theme.colors.error[500];
      case 'high': return theme.colors.warning[500];
      case 'medium': return theme.colors.primary[500];
      case 'low': return theme.colors.text.secondary;
      default: return theme.colors.text.secondary;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'warning';
      case 'high': return 'alert-circle';
      case 'medium': return 'information-circle';
      case 'low': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'signal': return 'trending-up';
      case 'trade': return 'swap-horizontal';
      case 'news': return 'newspaper';
      case 'system': return 'settings';
      case 'security': return 'shield';
      case 'market': return 'analytics';
      default: return 'notifications';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'signal': return theme.colors.success[500];
      case 'trade': return theme.colors.primary[500];
      case 'news': return theme.colors.warning[500];
      case 'system': return theme.colors.text.secondary;
      case 'security': return theme.colors.error[500];
      case 'market': return theme.colors.primary[500];
      default: return theme.colors.text.secondary;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const renderNotificationItem = (notification: any, index: number) => (
    <Animated.View 
      key={notification.id}
      entering={FadeInUp.delay(200 + index * 50)}
      style={[
        styles.notificationItem,
        { 
          backgroundColor: notification.isRead 
            ? theme.colors.background.secondary 
            : theme.colors.background.tertiary,
          borderLeftColor: getTypeColor(notification.type)
        }
      ]}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.notificationIcon}>
          <Ionicons 
            name={getTypeIcon(notification.type) as any} 
            size={20} 
            color={getTypeColor(notification.type)} 
          />
        </View>
        
        <View style={styles.notificationContent}>
          <View style={styles.notificationTitleRow}>
            <Text style={[
              styles.notificationTitle,
              { 
                color: notification.isRead 
                  ? theme.colors.text.secondary 
                  : theme.colors.text.primary 
              }
            ]}>
              {notification.title}
            </Text>
            
            <View style={styles.notificationPriority}>
              <Ionicons 
                name={getPriorityIcon(notification.priority) as any} 
                size={16} 
                color={getPriorityColor(notification.priority)} 
              />
            </View>
          </View>
          
          <Text style={[
            styles.notificationMessage,
            { 
              color: notification.isRead 
                ? theme.colors.text.tertiary 
                : theme.colors.text.secondary 
            }
          ]}>
            {notification.message}
          </Text>
          
          {notification.metadata && (
            <View style={styles.notificationMetadata}>
              {notification.metadata.symbol && (
                <View style={[styles.metadataTag, { backgroundColor: theme.colors.primary[100] }]}>
                  <Text style={[styles.metadataText, { color: theme.colors.primary[600] }]}>
                    {notification.metadata.symbol}
                  </Text>
                </View>
              )}
              {notification.metadata.price && (
                <View style={[styles.metadataTag, { backgroundColor: theme.colors.success[100] }]}>
                  <Text style={[styles.metadataText, { color: theme.colors.success[600] }]}>
                    ${notification.metadata.price.toLocaleString()}
                  </Text>
                </View>
              )}
              {notification.metadata.strategy && (
                <View style={[styles.metadataTag, { backgroundColor: theme.colors.warning[100] }]}>
                  <Text style={[styles.metadataText, { color: theme.colors.warning[600] }]}>
                    {notification.metadata.strategy}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.notificationActions}>
          <Text style={[styles.notificationTime, { color: theme.colors.text.tertiary }]}>
            {formatTimeAgo(notification.timestamp)}
          </Text>
          
          <View style={styles.actionButtons}>
            {!notification.isRead && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleMarkAsRead(notification.id)}
              >
                <Ionicons name="checkmark" size={16} color={theme.colors.success[500]} />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteNotification(notification.id)}
            >
              <Ionicons name="trash" size={16} color={theme.colors.error[500]} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const renderNotificationGroup = (group: any, groupIndex: number) => {
    const isExpanded = expandedGroups.has(group.type);
    const hasUnread = group.notifications.some((n: any) => !n.isRead);
    
    return (
      <Animated.View 
        key={group.type}
        entering={FadeInUp.delay(300 + groupIndex * 100)}
        style={styles.notificationGroup}
      >
        <TouchableOpacity
          style={styles.groupHeader}
          onPress={() => toggleGroupExpansion(group.type)}
        >
          <View style={styles.groupInfo}>
            <Text style={styles.groupIcon}>{group.icon}</Text>
            <View>
              <Text style={[styles.groupTitle, { color: theme.colors.text.primary }]}>
                {group.title}
              </Text>
              <Text style={[styles.groupCount, { color: theme.colors.text.secondary }]}>
                {group.count} notification{group.count !== 1 ? 's' : ''}
                {hasUnread && (
                  <Text style={[styles.unreadIndicator, { color: theme.colors.primary[500] }]}>
                    {' '}• {group.notifications.filter((n: any) => !n.isRead).length} unread
                  </Text>
                )}
              </Text>
            </View>
          </View>
          
          <View style={styles.groupExpand}>
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={theme.colors.text.secondary} 
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <Animated.View entering={SlideInRight} style={styles.groupContent}>
            {group.notifications.map((notification: any, index: number) => 
              renderNotificationItem(notification, index)
            )}
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  if (notifications.length === 0) {
    return (
      <EmptyState
        icon="🔔"
        title="No Notifications"
        message="You&apos;re all caught up! No notifications to display."
        actionText="Refresh"
        onAction={() => {}}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Notifications
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Stay updated with your trading activities
        </Text>
        
        {unreadCount > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: theme.colors.primary[500] }]}>
            <Text style={styles.unreadBadgeText}>{unreadCount} unread</Text>
          </View>
        )}
      </Animated.View>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'all' && { backgroundColor: theme.colors.primary[500] }
          ]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[
            styles.filterButtonText,
            { color: activeFilter === 'all' ? 'white' : theme.colors.text.secondary }
          ]}>
            All ({notifications.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'unread' && { backgroundColor: theme.colors.primary[500] }
          ]}
          onPress={() => setActiveFilter('unread')}
        >
          <Text style={[
            styles.filterButtonText,
            { color: activeFilter === 'unread' ? 'white' : theme.colors.text.secondary }
          ]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.markAllButton, { borderColor: theme.colors.primary[500] }]}
          onPress={markAllAsRead}
        >
          <Text style={[styles.markAllButtonText, { color: theme.colors.primary[500] }]}>
            Mark All Read
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredNotifications.length === 0 ? (
          <EmptyState
            icon="✅"
            title="All Caught Up!"
            message="No unread notifications to display."
            actionText="View All"
            onAction={() => setActiveFilter('all')}
          />
        ) : (
          filteredNotifications.map((group, index) => 
            renderNotificationGroup(group, index)
          )
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 16,
  },
  unreadBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unreadBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
    alignItems: 'center',
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  markAllButton: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  markAllButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  notificationGroup: {
    marginBottom: 16,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
  },
  groupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  groupIcon: {
    fontSize: 24,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  groupCount: {
    fontSize: 14,
  },
  unreadIndicator: {
    fontWeight: '600',
  },
  groupExpand: {
    padding: 8,
  },
  groupContent: {
    paddingHorizontal: 20,
  },
  notificationItem: {
    marginBottom: 12,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  notificationPriority: {
    padding: 4,
  },
  notificationMessage: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  notificationMetadata: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metadataTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metadataText: {
    fontSize: 12,
    fontWeight: '500',
  },
  notificationActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  notificationTime: {
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
