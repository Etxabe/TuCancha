// updateInstalacion.js

import { Alert } from "react-native";
import Parse from './Conexion.js';

const updateInstalacion = async (instalacion, setInstalacion) => {

  if (
    instalacion.nombrePista &&
    instalacion.descripcion &&
    instalacion.horaApertura &&
    instalacion.horaCierre &&
    instalacion.precio > 0 &&
    instalacion.duracion > 0 &&
    instalacion.latitud !== 0 &&
    instalacion.longitud !== 0
  ) {
    try {
      const query = new Parse.Query('Instalacion');
      const instalacionExistente = await query.get(instalacion.idInstalacion);

      console.log("Actualizando instalación con ID:", instalacion.idInstalacion);

      instalacionExistente.set('nombre', instalacion.nombrePista);
      instalacionExistente.set('descripcion', instalacion.descripcion);
      instalacionExistente.set('hora_inicio', instalacion.horaApertura);
      instalacionExistente.set('hora_fin', instalacion.horaCierre);
      instalacionExistente.set('precio', parseInt(instalacion.precio));
      instalacionExistente.set('tiempo_reserva', parseInt(instalacion.duracion));
      instalacionExistente.set('latitude', parseFloat(instalacion.latitud));
      instalacionExistente.set('longitude', parseFloat(instalacion.longitud));

      // Solo actualizar imagen si hay una nueva
      if (instalacion.imagen_instalacion) {
        const response = await fetch(instalacion.imagen_instalacion);
        const blob = await response.blob();
        const file = new Parse.File('imagen_' + instalacion.nombrePista + '.jpg', blob);
        instalacionExistente.set('imagen_instalacion', file);
      }

      await instalacionExistente.save();

      // Reiniciar estado (opcional)
      if (setInstalacion) {
        setInstalacion({
          nombrePista: "",
          precio: 0,
          duracion: 0,
          descripcion: "",
          imagen_instalacion: "",
          horaApertura: "09:00",
          horaCierre: "18:00",
          latitud: 0,
          longitud: 0,
          idPropietario: "",
        });
      }

      Alert.alert("¡Éxito!", "Instalación actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar la instalación:", error);
      Alert.alert("Error", error.message || "No se pudo actualizar la instalación.");
    }
  } else {
    Alert.alert("Datos incompletos", "Por favor, rellena todos los campos y selecciona una ubicación en el mapa.");
  }
};

export default updateInstalacion;
