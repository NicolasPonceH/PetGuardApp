import { Tabs } from 'expo-router';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');

const TAB_CONFIG = [
  { name: 'index', label: 'Dashboard', icon: 'home', lib: 'ion' },
  { name: 'salud', label: 'Salud', icon: 'heart', lib: 'ion' },
  { name: 'ubicacion', label: 'Ubicación', icon: 'navigate', lib: 'ion', isOrbe: true },
  { name: 'collar', label: 'Collar', icon: 'radio', lib: 'mci' },
  { name: 'mascotas', label: 'Mascotas', icon: 'paw', lib: 'ion' },
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.barWrapper}>
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const config = TAB_CONFIG[index];
          if (!config) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (config.isOrbe) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.orbeWrapper}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.orbeShadow,
                    isFocused && styles.orbeShadowActive,
                  ]}
                >
                  <LinearGradient
                    colors={['#e4ff00', '#8fff00', '#3bf200']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.orbe}
                  >
                    <Ionicons name="navigate" size={30} color="#fff" />
                  </LinearGradient>
                </View>
                <Text
                  style={[
                    styles.orbeLabel,
                    isFocused && styles.orbeLabelActive,
                  ]}
                >
                  {config.label}
                </Text>
              </TouchableOpacity>
            );
          }

          const iconColor = isFocused ? '#2d7a0e' : '#8a9b80';

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              {config.lib === 'mci' ? (
                <MaterialCommunityIcons
                  name={config.icon as any}
                  size={24}
                  color={iconColor}
                />
              ) : (
                <Ionicons
                  name={(isFocused ? config.icon : `${config.icon}-outline`) as any}
                  size={24}
                  color={iconColor}
                />
              )}
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]}>
                {config.label}
              </Text>
              {isFocused && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="salud" />
      <Tabs.Screen name="ubicacion" />
      <Tabs.Screen name="collar" />
      <Tabs.Screen name="mascotas" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  barWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 0,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 28,
    paddingTop: 12,
    paddingHorizontal: 8,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Outfit_600SemiBold',
    color: '#8a9b80',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#2d7a0e',
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#54de16',
    marginTop: 4,
  },
  orbeWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginTop: -36,
  },
  orbeShadow: {
    borderRadius: 41,
    shadowColor: '#3bf200',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  orbeShadowActive: {
    shadowOpacity: 0.6,
    shadowRadius: 20,
  },
  orbe: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orbeLabel: {
    fontSize: 11,
    fontFamily: 'Outfit_600SemiBold',
    color: '#8a9b80',
    marginTop: 6,
  },
  orbeLabelActive: {
    color: '#2d7a0e',
  },
});
