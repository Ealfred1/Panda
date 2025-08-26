import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
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
} from 'react-native-reanimated';
import { EnhancedInput } from '../../src/components/EnhancedInput';

import { useCurrentTheme } from '../../src/store/themeStore';
import { ForgotPasswordFormData, forgotPasswordSchema } from '../../src/utils/validationSchemas';

export default function ForgotPassword() {
  const router = useRouter();
  const theme = useCurrentTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
  });

  const watchedEmail = watch('email');

  const handleSubmitEmail = async (data: ForgotPasswordFormData) => {
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
    router.push('/(auth)/login');
  };

  if (isEmailSent) {
    return (
      <ScrollView 
        style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Header */}
        <Animated.View 
          entering={FadeInDown.delay(200).springify()}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          
          <View style={styles.successContainer}>
            <View style={[styles.successIcon, { backgroundColor: theme.colors.success[500] }]}>
              <Ionicons name="checkmark" size={32} color={theme.colors.text.inverse} />
            </View>
            
            <Text style={[styles.successTitle, { color: theme.colors.text.primary }]}>
            Check Your Email
          </Text>
            <Text style={[styles.successSubtitle, { color: theme.colors.text.secondary }]}>
              We&apos;ve sent a password reset link to{'\n'}
              <Text style={{ fontWeight: '600', color: theme.colors.primary[500] }}>
                {watchedEmail}
              </Text>
            </Text>
          </View>
        </Animated.View>

        {/* Success Content */}
        <Animated.View 
          entering={FadeInUp.delay(400).springify()}
          style={styles.content}
        >
          <Text style={[styles.instructionText, { color: theme.colors.text.secondary }]}>
            Click the link in the email to reset your password. The link will expire in 1 hour.
          </Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleResendEmail}
              style={styles.resendButton}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={20} color="#f58220" />
              <Text style={styles.resendButtonText}>Resend Email</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleBackToLogin}
              style={styles.loginButton}
              activeOpacity={0.8}
            >
              <Ionicons name="log-in" size={20} color="#fff" />
              <Text style={styles.loginButtonText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
        </Animated.View>

        {/* Decorative Elements */}
        <Animated.View 
          entering={SlideInRight.delay(600).springify()}
          style={[styles.decorativeCircle, { backgroundColor: theme.colors.success[500] }]}
        />
      </ScrollView>
    );
  }

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
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary[500] }]}>
            <Ionicons name="lock-open" size={32} color={theme.colors.text.inverse} />
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Forgot Password?
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          No worries! Enter your email and we&apos;ll send you reset instructions.
        </Text>
      </Animated.View>

      {/* Form */}
      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.form}
      >
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <EnhancedInput
              label="Email Address"
              placeholder="Enter your email address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              required
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(handleSubmitEmail)}
          disabled={!isValid || isLoading}
          style={[styles.submitButton, (!isValid || isLoading) && { opacity: 0.5 }]}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="paper-plane" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Send Reset Link</Text>
            </>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <Animated.View 
        entering={FadeInUp.delay(600).springify()}
        style={styles.footer}
      >
        <Text style={[styles.footerText, { color: theme.colors.text.secondary }]}>
          Remember your password?{' '}
        </Text>
        <TouchableOpacity onPress={handleBackToLogin}>
          <Text style={[styles.footerLink, { color: '#f58220' }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
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
    zIndex: 1,
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
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
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
    opacity: 0.8,
  },
  form: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: '#f58220',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 0.2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 'auto',
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
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#f58220',
  },
  resendButtonText: {
    color: '#f58220',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 0.2,
  },
  loginButton: {
    backgroundColor: '#f58220',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
    marginLeft: 10,
    letterSpacing: 0.2,
  },
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
    right: -60,
    top: 200,
  },
});
