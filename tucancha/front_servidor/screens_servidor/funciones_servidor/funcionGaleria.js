import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const AbrirGaleria = async (setImages) => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
  if (!permissionResult.granted) {
    Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para continuar');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
    allowsMultipleSelection: true,
  });

  if (!result.canceled) {
    setImages(result.assets.map(asset => asset.uri));
  }
};
