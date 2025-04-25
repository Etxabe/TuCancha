import {
  StyleSheet,
  View,
  Button,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState ,useContext,useEffect} from 'react';

import MostrarTextIniciales from './funciones_servidor/funcionVistaAddInstalacion2Atributos.js'
import {AbrirGaleria} from './funciones_servidor/funcionGaleria'
import {MostrarDuracionYPrecio} from './funciones_servidor/funcionScreenAddInstalacionDuracionYPrecio'
import {MostrarHorarios} from './funciones_servidor/funcionScreenAddInstalacionHorarios'
import insertInstalacion from '../../backend/funciones_backend/insert.js'
import Mapa from '../../functions/Mapa.js'
import { ServerContext } from '../../front_servidor/ServerContext.js';

const { width, height } = Dimensions.get('window');

export default function ScreenAddInstalacion1() {

  const { instalacion, setInstalacion } = useContext(ServerContext);
  //const [isSelected, setSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (instalacion?.idInstalacion && instalacion.idInstalacion !== "") {
      setInstalacion({
        nombrePista: "",
        precio: 0,
        duracion: 0,
        descripcion: "",
        imagen_instalacion: "",
        horaApertura: "09:00",
        horaCierre: "18:00",
        latitud: 0,
        longitud: 0,
        idPropietario: "",
        idInstalacion: "",
      });
    }
  }, []);
  
  
  
  return (
    
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // mejor soporte multiplataforma
    >
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ color: '#fff', marginTop: 10}}>Subiendo instalación...</Text>
        </View>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          
        <MostrarTextIniciales/>
        <Text style={styles.title}>Ubicacion:</Text>
        <View style={{ width: width * 0.7, height: height * 0.5, marginBottom: 50}}>
          <Mapa/>
        </View>
        <Button title="Subir foto" onPress={ () => AbrirGaleria(setInstalacion,instalacion)} />
        
        {instalacion.imagen_instalacion ? (
        <Image
          source={{ uri: instalacion.imagen_instalacion }}
          style={{ width: 120, height: 120, marginTop: 10, borderRadius: 10 }}
        />
      ) : null}
        
        <View style={styles.container}>
          <MostrarHorarios/>
          
          <MostrarDuracionYPrecio/>
          
          <TouchableOpacity
            title="Añadir"
            style={styles.button}
            onPress={async () => {
              setLoading(true);
              await insertInstalacion(instalacion,setInstalacion);
              setLoading(false);
            }}
            >
            <Text style={styles.buttonText}>Añadir</Text>
            </TouchableOpacity>

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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  button: {
    backgroundColor: '#6200ea',  // Color de fondo (puedes poner el color que desees)
    paddingVertical: 10,          // Espacio arriba y abajo
    paddingHorizontal: 20,       // Espacio a los lados
    borderRadius: 5,             // Bordes redondeados
    alignItems: 'center',        // Centrar el contenido
    justifyContent: 'center',    // Centrar el contenido
    marginTop: 20,               // Espacio arriba (si es necesario)
  },
  buttonText: {
    color: '#fff',               // Color del texto
    fontSize: 18,                // Tamaño de la fuente
    fontWeight: 'bold',          // Negrita
  },
});
