import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';

const { height } = Dimensions.get('window');

export default function InicioDeSesion({ onLogin, onNavigateToRegister, error }) {
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const handleLogin = () => {
    if (usuario.trim() === '' || contrasenia.trim() === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
    onLogin(usuario, contrasenia);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            style={styles.logo}
          />
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

          {error && (
            <Text style={styles.errorLogin}>Usuario y/o contraseña incorrecta</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button title="Iniciar Sesión" onPress={handleLogin} />
          </View>

          <TouchableOpacity onPress={onNavigateToRegister}>
            <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
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
    width: '60%',
  },
  registerText: {
    marginTop: 20,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  errorLogin: {
    color: '#F00',
    textAlign: 'left',
    marginBottom: 10,
  },
});
