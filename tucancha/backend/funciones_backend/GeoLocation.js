import * as Location from "expo-location";

const requestLocationPermission = async () => {
  console.log("Solicitando permisos de ubicación...");

  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.warn("Permiso de ubicación denegado");
    return false;
  }

  console.log("Permiso de ubicación otorgado");
  return true;
};

const getUserLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    return null;
  }

  try {
    console.log("Intentando obtener la ubicación...");
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const userLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    console.log("Ubicación del usuario:", userLocation);
    return userLocation;
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    return null;
  }
};

export default getUserLocation;