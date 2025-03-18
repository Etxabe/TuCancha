import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');

export default function ScreenAddInstalacion1() {
  const navigation = useNavigation();

  const [images, setImages] = useState([]);
  const [imageUri, setImageUri] = useState(null);  // Para mostrar la URI de la image
  const openGallery = async () => {
    // Pedir permisos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tu galería para continuar');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Solo imágenes
      quality: 1, // Calidad de la imagen
      allowsMultipleSelection: true,
    });
  
    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
    }
  };
  


    

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // mejor soporte multiplataforma
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Información general:</Text>

          <Text style={styles.label}>Nombre de pista:</Text>
          <TextInput style={styles.input} placeholder="Nombre de pista" />

          <Text style={styles.label}>Localidad:</Text>
          <TextInput style={styles.input} placeholder="Pueblo, Ciudad..." />

          <Text style={styles.label}>Calle:</Text>
          <TextInput style={styles.input} placeholder="Calle" />

          <Text style={styles.label}>Descripción:</Text>
          <TextInput
            style={[styles.input, { height: 80 }]} 
            placeholder="Información adicional"
            multiline
          />

          <Button title='Subir foto'onPress={openGallery}/>
          <ScrollView horizontal style={{ marginTop: 20 }}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={{ width: 120, height: 120, marginRight: 10, borderRadius: 10 }}
          />
        ))}
      </ScrollView>

          <View style={{ marginTop: 20 }}>
            <Button
              title="Siguiente"
              onPress={() => navigation.navigate('ScreenAddInstalacion2')}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: height * 0.05,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
    color: '#333',
    alignSelf: 'flex-start',
  },
  input: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
