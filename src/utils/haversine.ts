/**
 * Calcula la distancia entre dos coordenadas GPS usando la fórmula de Haversine.
 * @returns Distancia en metros.
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Radio de la Tierra en metros
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Verifica si una mascota está dentro de la zona segura.
 * @param petLat Latitud actual de la mascota
 * @param petLon Longitud actual de la mascota
 * @param centerLat Latitud del centro de la zona segura
 * @param centerLon Longitud del centro de la zona segura
 * @param radiusMeters Radio de la zona segura en metros
 * @returns true si está dentro de la zona segura
 */
export function isInsideSafeZone(
  petLat: number,
  petLon: number,
  centerLat: number,
  centerLon: number,
  radiusMeters: number
): boolean {
  return haversineDistance(petLat, petLon, centerLat, centerLon) <= radiusMeters;
}
