import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Modal, TextInput, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../src/theme/colors';
import { supabase } from '../../src/services/supabase';

interface HistorialEntry {
  id: string;
  fecha: string;
  tipo_visita: string;
  veterinario: string;
  descripcion: string;
  proxima_cita: string;
}

// Mock pet data (for demo)
const PET = {
  nombre: 'Max',
  especie: 'Perro',
  raza: 'Golden Retriever',
  edad: 3,
  peso: 28.5,
};

const MOCK_HISTORY: HistorialEntry[] = [
  { id: '1', fecha: '2024-11-15', tipo_visita: 'Control general', veterinario: 'Dra. García', descripcion: 'Vacunas al día. Peso saludable.', proxima_cita: '2025-05-15' },
  { id: '2', fecha: '2024-08-20', tipo_visita: 'Desparasitación', veterinario: 'Dr. Muñoz', descripcion: 'Desparasitación interna y externa.', proxima_cita: '2025-02-20' },
  { id: '3', fecha: '2024-03-10', tipo_visita: 'Vacunación', veterinario: 'Dra. García', descripcion: 'Vacuna antirrábica anual aplicada.', proxima_cita: '2025-03-10' },
];

export default function MascotasScreen() {
  const [historial, setHistorial] = useState<HistorialEntry[]>(MOCK_HISTORY);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ tipo_visita: '', veterinario: '', descripcion: '' });

  const addEntry = () => {
    if (!form.tipo_visita || !form.descripcion) {
      Alert.alert('Error', 'Completa los campos requeridos');
      return;
    }
    const newEntry: HistorialEntry = {
      id: Date.now().toString(),
      fecha: new Date().toISOString().split('T')[0],
      tipo_visita: form.tipo_visita,
      veterinario: form.veterinario,
      descripcion: form.descripcion,
      proxima_cita: '',
    };
    setHistorial([newEntry, ...historial]);
    setForm({ tipo_visita: '', veterinario: '', descripcion: '' });
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* Pet Profile */}
        <View style={s.profileSection}>
          <View style={s.photoContainer}>
            <LinearGradient colors={['#a8ff3e', '#6bdb00']} style={s.photoBorder}>
              <View style={s.photoInner}>
                <Text style={s.photoEmoji}>🐕</Text>
              </View>
            </LinearGradient>
          </View>
          <Text style={s.petName}>{PET.nombre}</Text>
          <Text style={s.petBreed}>{PET.raza}</Text>

          <View style={s.statsRow}>
            <View style={s.stat}>
              <Text style={s.statVal}>{PET.edad}</Text>
              <Text style={s.statLabel}>Años</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statVal}>{PET.peso}</Text>
              <Text style={s.statLabel}>Kg</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statVal}>{PET.especie}</Text>
              <Text style={s.statLabel}>Especie</Text>
            </View>
          </View>

          <View style={s.chipsRow}>
            <View style={s.chip}>
              <Text style={s.chipText}>✓ Saludable</Text>
            </View>
            <View style={s.chip}>
              <Text style={s.chipText}>✓ Vacunas al día</Text>
            </View>
          </View>
        </View>

        {/* Clinical History */}
        <Text style={s.sectionTitle}>Historial Clínico</Text>
        <View style={s.timeline}>
          {historial.map((entry, idx) => (
            <View key={entry.id} style={s.timelineItem}>
              <View style={s.timelineLine}>
                <View style={s.timelineDot} />
                {idx < historial.length - 1 && <View style={s.timelineBar} />}
              </View>
              <View style={s.timelineCard}>
                <Text style={s.entryDate}>{entry.fecha}</Text>
                <Text style={s.entryType}>{entry.tipo_visita}</Text>
                <Text style={s.entryVet}>👨‍⚕️ {entry.veterinario}</Text>
                <Text style={s.entryDesc}>{entry.descripcion}</Text>
                {entry.proxima_cita ? (
                  <Text style={s.entryNext}>Próxima cita: {entry.proxima_cita}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={s.fab} onPress={() => setModalVisible(true)}>
        <LinearGradient colors={['#a8ff3e', '#6bdb00']} style={s.fabGrad}>
          <Text style={s.fabText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={s.modalBg}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Nueva Entrada</Text>
            <TextInput
              style={s.modalInput}
              placeholder="Tipo de visita"
              placeholderTextColor={Colors.outline}
              value={form.tipo_visita}
              onChangeText={(t) => setForm({ ...form, tipo_visita: t })}
            />
            <TextInput
              style={s.modalInput}
              placeholder="Veterinario"
              placeholderTextColor={Colors.outline}
              value={form.veterinario}
              onChangeText={(t) => setForm({ ...form, veterinario: t })}
            />
            <TextInput
              style={[s.modalInput, { height: 80 }]}
              placeholder="Descripción"
              placeholderTextColor={Colors.outline}
              value={form.descripcion}
              onChangeText={(t) => setForm({ ...form, descripcion: t })}
              multiline
            />
            <View style={s.modalBtns}>
              <TouchableOpacity style={s.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={s.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.saveBtn} onPress={addEntry}>
                <Text style={s.saveText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: 20 },
  profileSection: { alignItems: 'center', paddingTop: 20, paddingBottom: 24 },
  photoContainer: { marginBottom: 16 },
  photoBorder: { width: 110, height: 110, borderRadius: 55, padding: 4 },
  photoInner: { flex: 1, borderRadius: 53, backgroundColor: Colors.surfaceContainer, justifyContent: 'center', alignItems: 'center' },
  photoEmoji: { fontSize: 48 },
  petName: { fontSize: 26, fontFamily: 'Outfit_700Bold', color: Colors.onSurface },
  petBreed: { fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.onSurfaceVariant, marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: 20, backgroundColor: Colors.surfaceContainer, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.outlineVariant },
  stat: { flex: 1, alignItems: 'center' },
  statVal: { fontSize: 20, fontFamily: 'Outfit_700Bold', color: Colors.primary },
  statLabel: { fontSize: 12, fontFamily: 'Inter_400Regular', color: Colors.onSurfaceVariant, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: Colors.outlineVariant },
  chipsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  chip: { backgroundColor: Colors.inversePrimary, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  chipText: { fontSize: 13, fontFamily: 'Inter_600SemiBold', color: Colors.primary },
  sectionTitle: { fontSize: 18, fontFamily: 'Outfit_700Bold', color: Colors.onSurface, marginBottom: 16 },
  timeline: {},
  timelineItem: { flexDirection: 'row', marginBottom: 0 },
  timelineLine: { width: 24, alignItems: 'center' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary, borderWidth: 2, borderColor: Colors.inversePrimary },
  timelineBar: { width: 2, flex: 1, backgroundColor: Colors.outlineVariant },
  timelineCard: { flex: 1, backgroundColor: Colors.surfaceContainer, borderRadius: 16, padding: 14, marginLeft: 10, marginBottom: 12, borderWidth: 1, borderColor: Colors.outlineVariant },
  entryDate: { fontSize: 11, fontFamily: 'Inter_400Regular', color: Colors.outline },
  entryType: { fontSize: 15, fontFamily: 'Outfit_700Bold', color: Colors.onSurface, marginTop: 4 },
  entryVet: { fontSize: 12, fontFamily: 'Inter_500Medium', color: Colors.onSurfaceVariant, marginTop: 4 },
  entryDesc: { fontSize: 13, fontFamily: 'Inter_400Regular', color: Colors.onSurfaceVariant, marginTop: 6, lineHeight: 20 },
  entryNext: { fontSize: 11, fontFamily: 'Inter_500Medium', color: Colors.primary, marginTop: 8 },
  fab: { position: 'absolute', bottom: 110, right: 24, borderRadius: 28, overflow: 'hidden', elevation: 8, shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  fabGrad: { width: 56, height: 56, justifyContent: 'center', alignItems: 'center' },
  fabText: { fontSize: 28, color: Colors.inversePrimary, fontWeight: 'bold' },
  modalBg: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 },
  modalCard: { backgroundColor: Colors.surfaceElevated, borderRadius: 20, padding: 24, borderWidth: 1, borderColor: Colors.outlineVariant },
  modalTitle: { fontSize: 20, fontFamily: 'Outfit_700Bold', color: Colors.onSurface, marginBottom: 20 },
  modalInput: { backgroundColor: Colors.surfaceContainer, borderWidth: 1, borderColor: Colors.outlineVariant, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 14, fontFamily: 'Inter_400Regular', color: Colors.white, marginBottom: 14 },
  modalBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: Colors.outlineVariant, alignItems: 'center' },
  cancelText: { fontSize: 14, fontFamily: 'Inter_600SemiBold', color: Colors.onSurfaceVariant },
  saveBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, backgroundColor: Colors.primary, alignItems: 'center' },
  saveText: { fontSize: 14, fontFamily: 'Outfit_700Bold', color: Colors.inversePrimary },
});
