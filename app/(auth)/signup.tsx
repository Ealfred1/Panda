import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft,
} from 'react-native-reanimated';
import { EnhancedInput } from '../../src/components/EnhancedInput';
import { PasswordStrengthIndicator } from '../../src/components/PasswordStrengthIndicator';

import { useAppStore } from '../../src/store/appStore';
import { useCurrentTheme } from '../../src/store/themeStore';
import { RegistrationFormData, registrationSchema } from '../../src/utils/validationSchemas';

export default function SignUp() {
  const router = useRouter();
  const theme = useCurrentTheme();
  const { setUser, setAuthenticated } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  const watchedPassword = watch('password');

  const handleSignUp = async (data: RegistrationFormData) => {
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        username: data.username,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      };
      
      // Store user data temporarily without setting as authenticated
      // This will be set when user clicks "Get Started" on success screen
      setIsLoading(false);
      router.push('/(auth)/success');
    }, 2000);
  };

  const handleSignIn = () => {
    router.push('/(auth)/login');
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
            <Text style={styles.logoText}>🐼</Text>
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Join Panda and start your financial journey
        </Text>
      </Animated.View>

      {/* Form */}
      <Animated.View 
        entering={FadeInUp.delay(400).springify()}
        style={styles.form}
      >
        {/* Name Fields */}
        <View style={styles.nameRow}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.nameInput}>
                <EnhancedInput
                  label="First Name"
                  placeholder="Enter first name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                  leftIcon="person-outline"
                  required
                />
              </View>
            )}
          />
          
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.nameInput}>
                <EnhancedInput
                  label="Last Name"
                  placeholder="Enter last name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                  leftIcon="person-outline"
                  required
                />
              </View>
            )}
          />
        </View>

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <EnhancedInput
              label="Username"
              placeholder="Choose a username"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.username?.message}
              leftIcon="at-outline"
              autoCapitalize="none"
              required
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <EnhancedInput
              label="Email Address"
              placeholder="Enter your email"
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

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <EnhancedInput
              label="Password"
              placeholder="Create a password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              leftIcon="lock-closed-outline"
              secureTextEntry
              required
            />
          )}
        />

        {/* Password Strength Indicator */}
        {watchedPassword && (
          <PasswordStrengthIndicator 
            password={watchedPassword} 
            showFeedback={true}
          />
        )}

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <EnhancedInput
              label="Confirm Password"
              placeholder="Confirm your password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              leftIcon="lock-closed-outline"
              secureTextEntry
              required
            />
          )}
        />

        <TouchableOpacity
          onPress={handleSubmit(handleSignUp)}
          disabled={!isValid || isLoading}
          style={[styles.submitButton, (!isValid || isLoading) && { opacity: 0.5 }]}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="person-add" size={20} color="#fff" />
              <Text style={styles.submitButtonText}>Create Account</Text>
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
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={[styles.footerLink, { color: '#f58220' }]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Decorative Elements */}
      <Animated.View 
        entering={SlideInLeft.delay(800).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.secondary[500] }]}
      />
      <Animated.View 
        entering={SlideInLeft.delay(1000).springify()}
        style={[styles.decorativeCircle, { backgroundColor: theme.colors.primary[500] }]}
      />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, // Increased padding for keyboard
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 40,
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
    opacity: 0.8,
  },
  form: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
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
  decorativeCircle: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.1,
    left: -60,
    top: 300,
  },
});
