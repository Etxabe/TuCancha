import { StyleSheet, View,Button,Input, Dimensions,Text,TextInput,KeyboardAvoidingView}from 'react-native';
import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker'; // Importar el componente Picker
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("window");


export default function ScreenAddInstalacion1() {
  const navigation = useNavigation();
  return (
    <KeyboardAvoidingView 
      behavior="padding" 
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Informacion general:</Text>

        <Text style={styles.label} >Nombre de pista:</Text>

        <TextInput style={styles.input} placeholder="Nombre de pista" />

        <Text style={styles.label} >Localidad:</Text>

        <TextInput style={styles.input} placeholder="Pueblo, Ciudad..." />

        <Text style={styles.label} >Calle:</Text>

        <TextInput style={styles.input} placeholder="Calle" />

        <Text style={styles.label} >Descripción:</Text>

        <TextInput style={styles.input} placeholder="Información adicional" />

        {/*el picker va aqui*/}
        

        {/*<Button title='Subir foto'></Button>*/}
        
        <Button title='Siguiente' onPress={() => navigation.navigate("ScreenAddInstalacion2")}></Button>
      </View>
      </KeyboardAvoidingView>
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
    input: {
      
      width: width * 0.6, // Todos los inputs tienen el mismo ancho
      height: 40, // Misma altura para todos
      color: '#555',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: height * 0.03, // Espaciado uniforme entre inputs
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15, 
      alignSelf: 'flex-start', // Alineado a la izquierda sin absolute
      marginLeft: width * 0, // Separado del borde izquierdo
      marginTop: height * 0.005, // Más arriba
    },
    label: {
      alignSelf: 'stretch',
      marginLeft: width * 0.1, // Para alinear con los inputs
      marginBottom: 10, // Espacio entre el texto y el input
      fontSize: 16,
      fontWeight: '500',
    },

});  