import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
  } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export const MostrarTextIniciales = () => {

    const [nombrePista, setNombrePista] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [calle, setCalle] = useState('');
    const [infoExtra, setInfoExtra] = useState('');

    return (
      <View>
        <Text style={styles.title}>Información general:</Text>
  
        <Text style={styles.label}>Nombre de pista:</Text>
        <TextInput style={styles.input} value={nombrePista} onChangeText={setNombrePista} placeholder="Nombre de pista" />
  
        <Text style={styles.label}>Localidad:</Text>
        <TextInput style={styles.input} value={ciudad} onChangeText={setCiudad} placeholder="Pueblo, Ciudad..." />
  
        <Text style={styles.label}>Calle:</Text>
        <TextInput style={styles.input} value={calle} onChangeText={setCalle} placeholder="Calle" />
  
        <Text style={styles.label}>Descripción:</Text>
        <TextInput
          style={[styles.input, { height: 80 }]} 
          placeholder="Información adicional"
          multiline
          value={infoExtra} 
          onChangeText={setInfoExtra}
        />
      </View>
    );
  };
  
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
  