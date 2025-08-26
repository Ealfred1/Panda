import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface PasswordStrengthIndicatorProps {
  password: string;
  showFeedback?: boolean;
}

export const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
  password,
  showFeedback = true,
}) => {
  const theme = useCurrentTheme();
  const strengthAnim = useSharedValue(0);

  React.useEffect(() => {
    if (password.length > 0) {
      strengthAnim.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else {
      strengthAnim.value = withSpring(0, { damping: 15, stiffness: 150 });
    }
  }, [password]);

  const getPasswordStrength = () => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length >= 8) score += 1;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score += 1;
    else feedback.push('One lowercase letter');

    if (/[A-Z]/.test(password)) score += 1;
    else feedback.push('One uppercase letter');

    if (/\d/.test(password)) score += 1;
    else feedback.push('One number');

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else feedback.push('One special character');

    const strengthMap = [
      { label: 'Very Weak', color: theme.colors.error[500] },
      { label: 'Weak', color: theme.colors.warning[500] },
      { label: 'Fair', color: theme.colors.warning[500] },
      { label: 'Good', color: theme.colors.success[500] },
      { label: 'Strong', color: theme.colors.success[600] },
    ];

    return {
      score,
      label: strengthMap[Math.min(score - 1, 4)]?.label || 'Very Weak',
      color: strengthMap[Math.min(score - 1, 4)]?.color || theme.colors.error[500],
      feedback,
    };
  };

  const strength = getPasswordStrength();
  const progress = (strength.score / 5) * 100;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: strengthAnim.value,
    transform: [
      {
        translateY: interpolate(
          strengthAnim.value,
          [0, 1],
          [10, 0]
        ),
      },
    ],
  }));

  if (password.length === 0) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.header}>
        <Text style={[styles.label, { color: theme.colors.text.secondary }]}>
          Password Strength
        </Text>
        <Text style={[styles.strength, { color: strength.color }]}>
          {strength.label}
        </Text>
      </View>
      
      <View style={[styles.progressBar, { backgroundColor: 'rgba(0, 0, 0, 0.1)' }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              backgroundColor: strength.color,
            },
          ]}
        />
      </View>
      
      {showFeedback && strength.feedback.length > 0 && (
        <View style={styles.feedbackContainer}>
          {strength.feedback.map((item, index) => (
            <View key={index} style={styles.feedbackItem}>
              <View style={[styles.feedbackDot, { backgroundColor: theme.colors.error[500] }]} />
              <Text style={[styles.feedbackText, { color: theme.colors.text.tertiary }]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  strength: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  feedbackContainer: {
    marginTop: 12,
  },
  feedbackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  feedbackDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 10,
  },
  feedbackText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
