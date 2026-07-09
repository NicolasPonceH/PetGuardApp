import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../theme/colors';

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  iconColor: string;
  iconEmoji: string;
  children?: React.ReactNode;
  topRight?: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  unit,
  iconColor,
  iconEmoji,
  children,
  topRight,
}: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: iconColor + '20' }]}>
          <Text style={styles.iconEmoji}>{iconEmoji}</Text>
        </View>
        {topRight}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
      {children}
    </View>
  );
}

export function MiniECG() {
  return (
    <Svg width={100} height={28} viewBox="0 0 100 28">
      <Path
        d="M0 14 L10 14 L15 6 L20 22 L25 10 L30 18 L35 14 L45 14 L50 6 L55 22 L60 10 L65 18 L70 14 L80 14 L85 6 L90 22 L95 14 L100 14"
        stroke={Colors.heartRed}
        strokeWidth={1.8}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CircularProgress({ percent, color }: { percent: number; color: string }) {
  const size = 36;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <Svg width={size} height={size}>
      <Path
        d={`M ${size / 2} ${strokeWidth / 2} A ${radius} ${radius} 0 1 1 ${size / 2 - 0.01} ${strokeWidth / 2}`}
        stroke="#e0e0e0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Path
        d={`M ${size / 2} ${strokeWidth / 2} A ${radius} ${radius} 0 ${percent > 50 ? 1 : 0} 1 ${
          size / 2 + radius * Math.sin((percent / 100) * 2 * Math.PI)
        } ${size / 2 - radius * Math.cos((percent / 100) * 2 * Math.PI)}`}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function ProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${percent}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 16,
    flex: 1,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconEmoji: { fontSize: 18 },
  title: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#6b7b6b',
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  value: {
    fontSize: 28,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
  },
  unit: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#436900',
  },
  progressBg: {
    height: 6,
    backgroundColor: '#e8efe4',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
