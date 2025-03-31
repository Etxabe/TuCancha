import { StyleSheet, Text, View,Button,Image,Input, Dimensions, PRe}from 'react-native';
import React, { useState } from "react";

const imagen = require('../assets/fronton-tafalla.png')
const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Instalacion = ({ ubicacionSeleccionada }) => {
  return (
    <View style={styles.containerinstalacion}>
        <View style={styles.container}>
            <Image source={imagen} style={styles.imagen}></Image>
            <Text style={styles.text}>
            {ubicacionSeleccionada?.nombre}
            </Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Precio: 12€/h</Text>
            <Button title='Reservar' style={styles.boton} onPress={() => alert('Reservar cancha')}></Button>
        </View>
    </View> 
  );
};

const styles = StyleSheet.create({
    containerinstalacion: {
        flexDirection: 'col', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        },
    container: {
        flexDirection: 'row', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        paddingHorizontal: 10,
        },
    imagen: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    text: {
        padding: 10,
        flex: 1,
    },
    boton: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
    },
});

export default Instalacion;