  import { StyleSheet, View,Button,Input, Dimensions, Image, Text, TouchableOpacity}from 'react-native';
  import React, { useState,useState } from "react";
  import Icon from 'react-native-vector-icons/Feather'; // Importamos el ícono
  import { obtenerClima } from '../../backend/funciones_backend/llamadaApi.js'; 
  import { ClientContext } from "../ClientContext";

const ElTiempo = () => {
  const { ubicacion, setUbicacion } = useContext(ClientContext);
  const { reserva, setReserva } = useContext(ClientContext);
  const {tiempo,setTiempo} = useState(
    {
      temperatura: null,
      humedad: null,
      viento: null,
      icono: null,
    }
  );

  if (reserva === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se ha seleccionado una instalacion</Text>
      </View>
    );
  }
  else{
    obtenerClima(reserva.fecha, convertirHora(reserva.hora), ubicacion.latitud, 'ubicacion.longitud')
    .then((data) => {
      if (data.error) {
        console.error('Error al obtener el clima:', data.error);
      } else {
        tiempo.temperatura = data.temperature;
        tiempo.humedad = data.humidity;
        tiempo.viento = data.windSpeed;
        tiempo.icono = data.icon;
        console.log('Temperatura mínima:', data.minTemperature, '°C');
        console.log('Temperatura actual:', data.temperature, '°C');
        console.log('Temperatura máxima:', data.maxTemperature, '°C');
        console.log('Velocidad del viento:', data.windSpeed, 'km/h');
        console.log('Icono del clima:', data.icon);
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Temperatura: {tiempo.temperatura}°C</Text>
            <Text style={styles.text}>Humedad: {tiempo.humedad}%</Text>
            <Text style={styles.text}>Viento: {tiempo.viento} km/h</Text>
            <Image source={{ uri: tiempo.icono }} style={styles.icono} />
          </View>
        );
      }
    })
    .catch((error) => console.error('Error inesperado:', error));
  
  }


}
