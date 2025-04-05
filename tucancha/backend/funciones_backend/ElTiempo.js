import { StyleSheet, View, Image, Text } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { obtenerClima } from "../../backend/funciones_backend/llamadaApi.js";
import { ClientContext } from "../../front_cliente/ClientContext.js";

const convertirHora = (hora) => {
  if (!hora) {
    console.warn("Hora no está definida");
    return null; // Devuelve null si hora es undefined
  }
  return hora.split(" - ")[0] + ":00"; // Divide la cadena por " - " y toma la primera parte
};

const ElTiempo = () => {
  const { ubicacion, reserva } = useContext(ClientContext);
  const [tiempo, setTiempo] = useState({
    temperatura: null,
    humedad: null,
    viento: null,
    icono: null,
    sunset: null,
    sunrise: null,
  });

  useEffect(() => {
    if (!reserva || !reserva.hora_ini) {
      console.warn("Reserva o reserva.hora no está definido");
      return;

    }
    obtenerClima(reserva.fecha_ini, convertirHora(reserva.hora_ini), ubicacion.latitude, ubicacion.longitude)
      .then((data) => {
        if (data.error) {
          console.error("Error al obtener el clima:", data.error);
        } else {
          setTiempo({
            temperatura: data.temperature,
            humedad: data.humidity,
            viento: data.windSpeed,
            icono: data.icon,
            sunset: data.sunset,
            sunrise: data.sunrise,
          });
        }
      })
      .catch((error) => console.error("Error inesperado:", error));
  }, [reserva, ubicacion]); // Ejecutar el efecto cuando cambien reserva o ubicacion

  if (!reserva || !reserva.hora_ini) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se ha seleccionado una instalación</Text>
      </View>
    );
  }
  console.log("Datos del tiempo:", tiempo); // Verifica los datos del tiempo
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Temperatura: {tiempo.temperatura}°C</Text>
      <Text style={styles.text}>Humedad: {tiempo.humedad}%</Text>
      <Text style={styles.text}>Viento: {tiempo.viento} km/h</Text>
      <Text style={styles.text}>Sunset: {tiempo.sunset}</Text>
      <Text style={styles.text}>Sunrise: {tiempo.sunrise}</Text>
      {tiempo.icono && <Image source={{ uri: tiempo.icono }} style={styles.icono} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  icono: {
    width: 50,
    height: 50,
  },
});

export default ElTiempo;