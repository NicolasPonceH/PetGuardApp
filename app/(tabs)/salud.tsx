import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop, Circle as SvgCircle } from 'react-native-svg';
import { Colors } from '../../src/theme/colors';

const { width } = Dimensions.get('window');
const HEART_DATA = [82, 85, 87, 84, 89, 86, 88, 85, 87, 90, 88, 87];
const TEMP_DATA = [38.2, 38.3, 38.5, 38.4, 38.6, 38.5, 38.3, 38.4, 38.5, 38.3, 38.5, 38.4];
const HOURS = ['6am', '8am', '10am', '12pm', '2pm', '4pm'];

function MiniChart({ data, color, h = 60 }: { data: number[]; color: string; h?: number }) {
  const w2 = width - 80;
  const min = Math.min(...data) - 1;
  const max = Math.max(...data) + 1;
  const pts = data.map((v, i) => ({
    x: 5 + (i / (data.length - 1)) * (w2 - 10),
    y: 5 + (h - 10) - ((v - min) / (max - min)) * (h - 10),
  }));
  const line = pts.map((p, i) => (i === 0 ? `M${p.x} ${p.y}` : `L${p.x} ${p.y}`)).join(' ');
  const area = `${line} L${pts[pts.length - 1].x} ${h} L${pts[0].x} ${h} Z`;
  return (
    <Svg width={w2} height={h}>
      <Defs>
        <SvgGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={color} stopOpacity={0.25} />
          <Stop offset="1" stopColor={color} stopOpacity={0.02} />
        </SvgGradient>
      </Defs>
      <Path d={area} fill={`url(#g-${color})`} />
      <Path d={line} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
      <SvgCircle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={4} fill={color} />
    </Svg>
  );
}

export default function SaludScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.title}>Salud</Text>
        <Text style={s.sub}>Resumen biométrico de Max</Text>

        <View style={s.sumRow}>
          {[
            { i: '❤️', v: '87', l: 'bpm' },
            { i: '🌡️', v: '38.5', l: '°C' },
            { i: '⚡', v: 'Alta', l: 'Energía' },
            { i: '😴', v: '7.5', l: 'hrs sueño' },
          ].map((x) => (
            <View key={x.l} style={s.sumCard}>
              <Text style={{ fontSize: 20 }}>{x.i}</Text>
              <Text style={s.sumV}>{x.v}</Text>
              <Text style={s.sumL}>{x.l}</Text>
            </View>
          ))}
        </View>

        {/* Heart Rate */}
        <View style={s.card}>
          <View style={s.cardH}>
            <View style={[s.ic, { backgroundColor: Colors.heartRed + '20' }]}>
              <Text style={{ fontSize: 18 }}>❤️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.cLabel}>Ritmo Cardíaco</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text style={[s.cVal, { color: Colors.heartRed }]}>87</Text>
                <Text style={s.cUnit}>bpm</Text>
              </View>
            </View>
            <View style={[s.badge, { backgroundColor: Colors.heartRed + '20' }]}>
              <Text style={[s.badgeT, { color: Colors.heartRed }]}>Normal</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MiniChart data={HEART_DATA} color={Colors.heartRed} />
            <View style={s.labels}>
              {HOURS.map((h) => <Text key={h} style={s.lbl}>{h}</Text>)}
            </View>
          </View>
        </View>

        {/* Temperature */}
        <View style={s.card}>
          <View style={s.cardH}>
            <View style={[s.ic, { backgroundColor: Colors.tempOrange + '20' }]}>
              <Text style={{ fontSize: 18 }}>🌡️</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={s.cLabel}>Temperatura</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <Text style={[s.cVal, { color: Colors.tempOrange }]}>38.5</Text>
                <Text style={s.cUnit}>°C</Text>
              </View>
            </View>
            <View style={[s.badge, { backgroundColor: Colors.tempOrange + '20' }]}>
              <Text style={[s.badgeT, { color: Colors.tempOrange }]}>Normal</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <MiniChart data={TEMP_DATA} color={Colors.tempOrange} />
            <View style={s.labels}>
              {HOURS.map((h) => <Text key={h} style={s.lbl}>{h}</Text>)}
            </View>
          </View>
        </View>

        {/* Activity */}
        <View style={s.card}>
          <Text style={s.cardTitle}>Nivel de Actividad</Text>
          {[
            { l: '🚶 Caminata', w: '75%', c: Colors.stepsBlue, v: '45 min' },
            { l: '🏃 Correr', w: '40%', c: Colors.primary, v: '20 min' },
            { l: '😴 Descanso', w: '90%', c: Colors.sleepPurple, v: '7.5 hrs' },
          ].map((r) => (
            <View key={r.l} style={s.actRow}>
              <Text style={s.actL}>{r.l}</Text>
              <View style={s.actBg}>
                <View style={[s.actFill, { width: r.w as any, backgroundColor: r.c }]} />
              </View>
              <Text style={s.actV}>{r.v}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20 },
  title: { fontSize: 28, fontFamily: 'Outfit_700Bold', color: Colors.onSurface, marginTop: 16 },
  sub: { fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.onSurfaceVariant, marginBottom: 20 },
  sumRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  sumCard: { flex: 1, backgroundColor: Colors.surfaceContainer, borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.outlineVariant },
  sumV: { fontSize: 18, fontFamily: 'Outfit_700Bold', color: Colors.onSurface },
  sumL: { fontSize: 10, fontFamily: 'Inter_400Regular', color: Colors.onSurfaceVariant, marginTop: 2 },
  card: { backgroundColor: Colors.surfaceContainer, borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: Colors.outlineVariant },
  cardH: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  ic: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  cLabel: { fontSize: 13, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant },
  cVal: { fontSize: 24, fontFamily: 'Outfit_700Bold' },
  cUnit: { fontSize: 13, fontFamily: 'Inter_400Regular', color: Colors.onSurfaceVariant },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeT: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  labels: { flexDirection: 'row', justifyContent: 'space-between', width: width - 80, marginTop: 4 },
  lbl: { fontSize: 10, fontFamily: 'Inter_400Regular', color: Colors.outline },
  cardTitle: { fontSize: 16, fontFamily: 'Outfit_700Bold', color: Colors.onSurface, marginBottom: 16 },
  actRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  actL: { fontSize: 13, fontFamily: 'Inter_500Medium', color: Colors.onSurface, width: 100 },
  actBg: { flex: 1, height: 8, backgroundColor: Colors.outlineVariant, borderRadius: 4, marginHorizontal: 10, overflow: 'hidden' },
  actFill: { height: '100%', borderRadius: 4 },
  actV: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.onSurfaceVariant, width: 55, textAlign: 'right' },
});
