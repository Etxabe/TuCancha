import { StyleSheet, View,Button,Text, Dimensions}from 'react-native';
import React, { useState,useContext } from "react";
import { ClientContext } from "../ClientContext";


const { width, height } = Dimensions.get("window");


export default function FrontViewPitch1() {
  const { contador, setContador } = useContext(ClientContext);
  return (
      <View style={styles.container}>
        <View>
          <Text>Contador: {contador}</Text>
          <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
        </View>
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