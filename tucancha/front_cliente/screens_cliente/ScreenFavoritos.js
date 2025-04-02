import { createNativeStackNavigation} from '@react-navigation/stack'

import { StyleSheet, View,Button,Input, Dimensions}from 'react-native';
import React, { useState } from "react";
import ModeloCancha from '../../backend/funciones_backend/ModeloCancha'

const { width, height } = Dimensions.get("window");


export default function FrontViewPitch1() {

  return (
      <View>
        <ModeloCancha />
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