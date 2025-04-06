import { StyleSheet, Text, View,Button,Image,Input, Dimensions, PRe}from 'react-native';
import React, { useState,useContext } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import MyModal from "./Reservar"

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Instalacion = () => {
  const { ubicacion, setUbicacion } = useContext(ClientContext);

  const [isModalVisible, setModalVisible] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };


  return ubicacion.nombre === "" ? null :(
    <View style={styles.containerinstalacion}>
        <View style={styles.container}>
            <Image source={{uri: ubicacion.imagen_instalacion}} style={styles.imagen}></Image>
            <Text>{ubicacion.nombre}</Text>
        </View>
        <View style={styles.infoApertura}>
            <Text style={styles.text}>
                Abierto de:
            </Text>
            <Text style={styles.text}>
                {ubicacion.hora_inicio} - {ubicacion.hora_fin}
            </Text>
        </View>
        <View style={styles.reserva}>
            <Text style={styles.text}>Precio: {ubicacion.precio}€/h</Text>
            <Button title="Reservar" onPress={openModal} style={styles.boton}/>

            {/* Aquí pasamos las props al modal */}
            <MyModal visible={isModalVisible} onClose={closeModal} />
        </View>
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