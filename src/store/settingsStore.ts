import { create } from 'zustand';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  country?: string;
  dateOfBirth?: string;
  kycStatus: 'pending' | 'verified' | 'rejected' | 'not_started';
  kycDocuments: Array<{
    type: 'passport' | 'drivers_license' | 'national_id';
    status: 'pending' | 'verified' | 'rejected';
    uploadedAt: string;
  }>;
  linkedAccounts: Array<{
    id: string;
    type: 'bank' | 'card' | 'crypto_wallet';
    name: string;
    lastFour?: string;
    isVerified: boolean;
    linkedAt: string;
  }>;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator' | 'sms' | 'email';
  lastPasswordChange: string;
  passwordExpiryDays: number;
  loginNotifications: boolean;
  withdrawalNotifications: boolean;
  suspiciousActivityAlerts: boolean;
  devices: Array<{
    id: string;
    name: string;
    type: 'mobile' | 'desktop' | 'tablet';
    location: string;
    lastActive: string;
    isCurrent: boolean;
    ipAddress: string;
  }>;
}

export interface Preferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    tradingSignals: boolean;
    marketAlerts: boolean;
    portfolioUpdates: boolean;
    securityAlerts: boolean;
  };
  trading: {
    defaultLeverage: number;
    riskTolerance: 'low' | 'medium' | 'high';
    autoClosePositions: boolean;
    confirmTrades: boolean;
  };
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'trading' | 'security' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful: number;
  notHelpful: number;
}

interface SettingsState {
  profile: UserProfile;
  security: SecuritySettings;
  preferences: Preferences;
  supportTickets: SupportTicket[];
  faqs: FAQ[];
  isLoading: boolean;
  
