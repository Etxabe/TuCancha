import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Parse from './backend/funciones_backend/Conexion';

export default function Registro({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
  const [idUsuario, setIdUsuario] = useState(null);

  // Obtener el último idUsuario al cargar el componente
  useEffect(() => {
    const fetchLastIdUsuario = async () => {
      try {
        const query = new Parse.Query('Usuarios');
        query.descending('idUsuario'); // Ordenar por idUsuario en orden descendente
        const lastUser = await query.first();
        const lastId = lastUser ? lastUser.get('idUsuario') : 0; // Si no hay usuarios, empieza en 0
        setIdUsuario(lastId + 1); // Incrementar el último id
      } catch (error) {
        console.error('Error al obtener el último idUsuario:', error);
      }
    };

    fetchLastIdUsuario();
  }, []);

  const handleRegister = async () => {
    if (!email || !usuario || !contrasenia || !confirmarContrasenia) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (contrasenia !== confirmarContrasenia) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    try {
      const newUser = new Parse.Object('Usuarios');
      newUser.set('email', email);
      newUser.set('nombre', usuario);
      newUser.set('contrasenia', contrasenia);
      await newUser.save();
      Alert.alert('Éxito', 'Usuario registrado correctamente.');
      onNavigateToLogin(); // Volver al inicio de sesión
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar el usuario.');
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Flecha hacia atrás */}
      <TouchableOpacity style={styles.backButton} onPress={onNavigateToLogin}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Logo */}
      <Image
        style={styles.logo}
      />

      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre y apellidos"
        value={usuario}
        onChangeText={setUsuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasenia}
        onChangeText={setContrasenia}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmarContrasenia}
        onChangeText={setConfirmarContrasenia}
        secureTextEntry
      />
      <Button title="Registrarse" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});