import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface EnhancedInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  onRightIconPress?: () => void;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const EnhancedInput = forwardRef<TextInput, EnhancedInputProps>(({
  label,
  placeholder,
  error,
  success = false,
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  variant = 'default',
  size = 'md',
  disabled = false,
  required = false,
  helperText,
  secureTextEntry,
  onRightIconPress,
  ...props
}, ref) => {
  const theme = useCurrentTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const focusAnim = useSharedValue(0);
  const labelAnim = useSharedValue(0);
  const errorAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withSpring(1, { damping: 15, stiffness: 150 });
    if (!hasValue) {
      labelAnim.value = withSpring(1, { damping: 15, stiffness: 150 });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withSpring(0, { damping: 15, stiffness: 150 });
    if (!hasValue) {
      labelAnim.value = withSpring(0, { damping: 15, stiffness: 150 });
    }
  };

  const handleChangeText = (text: string) => {
    setHasValue(text.length > 0);
    if (text.length > 0 && !hasValue) {
      labelAnim.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else if (text.length === 0 && hasValue) {
      labelAnim.value = withSpring(0, { damping: 15, stiffness: 150 });
    }
    props.onChangeText?.(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: theme.spacing.md,
      borderRadius: theme.borderRadius.xl, // More rounded
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '100%',
    };

    const sizeStyles = {
      sm: { minHeight: 44 },
      md: { minHeight: 48 }, // Shorter to match button height better
      lg: { minHeight: 56 },
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 2,
        borderColor: theme.colors.border.primary,
        paddingHorizontal: 12, // Reduced horizontal padding
        paddingVertical: 12, // Reduced vertical padding to make shorter
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.border.primary,
        paddingHorizontal: 12, // Reduced horizontal padding
        paddingVertical: 12, // Reduced vertical padding to make shorter
      },
      filled: {
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 0,
        paddingHorizontal: 12, // Reduced horizontal padding
        paddingVertical: 12, // Reduced vertical padding to make shorter
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(isFocused && {
        borderColor: error ? theme.colors.error[500] : theme.colors.primary[500],
        shadowColor: error ? theme.colors.error[500] : theme.colors.primary[500],
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 12, // Increased shadow radius
        elevation: 6, // Increased elevation
      }),
      ...(error && {
        borderColor: theme.colors.error[500],
        // backgroundColor: `${theme.colors.error[500]}10`,
      }),
      ...(success && {
        borderColor: theme.colors.success[500],
        backgroundColor: `${theme.colors.success[500]}10`,
      }),
      ...(disabled && {
        opacity: 0.5,
        backgroundColor: theme.colors.background.tertiary,
      }),
    };
  };

  const getInputStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      color: theme.colors.text.primary,
      fontSize: 16,
      flex: 1,
      fontWeight: '500',
      textAlignVertical: 'center',
    };

    const sizeStyles = {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      color: theme.colors.text.secondary,
      fontSize: 14,
      marginBottom: theme.spacing.sm,
      fontWeight: '600',
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      color: theme.colors.error[500],
      fontSize: 12,
      marginTop: 0, // Reduced margin to bring error closer to input
      marginBottom: theme.spacing.sm, // Add bottom margin to separate from next field
      fontWeight: '500',
    };
  };

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          labelAnim.value,
          [0, 1],
          [0, -4]
        ),
      },
      {
        scale: interpolate(
          labelAnim.value,
          [0, 1],
          [1, 0.9]
        ),
      },
    ],
    opacity: interpolate(
      labelAnim.value,
      [0, 1],
      [0.7, 1]
    ),
  }));

  const animatedErrorStyle = useAnimatedStyle(() => ({
    opacity: errorAnim.value,
    transform: [
      {
        translateY: interpolate(
          errorAnim.value,
          [0, 1],
          [10, 0]
        ),
      },
    ],
  }));

  React.useEffect(() => {
    if (error) {
      errorAnim.value = withSpring(1, { damping: 15, stiffness: 150 });
    } else {
      errorAnim.value = withSpring(0, { damping: 15, stiffness: 150 });
    }
  }, [error]);

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    return (
      <View style={{ 
        marginRight: theme.spacing.md, // Increased spacing
        opacity: isFocused ? 1 : 0.7,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // Ensure inline layout
      }}>
        <Ionicons 
          name={leftIcon} 
          size={20} 
          color={isFocused ? theme.colors.primary[500] : theme.colors.text.secondary} 
        />
      </View>
    );
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ 
            marginLeft: theme.spacing.md, // Increased spacing
            padding: theme.spacing.sm,
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.borderRadius.md, // Rounded touch area
            flexDirection: 'row', // Ensure inline layout
          }}
        >
          <Ionicons 
            name={isPasswordVisible ? "eye-off" : "eye"} 
            size={20} 
            color={theme.colors.text.tertiary} 
          />
        </TouchableOpacity>
      );
    }

    if (rightIcon && onRightIconPress) {
      return (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={{ 
            marginLeft: theme.spacing.md,
            padding: theme.spacing.sm,
            width: 32,
            height: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.borderRadius.md,
            flexDirection: 'row',
          }}
        >
          <Ionicons 
            name={rightIcon} 
            size={20} 
            color={theme.colors.text.secondary} 
          />
        </TouchableOpacity>
      );
    }

    if (rightIcon) {
      return (
        <View style={{ 
          marginLeft: theme.spacing.md,
          opacity: 0.7,
          width: 24,
          height: 24,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
          <Ionicons 
            name={rightIcon} 
            size={20} 
            color={theme.colors.text.secondary} 
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={[containerStyle, { width: '100%' }]}>
      {label && (
        <Animated.Text style={[getLabelStyle(), labelStyle, animatedLabelStyle]}>
          {label}
          {required && <Text style={{ color: theme.colors.error[500] }}> *</Text>}
        </Animated.Text>
      )}
      
      <View style={getContainerStyle()}>
        {renderLeftIcon()}
        
        <AnimatedTextInput
          ref={ref}
          style={[getInputStyle(), inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.tertiary}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          editable={!disabled}
          {...props}
        />
        
        {renderRightIcon()}
      </View>

      {(error || helperText) && (
        <Animated.Text style={[getErrorStyle(), errorStyle, animatedErrorStyle]}>
          {error || helperText}
        </Animated.Text>
      )}
    </View>
  );
});

EnhancedInput.displayName = 'EnhancedInput';
