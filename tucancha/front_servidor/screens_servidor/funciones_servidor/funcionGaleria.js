import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const AbrirGaleria = async (setInstalacion, instalacion) => {
  try {
    // Solicitar permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para continuar');
      return;
    }

    // Abrir galería
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    // Verificar si se seleccionó una imagen
    if (!result.canceled && result.assets?.length > 0) {
      const selectedImage = result.assets[0].uri;

      // Guardar solo una imagen (string, no array)
      setInstalacion({ ...instalacion, imagen_instalacion: selectedImage });
    }
  } catch (error) {
    console.error('Error al abrir la galería:', error);
    Alert.alert('Error', 'No se pudo abrir la galería. Inténtalo de nuevo.');
  }
};
