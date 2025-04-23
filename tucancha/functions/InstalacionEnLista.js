import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from "react";
import Icon from 'react-native-vector-icons/Feather';

const { width, height } = Dimensions.get("window");

export default function InstalacionEnLista({ nombre, precio, descripcion, imagen }) {
  return (
    <View style={styles.containerinstalacion}>
      <View style={styles.container}>
      <Image source={{ uri: imagen }} style={styles.imagen} />
        <View>
            <Text style={styles.title}>{nombre}</Text>
            <Text style={styles.price}>Precio: {precio}€</Text>
            <Text style={styles.description}>
                {descripcion.length > 30 ? descripcion.substring(0, 30) + '...' : descripcion}
                </Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={() => alert('Modificar instalacion')}>
            <Icon name="settings" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    containerinstalacion: {
        flexDirection: 'col', // Organiza los elementos en una fila
        padding: 10,
        borderWidth: 0.2,
        },
    container: {
        flexDirection: 'row', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        paddingHorizontal: 10,
        },
    imagen: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        padding: 10,
        flex: 1,
    },
    price: {
        fontSize: 14,
        padding: 10,
        flex: 1,
    },
    description: {
        fontSize: 12,
        padding: 10,
        flex: 1,
    },
    editButton: {
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto', // Empuja el botón hacia la derecha
    },
});