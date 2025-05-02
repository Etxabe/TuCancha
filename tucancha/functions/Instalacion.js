import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import MyModal from "./Reservar";
import Comentarios from '../functions/Comentarios';

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Instalacion = () => {
  const { ubicacion } = useContext(ClientContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [showLista, setShowLista] = useState(false); // Inicialmente la lista está oculta

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Función para manejar el clic en Comentarios (muestra/oculta la lista)
  const handleComentariosPress = () => {
    setShowLista(!showLista); // Cambia el estado de la lista (toggle)
  };

  // Resetear la lista cuando la instalación cambie
  useEffect(() => {
    setShowLista(false); // Cada vez que cambia la ubicación, ocultamos la lista
  }, [ubicacion]);

  return ubicacion.nombre === "" ? null : (
    <ScrollView style={styles.containerinstalacion}>
      <View style={styles.container}>
        <Image source={{ uri: ubicacion.imagen_instalacion }} style={styles.imagen}></Image>
        <Text>{ubicacion.nombre}</Text>
      </View>

      <View style={styles.infoApertura}>
        <Text style={styles.text}>Abierto de:</Text>
        <Text style={styles.text}>
          {ubicacion.hora_inicio} - {ubicacion.hora_fin}
        </Text>
        <Text style={styles.text}>Precio: {ubicacion.precio}€/h</Text>
        <Comentarios onPressComentarios={handleComentariosPress} /> {/* Llama a la función cuando se hace clic en comentarios */}
      </View>

      {/* Mostrar la lista de 1 a 100 solo si showLista es true */}
      {showLista && (
        <View style={styles.listaContainer}>
          <Text style={styles.listaHeader}>Lista de 1 a 100:</Text>
          {Array.from({ length: 100 }, (_, index) => (
            <Text key={index} style={styles.listaItem}>{index + 1}</Text>
          ))}
        </View>
      )}

      {/* Reservar Modal */}
      <View style={styles.reserva}>
        <Button title="Reservar" onPress={openModal} style={styles.boton} />
        <MyModal visible={isModalVisible} onClose={closeModal} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerinstalacion: {
    flexDirection: 'column',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  container: {
    flexDirection: 'row',
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
    padding: 2,
  },
  boton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    paddingTop: 30,
  },
  infoApertura: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
  },
  reserva: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'stretch',
    flex: 1,
  },
  listaContainer: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listaHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  listaItem: {
    fontSize: 16,
    marginVertical: 2,
  },
});

export default Instalacion;
