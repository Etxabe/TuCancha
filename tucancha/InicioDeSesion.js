import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';

export default function InicioDeSesion({ onLogin, onNavigateToRegister, error }) {
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
      <Image
        source={require('./assets/logo-TuCancha.png')}
        style={styles.logo}
      />
      <View style={styles.formContainer}>
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
        {error ?  <Text style={styles.errorLogin}>Usuario y/o contraseña erronea</Text> : (<Text></Text>)}
        <View style={styles.buttonContainer}>
          <Button title="Iniciar Sesión" onPress={handleLogin} />
        </View>
        <TouchableOpacity onPress={onNavigateToRegister}>
          <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    marginTop: 180,
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
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
  buttonContainer: {
    marginTop: 10,
    width: '40%',
  },
  registerText: {
    marginTop: 20,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  errorLogin: {
    color: '#F00',
    textAlign: 'left',
  },
});