import Geolocation from "react-native-geolocation-service";
import { Platform, PermissionsAndroid } from "react-native";

const requestLocationPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Permiso de ubicación",
        message: "TuCancha necesita acceder a tu ubicación para mostrarte instalaciones cercanas.",
        buttonNeutral: "Preguntar más tarde",
        buttonNegative: "Cancelar",
        buttonPositive: "Aceptar",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // En iOS, los permisos se solicitan automáticamente
};

// Obtener la ubicación del usuario
const getUserLocation = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.warn("Permiso de ubicación denegado");
    return null;
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        console.log("Ubicación del usuario:", location); // Verifica la ubicación obtenida
        resolve(location); // Devuelve la ubicación del usuario
      },
      (error) => {
        console.error("Error al obtener la ubicación del usuario:", error);
        reject(error); // Maneja el error
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

export default getUserLocation;