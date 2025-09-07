import { BlurView } from 'expo-blur';
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react-native';
import React, { useEffect, useRef } from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useCurrentTheme } from '../store/themeStore';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
  onPress?: () => void;
  style?: ViewStyle;
  showIcon?: boolean;
  showCloseButton?: boolean;
  position?: 'top' | 'bottom';
}

interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  onPress,
  style,
  showIcon = true,
  showCloseButton = true,
  position = 'top',
}) => {
  const theme = useCurrentTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Show toast
    translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });

    // Auto hide after duration
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const hideToast = () => {
    translateY.value = withTiming(-100, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withSpring(0.8, { damping: 15, stiffness: 300 }, () => {
      runOnJS(onClose)?.();
    });
  };

  const handleClose = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    hideToast();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: theme.colors.success[50],
          borderColor: theme.colors.success[500],
          iconColor: theme.colors.success[500],
          textColor: theme.colors.success[600],
          icon: <CheckCircle size={20} color={theme.colors.success[500]} />,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error[50],
          borderColor: theme.colors.error[500],
          iconColor: theme.colors.error[500],
          textColor: theme.colors.error[600],
          icon: <XCircle size={20} color={theme.colors.error[500]} />,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning[50],
          borderColor: theme.colors.warning[500],
          iconColor: theme.colors.warning[500],
          textColor: theme.colors.warning[600],
          icon: <AlertCircle size={20} color={theme.colors.warning[500]} />,
        };
      default:
        return {
          backgroundColor: theme.colors.info[50],
          borderColor: theme.colors.info[500],
          iconColor: theme.colors.info[500],
          textColor: theme.colors.info[600],
          icon: <Info size={20} color={theme.colors.info[500]} />,
        };
    }
  };

  const typeStyles = getTypeStyles();

  const containerStyle: ViewStyle = {
    position: 'absolute',
    left: theme.spacing.md,
    right: theme.spacing.md,
    [position]: theme.spacing.lg,
    zIndex: 1000,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: typeStyles.borderColor,
    backgroundColor: typeStyles.backgroundColor,
  };

  const contentStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  };

  const localTextStyle: TextStyle = {
    flex: 1,
    fontSize: 14,
    fontWeight: 500,
    color: typeStyles.textColor,
    marginLeft: showIcon ? theme.spacing.sm : 0,
  };

  const iconContainerStyle: ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
  };

  const closeButtonStyle: ViewStyle = {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.xs,
  };

  const ToastComponent = onPress ? TouchableOpacity : View;

  return (
    <Animated.View style={[containerStyle, animatedStyle, style]}>
      <BlurView intensity={20} style={{ borderRadius: theme.borderRadius.lg }}>
        <ToastComponent
          style={contentStyle}
          onPress={onPress}
          activeOpacity={onPress ? 0.8 : 1}
        >
          {showIcon && (
            <View style={iconContainerStyle}>
              {typeStyles.icon}
            </View>
          )}

          <Text style={localTextStyle} numberOfLines={3}>
            {message}
          </Text>

          {showCloseButton && (
            <TouchableOpacity
              style={closeButtonStyle}
              onPress={handleClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={16} color={typeStyles.iconColor} />
            </TouchableOpacity>
          )}
        </ToastComponent>
      </BlurView>
    </Animated.View>
  );
};

// Toast Manager
interface ToastManagerState {
  toasts: ToastState[];
  addToast: (toast: Omit<ToastState, 'visible'>) => void;
  removeToast: (index: number) => void;
  clearToasts: () => void;
}

export const useToastManager = () => {
  const [toasts, setToasts] = React.useState<ToastState[]>([]);

  const addToast = (toast: Omit<ToastState, 'visible'>) => {
    const newToast: ToastState = {
      ...toast,
      visible: true,
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (index: number) => {
    setToasts(prev => prev.filter((_, i) => i !== index));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };
};

// Convenience functions
export const showSuccessToast = (message: string, duration?: number) => {
  // Implementation would depend on your toast management system
  console.log('Success Toast:', message);
};

export const showErrorToast = (message: string, duration?: number) => {
  console.log('Error Toast:', message);
};

export const showWarningToast = (message: string, duration?: number) => {
  console.log('Warning Toast:', message);
};

export const showInfoToast = (message: string, duration?: number) => {
  console.log('Info Toast:', message);
};
