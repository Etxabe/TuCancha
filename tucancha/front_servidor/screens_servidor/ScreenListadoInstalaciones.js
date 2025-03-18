import { createNativeStackNavigation} from '@react-navigation/stack'

import { StyleSheet, View,Button,Input, Dimensions, TextInput, Text}from 'react-native';
import React, { useState } from "react";
import InstalacionEnLista from '../../functions/InstalacionEnLista'


const { width, height } = Dimensions.get("window");


export default function ScreenListadoInstalaciones() {
  return (
      <View style={styles.container}>
          <Text style={styles.texto}>Tus canchas</Text>
          <InstalacionEnLista style={styles.ultimainstalacion}/>
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
  texto: {
    fontSize: 20,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    paddingVertical: 16,
  }
});    