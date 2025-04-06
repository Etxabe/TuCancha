import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function InicioDeSesion({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleLogin = () => {
    if (usuario.trim() === '' || contrasenia.trim() === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    // Llamar a la función onLogin con los valores introducidos
    onLogin(usuario, contrasenia);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
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
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
});