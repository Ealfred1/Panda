import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCurrentTheme } from '../store/themeStore';

interface IllustrationProps {
  size?: number;
  color?: string;
}

export const PremiumIllustrations = {
  // Empty Portfolio Illustration
  EmptyPortfolio: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.primary[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.chartContainer, { borderColor: fillColor }]}>
          <View style={[styles.chartBar, { backgroundColor: fillColor, height: size * 0.3 }]} />
          <View style={[styles.chartBar, { backgroundColor: fillColor, height: size * 0.5 }]} />
          <View style={[styles.chartBar, { backgroundColor: fillColor, height: size * 0.2 }]} />
          <View style={[styles.chartBar, { backgroundColor: fillColor, height: size * 0.7 }]} />
        </View>
        <View style={[styles.coin, { backgroundColor: fillColor }]} />
        <View style={[styles.coin, { backgroundColor: fillColor, top: size * 0.6, left: size * 0.7 }]} />
      </View>
    );
  },

  // No Data Illustration
  NoData: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.secondary[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.document, { borderColor: fillColor }]}>
          <View style={[styles.documentLine, { backgroundColor: fillColor }]} />
          <View style={[styles.documentLine, { backgroundColor: fillColor, width: '60%' }]} />
          <View style={[styles.documentLine, { backgroundColor: fillColor, width: '80%' }]} />
        </View>
        <View style={[styles.magnifyingGlass, { borderColor: fillColor }]} />
      </View>
    );
  },

  // Success Illustration
  Success: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.success[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.circle, { borderColor: fillColor }]}>
          <View style={[styles.checkmark, { borderColor: fillColor }]} />
        </View>
        <View style={[styles.sparkle, { backgroundColor: fillColor, top: size * 0.1, right: size * 0.1 }]} />
        <View style={[styles.sparkle, { backgroundColor: fillColor, top: size * 0.3, left: size * 0.1 }]} />
        <View style={[styles.sparkle, { backgroundColor: fillColor, bottom: size * 0.2, right: size * 0.2 }]} />
      </View>
    );
  },

  // Error Illustration
  Error: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.error[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.errorCircle, { borderColor: fillColor }]}>
          <View style={[styles.errorX, { backgroundColor: fillColor }]} />
        </View>
        <View style={[styles.errorDot, { backgroundColor: fillColor, top: size * 0.2, left: size * 0.3 }]} />
        <View style={[styles.errorDot, { backgroundColor: fillColor, top: size * 0.4, right: size * 0.2 }]} />
      </View>
    );
  },

  // Loading Illustration
  Loading: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.primary[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.loadingCircle, { borderColor: fillColor }]}>
          <View style={[styles.loadingDot, { backgroundColor: fillColor }]} />
        </View>
        <View style={[styles.loadingDot, { backgroundColor: fillColor, top: size * 0.3, left: size * 0.2 }]} />
        <View style={[styles.loadingDot, { backgroundColor: fillColor, top: size * 0.5, right: size * 0.3 }]} />
      </View>
    );
  },

  // Market Trends Illustration
  MarketTrends: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.primary[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.trendLine, { backgroundColor: fillColor }]} />
        <View style={[styles.trendPoint, { backgroundColor: fillColor, top: size * 0.2, left: size * 0.2 }]} />
        <View style={[styles.trendPoint, { backgroundColor: fillColor, top: size * 0.4, left: size * 0.4 }]} />
        <View style={[styles.trendPoint, { backgroundColor: fillColor, top: size * 0.3, left: size * 0.6 }]} />
        <View style={[styles.trendPoint, { backgroundColor: fillColor, top: size * 0.6, left: size * 0.8 }]} />
      </View>
    );
  },

  // Trading Illustration
  Trading: ({ size = 120, color }: IllustrationProps) => {
    const theme = useCurrentTheme();
    const fillColor = color || theme.colors.secondary[500];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View style={[styles.tradingChart, { borderColor: fillColor }]}>
          <View style={[styles.candle, { backgroundColor: fillColor, height: size * 0.3 }]} />
          <View style={[styles.candle, { backgroundColor: fillColor, height: size * 0.5 }]} />
          <View style={[styles.candle, { backgroundColor: fillColor, height: size * 0.2 }]} />
          <View style={[styles.candle, { backgroundColor: fillColor, height: size * 0.6 }]} />
        </View>
        <View style={[styles.tradingIcon, { backgroundColor: fillColor }]} />
      </View>
    );
  },
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Portfolio Chart
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '80%',
    height: '60%',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  chartBar: {
    width: 8,
    borderRadius: 4,
  },
  
  // Coins
  coin: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    top: '20%',
    left: '10%',
  },
  
  // Document
  document: {
    width: '60%',
    height: '70%',
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-around',
  },
  documentLine: {
    height: 4,
    borderRadius: 2,
  },
  
  // Magnifying Glass
  magnifyingGlass: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    borderWidth: 3,
    borderRadius: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    transform: [{ rotate: '45deg' }],
    right: '10%',
    bottom: '10%',
  },
  
  // Success Circle
  circle: {
    width: '80%',
    height: '80%',
    borderWidth: 4,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: '40%',
    height: '20%',
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    transform: [{ rotate: '-45deg' }],
    marginLeft: 8,
  },
  sparkle: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  // Error Circle
  errorCircle: {
    width: '80%',
    height: '80%',
    borderWidth: 4,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorX: {
    width: '60%',
    height: 4,
    borderRadius: 2,
    transform: [{ rotate: '45deg' }],
  },
  errorDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  
  // Loading
  loadingCircle: {
    width: '60%',
    height: '60%',
    borderWidth: 3,
    borderRadius: 40,
    borderTopColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  // Market Trends
  trendLine: {
    position: 'absolute',
    width: '80%',
    height: 2,
    borderRadius: 1,
    top: '50%',
    left: '10%',
  },
  trendPoint: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  
  // Trading
  tradingChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '80%',
    height: '60%',
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  candle: {
    width: 6,
    borderRadius: 3,
  },
  tradingIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    top: '20%',
    right: '15%',
  },
});
