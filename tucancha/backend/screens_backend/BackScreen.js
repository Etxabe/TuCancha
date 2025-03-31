import { StyleSheet, View,Button,Input, Dimensions}from 'react-native';
import React, { useState } from "react";
<<<<<<< HEAD
import Modelo from '/Modelo'
=======
import Modelo from '../funciones_backend/Modelo'
>>>>>>> 911a582699da4de47b455caade10a832e4c32f85


const { width, height } = Dimensions.get("window");


export default function FrontViewPitch1() {

  return (
      <View style={styles.container}>
        <Modelo />
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