import { TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect, useContext } from "react";
import { ClientContext } from '../front_cliente/ClientContext';
import Ionicons from "react-native-vector-icons/Ionicons";
import { consultarPuntuacion } from '../backend/funciones_backend/ConsultaPuntuacion';

const { width, height } = Dimensions.get("window");

const Comentarios = ({ onPressComentarios }) => {
  const { ubicacion } = useContext(ClientContext);
  const maxStars = 5;
  const [rating, setRating] = useState(0); // Estado para guardar la puntuación

  const handlePress = () => {
    onPressComentarios(); // Ejecuta la función que pasa el componente principal
  };

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
    <TouchableOpacity onPress={handlePress} style={{ flexDirection: 'row' }}>
      {[...Array(maxStars)].map((_, index) => (
        <Ionicons
          key={index}
          name="star"
          size={24}
          color={index < Math.round(rating) ? 'gold' : '#ccc'}
          style={{ marginRight: 4 }}
        />
      ))}
    </TouchableOpacity>
  );
};

export default Comentarios;
