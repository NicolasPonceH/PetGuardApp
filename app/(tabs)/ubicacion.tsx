import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import { Colors } from '../../src/theme/colors';
import { haversineDistance, isInsideSafeZone } from '../../src/utils/haversine';

const { width, height } = Dimensions.get('window');

// Coordenadas Universidad Santo Tomás, Arica, Chile
const CENTER_LAT = -18.48338;
const CENTER_LNG = -70.31037;
const SAFE_RADIUS = 200; // metros

export default function UbicacionScreen() {
  const mapRef = useRef<MapView>(null);
  const [petLocation, setPetLocation] = useState({ latitude: CENTER_LAT, longitude: CENTER_LNG });
  const [isOutside, setIsOutside] = useState(false);
  const sonarAnim = useRef(new Animated.Value(0)).current;
  const alertAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(sonarAnim, { toValue: 1, duration: 2000, useNativeDriver: true })
    ).start();
  }, []);

  useEffect(() => {
    const outside = !isInsideSafeZone(
      petLocation.latitude,
      petLocation.longitude,
      CENTER_LAT,
      CENTER_LNG,
      SAFE_RADIUS
    );
    setIsOutside(outside);
    if (outside) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(alertAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(alertAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    } else {
      alertAnim.setValue(0);
    }
  }, [petLocation]);

  const handleEscape = () => {
    // Mover 500m al norte (simulación de escape)
    const newLat = CENTER_LAT + 0.005;
    const newLng = CENTER_LNG + 0.003;
    setPetLocation({ latitude: newLat, longitude: newLng });
    mapRef.current?.animateToRegion({
      latitude: newLat,
      longitude: newLng,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
  };

  const handleCenter = () => {
    mapRef.current?.animateToRegion({
      latitude: petLocation.latitude,
      longitude: petLocation.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const handleReset = () => {
    setPetLocation({ latitude: CENTER_LAT, longitude: CENTER_LNG });
    mapRef.current?.animateToRegion({
      latitude: CENTER_LAT,
      longitude: CENTER_LNG,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const distance = haversineDistance(
    petLocation.latitude,
    petLocation.longitude,
    CENTER_LAT,
    CENTER_LNG
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: CENTER_LAT,
          longitude: CENTER_LNG,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        customMapStyle={darkMapStyle}
      >
        {/* Zona segura */}
        <Circle
          center={{ latitude: CENTER_LAT, longitude: CENTER_LNG }}
          radius={SAFE_RADIUS}
          strokeColor="rgba(168,255,62,0.6)"
          fillColor="rgba(168,255,62,0.05)"
          strokeWidth={2}
        />

        {/* Marcador mascota */}
        <Marker coordinate={petLocation}>
          <View style={styles.markerOuter}>
            <View style={[styles.markerInner, isOutside && styles.markerDanger]}>
              <Text style={styles.markerIcon}>🐾</Text>
            </View>
          </View>
        </Marker>
      </MapView>

      {/* Barra búsqueda */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar direcciones..."
          placeholderTextColor="#8a9b80"
          editable={false}
        />
      </View>

      {/* Botón secreto escape */}
      <TouchableOpacity style={styles.escapeBtn} onPress={handleEscape}>
        <Text style={styles.escapeBtnText}>⚡</Text>
      </TouchableOpacity>

      {/* Botón reset */}
      {isOutside && (
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>↩</Text>
        </TouchableOpacity>
      )}

      {/* Alerta de escape */}
      {isOutside && (
        <Animated.View style={[styles.alertBanner, { opacity: alertAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]}>
          <Text style={styles.alertText}>⚠️ Max salió de la zona segura</Text>
          <Text style={styles.alertSubtext}>{Math.round(distance)}m del centro · Fuera del radio de {SAFE_RADIUS}m</Text>
        </Animated.View>
      )}

      {/* Zoom buttons */}
      <View style={styles.zoomButtons}>
        <TouchableOpacity
          style={styles.zoomBtn}
          onPress={() => mapRef.current?.getCamera().then((cam) => {
            if (cam.zoom !== undefined) {
              mapRef.current?.animateCamera({ ...cam, zoom: cam.zoom + 1 });
            }
          })}
        >
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.zoomBtn}
          onPress={() => mapRef.current?.getCamera().then((cam) => {
            if (cam.zoom !== undefined) {
              mapRef.current?.animateCamera({ ...cam, zoom: cam.zoom - 1 });
            }
          })}
        >
          <Text style={styles.zoomText}>−</Text>
        </TouchableOpacity>
      </View>

      {/* Panel inferior */}
      <View style={styles.bottomPanel}>
        <View style={styles.panelRow}>
          <View style={styles.petAvatar}>
            <Text style={styles.petAvatarText}>🐕</Text>
          </View>
          <View style={styles.panelInfo}>
            <Text style={styles.panelName}>Max</Text>
            <Text style={styles.panelTime}>📍 Hace 2 min</Text>
          </View>
          <View style={styles.panelRight}>
            <Text style={styles.panelBattery}>🔋 85%</Text>
          </View>
        </View>
        <View style={styles.panelCoords}>
          <Text style={styles.coordText}>
            {petLocation.latitude.toFixed(5)}, {petLocation.longitude.toFixed(5)}
          </Text>
        </View>
        <TouchableOpacity style={styles.centerBtn} onPress={handleCenter}>
          <Text style={styles.centerBtnText}>📍 Centrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c1d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec86c' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a2e1a' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2a3d2a' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1f0e' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#1a2e1a' }] },
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, width, height },
  markerOuter: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(168,255,62,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerDanger: { backgroundColor: Colors.error },
  markerIcon: { fontSize: 16 },
  searchBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1a2e1a',
  },
  escapeBtn: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    opacity: 0.4,
  },
  escapeBtnText: { fontSize: 14 },
  resetBtn: {
    position: 'absolute',
    top: 100,
    left: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(168,255,62,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  resetBtnText: { fontSize: 16, color: '#1a2e1a' },
  alertBanner: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,59,48,0.95)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  alertText: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: '#fff',
  },
  alertSubtext: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  zoomButtons: {
    position: 'absolute',
    right: 20,
    top: height * 0.4,
    gap: 8,
  },
  zoomBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  zoomText: {
    fontSize: 22,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  panelRow: { flexDirection: 'row', alignItems: 'center' },
  petAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  petAvatarText: { fontSize: 24 },
  panelInfo: { flex: 1 },
  panelName: {
    fontSize: 18,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
  },
  panelTime: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#8a9b80',
    marginTop: 2,
  },
  panelRight: {},
  panelBattery: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    color: '#436900',
  },
  panelCoords: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  coordText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#8a9b80',
    textAlign: 'center',
  },
  centerBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  centerBtnText: {
    fontSize: 14,
    fontFamily: 'Outfit_700Bold',
    color: '#1a2e1a',
  },
});
