import { StyleSheet, View,Button,Input, Dimensions, TextInput, Text}from 'react-native';
import { useState,useContext } from 'react';
import Instalacion from '../../functions/Instalacion'
import Mapa from '../../backend/funciones_backend/ModeloMapa';
const { width, height } = Dimensions.get("window");
import { ClientContext } from "../ClientContext";


export default function ScreenCercaDeMi() {
  const [local, setName] = useState();
  const { ubicacion, setUbicacion } = useContext(ClientContext);

  return (
    <View style={styles.container}>
        <TextInput type='text' style={styles.input} value={local} placeholder="Localizacion" onChangeText={setName} />
        <Mapa style={styles.mapa} />
        <Instalacion ubicacion={ubicacion}/>
    </View>
  );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    mapa: {
      flex: 1
    },
    input: {
      marginBottom: height*0.02,
      borderBlockColor: '"#f0f0f0"',
      color: '#555',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
    },
  });  
