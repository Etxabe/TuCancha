import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useContext } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import MyModal from "./Reservar";
import Comentarios from '../functions/Comentarios';

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Instalacion = () => {
  const { ubicacion, setUbicacion } = useContext(ClientContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [showInstalacion, setShowInstalacion] = useState(true); // Estado para controlar la visibilidad de la instalación
  const [showLista, setShowLista] = useState(false); // Estado para controlar la visibilidad de la lista de 1 a 100

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Función para manejar el evento de scroll
  const handleScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    if (contentOffsetY > 100) { // Ajusta este valor según cuán lejos quieras hacer scroll para ocultar la instalación
      setShowInstalacion(false);
    } else {
      setShowInstalacion(true);
    }
  };

  // Función para manejar la visibilidad de la lista
  const handleComentariosPress = () => {
    setShowLista(!showLista); // Cambia el estado de la lista
  };

  return ubicacion.nombre === "" ? null : (
    <ScrollView 
      style={styles.containerinstalacion} 
      onScroll={handleScroll} 
      scrollEventThrottle={16} // Establece la frecuencia de actualización del evento onScroll
    >
      {showInstalacion && ( // Solo muestra la instalación si showInstalacion es true
        <View style={styles.container}>
          <Image source={{ uri: ubicacion.imagen_instalacion }} style={styles.imagen}></Image>
          <Text>{ubicacion.nombre}</Text>
        </View>
      )}

      <View style={styles.infoApertura}>
        <Text style={styles.text}>
          Abierto de:
        </Text>
        <Text style={styles.text}>
          {ubicacion.hora_inicio} - {ubicacion.hora_fin}
        </Text>
        <Text style={styles.text}>Precio: {ubicacion.precio}€/h</Text>
        <Comentarios onPressComentarios={handleComentariosPress} /> {/* Pasa la función para mostrar/ocultar la lista */}
      </View>

      {/* Aquí se agregan los comentarios o cualquier otro contenido adicional */}
      <View style={styles.reserva}>
        <Button title="Reservar" onPress={openModal} style={styles.boton} />
        <MyModal visible={isModalVisible} onClose={closeModal} />
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

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerinstalacion: {
    flexDirection: 'column', // Organiza los elementos en una columna
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  container: {
    flexDirection: 'row', // Organiza los elementos en una fila
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
