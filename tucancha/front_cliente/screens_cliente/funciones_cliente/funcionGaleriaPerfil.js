import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const abrirGaleriaPerfil = async (setFoto) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar una imagen.');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    setFoto(result.assets[0].uri);
  }
};
