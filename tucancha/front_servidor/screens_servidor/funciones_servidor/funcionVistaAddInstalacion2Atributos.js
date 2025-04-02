import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
  } from 'react-native';
import { useContext } from 'react';
import { ServerContext } from '../../ServerContext';

const { width, height } = Dimensions.get('window');

const MostrarTextIniciales = () => {

  const { instalacion, setInstalacion } = useContext(ServerContext);
  return (
    <View>
      <Text style={styles.title}>Información general:</Text>

      <Text style={styles.label}>Nombre de pista:</Text>
      <TextInput style={styles.input} value={instalacion.nombrePista}  placeholder="Nombre de pista" 
      onChangeText={(text) => setInstalacion({nombrePista: text })}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, { height: 80 }]} 
        multiline
        value={instalacion.infoExtra} 
        placeholder="breve descripcion"
        onChangeText={(text) => setInstalacion({descripcion: text })}
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

export default MostrarTextIniciales;
  