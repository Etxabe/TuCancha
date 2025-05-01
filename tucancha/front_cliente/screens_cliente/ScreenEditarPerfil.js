import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ScreenEditarPerfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de edición de perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
