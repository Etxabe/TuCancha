import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import { consultarPuntuacion } from '../backend/funciones_backend/ConsultaPuntuacion';

const { width, height } = Dimensions.get("window");

const Comentarios = () => {
  const { ubicacion } = useContext(ClientContext);
  const maxStars = 5;
  const [rating, setRating] = useState(0); // Estado para guardar la puntuación

  // Carga la puntuación al montar el componente
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const puntuacion = await consultarPuntuacion(ubicacion.id_instalacion);
        setRating(puntuacion);
      } catch (error) {
        console.error("Error al obtener la puntuación:", error);
      }
    };

    if (ubicacion?.id_instalacion) {
      fetchRating();
    }
  }, [ubicacion]);

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(maxStars)].map((_, index) => (
        <Ionicons
          key={index}
          name="star"
          size={24}
          color={index < Math.round(rating) ? 'gold' : '#ccc'}
          style={{ marginRight: 4 }}
        />
      ))}
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

export default Comentarios;