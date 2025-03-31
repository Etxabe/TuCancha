import { createNativeStackNavigation} from '@react-navigation/stack'

import { StyleSheet, View,Button,Input, Dimensions, TextInput, Text}from 'react-native';
import React, { createContext, useState, useContext } from "react";
import Instalacion from '../../functions/Instalacion'
import Mapa from '../../backend/funciones_backend/ModeloMapa';
const { width, height } = Dimensions.get("window");


export default function ScreenCercaDeMi() {
  const [local, setName] = useState("");
  return (
    <View>
        <TextInput type='text' style={styles.input} value={local} placeholder="Localizacion" onChangeText={setName} />
        <Mapa style={styles.mapa} />
        
    </View>
  );
  };
  
  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: height*0.07, //cambiar en caso de querer ensanchar las cosas
        flexDirection: 'col',
      },    
      mapa: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: height*0.07
      },
      input: {
        marginBottom: height*0.02,
        borderBlockColor: '"#f0f0f0"',
        color: '#555',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderRadius: 10,
        paddingHorizontal: width*0.2,
      },
  });  
