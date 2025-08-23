import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
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
import { useSettingsStore } from '../../store/settingsStore';
import { useCurrentTheme } from '../../store/themeStore';

export const SettingsScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const { 
    profile, 
    security, 
    preferences, 
    supportTickets, 
    faqs,
    updateProfile, 
    updateSecurity, 
    updatePreferences, 
    toggleTwoFactor,
    removeDevice,
    createSupportTicket 
  } = useSettingsStore();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences' | 'support'>('profile');
  const [expandedFaqs, setExpandedFaqs] = useState<Set<string>>(new Set());

  const handleToggleTwoFactor = () => {
    Alert.alert(
      'Two-Factor Authentication',
      security.twoFactorEnabled 
        ? 'Are you sure you want to disable 2FA? This will make your account less secure.'
        : 'Enable two-factor authentication to add an extra layer of security to your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: security.twoFactorEnabled ? 'Disable' : 'Enable', 
          onPress: toggleTwoFactor 
        }
      ]
    );
  };

  const handleRemoveDevice = (deviceId: string) => {
    Alert.alert(
      'Remove Device',
      'Are you sure you want to remove this device? It will no longer be able to access your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeDevice(deviceId) }
      ]
    );
  };

  const toggleFaqExpansion = (faqId: string) => {
    const newExpanded = new Set(expandedFaqs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFaqs(newExpanded);
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return theme.colors.success[500];
      case 'pending': return theme.colors.warning[500];
      case 'rejected': return theme.colors.error[500];
      default: return theme.colors.text.secondary;
    }
  };

  const getKycStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'rejected': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const renderProfile = () => (
    <Animated.View entering={SlideInRight} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Profile Information
      </Text>
      
      <View style={[styles.profileCard, { backgroundColor: theme.colors.background.secondary }]}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {profile.avatar ? (
              <Image source={{ uri: profile.avatar }} style={styles.avatar} />
            ) : (
              <View style={[styles.avatarPlaceholder, { backgroundColor: theme.colors.primary[500] }]}>
                <Text style={styles.avatarText}>
                  {profile.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.colors.text.primary }]}>
              {profile.name}
            </Text>
            <Text style={[styles.profileEmail, { color: theme.colors.text.secondary }]}>
              {profile.email}
            </Text>
            
            <View style={styles.kycStatus}>
              <Ionicons 
                name={getKycStatusIcon(profile.kycStatus) as any} 
                size={16} 
                color={getKycStatusColor(profile.kycStatus)} 
              />
              <Text style={[styles.kycStatusText, { color: getKycStatusColor(profile.kycStatus) }]}>
                KYC: {profile.kycStatus.charAt(0).toUpperCase() + profile.kycStatus.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        
        {profile.bio && (
          <Text style={[styles.profileBio, { color: theme.colors.text.secondary }]}>
            {profile.bio}
          </Text>
        )}
      </View>

      <View style={styles.infoSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Personal Details
        </Text>
        
        <View style={styles.infoGrid}>
          {profile.phone && (
            <View style={styles.infoItem}>
              <Ionicons name="call" size={20} color={theme.colors.text.secondary} />
              <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Phone</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>{profile.phone}</Text>
            </View>
          )}
          
          {profile.country && (
            <View style={styles.infoItem}>
              <Ionicons name="location" size={20} color={theme.colors.text.secondary} />
              <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Country</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>{profile.country}</Text>
            </View>
          )}
          
          {profile.dateOfBirth && (
            <View style={styles.infoItem}>
              <Ionicons name="calendar" size={20} color={theme.colors.text.secondary} />
              <Text style={[styles.infoLabel, { color: theme.colors.text.secondary }]}>Date of Birth</Text>
              <Text style={[styles.infoValue, { color: theme.colors.text.primary }]}>{profile.dateOfBirth}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.linkedAccountsSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Linked Accounts
        </Text>
        
        {profile.linkedAccounts.length === 0 ? (
          <EmptyState
            icon="🔗"
            title="No Linked Accounts"
            message="You haven&apos;t linked any external accounts yet."
            actionText="Link Account"
            onAction={() => {}}
          />
        ) : (
          profile.linkedAccounts.map((account, index) => (
            <Animated.View 
              key={account.id}
              entering={FadeInUp.delay(200 + index * 100)}
              style={[styles.linkedAccountCard, { backgroundColor: theme.colors.background.secondary }]}
            >
              <View style={styles.accountInfo}>
                <View style={styles.accountIcon}>
                  <Ionicons 
                    name={account.type === 'bank' ? 'business' : account.type === 'card' ? 'card' : 'wallet'} 
                    size={24} 
                    color={theme.colors.primary[500]} 
                  />
                </View>
                
                <View style={styles.accountDetails}>
                  <Text style={[styles.accountName, { color: theme.colors.text.primary }]}>
                    {account.name}
                  </Text>
                  <Text style={[styles.accountType, { color: theme.colors.text.secondary }]}>
                    {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                    {account.lastFour && ` •••• ${account.lastFour}`}
                  </Text>
                </View>
                
                <View style={styles.accountStatus}>
                  <View style={[
                    styles.statusDot,
                    { backgroundColor: account.isVerified ? theme.colors.success[500] : theme.colors.warning[500] }
                  ]} />
                  <Text style={[
                    styles.statusText,
                    { color: account.isVerified ? theme.colors.success[500] : theme.colors.warning[500] }
                  ]}>
                    {account.isVerified ? 'Verified' : 'Pending'}
                  </Text>
                </View>
              </View>
            </Animated.View>
          ))
        )}
      </View>
    </Animated.View>
  );

  const renderSecurity = () => (
    <Animated.View entering={SlideInRight} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Security Settings
      </Text>
      
      <View style={styles.securitySection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Two-Factor Authentication
        </Text>
        
        <View style={[styles.securityCard, { backgroundColor: theme.colors.background.secondary }]}>
          <View style={styles.securityHeader}>
            <View style={styles.securityInfo}>
              <Ionicons 
                name="shield-checkmark" 
                size={24} 
                color={security.twoFactorEnabled ? theme.colors.success[500] : theme.colors.text.secondary} 
              />
              <View style={styles.securityDetails}>
                <Text style={[styles.securityTitle, { color: theme.colors.text.primary }]}>
                  {security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </Text>
                <Text style={[styles.securityDescription, { color: theme.colors.text.secondary }]}>
                  {security.twoFactorEnabled 
                    ? `Using ${security.twoFactorMethod} authentication`
                    : 'Add an extra layer of security to your account'
                  }
                </Text>
              </View>
            </View>
            
            <Switch
              value={security.twoFactorEnabled}
              onValueChange={handleToggleTwoFactor}
              trackColor={{ false: theme.colors.border.primary, true: theme.colors.primary[500] }}
              thumbColor="white"
            />
          </View>
        </View>
      </View>

      <View style={styles.devicesSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Active Devices
        </Text>
        
        {security.devices.length === 0 ? (
          <EmptyState
            icon="📱"
            title="No Active Devices"
            message="No devices are currently logged into your account."
            actionText="Refresh"
            onAction={() => {}}
          />
        ) : (
          security.devices.map((device, index) => (
            <Animated.View 
              key={device.id}
              entering={FadeInUp.delay(200 + index * 100)}
              style={[styles.deviceCard, { backgroundColor: theme.colors.background.secondary }]}
            >
              <View style={styles.deviceInfo}>
                <View style={styles.deviceIcon}>
                  <Ionicons 
                    name={device.type === 'mobile' ? 'phone-portrait' : device.type === 'desktop' ? 'desktop' : 'tablet-portrait'} 
                    size={24} 
                    color={theme.colors.primary[500]} 
                  />
                </View>
                
                <View style={styles.deviceDetails}>
                  <Text style={[styles.deviceName, { color: theme.colors.text.primary }]}>
                    {device.name}
                    {device.isCurrent && (
                      <Text style={[styles.currentDevice, { color: theme.colors.primary[500] }]}>
                        {' '}(Current)
                      </Text>
                    )}
                  </Text>
                  <Text style={[styles.deviceLocation, { color: theme.colors.text.secondary }]}>
                    {device.location} • {device.ipAddress}
                  </Text>
                  <Text style={[styles.deviceLastActive, { color: theme.colors.text.tertiary }]}>
                    Last active: {formatTimeAgo(device.lastActive)}
                  </Text>
                </View>
                
                {!device.isCurrent && (
                  <TouchableOpacity
                    style={styles.removeDeviceButton}
                    onPress={() => handleRemoveDevice(device.id)}
                  >
                    <Ionicons name="close" size={20} color={theme.colors.error[500]} />
                  </TouchableOpacity>
                )}
              </View>
            </Animated.View>
          ))
        )}
      </View>
    </Animated.View>
  );

  const renderPreferences = () => (
    <Animated.View entering={SlideInRight} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Preferences
      </Text>
      
      <View style={styles.preferencesSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Appearance
        </Text>
        
        <View style={[styles.preferenceCard, { backgroundColor: theme.colors.background.secondary }]}>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <Ionicons name="moon" size={24} color={theme.colors.primary[500]} />
              <View>
                <Text style={[styles.preferenceTitle, { color: theme.colors.text.primary }]}>
                  Theme
                </Text>
                <Text style={[styles.preferenceDescription, { color: theme.colors.text.secondary }]}>
                  {preferences.theme.charAt(0).toUpperCase() + preferences.theme.slice(1)} mode
                </Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.preferenceButton}>
              <Text style={[styles.preferenceButtonText, { color: theme.colors.primary[500] }]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.notificationsSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Notifications
        </Text>
        
        <View style={[styles.preferenceCard, { backgroundColor: theme.colors.background.secondary }]}>
          {Object.entries(preferences.notifications).map(([key, value], index) => (
            <View key={key} style={styles.preferenceItem}>
              <View style={styles.preferenceInfo}>
                <Ionicons 
                  name={getNotificationIcon(key) as any} 
                  size={24} 
                  color={theme.colors.primary[500]} 
                />
                <View>
                  <Text style={[styles.preferenceTitle, { color: theme.colors.text.primary }]}>
                    {getNotificationLabel(key)}
                  </Text>
                </View>
              </View>
              
              <Switch
                value={value}
                onValueChange={(newValue) => 
                  updatePreferences({ notifications: { ...preferences.notifications, [key]: newValue } })
                }
                trackColor={{ false: theme.colors.border.primary, true: theme.colors.primary[500] }}
                thumbColor="white"
              />
            </View>
          ))}
        </View>
      </View>
    </Animated.View>
  );

  const renderSupport = () => (
    <Animated.View entering={SlideInRight} style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
        Support & Help
      </Text>
      
      <View style={styles.faqsSection}>
        <Text style={[styles.subsectionTitle, { color: theme.colors.text.primary }]}>
          Frequently Asked Questions
        </Text>
        
        {faqs.length === 0 ? (
          <EmptyState
            icon="❓"
            title="No FAQs Available"
            message="Frequently asked questions are not available at the moment."
            actionText="Contact Support"
            onAction={() => {}}
          />
        ) : (
          faqs.map((faq, index) => (
            <Animated.View 
              key={faq.id}
              entering={FadeInUp.delay(200 + index * 100)}
              style={[styles.faqCard, { backgroundColor: theme.colors.background.secondary }]}
            >
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleFaqExpansion(faq.id)}
              >
                <View style={styles.faqQuestion}>
                  <Text style={[styles.faqQuestionText, { color: theme.colors.text.primary }]}>
                    {faq.question}
                  </Text>
                  <View style={styles.faqCategory}>
                    <Text style={[styles.faqCategoryText, { color: theme.colors.primary[500] }]}>
                      {faq.category}
                    </Text>
                  </View>
                </View>
                
                <Ionicons 
                  name={expandedFaqs.has(faq.id) ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={theme.colors.text.secondary} 
                />
              </TouchableOpacity>
              
              {expandedFaqs.has(faq.id) && (
                <Animated.View entering={SlideInRight} style={styles.faqAnswer}>
                  <Text style={[styles.faqAnswerText, { color: theme.colors.text.secondary }]}>
                    {faq.answer}
                  </Text>
                  
                  <View style={styles.faqFooter}>
                    <View style={styles.faqTags}>
                      {faq.tags.map((tag, tagIndex) => (
                        <View 
                          key={tagIndex}
                          style={[styles.faqTag, { backgroundColor: theme.colors.background.tertiary }]}
                        >
                          <Text style={[styles.faqTagText, { color: theme.colors.text.secondary }]}>
                            {tag}
                          </Text>
                        </View>
                      ))}
                    </View>
                    
                    <View style={styles.faqHelpful}>
                      <TouchableOpacity style={styles.helpfulButton}>
                        <Ionicons name="thumbs-up" size={16} color={theme.colors.success[500]} />
                        <Text style={[styles.helpfulText, { color: theme.colors.success[500] }]}>
                          {faq.helpful}
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity style={styles.helpfulButton}>
                        <Ionicons name="thumbs-down" size={16} color={theme.colors.error[500]} />
                        <Text style={[styles.helpfulText, { color: theme.colors.error[500] }]}>
                          {faq.notHelpful}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          ))
        )}
      </View>
    </Animated.View>
  );

  const getNotificationIcon = (key: string) => {
    switch (key) {
      case 'push': return 'notifications';
      case 'email': return 'mail';
      case 'sms': return 'chatbubble';
      case 'tradingSignals': return 'trending-up';
      case 'marketAlerts': return 'analytics';
      case 'portfolioUpdates': return 'pie-chart';
      case 'securityAlerts': return 'shield';
      default: return 'notifications';
    }
  };

  const getNotificationLabel = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Settings
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Manage your account preferences and security
        </Text>
      </Animated.View>

      <View style={styles.tabBar}>
        {[
          { key: 'profile', label: 'Profile', icon: 'person' },
          { key: 'security', label: 'Security', icon: 'shield' },
          { key: 'preferences', label: 'Preferences', icon: 'settings' },
          { key: 'support', label: 'Support', icon: 'help-circle' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && { 
                backgroundColor: theme.colors.primary[500],
                borderColor: theme.colors.primary[500]
              }
            ]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Ionicons 
              name={tab.icon as any} 
              size={20} 
              color={activeTab === tab.key ? 'white' : theme.colors.text.secondary} 
            />
            <Text style={[
              styles.tabLabel,
              { color: activeTab === tab.key ? 'white' : theme.colors.text.secondary }
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'preferences' && renderPreferences()}
        {activeTab === 'support' && renderSupport()}
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
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    gap: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  kycStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  kycStatusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  profileBio: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  infoSection: {
    marginBottom: 24,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  linkedAccountsSection: {
    marginBottom: 24,
  },
  linkedAccountCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountDetails: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  accountType: {
    fontSize: 14,
  },
  accountStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  securitySection: {
    marginBottom: 24,
  },
  securityCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  securityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  securityDetails: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  securityDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  devicesSection: {
    marginBottom: 24,
  },
  deviceCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  currentDevice: {
    fontSize: 14,
    fontWeight: '500',
  },
  deviceLocation: {
    fontSize: 14,
    marginBottom: 4,
  },
  deviceLastActive: {
    fontSize: 12,
  },
  removeDeviceButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  preferencesSection: {
    marginBottom: 24,
  },
  preferenceCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
  },
  preferenceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  preferenceButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  notificationsSection: {
    marginBottom: 24,
  },
  faqsSection: {
    marginBottom: 24,
  },
  faqCard: {
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  faqQuestion: {
    flex: 1,
    marginRight: 16,
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqCategory: {
    alignSelf: 'flex-start',
  },
  faqCategoryText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  faqAnswer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  faqAnswerText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  faqFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  faqTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  faqTagText: {
    fontSize: 12,
  },
  faqHelpful: {
    flexDirection: 'row',
    gap: 16,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  helpfulText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
