import { StyleSheet, View, Dimensions}from 'react-native';
import React, { useState,useContext } from "react";
import { ClientContext } from '../front_cliente/ClientContext';


const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Instalacion = () => {
  const { } = useContext(ClientContext);

  


  return (
    <View style={styles.containerinstalacion}>
       
    </View> 
  );
};

const styles = StyleSheet.create({
    containerinstalacion: {
        flexDirection: 'row', // Organiza los elementos en una fila
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        
        },
    container: {
        flexDirection: 'col', // Organiza los elementos en una fila
        alignItems: 'center',
        paddingHorizontal: 10,
        flex: 1,
        },
    imagen: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    text: {
        alignItems: 'flex-start',
        padding: 2,
    },
    boton: {
        backgroundColor: 'orange',
        borderRadius: 10,
        paddingTop: 30,
    },
    infoApertura: {
        flexDirection: 'column', // Organiza los elementos en una fila
        alignItems: 'flex-start', 
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
    },
    reserva: {
        flexDirection: 'column', // Organiza los elementos en una fila
        alignItems: 'flex-end', 
        paddingTop: 40,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'stretch',
        flex: 1,
    },
});

export default Instalacion;