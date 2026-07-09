import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/theme/colors';
import { ProgressBar } from '../../src/components/MetricCard';

type CollarState = 'idle' | 'loading' | 'connected';

const LOADING_MESSAGES = [
  'Buscando dispositivos Bluetooth...',
  'Collar PetGuard detectado...',
  'Estableciendo conexión segura...',
  'Sincronizando datos del collar...',
];

export default function CollarScreen() {
  const [state, setState] = useState<CollarState>('idle');
  const [msgIndex, setMsgIndex] = useState(0);
  const router = useRouter();

  // Animated values
  const rotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const checkScale = useSharedValue(0);

  useEffect(() => {
    if (state === 'loading') {
      rotation.value = withRepeat(
        withTiming(360, { duration: 1500, easing: Easing.linear }),
        -1,
        false
      );
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );

      setMsgIndex(0);
      const interval = setInterval(() => {
        setMsgIndex((prev) => {
          if (prev >= LOADING_MESSAGES.length - 1) {
            clearInterval(interval);
            setTimeout(() => setState('connected'), 800);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);

      return () => clearInterval(interval);
    }

    if (state === 'connected') {
      checkScale.value = withSpring(1, { damping: 8, stiffness: 100 });
    }
  }, [state]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  // IDLE state
  if (state === 'idle') {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <View style={styles.collarIllustration}>
            <Text style={styles.collarEmoji}>📡</Text>
            <View style={styles.collarRing}>
              <View style={styles.collarDot} />
            </View>
          </View>
          <Text style={styles.title}>Vincula tu collar PetGuard</Text>
          <Text style={styles.subtitle}>
            Mantén presionado el botón lateral del collar durante 3 segundos
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => setState('loading')}
          >
            <LinearGradient
              colors={['#a8ff3e', '#6bdb00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btnGradient}
            >
              <Text style={styles.btnText}>Iniciar vinculación</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // LOADING state
  if (state === 'loading') {
    return (
      <View style={styles.container}>
        <View style={styles.centered}>
          <Animated.View style={[styles.loadingRing, ringStyle]}>
            <LinearGradient
              colors={['#a8ff3e', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ringGradient}
            />
          </Animated.View>
          <Animated.View style={[styles.bluetoothCircle, pulseStyle]}>
            <Text style={styles.bluetoothIcon}>📶</Text>
          </Animated.View>
          <Text style={styles.loadingText}>{LOADING_MESSAGES[msgIndex]}</Text>
          <View style={styles.dotsRow}>
            {LOADING_MESSAGES.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i <= msgIndex && styles.dotActive]}
              />
            ))}
          </View>
        </View>
      </View>
    );
  }

  // CONNECTED state
  return (
    <View style={styles.container}>
      <View style={styles.centered}>
        <Animated.View style={[styles.checkCircle, checkStyle]}>
          <Text style={styles.checkIcon}>✓</Text>
        </Animated.View>
        <Text style={styles.connectedTitle}>¡Collar vinculado!</Text>

        <View style={styles.collarCard}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Dispositivo</Text>
            <Text style={styles.cardValue}>PetGuard S1</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>N° Serie</Text>
            <Text style={styles.cardValue}>PG-2024-001</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Batería</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardValue}>74%</Text>
              <ProgressBar percent={74} color="#89d628" />
            </View>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Señal</Text>
            <View style={styles.signalRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <View
                  key={i}
                  style={[
                    styles.signalBar,
                    { height: 6 + i * 4 },
                    i <= 4 ? styles.signalActive : styles.signalInactive,
                  ]}
                />
              ))}
              <Text style={styles.signalText}> Fuerte</Text>
            </View>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Estado</Text>
            <Text style={[styles.cardValue, { color: Colors.primary }]}>
              Activo ✓
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.replace('/(tabs)')}
        >
          <LinearGradient
            colors={['#a8ff3e', '#6bdb00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.btnGradient}
          >
            <Text style={styles.btnText}>Ir al Dashboard</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  // Idle
  collarIllustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: Colors.outlineVariant,
  },
  collarEmoji: { fontSize: 48 },
  collarRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderStyle: 'dashed',
  },
  collarDot: {
    position: 'absolute',
    top: -4,
    left: '50%',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: -4,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Outfit_700Bold',
    color: Colors.onSurface,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  primaryBtn: { borderRadius: 14, overflow: 'hidden', width: '100%' },
  btnGradient: { paddingVertical: 16, alignItems: 'center' },
  btnText: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: Colors.inversePrimary,
  },
  // Loading
  loadingRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'transparent',
    borderTopColor: Colors.primary,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  bluetoothCircle: {
    position: 'absolute',
    top: '38%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bluetoothIcon: { fontSize: 28 },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
    textAlign: 'center',
    marginTop: 24,
    minHeight: 24,
  },
  dotsRow: { flexDirection: 'row', gap: 8, marginTop: 20 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.outlineVariant,
  },
  dotActive: { backgroundColor: Colors.primary },
  // Connected
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkIcon: {
    fontSize: 40,
    color: Colors.inversePrimary,
    fontWeight: 'bold',
  },
  connectedTitle: {
    fontSize: 24,
    fontFamily: 'Outfit_700Bold',
    color: Colors.primary,
    marginBottom: 32,
  },
  collarCard: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  cardLabel: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
    width: 90,
  },
  cardValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.onSurface,
    flex: 1,
    textAlign: 'right',
  },
  signalRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  signalBar: { width: 5, borderRadius: 2 },
  signalActive: { backgroundColor: Colors.primary },
  signalInactive: { backgroundColor: Colors.outlineVariant },
  signalText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: Colors.primary,
    marginLeft: 4,
  },
});
