import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
    Alert,
    Image,
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
import { useTheme } from '../../theme';

const signUpSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  phone: yup.string().matches(/^\+?[\d\s-]+$/, 'Please enter a valid phone number').required('Phone is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
});

interface SignUpFormData {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface SignUpScreenProps {
  navigation: any;
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const { setUser, setAuthenticated } = useAppStore();
  const [kycImage, setKycImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setKycImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take a photo');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setKycImage(result.assets[0].uri);
    }
  };

  const showImagePickerOptions = () => {
    Alert.alert(
      'Choose KYC Document',
      'Select how you want to upload your KYC document',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const onSubmit = async (data: SignUpFormData) => {
    if (!kycImage) {
      Alert.alert('KYC Required', 'Please upload a KYC document to continue');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now().toString(),
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        avatar: kycImage,
      };
      
      setUser(newUser);
      setAuthenticated(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
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
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Create Account
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Join Panda and start your financial journey
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.nameRow}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.nameInput}>
                <Input
                  placeholder="First Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.firstName?.message}
                />
              </View>
            )}
          />
          
          <Controller
            control={control}
            name="lastName"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.nameInput}>
                <Input
                  placeholder="Last Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.lastName?.message}
                />
              </View>
            )}
          />
        </View>

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
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Phone Number"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.phone?.message}
              keyboardType="phone-pad"
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
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Confirm Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
              secureTextEntry
            />
          )}
        />

        <View style={styles.kycSection}>
          <Text style={[styles.kycTitle, { color: theme.colors.text }]}>
            KYC Verification
          </Text>
          <Text style={[styles.kycSubtitle, { color: theme.colors.textSecondary }]}>
            Upload a government-issued ID for verification
          </Text>
          
          <TouchableOpacity
            style={[styles.kycUpload, { borderColor: theme.colors.border }]}
            onPress={showImagePickerOptions}
          >
            {kycImage ? (
              <Image source={{ uri: kycImage }} style={styles.kycPreview} />
            ) : (
              <View style={styles.kycPlaceholder}>
                <Ionicons name="camera-outline" size={32} color={theme.colors.textSecondary} />
                <Text style={[styles.kycPlaceholderText, { color: theme.colors.textSecondary }]}>
                  Tap to upload KYC document
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ThemedButton
          title="Create Account"
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid || !kycImage || isLoading}
          loading={isLoading}
          style={styles.submitButton}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
  },
  backButton: {
    marginBottom: 20,
    padding: 8,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  form: {
    paddingHorizontal: 20,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameInput: {
    flex: 1,
  },
  kycSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  kycTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  kycSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  kycUpload: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  kycPreview: {
    width: '100%',
    height: '100%',
  },
  kycPlaceholder: {
    alignItems: 'center',
  },
  kycPlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
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
});
