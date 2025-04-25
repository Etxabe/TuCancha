import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React,{useContext} from "react";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ServerContext } from '../front_servidor/ServerContext';

const { width, height } = Dimensions.get("window");

export default function InstalacionEnLista({item}) {

    const navigation = useNavigation();
    const { instalacion,setInstalacion } = useContext(ServerContext);

    const handlePress = () => {
        setInstalacion({
            nombrePista: item.nombrePista,
            precio: item.precio,
            duracion: item.duracion,
            descripcion: item.descripcion,
            imagen_instalacion: item.imagen_instalacion, 
            horaApertura: item.horaApertura ,
            horaCierre: item.horaCierre,
            latitud: item.latitud,
            longitud: item.longitud,
            idPropietario: item.idPropietario,
            idInstalacion: item.id,
          });
        
        navigation.navigate('ScreenModificarInstalacion1')
    };

  return (
    <View style={styles.containerinstalacion}>
      <View style={styles.container}>
      <Image source={{ uri: item.imagen_instalacion }} style={styles.imagen} />
        <View>
            <Text style={styles.title}>{item.nombrePista}</Text>
            <Text style={styles.price}>Precio: {item.precio}€</Text>
            <Text style={styles.description}>
                {item.descripcion.length > 30 ? item.descripcion.substring(0, 30) + '...' : item.descripcion}
                </Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handlePress}>
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