import { StyleSheet, Text, View,Button,Image,Input, Dimensions, PRe}from 'react-native';
import React, { useState } from "react";


const fronton = require('../assets/fronton-tafalla.png')
const futsal = require('../assets/futsal-tafalla.jpg')
const tenis = require('../assets/tenis-tafalla.jpg')

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

export default function App() {
  const [nombre, setName] = useState("");
  const [gmail, setMail] = useState("");

  return (
    <View style={styles.container}>
        <View style={styles.history}>
            <Image source={fronton} style={styles.imagen}></Image>
            <Text style={styles.text}>
                Fronton de Tafalla
            </Text>
        </View>
            <View style={styles.history}>
            <Image source={futsal} style={styles.imagen}></Image>
            <Text style={styles.text}>
                Futsal Tafalla
            </Text>
        </View>
            <View style={styles.history}>
            <Image source={tenis} style={styles.imagen}></Image>
            <Text style={styles.text}>
                Tenis Tafalla
            </Text>
        </View>
    </View>

    
  );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        paddingHorizontal: 10,
        height: height*0.25,
        marginTop: 20,
        },
    imagen: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
    history: {
        flex: 1
    }
});