import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';

const DATA_POINTS = [14, 12, 16, 11, 15, 13, 17, 12, 14, 16, 13, 15];
const LABELS = ['8am', '10am', '12pm', '2pm'];

export default function HealthChart() {
  const w = 280;
  const h = 80;
  const padding = 10;
  const graphW = w - padding * 2;
  const graphH = h - padding * 2;

  const minVal = Math.min(...DATA_POINTS) - 2;
  const maxVal = Math.max(...DATA_POINTS) + 2;

  const points = DATA_POINTS.map((val, i) => {
    const x = padding + (i / (DATA_POINTS.length - 1)) * graphW;
    const y = padding + graphH - ((val - minVal) / (maxVal - minVal)) * graphH;
    return { x, y };
  });

  const linePath = points.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`)).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1].x} ${h} L${points[0].x} ${h} Z`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado de Salud</Text>
      <View style={styles.chartWrapper}>
        <Svg width={w} height={h}>
          <Defs>
            <SvgGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#a8ff3e" stopOpacity={0.3} />
              <Stop offset="1" stopColor="#a8ff3e" stopOpacity={0.02} />
            </SvgGradient>
          </Defs>
          <Path d={areaPath} fill="url(#areaGrad)" />
          <Path d={linePath} stroke="#6bdb00" strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
        <View style={styles.labels}>
          {LABELS.map((label) => (
            <Text key={label} style={styles.label}>{label}</Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
    marginBottom: 12,
  },
  chartWrapper: { alignItems: 'center' },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  label: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    color: '#8a9b80',
  },
});
