import { createNativeStackNavigation} from '@react-navigation/stack'

import { AuthContext } from '../../AuthContext';
import { StyleSheet, View, Dimensions, Image, Text, TouchableOpacity, Alert} from 'react-native';
import React, { useState, useContext, useEffect } from "react";
import { obtenerInfoPerfil } from '../../backend/funciones_backend/InfoPerfil';
import Icon from 'react-native-vector-icons/Feather'; // Importamos el ícono
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function FrontViewPitch1() {
  const { id, setIsLoggedIn } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const cargarPerfil = async () => {
      const datos = await obtenerInfoPerfil(id);
      if (datos) setPerfil(datos);
    };
    cargarPerfil();
  }, []);

  

  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión", // Título del Alert
      "¿Seguro que quieres cerrar sesión?", // Mensaje
      [
        {
          text: "Cancelar", // Botón de cancelar
          style: "cancel", // Estilo del botón de cancelar
        },
        {
          text: "Confirmar", // Botón de confirmar
          onPress: () => setIsLoggedIn(false), // Acción al confirmar (cerramos sesión)
        },
      ],
      { cancelable: false } // No se puede cerrar tocando fuera del alert
    );
  };

  if (!perfil) return <Text>Cargando perfil...</Text>;
  
  return (
      <View style={styles.container}>
        <Image source={
          perfil.imagen_perfil
            ? { uri: perfil.imagen_perfil }
            :require('./../../assets/logo-TuCancha.png')} style={styles.image} />
        <Text style={styles.nombre}>{perfil.nombre}</Text>
        <Text style={styles.descripcion}>{perfil.descripcion ? perfil.descripcion : '¡Añade una descripción!'}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditarPerfil')}
        >
          <Icon name="edit" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderWidth: 1,
      padding: height*0.07,
      paddingTop: height * 0.15, // Aumenta el espacio superior
    },
    image: {
      width: 175,
      height: 175,
      borderRadius: 40,
      borderWidth: 0.2,
      borderColor: 'black',
    },
    nombre: {
      marginTop: 25,      // Espacio entre la imagen y el nombre
      fontSize: 20,       // Tamaño del texto
      fontWeight: 'bold', // Negrita
      color: '#333',      // Color oscuro para mejor visibilidad
    },
    descripcion: {
      marginTop: 15,      // Espacio entre la imagen y el nombre
      fontSize: 16,       // Tamaño del texto
      color: '#333',      // Color oscuro para mejor visibilidad
    },
    editButton: {
      marginTop: 10, // Espacio debajo del nombre
      padding: 10,   // Área táctil más grande
    },
    logoutButton: {
      marginTop: 30,
      padding: 12,
      backgroundColor: '#e74c3c',
      borderRadius: 8,
    },
    logoutText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
});  