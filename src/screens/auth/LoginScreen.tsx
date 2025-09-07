import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import * as yup from 'yup';
import { Input } from '../../components/Input';
import { ThemedButton } from '../../components/ThemedButton';
import { useAppStore } from '../../store/appStore';
import { useCurrentTheme } from '../../store/themeStore';

const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  twoFactorCode: yup.string().length(6, '2FA code must be 6 digits').required('2FA code is required'),
});

interface LoginFormData {
  email: string;
  password: string;
  twoFactorCode: string;
}

interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const theme = useCurrentTheme();
  const { setUser, setAuthenticated } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const watchedEmail = watch('email');
  const watchedPassword = watch('password');

  const handleInitialLogin = async (data: LoginFormData) => {
    if (!showTwoFactor) {
      // Simulate first authentication step
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowTwoFactor(true);
      }, 1500);
    }
  };

  const handleTwoFactorLogin = async (data: LoginFormData) => {
    if (showTwoFactor) {
      setIsLoading(true);
      
      // Simulate 2FA verification
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
    }
  };

  const onSubmit = showTwoFactor ? handleTwoFactorLogin : handleInitialLogin;

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleResendCode = () => {
    Alert.alert('Code Resent', 'A new 2FA code has been sent to your email');
  };

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
            <Text style={styles.logoText}>🐼</Text>
          </View>
        </View>
        
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome Back
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Sign in to your Panda account
        </Text>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email Address"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!showTwoFactor}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
              secureTextEntry
              editable={!showTwoFactor}
            />
          )}
        />

        {showTwoFactor && (
          <View style={styles.twoFactorSection}>
            <View style={styles.twoFactorHeader}>
              <Ionicons name="shield-checkmark" size={24} color={theme.colors.primary} />
              <Text style={[styles.twoFactorTitle, { color: theme.colors.text }]}>
                Two-Factor Authentication
              </Text>
            </View>
            <Text style={[styles.twoFactorSubtitle, { color: theme.colors.textSecondary }]}>
              Enter the 6-digit code sent to {watchedEmail}
            </Text>
            
            <Controller
              control={control}
              name="twoFactorCode"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Enter 6-digit code"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.twoFactorCode?.message}
                  keyboardType="number-pad"
                  maxLength={6}
                  inputStyle={styles.twoFactorInput}
                />
              )}
            />
            
            <TouchableOpacity onPress={handleResendCode} style={styles.resendButton}>
              <Text style={[styles.resendText, { color: theme.colors.primary }]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <ThemedButton
          title={showTwoFactor ? "Verify & Sign In" : "Continue"}
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || isLoading}
          loading={isLoading}
          style={styles.submitButton}
        />

        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotButton}>
          <Text style={[styles.forgotText, { color: theme.colors.textSecondary }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Don&apos;t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.footerLink, { color: theme.colors.primary }]}>
            Sign Up
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
  logoText: {
    fontSize: 40,
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
  twoFactorSection: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  twoFactorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  twoFactorTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  twoFactorSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  twoFactorInput: {
    marginBottom: 12,
  },
  resendButton: {
    alignSelf: 'center',
    padding: 8,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 20,
  },
  forgotButton: {
    alignSelf: 'center',
    marginTop: 16,
    padding: 8,
  },
  forgotText: {
    fontSize: 16,
    fontWeight: '500',
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
});
