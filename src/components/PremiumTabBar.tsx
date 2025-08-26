import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TabIconProps {
  focused: boolean;
  icon: string;
  title: string;
  badge?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, title, badge }) => {
  if (focused) {
    return (
      <View style={{
        flexDirection: 'row',
        width: '100%',
        flex: 1,
        minWidth: 112,
        minHeight: 64,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: '#f58220',
      }}>
        <MaterialIcons 
          name={icon as any} 
          size={24} 
          color="white" 
        />
        <Text style={{ 
          fontFamily: 'Poppins_500Medium',
          color: 'white',
          fontSize: 16,
          marginLeft: 8,
        }}>
          {title}
        </Text>
        {badge && badge > 0 && (
          <View style={{
            position: 'absolute',
            top: -4,
            right: -4,
            backgroundColor: '#ef4444',
            borderRadius: 9,
            minWidth: 18,
            height: 18,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{ 
              fontFamily: 'Poppins_500Medium',
              color: 'white',
              fontSize: 12,
            }}>
              {badge}
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={{
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      borderRadius: 50,
    }}>
      <MaterialIcons 
        name={icon as any} 
        size={24} 
        color="#666" 
      />
      {badge && badge > 0 && (
        <View style={{
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: '#ef4444',
          borderRadius: 9,
          minWidth: 18,
          height: 18,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ 
            fontFamily: 'Poppins_500Medium',
            color: 'white',
            fontSize: 12,
          }}>
            {badge}
          </Text>
        </View>
      )}
    </View>
  );
};

interface PremiumTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const PremiumTabBar: React.FC<PremiumTabBarProps> = ({ 
  state, 
  descriptors, 
  navigation 
}) => {
  return (
    <View style={{
      position: 'absolute',
      bottom: 36,
      left: 19,
      right: 19,
      height: 52,
      backgroundColor: 'white',
      borderRadius: 50,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#f0f0f0',
      shadowColor: '#ddd',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.0,
      shadowRadius: 4,
      elevation: 4,
    }}>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        height: '100%',
      }}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Map route names to our icons and titles
          const getTabInfo = (routeName: string) => {
            switch (routeName) {
              case 'home':
                return { icon: 'home', title: 'Home' };
              case 'markets':
                return { icon: 'trending-up', title: 'Markets' };
              case 'wallet':
                return { icon: 'account-balance-wallet', title: 'Wallet' };
              case 'profile':
                return { icon: 'person', title: 'Profile' };
              default:
                return { icon: 'home', title: 'Home' };
            }
          };

          const { icon, title } = getTabInfo(route.name);
          const badge = undefined; // No badges for now

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TabIcon 
                focused={isFocused} 
                icon={icon} 
                title={title}
                badge={badge}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
