import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInDown,
} from 'react-native-reanimated';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import { useCurrentTheme } from '../../store/themeStore';
import { EmptyState } from '../../components/EmptyState';
import { ThemedButton } from '../../components/ThemedButton';

export const SubscriptionScreen: React.FC = () => {
  const theme = useCurrentTheme();
  const { plans, currentSubscription, isLoading, selectPlan, cancelSubscription, reactivateSubscription } = useSubscriptionStore();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handlePlanSelection = (planId: string) => {
    setSelectedPlan(planId);
    setShowConfirmation(true);
  };

  const confirmPlanSelection = () => {
    if (selectedPlan) {
      selectPlan(selectedPlan);
      setShowConfirmation(false);
      setSelectedPlan(null);
    }
  };

  const handleCancelSubscription = () => {
    cancelSubscription();
    setShowCancelModal(false);
  };

  const handleReactivateSubscription = () => {
    reactivateSubscription();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return theme.colors.success[500];
      case 'cancelled': return theme.colors.error[500];
      case 'expired': return theme.colors.warning[500];
      default: return theme.colors.text.secondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'cancelled': return 'Cancelled';
      case 'expired': return 'Expired';
      default: return 'Unknown';
    }
  };

  if (!currentSubscription && plans.length === 0) {
    return (
      <EmptyState
        icon="💳"
        title="No Subscription Plans"
        message="Subscription plans are currently unavailable. Please check back later."
        actionText="Refresh"
        onAction={() => {}}
      />
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Subscription Plans
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.text.secondary }]}>
          Choose the perfect plan for your trading needs
        </Text>
      </Animated.View>

      {currentSubscription && (
        <Animated.View entering={FadeInUp.delay(200)} style={styles.currentPlanSection}>
          <View style={[styles.currentPlanCard, { backgroundColor: theme.colors.background.secondary }]}>
            <View style={styles.currentPlanHeader}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(currentSubscription.status) }]}>
                <Text style={styles.statusText}>{getStatusText(currentSubscription.status)}</Text>
              </View>
              <Text style={[styles.currentPlanTitle, { color: theme.colors.text.primary }]}>
                Current Plan
              </Text>
            </View>
            
            <View style={styles.currentPlanDetails}>
              <Text style={[styles.planName, { color: theme.colors.text.primary }]}>
                {plans.find(p => p.id === currentSubscription.planId)?.name || 'Unknown Plan'}
              </Text>
              <Text style={[styles.planPrice, { color: theme.colors.primary[500] }]}>
                ${plans.find(p => p.id === currentSubscription.planId)?.price}/month
              </Text>
              <Text style={[styles.planDates, { color: theme.colors.text.secondary }]}>
                Started: {new Date(currentSubscription.startDate).toLocaleDateString()}
              </Text>
              <Text style={[styles.planDates, { color: theme.colors.text.secondary }]}>
                Next billing: {new Date(currentSubscription.nextBillingDate).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.currentPlanActions}>
              {currentSubscription.status === 'active' ? (
                <TouchableOpacity 
                  style={[styles.actionButton, { borderColor: theme.colors.error[500] }]}
                  onPress={() => setShowCancelModal(true)}
                >
                  <Text style={[styles.actionButtonText, { color: theme.colors.error[500] }]}>
                    Cancel Subscription
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={[styles.actionButton, { borderColor: theme.colors.primary[500] }]}
                  onPress={handleReactivateSubscription}
                >
                  <Text style={[styles.actionButtonText, { color: theme.colors.primary[500] }]}>
                    Reactivate
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Animated.View>
      )}

      <Animated.View entering={FadeInUp.delay(300)} style={styles.plansSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
          Available Plans
        </Text>
        
        {plans.map((plan, index) => (
          <Animated.View 
            key={plan.id}
            entering={FadeInUp.delay(400 + index * 100)}
            style={[
              styles.planCard,
              { 
                backgroundColor: theme.colors.background.secondary,
                borderColor: plan.isPopular ? theme.colors.primary[500] : theme.colors.border.primary
              }
            ]}
          >
            {plan.isPopular && (
              <View style={[styles.popularBadge, { backgroundColor: theme.colors.primary[500] }]}>
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}
            
            <View style={styles.planHeader}>
              <Text style={[styles.planName, { color: theme.colors.text.primary }]}>
                {plan.name}
              </Text>
              <View style={styles.planPricing}>
                <Text style={[styles.planPrice, { color: theme.colors.primary[500] }]}>
                  ${plan.price}
                </Text>
                <Text style={[styles.planPeriod, { color: theme.colors.text.secondary }]}>
                  /{plan.interval}
                </Text>
              </View>
            </View>

            <View style={styles.planFeatures}>
              {plan.features.map((feature, featureIndex) => (
                <View key={featureIndex} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={20} color={theme.colors.success[500]} />
                  <Text style={[styles.featureText, { color: theme.colors.text.secondary }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.selectPlanButton,
                { 
                  backgroundColor: plan.isPopular ? theme.colors.primary[500] : theme.colors.background.tertiary,
                  borderColor: plan.isPopular ? theme.colors.primary[500] : theme.colors.border.primary
                }
              ]}
              onPress={() => handlePlanSelection(plan.id)}
              disabled={isLoading}
            >
              <Text style={[
                styles.selectPlanButtonText,
                { 
                  color: plan.isPopular ? theme.colors.background.primary : theme.colors.text.primary 
                }
              ]}>
                {currentSubscription?.planId === plan.id ? 'Current Plan' : 'Select Plan'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </Animated.View>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmation}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            entering={SlideInDown}
            style={[styles.confirmationModal, { backgroundColor: theme.colors.background.primary }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                Confirm Subscription
              </Text>
              <Text style={[styles.modalMessage, { color: theme.colors.text.secondary }]}>
                Are you sure you want to subscribe to the{' '}
                <Text style={{ color: theme.colors.primary[500] }}>
                  {plans.find(p => p.id === selectedPlan)?.name}
                </Text>{' '}
                plan for ${plans.find(p => p.id === selectedPlan)?.price}/month?
              </Text>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: theme.colors.border.primary }]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={[styles.modalButtonText, { color: theme.colors.text.secondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              
              <ThemedButton
                title="Confirm"
                onPress={confirmPlanSelection}
                loading={isLoading}
                style={styles.confirmButton}
              />
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Cancel Subscription Modal */}
      <Modal
        visible={showCancelModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCancelModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            entering={SlideInDown}
            style={[styles.confirmationModal, { backgroundColor: theme.colors.background.primary }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text.primary }]}>
                Cancel Subscription
              </Text>
              <Text style={[styles.modalMessage, { color: theme.colors.text.secondary }]}>
                Are you sure you want to cancel your subscription? You&apos;ll lose access to premium features at the end of your current billing period.
              </Text>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: theme.colors.border.primary }]}
                onPress={() => setShowCancelModal(false)}
              >
                <Text style={[styles.modalButtonText, { color: theme.colors.text.secondary }]}>
                  Keep Subscription
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: theme.colors.error[500] }]}
                onPress={handleCancelSubscription}
              >
                <Text style={[styles.modalButtonText, { color: theme.colors.error[500] }]}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
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
    maxWidth: 300,
  },
  currentPlanSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  currentPlanCard: {
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  currentPlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  currentPlanTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  currentPlanDetails: {
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  planPeriod: {
    fontSize: 16,
  },
  planDates: {
    fontSize: 14,
    marginBottom: 4,
  },
  currentPlanActions: {
    alignItems: 'center',
  },
  actionButton: {
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  plansSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  planCard: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  popularText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  planHeader: {
    marginBottom: 20,
  },
  planPricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planFeatures: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  selectPlanButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
  },
  selectPlanButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  confirmationModal: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
  },
});
