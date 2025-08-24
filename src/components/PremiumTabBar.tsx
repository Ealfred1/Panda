import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import {
    Dimensions,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

const { width } = Dimensions.get('window');

interface TabItem {
  key: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconFilled: keyof typeof Ionicons.glyphMap;
}

interface PremiumTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const tabs: TabItem[] = [
  {
    key: 'home',
    title: 'Home',
    icon: 'home-outline',
    iconFilled: 'home',
  },
  {
    key: 'explore',
    title: 'Explore',
    icon: 'compass-outline',
    iconFilled: 'compass',
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    icon: 'pie-chart-outline',
    iconFilled: 'pie-chart',
  },
  {
    key: 'profile',
    title: 'Profile',
    icon: 'person-outline',
    iconFilled: 'person',
  },
];

export const PremiumTabBar: React.FC<PremiumTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useCurrentTheme();
  const activeIndex = state.index;

  const renderTab = (tab: TabItem, index: number) => {
    const isActive = index === activeIndex;
    const animatedValue = useSharedValue(isActive ? 1 : 0);

    React.useEffect(() => {
      animatedValue.value = withSpring(isActive ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: interpolate(
            animatedValue.value,
            [0, 1],
            [1, 1.1]
          ),
        },
        {
          translateY: interpolate(
            animatedValue.value,
            [0, 1],
            [0, -8]
          ),
        },
      ],
    }));

    const iconAnimatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          scale: interpolate(
            animatedValue.value,
            [0, 1],
            [1, 1.2]
          ),
        },
      ],
    }));

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: tab.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.navigate(tab.key);
      }
    };

    return (
      <Pressable
        key={tab.key}
        onPress={onPress}
        style={styles.tabItem}
        android_ripple={{ color: theme.colors.primary[500], borderless: true }}
      >
        <Animated.View style={[styles.tabContent, animatedStyle]}>
          <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
            <Ionicons
              name={isActive ? tab.iconFilled : tab.icon}
              size={24}
              color={
                isActive
                  ? theme.colors.primary[500]
                  : theme.colors.text.secondary
              }
            />
          </Animated.View>
          
          <Text
            style={[
              styles.tabLabel,
              {
                color: isActive
                  ? theme.colors.primary[500]
                  : theme.colors.text.secondary,
                fontWeight: isActive ? '600' : '500',
              },
            ]}
          >
            {tab.title}
          </Text>
          
          {isActive && (
            <Animated.View
              style={[
                styles.activeIndicator,
                {
                  backgroundColor: theme.colors.primary[500],
                },
                animatedStyle,
              ]}
            />
          )}
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <View style={styles.tabBar}>
          {tabs.map((tab, index) => renderTab(tab, index))}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  blurContainer: {
    overflow: 'hidden',
    borderRadius: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
    borderRadius: 24,
    paddingHorizontal: 8,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 4,
    padding: 8,
    borderRadius: 12,
  },
  tabLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
});
