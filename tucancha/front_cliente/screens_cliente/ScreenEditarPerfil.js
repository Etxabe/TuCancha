import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { abrirGaleriaPerfil } from './funciones_cliente/funcionGaleriaPerfil'; // Ajusta la ruta si es distinta
import updatePerfil from '../../backend/funciones_backend/updatePerfil'; // Importa la función de actualización
import { AuthContext } from '../../AuthContext'; // Importa el contexto para obtener el ID del usuario
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

export default function ScreenEditarPerfil() {
  const { id } = useContext(AuthContext); // Obtiene el ID del usuario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigation = useNavigation();

  const handleGuardar = async () => {
    const exito = await updatePerfil(id, nombre, descripcion, fotoPerfil);
    if (exito) {
      navigation.goBack(); // Vuelve a la pantalla de perfil
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Introduce tu nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Añade una descripción"
        multiline
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity style={styles.button} onPress={() => abrirGaleriaPerfil(setFotoPerfil)}>
        <Text style={styles.buttonText}>Seleccionar Foto de Perfil</Text>
      </TouchableOpacity>

      {fotoPerfil && (
        <Image
          source={{ uri: fotoPerfil }}
          style={{ width: 120, height: 120, borderRadius: 60, marginTop: 10 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
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
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
