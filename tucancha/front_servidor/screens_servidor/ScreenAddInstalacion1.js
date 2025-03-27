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
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';
import {MostrarTextIniciales} from './funciones_servidor/funcionVistaAddInstalacion4Atributos'
import {AbrirGaleria} from './funciones_servidor/funcionGaleria'
import {MostrarDuracionYPrecio} from './funciones_servidor/funcionScreenAddInstalacionDuracionYPrecio'
import {MostrarHorarios} from './funciones_servidor/funcionScreenAddInstalacionHorarios'

const { width, height } = Dimensions.get('window');

export default function ScreenAddInstalacion1() {

  const [images, setImages] = useState([]);

  const [isSelected, setSelection] = useState(false);
  
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

        <Button title="Subir foto" onPress={() => AbrirGaleria(setImages)} />
      
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
          <MostrarHorarios/>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Abrir en festivos(Domingos incluidos)</Text>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />

          </View>
          
          <MostrarDuracionYPrecio/>
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
