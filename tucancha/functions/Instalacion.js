import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import MyModal from "./Reservar";
import Comentarios from '../functions/Comentarios';
import Ionicons from "react-native-vector-icons/Ionicons";
import { getComentarios } from '../backend/funciones_backend/getComentarios'; // Importamos la función

const { width, height } = Dimensions.get("window");

const Instalacion = () => {
  const { ubicacion } = useContext(ClientContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [showLista, setShowLista] = useState(false); // Inicialmente la lista está oculta
  const [comentarios, setComentarios] = useState([]); // Estado para los comentarios
  const [comentariosMostrados, setComentariosMostrados] = useState(5); // Número de comentarios mostrados
  const [loading, setLoading] = useState(false); // Para controlar el estado de carga
  const [noMasComentarios, setNoMasComentarios] = useState(false); // Para verificar si ya no hay más comentarios

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Llamada al backend para obtener los comentarios
  const fetchComentarios = async (cantidad) => {
    setLoading(true); // Inicia la carga
    const comentariosObtenidos = await getComentarios(ubicacion.id_instalacion);

    // Filtra los comentarios que se pueden mostrar (limitados por 'cantidad')
    const comentariosLimitados = comentariosObtenidos.slice(0, cantidad);
    setComentarios(comentariosLimitados); // Actualiza los comentarios visibles

    // Verifica si hay más comentarios
    if (comentariosObtenidos.length <= cantidad) {
      setNoMasComentarios(true); // Si no hay más comentarios, desactiva el botón
    }

    setLoading(false); // Termina la carga
  };

  // Función para manejar el clic en Comentarios (muestra/oculta la lista)
  const handleComentariosPress = () => {
    setShowLista(!showLista); // Cambia el estado de la lista (toggle)
    if (!showLista) {
      fetchComentarios(comentariosMostrados); // Cargamos los primeros 5 comentarios cuando se muestra la lista
    }
  };

  // Función para manejar el clic en "Mostrar más"
  const handleMostrarMas = () => {
    const nuevosComentariosMostrados = comentariosMostrados + 5;
    setComentariosMostrados(nuevosComentariosMostrados); // Incrementa la cantidad de comentarios mostrados
    fetchComentarios(nuevosComentariosMostrados); // Obtiene más comentarios
  };

  // Resetear la lista cuando la instalación cambie
  useEffect(() => {
    setShowLista(false); // Cada vez que cambia la ubicación, ocultamos la lista
    setComentariosMostrados(5); // Reseteamos la cantidad de comentarios a 5
    setNoMasComentarios(false); // Reinicia el estado de "No más comentarios"
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
        <Text><Comentarios onPressComentarios={handleComentariosPress} /> </Text>
      </View>

      {/* Mostrar la lista de comentarios solo si showLista es true */}
      {showLista && (
        <View style={styles.listaContainer}>
          <Text style={styles.listaHeader}>Comentarios:</Text>
          {comentarios.map((comentario) => (
            <View key={comentario.id} style={styles.comentarioContainer}>
              <Text style={styles.comentarioText}>{comentario.text}</Text>
              <Text style={styles.comentarioAuthor}>- {comentario.author}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
            </View>
          ))}

          {/* Botón de "Mostrar más" */}
          {!noMasComentarios && comentarios.length >= comentariosMostrados && (
            <Button title="Mostrar más" onPress={handleMostrarMas} disabled={loading} />
          )}

          {/* Mensaje si no hay más comentarios */}
          {noMasComentarios && comentarios.length <= comentariosMostrados && (
            <Text>No hay más comentarios.</Text>
          )}
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
  comentarioContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  comentarioText: {
    fontSize: 16,
  },
  comentarioAuthor: {
    fontStyle: 'italic',
    fontSize: 14,
    marginRight: 10,
  },
});

export default Instalacion;
