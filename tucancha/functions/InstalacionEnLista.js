import { StyleSheet, Text, View,Button,Image,Input, Dimensions, PRe, TouchableOpacity}from 'react-native';
import React, { useState } from "react";

const imagen = require('../assets/fronton-tafalla.png');

import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get("window");

export default function App() {

    return (
    <View style={styles.containerinstalacion}>
        <View style={styles.container}>
            <Image source={imagen} style={styles.imagen}></Image>
            <Text style={styles.text}>
                Fronton de Tafalla
            </Text>
            <TouchableOpacity style={styles.editButton} onPress={() => alert('Modificar instalacion')}>
                  <Icon name="settings" size={18} color="#000" />
            </TouchableOpacity>
        </View>
        <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
    containerinstalacion: {
        flexDirection: 'col', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        padding: 10,
        borderWidth: 0.2,
        },
    container: {
        flexDirection: 'row', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        paddingHorizontal: 10,
        },
    imagen: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        padding: 10,
        flex: 1,
    },
});