import { StyleSheet, View, Image, Text } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { obtenerClima } from "../../backend/funciones_backend/llamadaApi.js";
import { ClientContext } from "../../front_cliente/ClientContext.js";
import Ionicons from "react-native-vector-icons/Ionicons";

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


  const obtenerColorPorTemperatura = (temperatura) => {
    if (temperatura <= 0) {
      return "rgb(196, 240, 255)"; // Azul frío
    } else if (temperatura > 0 && temperatura <= 12) {
      return "rgb(121, 195, 241)"; // Azul claro
    } else if (temperatura > 12 && temperatura <= 17) {
      return "rgb(149, 239, 126)"; // Amarillo cálido
    } else if (temperatura > 17 && temperatura <= 22) {
      return "rgb(255, 201, 76)"; // Amarillo cálido
    } else {
      return "rgb(255, 69, 0)"; // Rojo cálido
    }
  };

  const colorTemperatura = tiempo.temperatura !== null ? obtenerColorPorTemperatura(tiempo.temperatura) : "black";

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Text style={[styles.textC,{ color: colorTemperatura }]}>{tiempo.temperatura}°C</Text>
        {tiempo.icono && <Image source={{ uri: tiempo.icono }} style={styles.icono} />}
      </View>
      <View style={styles.container2}>
        <View style={styles.container21}>
          <Text style={styles.text}>Humedad: {tiempo.humedad}%</Text>
          <Text style={styles.text}>Viento: {tiempo.viento} km/h</Text>
        </View>
        <View style={styles.container22}>
          <View style={styles.container221}>
            <Ionicons name="sunny-outline" size={20} color="black" />
            <Text style={styles.text}>{tiempo.sunrise}</Text>
          </View>
          <View style={styles.container221}>
            <Ionicons name="moon-outline" size={20} color="black" />
            <Text style={styles.text}>{tiempo.sunset}</Text>
          </View>
          
          
        </View>
        
        
      </View>
    </View>


      
    
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    felx: 1,
  },
  container1: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  container2: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    flexDirection: "column",
  },
  container21: {
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  container22: {
    flexDirection: "row",
  },
  container221: {
    paddingHorizontal: 10,
    flexDirection: "column",
    alignItems: "center",
  },textC: {
    fontSize: 30,
    marginBottom: 10,
    color: "rgb(0, 255, 13)",
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