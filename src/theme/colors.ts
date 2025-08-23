export const colors = {
  // Brand Colors
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  
  // Background Colors
  background: '#ffffff',
  surface: '#f8fafc',
  
  // Text Colors
  text: '#1f2937',
  textSecondary: '#6b7280',
  
  // Border Colors
  border: '#e5e7eb',
  
  // Status Colors
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
} as const;

export type Colors = typeof colors;