  // Actions
  setProfile: (profile: UserProfile) => void;
  setSecurity: (security: SecuritySettings) => void;
  setPreferences: (preferences: Preferences) => void;
  setSupportTickets: (tickets: SupportTicket[]) => void;
  setFaqs: (faqs: FAQ[]) => void;
  setLoading: (loading: boolean) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSecurity: (updates: Partial<SecuritySettings>) => void;
  updatePreferences: (updates: Partial<Preferences>) => void;
  toggleTwoFactor: () => void;
  addDevice: (device: SecuritySettings['devices'][0]) => void;
  removeDevice: (deviceId: string) => void;
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  profile: {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Product designer and crypto enthusiast. Building the future of decentralized finance.',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    dateOfBirth: '1990-05-15',
    kycStatus: 'verified',
    kycDocuments: [
      {
        type: 'passport',
        status: 'verified',
        uploadedAt: '2024-01-10T10:00:00Z'
      },
      {
        type: 'drivers_license',
        status: 'verified',
        uploadedAt: '2024-01-10T10:00:00Z'
      }
    ],
    linkedAccounts: [
      {
        id: '1',
        type: 'bank',
        name: 'Chase Bank',
        lastFour: '1234',
        isVerified: true,
        linkedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        type: 'card',
        name: 'Visa Credit Card',
        lastFour: '5678',
        isVerified: true,
        linkedAt: '2024-01-01T00:00:00Z'
      },
      {
        id: '3',
        type: 'crypto_wallet',
        name: 'MetaMask',
        isVerified: true,
        linkedAt: '2024-01-01T00:00:00Z'
      }
    ]
  },
  security: {
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator',
    lastPasswordChange: '2024-01-01T00:00:00Z',
    passwordExpiryDays: 90,
    loginNotifications: true,
    withdrawalNotifications: true,
    suspiciousActivityAlerts: true,
    devices: [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        type: 'mobile',
        location: 'New York, NY',
        lastActive: '2024-01-15T14:30:00Z',
        isCurrent: true,
        ipAddress: '192.168.1.100'
      },
      {
        id: '2',
        name: 'MacBook Pro',
        type: 'desktop',
        location: 'New York, NY',
        lastActive: '2024-01-15T12:00:00Z',
        isCurrent: false,
        ipAddress: '192.168.1.101'
      },
      {
        id: '3',
        name: 'iPad Air',
        type: 'tablet',
        location: 'San Francisco, CA',
        lastActive: '2024-01-14T18:00:00Z',
        isCurrent: false,
        ipAddress: '10.0.0.50'
      }
    ]
  },
  preferences: {
    theme: 'auto',
    language: 'en',
    currency: 'USD',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    notifications: {
      push: true,
      email: true,
      sms: false,
      tradingSignals: true,
      marketAlerts: true,
      portfolioUpdates: true,
      securityAlerts: true
    },
    trading: {
      defaultLeverage: 1,
      riskTolerance: 'medium',
      autoClosePositions: false,
      confirmTrades: true
    }
  },
  supportTickets: [
    {
      id: '1',
      subject: 'Unable to withdraw funds',
      description: 'I\'m trying to withdraw my funds but getting an error message.',
      category: 'trading',
      priority: 'high',
      status: 'in_progress',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T14:00:00Z',
      assignedTo: 'Support Team'
    },
    {
      id: '2',
      subject: 'Two-factor authentication setup',
      description: 'Need help setting up 2FA on my account.',
      category: 'security',
      priority: 'medium',
      status: 'resolved',
      createdAt: '2024-01-14T15:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      assignedTo: 'Security Team'
    }
  ],
  faqs: [
    {
      id: '1',
      question: 'How do I enable two-factor authentication?',
      answer: 'Go to Settings > Security > Two-Factor Authentication and follow the setup instructions. You can use an authenticator app like Google Authenticator or Authy.',
      category: 'Security',
      tags: ['2FA', 'security', 'authentication'],
      helpful: 45,
      notHelpful: 2
    },
    {
      id: '2',
      question: 'What are the withdrawal fees?',
      answer: 'Withdrawal fees vary by method. Bank transfers have a $25 fee, while crypto withdrawals have a small network fee. Check the withdrawal page for current rates.',
      category: 'Fees',
      tags: ['withdrawal', 'fees', 'bank', 'crypto'],
      helpful: 32,
      notHelpful: 5
    },
    {
      id: '3',
      question: 'How do trading signals work?',
      answer: 'Our AI-powered system analyzes market data to generate trading signals. You can customize your preferences and receive alerts for opportunities that match your criteria.',
      category: 'Trading',
      tags: ['signals', 'AI', 'trading', 'alerts'],
      helpful: 67,
      notHelpful: 3
    },
    {
      id: '4',
      question: 'Is my account insured?',
      answer: 'Yes, we provide insurance coverage for digital assets held in our custody. Coverage limits and terms are detailed in our insurance policy.',
      category: 'Security',
      tags: ['insurance', 'security', 'coverage'],
      helpful: 28,
      notHelpful: 1
    }
  ],
  isLoading: false,

  setProfile: (profile) => set({ profile }),
  setSecurity: (security) => set({ security }),
  setPreferences: (preferences) => set({ preferences }),
  setSupportTickets: (supportTickets) => set({ supportTickets }),
  setFaqs: (faqs) => set({ faqs }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  updateProfile: (updates) => {
    const { profile } = get();
    set({ profile: { ...profile, ...updates } });
  },
  
  updateSecurity: (updates) => {
    const { security } = get();
    set({ security: { ...security, ...updates } });
  },
  
  updatePreferences: (updates) => {
    const { preferences } = get();
    set({ preferences: { ...preferences, ...updates } });
  },
  
  toggleTwoFactor: () => {
    const { security } = get();
    set({ 
      security: { 
        ...security, 
        twoFactorEnabled: !security.twoFactorEnabled 
      } 
    });
  },
  
  addDevice: (device) => {
    const { security } = get();
    set({ 
      security: { 
        ...security, 
        devices: [...security.devices, device] 
      } 
    });
  },
  
  removeDevice: (deviceId) => {
    const { security } = get();
    set({ 
      security: { 
        ...security, 
        devices: security.devices.filter(d => d.id !== deviceId) 
      } 
    });
  },
  
  createSupportTicket: (ticket) => {
    const { supportTickets } = get();
    const newTicket: SupportTicket = {
      ...ticket,
      id: `ticket_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    set({ supportTickets: [newTicket, ...supportTickets] });
  }
}));
