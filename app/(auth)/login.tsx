import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
} from 'react-native-reanimated';
import { EnhancedInput } from '../../src/components/EnhancedInput';
import { PremiumButton } from '../../src/components/PremiumButton';
import { useAppStore } from '../../src/store/appStore';
import { useCurrentTheme } from '../../src/store/themeStore';
import { LoginFormData, loginSchema } from '../../src/utils/validationSchemas';

export default function Login() {
  const router = useRouter();
  const theme = useCurrentTheme();
  const { setUser, setAuthenticated } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      const user = {
        id: '1',
        name: 'Demo User',
        email: data.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      };
      
      setUser(user);
      setAuthenticated(true);
      setIsLoading(false);
    }, 2000);
  };

  const handleSignUp = () => {
    router.push('/(auth)/signup');
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
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
        <View style={styles.logoContainer}>
          <View style={[styles.logo, { backgroundColor: theme.colors.primary[500] }]}>
            <Text style={styles.logoText}>🐼</Text>
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Sign in to your Panda account
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
              placeholder="Enter your password"
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

        <PremiumButton
          title="Sign In"
          onPress={handleSubmit(handleLogin)}
          disabled={!isValid || isLoading}
          loading={isLoading}
          size="lg"
          style={styles.submitButton}
          leftIcon={<Ionicons name="arrow-forward" size={20} color={theme.colors.text.inverse} />}
        />

        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
          <Text style={[styles.forgotText, { color: theme.colors.primary[500] }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Footer */}
      <Animated.View 
        entering={FadeInUp.delay(600).springify()}
        style={styles.footer}
      >
        <Text style={[styles.footerText, { color: theme.colors.text.secondary }]}>
          Don&apos;t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={[styles.footerLink, { color: theme.colors.primary[500] }]}>
            Sign Up
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
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
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
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  forgotButton: {
    alignSelf: 'center',
    padding: 12,
  },
  forgotText: {
    fontSize: 16,
    fontWeight: '600',
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
    right: -60,
    top: 200,
  },
});
