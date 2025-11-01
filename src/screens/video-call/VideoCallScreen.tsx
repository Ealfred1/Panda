import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useCurrentTheme } from '../../store/themeStore';

export const VideoCallScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useCurrentTheme();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showJoinNotification, setShowJoinNotification] = useState(false);

  // Mock session data
  const sessionData = {
    title: 'Advanced Forex Trading Strategies',
    instructor: 'John Trader',
    participants: 45,
    duration: '01:23:45',
  };

  // Mock participants
  const participants = [
    { id: '1', name: 'User 1', initials: 'U1', color: theme.colors.success[500] },
    { id: '2', name: 'User 2', initials: 'U2', color: theme.colors.warning[500] },
    { id: '3', name: 'User 3', initials: 'U3', color: theme.colors.error[500] },
    { id: '4', name: 'User 4', initials: 'U4', color: theme.colors.primary[500] },
  ];

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  // Simulate new participant joining (for demo)
  const simulateJoin = () => {
    setShowJoinNotification(true);
    setTimeout(() => setShowJoinNotification(false), 3000);
  };

  return (
    <View style={[styles.container, { backgroundColor: '#000' }]}>
      {/* Main Video View */}
      <TouchableOpacity
        style={styles.videoContainer}
        activeOpacity={1}
        onPress={toggleControls}
      >
        {/* Instructor Video */}
        <View style={styles.instructorVideo}>
          {isVideoOff ? (
            <View style={[styles.videoPlaceholder, { backgroundColor: theme.colors.primary[500] }]}>
              <Text style={styles.placeholderInitials}>JT</Text>
            </View>
          ) : (
            <View style={[styles.videoPlaceholder, { backgroundColor: '#1a1a1a' }]}>
              <Ionicons name="videocam" size={48} color="#666" />
            </View>
          )}
        </View>

        {/* Minimal Session Info */}
        {showControls && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.sessionInfo}
          >
            <Text style={styles.sessionTitle} numberOfLines={1}>{sessionData.title}</Text>
            <Text style={styles.sessionMeta}>{sessionData.participants} participants • {sessionData.duration}</Text>
          </Animated.View>
        )}

        {/* Participants Grid */}
        {showControls && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.participantsContainer}
          >
            <View style={styles.participantsGrid}>
              {participants.slice(0, 4).map((participant) => (
                <View key={participant.id} style={styles.participantThumbnail}>
                  <View style={[styles.participantAvatar, { backgroundColor: participant.color }]}>
                    <Text style={styles.participantInitials}>{participant.initials}</Text>
                  </View>
                </View>
              ))}
              {sessionData.participants > 4 && (
                <View style={styles.participantThumbnail}>
                  <View style={[styles.participantAvatar, styles.moreParticipants]}>
                    <Text style={styles.participantInitials}>+{sessionData.participants - 4}</Text>
                  </View>
                </View>
              )}
            </View>
          </Animated.View>
        )}

        {/* Join Notification */}
        {showJoinNotification && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.joinNotification}
          >
            <View style={styles.joinNotificationContent}>
              <Ionicons name="person-add" size={16} color="white" />
              <Text style={styles.joinNotificationText}>New participant joined</Text>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>

      {/* Minimal Controls */}
      {showControls && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.controlsContainer}
        >
          {/* Top Control - Close Button */}
          <View style={styles.topControl}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-down" size={28} color="white" />
            </TouchableOpacity>
          </View>

          {/* Bottom Controls - Essential Only */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsVideoOff(!isVideoOff)}
            >
              <Ionicons
                name={isVideoOff ? 'videocam-off' : 'videocam'}
                size={22}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => setIsMuted(!isMuted)}
            >
              <Ionicons
                name={isMuted ? 'mic-off' : 'mic'}
                size={22}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.leaveButton, { backgroundColor: theme.colors.error[500] }]}
              onPress={() => router.back()}
            >
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  instructorVideo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderInitials: {
    color: 'white',
    fontSize: 72,
    fontWeight: '700',
  },
  sessionInfo: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
  },
  sessionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sessionMeta: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '500',
  },
  participantsContainer: {
    position: 'absolute',
    bottom: 120,
    right: 20,
  },
  participantsGrid: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  participantThumbnail: {
    width: 56,
    height: 56,
  },
  participantAvatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  participantInitials: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
  moreParticipants: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.4)',
  },
  joinNotification: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  joinNotificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  joinNotificationText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  topControl: {
    paddingTop: 56,
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },
  controlButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  leaveButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

