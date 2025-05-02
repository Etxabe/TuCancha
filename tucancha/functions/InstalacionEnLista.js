import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal, Button } from 'react-native';
import React, { useContext, useState } from "react";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ServerContext } from '../front_servidor/ServerContext';
import ComentariosProveedorModal from '../functions/comentariosProveedorModal';
import { getComentarios } from '../backend/funciones_backend/getComentariosProveedor'; 

const { width, height } = Dimensions.get("window");

export default function InstalacionEnLista({ item }) {
  const navigation = useNavigation();
  const { instalacion, setInstalacion } = useContext(ServerContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [comentarios, setComentarios] = useState([]);

  const handlePressComentarios = async () => {
    try {
      const comentariosData = await getComentarios(item.id); // Llamamos a la función getComentarios pasando el idInstalacion
      setComentarios(comentariosData); // Guardamos los comentarios en el estado
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
    setModalVisible(true); // 👈 abre modal
  };

  const obtenerComentarios = async () => {
          try {
            const comentarios = await getComentarios(idInstalacion);
            console.log(comentarios);  // Puedes hacer lo que quieras con los comentarios
          } catch (error) {
            console.error('Error al obtener los comentarios:', error);
          }
        };

  const handlePress = () => {
    setInstalacion({
      nombrePista: item.nombrePista,
      precio: item.precio,
      duracion: item.duracion,
      descripcion: item.descripcion,
      imagen_instalacion: item.imagen_instalacion,
      horaApertura: item.horaApertura,
      horaCierre: item.horaCierre,
      latitud: item.latitud,
      longitud: item.longitud,
      idPropietario: item.idPropietario,
      idInstalacion: item.id,
    });
    navigation.navigate('ScreenModificarInstalacion1');
  };

  return (
    <>
      <TouchableOpacity style={styles.containerinstalacion} onPress={handlePressComentarios}>
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
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
        <ComentariosProveedorModal comentarios={comentarios} />
           
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cerrarButton}>
            <Text style={styles.botonTexto}>Cerrar</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  containerinstalacion: {
    flexDirection: 'column',
    padding: 10,
    borderWidth: 0.2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 'auto',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
    botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cerrarButton: {
    backgroundColor: '#007bff', // Cambié el color para que se vea bien
    padding: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20, // Espacio entre los comentarios y el botón
  },
});
