import { Bookmark, Edit, Heart, MessageCircle, Settings } from 'lucide-react-native';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ThemedButton } from '../../components';
import { useCurrentTheme } from '../../store/themeStore';
import { dummyUsers } from '../../utils/dummyData';
import { formatNumber } from '../../utils/helpers';

export const ProfileScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const user = dummyUsers[0]; // Use first user as current user

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  };

  const headerStyle: ViewStyle = {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  };

  const profileHeaderStyle: ViewStyle = {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  };

  const avatarStyle: ViewStyle = {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  };

  const nameStyle = {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  };

  const bioStyle = {
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  };

  const statsContainerStyle: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  };

  const statItemStyle: ViewStyle = {
    alignItems: 'center',
  };

  const statNumberStyle = {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
  };

  const statLabelStyle = {
    fontSize: 14,
    color: theme.colors.text.tertiary,
  };

  const sectionStyle: ViewStyle = {
    marginBottom: theme.spacing.lg,
  };

  const sectionTitleStyle = {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  };

  const menuItemStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  };

  const menuItemTextStyle = {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.md,
    flex: 1,
  };

  const renderMenuItem = (icon: React.ReactNode, title: string, onPress?: () => void) => (
    <TouchableOpacity key={title} style={menuItemStyle} onPress={onPress}>
      {icon}
      <Text style={menuItemTextStyle}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={containerStyle}>
      <View style={headerStyle}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: theme.colors.text.primary }}>
            Profile
          </Text>
          <TouchableOpacity>
            <Settings size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Card variant="glass" margin="lg">
          <View style={profileHeaderStyle}>
            <View style={avatarStyle}>
              <Text style={{ fontSize: 40 }}>👤</Text>
            </View>
            <Text style={nameStyle}>{user.name}</Text>
            <Text style={bioStyle}>{user.bio}</Text>
            
            <View style={statsContainerStyle}>
              <View style={statItemStyle}>
                <Text style={statNumberStyle}>{formatNumber(user.posts)}</Text>
                <Text style={statLabelStyle}>Posts</Text>
              </View>
              <View style={statItemStyle}>
                <Text style={statNumberStyle}>{formatNumber(user.followers)}</Text>
                <Text style={statLabelStyle}>Followers</Text>
              </View>
              <View style={statItemStyle}>
                <Text style={statNumberStyle}>{formatNumber(user.following)}</Text>
                <Text style={statLabelStyle}>Following</Text>
              </View>
            </View>

            <ThemedButton
              title="Edit Profile"
              onPress={() => {}}
              variant="outline"
              icon={<Edit size={16} />}
              iconPosition="left"
            />
          </View>
        </Card>

        <View style={sectionStyle}>
          <Text style={sectionTitleStyle}>Activity</Text>
          <Card variant="outlined" margin="lg">
            {renderMenuItem(
              <Heart size={20} color={theme.colors.primary[500]} />,
              'Liked Posts',
              () => {}
            )}
            {renderMenuItem(
              <Bookmark size={20} color={theme.colors.primary[500]} />,
              'Saved Posts',
              () => {}
            )}
            {renderMenuItem(
              <MessageCircle size={20} color={theme.colors.primary[500]} />,
              'Comments',
              () => {}
            )}
          </Card>
        </View>

        <View style={sectionStyle}>
          <Text style={sectionTitleStyle}>Account</Text>
          <Card variant="outlined" margin="lg">
            {renderMenuItem(
              <Settings size={20} color={theme.colors.text.tertiary} />,
              'Settings',
              () => {}
            )}
            {renderMenuItem(
              <Text style={{ fontSize: 20 }}>🔒</Text>,
              'Privacy',
              () => {}
            )}
            {renderMenuItem(
              <Text style={{ fontSize: 20 }}>🔔</Text>,
              'Notifications',
              () => {}
            )}
            {renderMenuItem(
              <Text style={{ fontSize: 20 }}>❓</Text>,
              'Help & Support',
              () => {}
            )}
          </Card>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
