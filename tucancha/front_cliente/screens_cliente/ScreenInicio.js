import { createNativeStackNavigation} from '@react-navigation/stack'

import { StyleSheet, View,Button,Input, Dimensions, TextInput, Text}from 'react-native';
import React, { useState } from "react";
import Instalacion from '../../functions/Instalacion'
import InstalacionStoris from '../../functions/InstalacionStoris'


const { width, height } = Dimensions.get("window");


export default function ScreenInicio() {
  const [local, setName] = useState("");
  return (
      <View style={styles.container}>
          <TextInput type='text' style={styles.input} value={local} placeholder="Localizacion" onChangeText={setName} />
          <InstalacionStoris/>
          <Text style={styles.texto}>Ultima reserva</Text>
          <Instalacion style={styles.ultimainstalacion}/>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  storis: {
    flex: 1,
    marginBottom: 5,
  },
  texto: {
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#fff',
    paddingVertical: 10,
  }
  ,input: {
    marginBottom: height*0.02,
    borderBlockColor: '"#f0f0f0"',
    color: '#555',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: width*0.2,
  },
  ultimainstalacion: {
    padding: 10,
    color: '#555',
    backgroundColor: '#555',
  }
});  