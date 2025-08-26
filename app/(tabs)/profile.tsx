import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCurrentTheme } from '../../src/store/themeStore';

const ORANGE = '#f58220';
const BLUE = '#0a2472';
const BG = '#fff';
const GRAY = '#f5f6fa';
const DARK = '#222';
const LIGHT = '#888';
const BORDER = '#f0f0f0';

function getInitials(first = '', last = '') {
  if (!first && !last) return '';
  return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();
}

export default function ProfileScreen() {
  const theme = useCurrentTheme();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState({
    first_name: 'John',
    last_name: 'Trader',
    bio: 'Professional forex trader with 5+ years experience',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Mock user data for forex trading
  const user = {
    first_name: 'John',
    last_name: 'Trader',
    email: 'john.trader@forex.com',
    user_type: 'Premium Trader',
    account_type: 'Professional',
    join_date: 'March 2023',
    total_trades: 1247,
    success_rate: '78.5%',
    total_profit: '$45,678',
  };

  const openEditModal = () => {
    setEditData({
      first_name: user.first_name,
      last_name: user.last_name,
      bio: user.bio,
    });
    setEditModalVisible(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEditModalVisible(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (e) {
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: GRAY }}
        contentContainerStyle={{ padding: 10, paddingBottom: 40 }}
      >
        {/* Header with Avatar */}
        <View style={styles.headerContainer}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(user.first_name, user.last_name)}
              </Text>
            </View>
          </View>
          <Text style={styles.nameText}>
            {user.first_name} {user.last_name}
          </Text>
          <View style={styles.userTypePill}>
            <Ionicons name="star" size={16} color={ORANGE} style={{ marginRight: 4 }} />
            <Text style={styles.userTypeText}>{user.user_type}</Text>
          </View>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>

        {/* Trading Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trading Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{user.total_trades}</Text>
              <Text style={styles.statLabel}>Total Trades</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{user.success_rate}</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{user.total_profit}</Text>
              <Text style={styles.statLabel}>Total Profit</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7} onPress={openEditModal}>
              <Ionicons name="person" size={24} color={BLUE} />
              <Text style={styles.cardText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7}>
              <Ionicons name="notifications" size={24} color={BLUE} />
              <Text style={styles.cardText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7}>
              <Ionicons name="shield-checkmark" size={24} color={BLUE} />
              <Text style={styles.cardText}>Security</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardRow, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
              <Ionicons name="card" size={24} color={BLUE} />
              <Text style={styles.cardText}>Payment Methods</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Trading Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trading Preferences</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7}>
              <Ionicons name="trending-up" size={24} color={BLUE} />
              <Text style={styles.cardText}>Risk Management</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7}>
              <Ionicons name="time" size={24} color={BLUE} />
              <Text style={styles.cardText}>Trading Hours</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardRow, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
              <Ionicons name="settings" size={24} color={BLUE} />
              <Text style={styles.cardText}>Trading Settings</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support & Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7}>
              <Ionicons name="help-circle" size={24} color={BLUE} />
              <Text style={styles.cardText}>Help & Support</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardRow} activeOpacity={0.7}>
              <Ionicons name="document-text" size={24} color={BLUE} />
              <Text style={styles.cardText}>Terms & Conditions</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardRow, { borderBottomWidth: 0 }]} activeOpacity={0.7}>
              <Ionicons name="information-circle" size={24} color={BLUE} />
              <Text style={styles.cardText}>About App</Text>
              <Ionicons name="chevron-forward" size={24} color={LIGHT} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.section}>
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="log-out" size={22} color="#fff" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={modalStyles.input}
              placeholder="First Name"
              value={editData.first_name}
              onChangeText={text => setEditData({ ...editData, first_name: text })}
              autoCapitalize="words"
            />
            <TextInput
              style={modalStyles.input}
              placeholder="Last Name"
              value={editData.last_name}
              onChangeText={text => setEditData({ ...editData, last_name: text })}
              autoCapitalize="words"
            />
            <TextInput
              style={[modalStyles.input, { height: 80 }]}
              placeholder="Bio"
              value={editData.bio}
              onChangeText={text => setEditData({ ...editData, bio: text })}
              multiline
              numberOfLines={4}
            />
            <View style={modalStyles.buttonRow}>
              <TouchableOpacity
                style={[modalStyles.button, { backgroundColor: '#eee' }]}
                onPress={() => setEditModalVisible(false)}
                disabled={isSaving}
              >
                <Text style={[modalStyles.buttonText, { color: '#333' }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyles.button, { backgroundColor: ORANGE }]}
                onPress={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={modalStyles.buttonText}>Save</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingTop: 36,
    paddingBottom: 28,
    backgroundColor: BG,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: BORDER,
    borderTopWidth: 0,
  },
  avatarWrapper: {
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#fff',
    padding: 6,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarText: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  nameText: {
    fontSize: 26,
    fontWeight: '700',
    color: DARK,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  userTypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7f0',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 6,
    marginTop: 2,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  userTypeText: {
    color: ORANGE,
    fontWeight: '600',
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 0.2,
  },
  emailText: {
    color: LIGHT,
    fontSize: 15,
    marginTop: 2,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  section: {
    marginHorizontal: 0,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK,
    marginBottom: 10,
    letterSpacing: 0.1,
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: ORANGE,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: LIGHT,
    fontWeight: '500',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#fff',
  },
  cardText: {
    fontSize: 16,
    color: DARK,
    fontWeight: '500',
    marginLeft: 16,
    flex: 1,
    letterSpacing: 0.1,
  },
  logoutBtn: {
    backgroundColor: ORANGE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: BORDER,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 0.2,
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: BORDER,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: DARK,
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 14,
    backgroundColor: '#fafbfc',
    color: DARK,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginLeft: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
