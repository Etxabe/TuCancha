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
            <Text style={styles.text}>
                {ubicacion.nombre}
            </Text> 
            <Text style={styles.text}>
                {ubicacion.descripcion}
            </Text>
        </View>
        <View style={styles.container}>
            <Text style={styles.text}>Precio: {ubicacion.precio}€/h</Text>
            <Button title="Abrir Modal" onPress={openModal} />

            {/* Aquí pasamos las props al modal */}
            <MyModal visible={isModalVisible} onClose={closeModal} />
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