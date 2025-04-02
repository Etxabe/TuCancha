import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
  } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export const MostrarTextIniciales = ({ nombrePista, setNombrePista, ciudad,setCiudad,calle,setCalle,infoExtra,setInfoExtra}) => {

  return (
    <View>
      <Text style={styles.title}>Información general:</Text>

      <Text style={styles.label}>Nombre de pista:</Text>
      <TextInput style={styles.input} value={nombrePista} onChangeText={setNombrePista} placeholder="Nombre de pista" />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]} 
        multiline
        value={infoExtra} 
        onChangeText={setInfoExtra}
      />
  </View>
  );
};
  
const styles = StyleSheet.create({
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
});
  