import { BlurView } from 'expo-blur';
import {
    Bot,
    Home,
    Search,
    Settings,
    Wallet
} from 'lucide-react-native';
import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    ViewStyle
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCurrentTheme } from '../store/themeStore';

interface TabItem {
  key: string;
  title: string;
  icon: React.ComponentType<any>;
  activeIcon?: React.ComponentType<any>;
}

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
  style?: ViewStyle;
}

const tabItems: TabItem[] = [
  {
    key: 'home',
    title: 'Home',
    icon: Home,
  },
  {
    key: 'explore',
    title: 'Explore',
    icon: Search,
  },
  {
    key: 'wallet',
    title: 'Wallet',
    icon: Wallet,
  },
  {
    key: 'bot',
    title: 'Bot',
    icon: Bot,
  },
  {
    key: 'more',
    title: 'More',
    icon: Settings,
  },
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  style,
}) => {
  const theme = useCurrentTheme();
  const insets = useSafeAreaInsets();
  const activeIndex = state.index;

  const containerStyle: ViewStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: insets.bottom,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
  };

  const tabBarStyle: ViewStyle = {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: theme.borderRadius['2xl'],
    overflow: 'hidden',
    ...theme.shadows.large,
  };

  const renderTabItem = (item: TabItem, index: number) => {
    const isActive = activeIndex === index;
    const scale = useSharedValue(isActive ? 1.1 : 1);
    const opacity = useSharedValue(isActive ? 1 : 0.7);
    const translateY = useSharedValue(isActive ? -4 : 0);

    React.useEffect(() => {
      scale.value = withSpring(isActive ? 1.1 : 1, {
        damping: 15,
        stiffness: 300,
      });
      opacity.value = withTiming(isActive ? 1 : 0.7, { duration: 200 });
      translateY.value = withSpring(isActive ? -4 : 0, {
        damping: 15,
        stiffness: 300,
      });
    }, [isActive]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
      ],
      opacity: opacity.value,
    }));

    const handlePress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: item.key,
        canPreventDefault: true,
      });

      if (!isActive && !event.defaultPrevented) {
        navigation.navigate(item.key);
      }
    };

    const IconComponent = item.icon;

    return (
      <AnimatedTouchable
        key={item.key}
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.xs,
          },
          animatedStyle,
        ]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={{ alignItems: 'center' }}>
          <IconComponent
            size={24}
            color={isActive ? theme.colors.primary[500] : theme.colors.text.tertiary}
          />
          <Text
            style={{
              fontSize: 12,
              fontWeight: isActive ? '600' : '500',
              color: isActive ? theme.colors.primary[500] : theme.colors.text.tertiary,
              marginTop: theme.spacing.xs,
            }}
          >
            {item.title}
          </Text>
        </View>
      </AnimatedTouchable>
    );
  };

  return (
    <View style={[containerStyle, style]}>
      <BlurView intensity={20} style={tabBarStyle}>
        {tabItems.map((item, index) => renderTabItem(item, index))}
      </BlurView>
    </View>
  );
};

// Floating Action Button for the center tab
export const FloatingActionButton: React.FC<{
  onPress: () => void;
  icon: React.ComponentType<any>;
  style?: ViewStyle;
}> = ({ onPress, icon: Icon, style }) => {
  const theme = useCurrentTheme();
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    rotation.value = withSpring(rotation.value + 90, { damping: 15, stiffness: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <AnimatedTouchable
      style={[
        {
          position: 'absolute',
          bottom: 80,
          alignSelf: 'center',
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: theme.colors.primary[500],
          alignItems: 'center',
          justifyContent: 'center',
          ...theme.shadows.glow,
        },
        animatedStyle,
        style,
      ]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Icon size={24} color={theme.colors.text.inverse} />
    </AnimatedTouchable>
  );
};
