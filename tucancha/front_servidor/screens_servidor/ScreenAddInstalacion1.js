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
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Checkbox from 'expo-checkbox';
import {MostrarTextIniciales} from './funciones_servidor/funcionVistaAddInstalacion'

const { width, height } = Dimensions.get('window');

export default function ScreenAddInstalacion1() {

  const [isSelected, setSelection] = useState(false);
  
    const [horaApertura, setHoraApertura] = useState('09:00');
    const [horaCierre, setHoraCierre] = useState('18:00');
  
    const [modalAperturaVisible, setModalAperturaVisible] = useState(false);
    const [modalCierreVisible, setModalCierreVisible] = useState(false);
  
    const horas = Array.from({ length: 24 }, (_, index) =>
      `${index.toString().padStart(2, '0')}:00`
    );
  
    const handleSelectHoraApertura = (hora) => {
      setHoraApertura(hora);
      setModalAperturaVisible(false);
    };
  
    const handleSelectHoraCierre = (hora) => {
      setHoraCierre(hora);
      setModalCierreVisible(false);
    };

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
          
          <MostrarTextIniciales/>


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
        <View style={styles.container}>
          <Text style={styles.title}>Horarios disponibles:</Text>
                {/* Hora Apertura */}
                <Text style={styles.label}>Hora apertura:</Text>
                <TouchableOpacity
                  onPress={() => setModalAperturaVisible(true)}
                  style={styles.selector}
                >
                  <Text style={styles.selectorText}>{horaApertura}</Text>
                </TouchableOpacity>
      
                <Modal
                  visible={modalAperturaVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setModalAperturaVisible(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalTitle}>Seleccionar hora de apertura</Text>
                      <FlatList
                        data={horas}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => handleSelectHoraApertura(item)}
                          >
                            <Text style={styles.modalItemText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <Button title="Cancelar" onPress={() => setModalAperturaVisible(false)} />
                    </View>
                  </View>
                </Modal>
      
                {/* Hora Cierre */}
                <Text style={styles.label}>Hora cierre:</Text>
                <TouchableOpacity
                  onPress={() => setModalCierreVisible(true)}
                  style={styles.selector}
                >
                  <Text style={styles.selectorText}>{horaCierre}</Text>
                </TouchableOpacity>
      
                <Modal
                  visible={modalCierreVisible}
                  animationType="slide"
                  transparent={true}
                  onRequestClose={() => setModalCierreVisible(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <Text style={styles.modalTitle}>Seleccionar hora de cierre</Text>
                      <FlatList
                        data={horas}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => handleSelectHoraCierre(item)}
                          >
                            <Text style={styles.modalItemText}>{item}</Text>
                          </TouchableOpacity>
                        )}
                      />
                      <Button title="Cancelar" onPress={() => setModalCierreVisible(false)} />
                    </View>
                  </View>
                </Modal>
      
                <View style={styles.checkboxContainer}>
                  <Text style={styles.checkboxLabel}>Abrir en festivos(Domingos incluidos)</Text>
                  <Checkbox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                  />
                </View>
      
                <Text style={styles.label}>Duración de reserva:</Text>
                <TextInput style={styles.input} keyboardType='numeric' placeholder="Ej: 60 minutos" />
      
                <Text style={styles.label}>Precio:</Text>
                <TextInput style={styles.input} keyboardType='numeric' placeholder="Ej: 24 €" />
      
                <Button title="Añadir" onPress={() => alert('Comprobar campos llenos. Pista añadida. Redirigir a inicio.')}/>
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
  selector: {
    width: width * 0.8,
    height: 40,
    backgroundColor: '#f0f0f0',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  selectorText: {
    fontSize: 16,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
});
