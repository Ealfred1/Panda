import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
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
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withRepeat,
    withSequence,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../../src/store/themeStore';
import { PremiumButton } from '../../src/components/PremiumButton';

export default function Success() {
  const router = useRouter();
  const theme = useCurrentTheme();
  
  // Animated values for floating elements
  const floatAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);

  React.useEffect(() => {
    // Start floating animation
    floatAnim.value = withRepeat(
      withSequence(
        withSpring(1, { damping: 8, stiffness: 100 }),
        withSpring(0, { damping: 8, stiffness: 100 })
      ),
      -1,
      true
    );

    // Start scale animation
    scaleAnim.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 8, stiffness: 100 })
      ),
      -1,
      true
    );
  }, []);

  const floatingStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatAnim.value * 10 }],
  }));

  const scalingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
  }));

  const handleGetStarted = () => {
    // Navigate to main app
    router.replace('/(tabs)');
  };

  const handleBackToLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.delay(200).springify()}
        style={styles.header}
      >
        <Animated.View style={[styles.successContainer, floatingStyle]}>
          <Animated.View 
            style={[
              styles.successIcon, 
              { backgroundColor: theme.colors.success[500] },
              scalingStyle
            ]}
          >
            <Ionicons name="checkmark" size={40} color={theme.colors.text.inverse} />
          </Animated.View>
          
          <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
            Welcome to Panda! 🎉
          </Text>
          <Text style={[styles.successSubtitle, { color: theme.colors.text.secondary }]}>
            Your account has been created successfully. You&apos;re all set to start your financial journey!
          </Text>
        </Animated.View>
      </Animated.View>

      {/* Content */}
      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.content}
      >
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, { color: theme.colors.text.primary }]}>
            What&apos;s Next?
          </Text>
          
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.primary[500] }]}>
                <Ionicons name="trending-up" size={20} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>
                  Explore Markets
                </Text>
                <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                  Discover trending stocks and crypto
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.secondary[500] }]}>
                <Ionicons name="wallet" size={20} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>
                  Manage Portfolio
                </Text>
                <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                  Track your investments and performance
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={[styles.featureIcon, { backgroundColor: theme.colors.success[500] }]}>
                <Ionicons name="analytics" size={20} color={theme.colors.text.inverse} />
              </View>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: theme.colors.text.primary }]}>
                  Smart Insights
                </Text>
                <Text style={[styles.featureDescription, { color: theme.colors.text.secondary }]}>
                  Get AI-powered trading recommendations
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <PremiumButton
            title="Get Started"
            onPress={handleGetStarted}
            size="lg"
            style={styles.getStartedButton}
            leftIcon={<Ionicons name="rocket" size={20} color={theme.colors.text.inverse} />}
          />
          
          <PremiumButton
            title="Back to Login"
            onPress={handleBackToLogin}
            variant="outline"
            size="lg"
            style={styles.backButton}
            leftIcon={<Ionicons name="log-in" size={20} color={theme.colors.primary[500]} />}
          />
        </View>
      </Animated.View>

      {/* Decorative Elements */}
      <Animated.View 
        entering={SlideInRight.delay(600).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.success[500] }]}
      />
      <Animated.View 
        entering={SlideInRight.delay(800).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.primary[500] }]}
      />
      <Animated.View 
        entering={SlideInRight.delay(1000).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.secondary[500] }]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
    minHeight: '100%',
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.8,
    maxWidth: 300,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  actionButtons: {
    gap: 16,
    marginTop: 'auto',
  },
  getStartedButton: {
    marginBottom: 0,
  },
  backButton: {
    marginBottom: 0,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.1,
    right: -40,
  },
});
