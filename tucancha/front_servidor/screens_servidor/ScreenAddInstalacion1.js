import { createNativeStackNavigation} from '@react-navigation/stack'

import { StyleSheet, View,Button,Input, Dimensions,Text}from 'react-native';
import React, { useState } from "react";


const { width, height } = Dimensions.get("window");


export default function ScreenAddInstalacion1() {

  return (
      <View style={styles.container}>
        <Text>Informacion general:</Text>
        <Text>Nombre de pista:</Text>
        <Text>Localidad</Text>
        <Text>Calle:</Text>
        <Text>Descripción:</Text>
        <Button title='Subir foto'></Button>
        
        <Button title='Siguiente'></Button>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      padding: height*0.07
    },

});  