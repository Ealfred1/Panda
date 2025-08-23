import { create } from 'zustand';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
  isCurrent?: boolean;
}

export interface Subscription {
  id: string;
  planId: string;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  nextBillingDate: string;
}

interface SubscriptionState {
  plans: SubscriptionPlan[];
  currentSubscription: Subscription | null;
  isLoading: boolean;
  
  // Actions
  setPlans: (plans: SubscriptionPlan[]) => void;
  setCurrentSubscription: (subscription: Subscription | null) => void;
  setLoading: (loading: boolean) => void;
  selectPlan: (planId: string) => void;
  cancelSubscription: () => void;
  reactivateSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      price: 9.99,
      currency: 'USD',
      interval: 'monthly',
      features: [
        'Basic trading signals',
        'Portfolio tracking',
        'Market alerts',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29.99,
      currency: 'USD',
      interval: 'monthly',
      features: [
        'Advanced trading signals',
        'Real-time alerts',
        'Portfolio analytics',
        'Priority support',
        'API access'
      ],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99.99,
      currency: 'USD',
      interval: 'monthly',
      features: [
        'All Pro features',
        'Custom strategies',
        'Dedicated account manager',
        'White-label solutions',
        'Advanced reporting'
      ]
    }
  ],
  currentSubscription: null,
  isLoading: false,

  setPlans: (plans) => set({ plans }),
  setCurrentSubscription: (subscription) => set({ currentSubscription: subscription }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  selectPlan: (planId) => {
    const { plans } = get();
    const selectedPlan = plans.find(plan => plan.id === planId);
    if (selectedPlan) {
      set({ isLoading: true });
      
      // Simulate API call
      setTimeout(() => {
        const newSubscription: Subscription = {
          id: `sub_${Date.now()}`,
          planId,
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: true,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
        
        set({ 
          currentSubscription: newSubscription,
          isLoading: false 
        });
      }, 2000);
    }
  },
  
  cancelSubscription: () => {
    const { currentSubscription } = get();
    if (currentSubscription) {
      set({ isLoading: true });
      
      setTimeout(() => {
        set({
          currentSubscription: {
            ...currentSubscription,
            status: 'cancelled',
            autoRenew: false
          },
          isLoading: false
        });
      }, 1500);
    }
  },
  
  reactivateSubscription: () => {
    const { currentSubscription } = get();
    if (currentSubscription) {
      set({ isLoading: true });
      
      setTimeout(() => {
        set({
          currentSubscription: {
            ...currentSubscription,
            status: 'active',
            autoRenew: true
          },
          isLoading: false
        });
      }, 1500);
    }
  }
}));
