import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { supabase } from '../../src/services/supabase';
import { Colors } from '../../src/theme/colors';

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert({ id: data.user.id, nombre, email });
        if (profileError) throw profileError;
      }

      Alert.alert('¡Cuenta creada!', 'Revisa tu correo para verificar tu cuenta', [
        { text: 'OK', onPress: () => router.replace('/(auth)/login') },
      ]);
    } catch (error: any) {
      Alert.alert('Error al registrarse', error.message || 'Ocurrió un error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>🐾</Text>
          </View>
          <Text style={styles.logoText}>PetGuard</Text>
          <Text style={styles.logoSubtext}>Crea tu cuenta gratuita</Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            placeholderTextColor={Colors.outline}
            value={nombre}
            onChangeText={setNombre}
          />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@correo.com"
            placeholderTextColor={Colors.outline}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Mínimo 6 caracteres"
            placeholderTextColor={Colors.outline}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <LinearGradient
              colors={['#a8ff3e', '#6bdb00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.linkText}>
            ¿Ya tienes cuenta?{' '}
            <Text style={styles.linkHighlight}>Inicia sesión</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  logoContainer: { alignItems: 'center', marginBottom: 48 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoIcon: { fontSize: 36 },
  logoText: {
    fontSize: 32,
    fontFamily: 'Outfit_700Bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  logoSubtext: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
  },
  form: { marginBottom: 32 },
  label: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: Colors.onSurface,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: Colors.white,
    marginBottom: 20,
  },
  button: { marginTop: 8, borderRadius: 12, overflow: 'hidden' },
  buttonDisabled: { opacity: 0.6 },
  buttonGradient: { paddingVertical: 16, alignItems: 'center' },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Outfit_700Bold',
    color: Colors.inversePrimary,
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: Colors.onSurfaceVariant,
  },
  linkHighlight: { color: Colors.primary, fontFamily: 'Inter_600SemiBold' },
});
