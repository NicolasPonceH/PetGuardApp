<div align="center">

# 🐶 PetGuard - Mobile App

### Smart Pet Health Monitoring Ecosystem

Aplicación móvil desarrollada para ser el núcleo de control del ecosistema **PetGuard**, una solución tecnológica enfocada en el monitoreo inteligente de la salud y seguridad de las mascotas mediante un collar IoT, una plataforma web y esta app.

<p>

<img src="https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
<img src="https://img.shields.io/badge/Reanimated-v3-blue"/>
<img src="https://img.shields.io/badge/License-Academic-success"/>

</p>

</div>

---

# 📖 Contextualización

**PetGuard** es un innovador sistema inteligente para el monitoreo de la salud y ubicación de mascotas.

Esta Aplicación Móvil fue desarrollada para ofrecer a los dueños el control total y monitoreo en tiempo real de sus mascotas desde la palma de su mano, interactuando directamente con el ecosistema PetGuard que incluye:

- 🐕 Collar Inteligente (Hardware Premium IoT)
- 📍 Seguimiento GPS en tiempo real
- 📊 Dashboard de métricas de salud vitales
- 🏥 Base de datos sincronizada con clínicas veterinarias
- ❤️ Sistema de alertas inteligentes y notificaciones push

La aplicación utiliza una interfaz moderna, interactiva y amigable, con navegación fluida y gráficos en tiempo real, permitiendo a los usuarios entender y mejorar la calidad de vida de sus mascotas.

---

# ✨ Características

- 📊 **Dashboard en tiempo real:** Visualización rápida del estado general de la mascota.
- 📍 **Seguimiento GPS (Ubicación):** Rastreo preciso de la ubicación de la mascota en un mapa interactivo.
- ❤️ **Monitoreo de Salud:** Gráficos y registro de métricas vitales (ritmo cardíaco, actividad, temperatura).
- 📡 **Gestión del Collar:** Control de batería, conectividad y configuraciones del dispositivo IoT.
- 🐾 **Perfil de Mascotas:** Administración de múltiples mascotas desde una misma cuenta.
- 🎨 **Diseño Moderno:** Interfaz de usuario premium con animaciones fluidas (`react-native-reanimated`).
- 🔐 **Autenticación Segura:** Sistema de login y registro integrado con Supabase.

---

# 🚀 Stack Tecnológico

<div align="center">

<img src="https://skillicons.dev/icons?i=react,ts,supabase,nodejs,npm,git,github,vscode" />

</div>

---

# 🛠 Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| <img src="https://skillicons.dev/icons?i=react" width="28"/> **React Native** | Framework principal para el desarrollo de la aplicación móvil multiplataforma (iOS y Android). |
| 🔲 **Expo & Expo Router** | Entorno de desarrollo y enrutamiento basado en archivos para una navegación fluida y nativa. |
| <img src="https://skillicons.dev/icons?i=ts" width="28"/> **TypeScript** | Lenguaje principal utilizado para aportar tipado estático y mayor mantenibilidad al proyecto. |
| <img src="https://skillicons.dev/icons?i=supabase" width="28"/> **Supabase** | Backend as a Service (BaaS) utilizado para la base de datos PostgreSQL y autenticación. |
| 🏃 **Reanimated 3** | Biblioteca de animaciones nativas de alto rendimiento para gestos y transiciones. |
| 🗺️ **React Native Maps** | Integración de mapas nativos para el seguimiento GPS en tiempo real de las mascotas. |
| 🎨 **Expo Linear Gradient** | Componentes visuales para fondos y elementos con gradientes modernos. |
| 🎯 **Vector Icons** | Colección de íconos SVG (Ionicons, MaterialCommunityIcons) altamente optimizados. |

---

# 📂 Estructura del Proyecto

```text
PetGuardAPP/
│
├── app/
│   ├── (auth)/        # Rutas de Autenticación (Login, Registro)
│   ├── (tabs)/        # Navegación principal (Dashboard, Salud, Ubicación, Collar, Mascotas)
│   └── _layout.tsx    # Layout raíz del enrutador de Expo
│
├── src/
│   ├── components/    # Componentes reutilizables (ActivityItem, HealthChart, MetricCard)
│   ├── services/      # Configuración y servicios de Backend (Supabase)
│   ├── theme/         # Paleta de colores, tipografías y estilos globales
│   └── utils/         # Funciones utilitarias (ej. cálculo de distancias con Haversine)
│
├── assets/            # Imágenes, íconos y tipografías
├── babel.config.js    # Configuración de Babel y Reanimated
├── app.json           # Configuración del proyecto Expo
├── tsconfig.json      # Configuración de TypeScript
├── package.json       # Dependencias y scripts
└── README.md
```

---

# ⚙️ Instalación

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/NicolasPonceH/PetGuardApp.git
```

## 2️⃣ Ingresar al proyecto

```bash
cd PetGuardApp
```

## 3️⃣ Instalar dependencias

```bash
npm install
```

## 4️⃣ Ejecutar el proyecto (Expo Go)

```bash
npx expo start
```
*Escanea el código QR generado en la terminal con la app **Expo Go** en tu dispositivo móvil.*

---

# 🎯 Objetivos del Proyecto

- 📱 Proveer la interfaz principal para interactuar con el ecosistema PetGuard.
- 📍 Asegurar la tranquilidad del dueño mediante rastreo y geolocalización precisa.
- 📊 Presentar métricas de salud de la mascota de manera comprensible e interactiva.
- 🚀 Ofrecer una experiencia de usuario rápida, fluida y con diseño premium.
- 🔔 Notificar proactivamente sobre cualquier anomalía en los signos vitales o ubicación.

---

# ♿ Accesibilidad e Inclusión

El proyecto incorpora buenas prácticas enfocadas en la usabilidad móvil:

- ✅ Tamaños de fuente legibles y adaptables.
- ✅ Alto contraste de colores (modo diurno optimizado).
- ✅ Áreas de toque (Touch Targets) suficientemente grandes para pantallas móviles.
- ✅ Navegación intuitiva mediante barra de pestañas (Bottom Tabs) y gestos.
- ✅ Iconografía clara acompañada de etiquetas de texto.

---

# 👨‍💻 Autor

## Nicolás Benjamín Ponce Hernández

Estudiante de Ingeniería en Informática apasionado por el desarrollo de software, inteligencia artificial, IoT y aplicaciones modernas.

### 🌐 GitHub

https://github.com/NicolasPonceH

---

# 📄 Licencia

Este proyecto fue desarrollado con fines académicos y demostrativos como parte del ecosistema **PetGuard**.

© 2026 Nicolás Benjamín Ponce Hernández.
