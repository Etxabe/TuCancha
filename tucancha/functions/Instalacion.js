import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import MyModal from "./Reservar";
import Comentarios from '../functions/Comentarios';
import Ionicons from "react-native-vector-icons/Ionicons";

const { width, height } = Dimensions.get("window");

const Instalacion = () => {
  const { ubicacion } = useContext(ClientContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [showLista, setShowLista] = useState(false); // Inicialmente la lista está oculta

  // Lista de comentarios con texto, rating y el nombre de quien lo escribió
  const comentarios = [
    { id: 1, text: "Excelente instalación, muy bien equipada. La mejor opción para pasar un buen rato.", rating: 5, author: "Carlos" },
    { id: 2, text: "Buen lugar, pero algo caro, se podría mejorar la atención al cliente.", rating: 3, author: "Ana" },
    { id: 3, text: "Me encanta este lugar, siempre vengo, la mejor experiencia.", rating: 4, author: "Luis" },
    { id: 4, text: "Muy buena atención, pero un poco ruidoso en algunas áreas.", rating: 2, author: "Marta" },
  ];

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
        <Comentarios onPressComentarios={handleComentariosPress} />
      </View>

      {showLista && (
        <View style={styles.listaContainer}>
          <Text style={styles.listaHeader}>Comentarios:</Text>
          {comentarios.map((comentario) => (
            <View key={comentario.id} style={styles.comentarioContainer}>
              <Text style={styles.comentarioText} numberOfLines={2}>
                {comentario.text}
              </Text>
              <Text style={styles.comentarioAuthor}>- {comentario.author}</Text>
              <View style={styles.starsContainer}>
                {[...Array(5)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name="star"
                    size={18}
                    color={index < comentario.rating ? 'gold' : '#ccc'}
                    style={{ marginRight: 4 }}
                  />
                ))}
              </View>
              <View style={styles.separator}></View>
            </View>
          ))}
        </View>
      )}

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
  comentarioContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinea el texto verticalmente
    marginBottom: 12,
  },
  comentarioText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333', // Ajusta el color del texto
  },
  comentarioAuthor: {
    fontStyle: 'italic',
    fontSize: 14,
    color: '#555',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc', // Línea de separación gris
    marginVertical: 10, // Espacio vertical para la línea
  },
});

export default Instalacion;
