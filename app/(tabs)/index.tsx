import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MetricCard, { MiniECG, CircularProgress, ProgressBar } from '../../src/components/MetricCard';
import ActivityItem from '../../src/components/ActivityItem';
import HealthChart from '../../src/components/HealthChart';
import { Colors } from '../../src/theme/colors';

const { width } = Dimensions.get('window');

export default function DashboardScreen() {
  // Pulse animation for heart icon
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dotAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.15, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(dotAnim, { toValue: 0.3, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.menuIcon}>☰</Text>
          <View style={styles.logoRow}>
            <Text style={styles.logoPaw}>🐾</Text>
            <Text style={styles.logoText}>PetGuard</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>M</Text>
          </View>
        </View>

        {/* Saludo */}
        <View style={styles.greetSection}>
          <Text style={styles.greeting}>Hola, Max 👋</Text>
          <View style={styles.statusChip}>
            <Text style={styles.statusText}>✓ está bien hoy</Text>
          </View>
        </View>

        {/* Grid 2x2 */}
        <View style={styles.grid}>
          {/* Ritmo Cardíaco */}
          <View style={styles.gridItem}>
            <MetricCard
              title="Ritmo Cardíaco"
              value="87"
              unit="bpm"
              iconColor={Colors.heartRed}
              iconEmoji="❤️"
              topRight={
                <Animated.View style={[styles.pulsingDot, { opacity: dotAnim }]} />
              }
            >
              <MiniECG />
            </MetricCard>
          </View>

          {/* Temperatura */}
          <View style={styles.gridItem}>
            <MetricCard
              title="Temperatura"
              value="38.5"
              unit="°C"
              iconColor={Colors.tempOrange}
              iconEmoji="🌡️"
            />
          </View>

          {/* Pasos */}
          <View style={styles.gridItem}>
            <MetricCard
              title="Pasos"
              value="6.200"
              unit=""
              iconColor={Colors.stepsBlue}
              iconEmoji="🐾"
              topRight={<CircularProgress percent={75} color={Colors.stepsBlue} />}
            />
          </View>

          {/* Batería Collar */}
          <View style={styles.gridItem}>
            <MetricCard
              title="Batería Collar"
              value="74"
              unit="%"
              iconColor="#89d628"
              iconEmoji="🔋"
            >
              <ProgressBar percent={74} color="#89d628" />
            </MetricCard>
          </View>
        </View>

        {/* Gráfico Salud */}
        <HealthChart />

        {/* Actividad Reciente */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <View style={styles.activityCard}>
            <ActivityItem
              icon="🚶"
              iconBg={Colors.stepsBlue}
              title="Paseo matutino"
              timeAgo="Hace 2 horas"
              detail="1.2 km"
            />
            <ActivityItem
              icon="🍖"
              iconBg={Colors.foodYellow}
              title="Comida"
              timeAgo="Hace 3 horas"
              detail="150g"
            />
            <ActivityItem
              icon="😴"
              iconBg={Colors.sleepPurple}
              title="Siesta profunda"
              timeAgo="Hace 5 horas"
              detail="2h 15m"
            />
          </View>
        </View>

        {/* Spacer for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.dashboardBg },
  container: { flex: 1 },
  content: { paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIcon: { fontSize: 24, color: '#1a2e1a' },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoPaw: { fontSize: 20 },
  logoText: {
    fontSize: 20,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#436900',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#fff',
  },
  greetSection: { marginTop: 8, marginBottom: 20 },
  greeting: {
    fontSize: 26,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
    marginBottom: 8,
  },
  statusChip: {
    backgroundColor: '#436900',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#d4ff90',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: (width - 52) / 2,
  },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.heartRed,
  },
  activitySection: { marginTop: 16 },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
    marginBottom: 12,
  },
  activityCard: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: 16,
  },
});
