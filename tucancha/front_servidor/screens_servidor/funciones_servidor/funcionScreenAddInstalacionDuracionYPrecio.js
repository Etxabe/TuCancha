import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
  } from 'react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export const MostrarDuracionYPrecio = () => {

    const [duracion, setDuracion] = useState('');
    const [precio, setPrecio] = useState('');

    return (
        <View>
            <Text style={styles.label}>Duración de reserva:</Text>
            <TextInput style={styles.input} value={duracion} onChangeText={setDuracion} keyboardType='numeric' placeholder="Ej: 60 minutos" />

            <Text style={styles.label}>Precio:</Text>
            <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType='numeric' placeholder="Ej: 24 €" />
        </View>
    );
};
  
const styles = StyleSheet.create({
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
  