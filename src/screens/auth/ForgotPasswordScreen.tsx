import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import * as yup from 'yup';
import { Input } from '../../components/Input';
import { ThemedButton } from '../../components/ThemedButton';
import { useCurrentTheme } from '../../store/themeStore';

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
});

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const theme = useCurrentTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const watchedEmail = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  if (isEmailSent) {
    return (
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <View style={styles.successContainer}>
            <View style={[styles.successIcon, { backgroundColor: theme.colors.primary }]}>
              <Ionicons name="checkmark" size={32} color={theme.colors.surface} />
            </View>
            
            <Text style={[styles.successTitle, { color: theme.colors.text }]}>
              Check Your Email
            </Text>
            <Text style={[styles.successSubtitle, { color: theme.colors.textSecondary }]}>
              We've sent a password reset link to{'\n'}
              <Text style={{ fontWeight: '600' }}>{watchedEmail}</Text>
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.instructionText, { color: theme.colors.textSecondary }]}>
            Click the link in the email to reset your password. The link will expire in 1 hour.
          </Text>
          
          <View style={styles.actionButtons}>
            <ThemedButton
              title="Resend Email"
              onPress={handleResendEmail}
              variant="outline"
              style={styles.resendButton}
            />
            
            <ThemedButton
              title="Back to Login"
              onPress={handleBackToLogin}
              style={styles.loginButton}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="lock-open" size={32} color={theme.colors.surface} />
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Forgot Password?
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          No worries! Enter your email and we'll send you reset instructions.
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter your email address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />

        <ThemedButton
          title="Send Reset Link"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          loading={isLoading}
          style={styles.submitButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Remember your password?{' '}
        </Text>
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={[styles.footerLink, { color: theme.colors.primary }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 8,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
        shadowOffset: {
      width: 0,
      height: 4,
    },
              },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
  },
  footerLink: {
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
        shadowOffset: {
      width: 0,
      height: 4,
    },
              },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  actionButtons: {
    gap: 16,
  },
  resendButton: {
    marginBottom: 0,
  },
  loginButton: {
    marginBottom: 0,
  },
});
