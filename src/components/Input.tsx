import { AlertCircle, Eye, EyeOff } from 'lucide-react-native';
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
    withTiming,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const Input = forwardRef<TextInput, InputProps>(({
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
  ...props
}, ref) => {
  const theme = useCurrentTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const focusAnim = useSharedValue(0);
  const labelAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
    if (!hasValue) {
      labelAnim.value = withTiming(1, { duration: 200 });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnim.value = withTiming(0, { duration: 200 });
    if (!hasValue) {
      labelAnim.value = withTiming(0, { duration: 200 });
    }
  };

  const handleChangeText = (text: string) => {
    setHasValue(text.length > 0);
    if (text.length > 0 && !hasValue) {
      labelAnim.value = withTiming(1, { duration: 200 });
    } else if (text.length === 0 && hasValue) {
      labelAnim.value = withTiming(0, { duration: 200 });
    }
    props.onChangeText?.(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      marginBottom: theme.spacing.md,
    };

    const sizeStyles = {
      sm: { minHeight: 40 },
      md: { minHeight: 48 },
      lg: { minHeight: 56 },
    };

    const variantStyles = {
      default: {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.border.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      },
      outlined: {
        borderWidth: 2,
        borderColor: theme.colors.border.primary,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      },
      filled: {
        backgroundColor: theme.colors.background.secondary,
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(isFocused && {
        borderColor: error ? theme.colors.error[500] : theme.colors.primary[500],
      }),
      ...(error && {
        borderColor: theme.colors.error[500],
      }),
      ...(success && {
        borderColor: theme.colors.success[500],
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
    const baseStyle: TextStyle = {
      color: theme.colors.text.secondary,
      fontSize: 14,
      marginBottom: theme.spacing.xs,
    };

    return {
      ...baseStyle,
      ...(isFocused && {
        color: theme.colors.primary[500],
      }),
      ...(error && {
        color: theme.colors.error[500],
      }),
    };
  };

  const getErrorStyle = (): TextStyle => {
    return {
      color: theme.colors.error[500],
      fontSize: 12,
      marginTop: theme.spacing.xs,
    };
  };

  const animatedLabelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          labelAnim.value,
          [0, 1],
          [0, -8]
        ),
      },
      {
        scale: interpolate(
          labelAnim.value,
          [0, 1],
          [1, 0.85]
        ),
      },
    ],
  }));

  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    return (
      <View style={{ marginRight: theme.spacing.sm }}>
        {leftIcon}
      </View>
    );
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={{ marginLeft: theme.spacing.sm }}
        >
          {isPasswordVisible ? (
            <EyeOff size={20} color={theme.colors.text.tertiary} />
          ) : (
            <Eye size={20} color={theme.colors.text.tertiary} />
          )}
        </TouchableOpacity>
      );
    }

    if (error) {
      return (
        <View style={{ marginLeft: theme.spacing.sm }}>
          <AlertCircle size={20} color={theme.colors.error[500]} />
        </View>
      );
    }

    if (rightIcon) {
      return (
        <View style={{ marginLeft: theme.spacing.sm }}>
          {rightIcon}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={containerStyle}>
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
        <Text style={[getErrorStyle(), errorStyle]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
});
