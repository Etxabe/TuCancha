import { StyleSheet, Text, View,Button,Image,Input, Dimensions, PRe}from 'react-native';
import React, { useState,useContext,useEffect } from "react";
import { anularReserva } from '../backend/funciones_backend/AnularReserva.js'; // Importa la función anularReserva

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Reserva = ({reserva,fetchInstalacion,onReservaAnulada}) => {
    const [instalacion, setInstalacion] = useState(null);
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchInstalacion();
        setInstalacion(data);
      };
    fetchData();
    }, [fetchInstalacion]);
    
    const handleAnularReserva = async () => {
      try {
        const response = await anularReserva(reserva.id_reserva);
        console.log(response.message);
        alert("Reserva anulada correctamente");
        onReservaAnulada();
      } catch (error) {
        console.error("Error al anular la reserva:", error);
        alert("Error al anular la reserva");
      }
    };

    return (
        <View style={styles.containerinstalacion}>
          <View style={styles.container}>
            <Text style={styles.text}>
              <Text style={styles.label}>ID Reserva:</Text> {reserva.id_reserva}{"\n"}
              <Text style={styles.label}>Hora Inicio:</Text> {reserva.hora_ini}{"\n"}
              {instalacion ? (
                <>
                  <Text style={styles.label}>Instalación:</Text> {instalacion.nombre}{"\n"}
                  <Text style={styles.label}>Precio:</Text> {instalacion.precio}{"\n"}
                  <Text style={styles.label}>Descripción:</Text> {instalacion.descripcion}
                </>
              ) : (
                <Text style={styles.label}>Cargando datos de la instalación...</Text>
              )}
            </Text>
          </View>
          <View style={styles.container}>
            <Button
              title="Anular Reserva"
              style={styles.boton}
              onPress={handleAnularReserva}
            />
          </View>
        </View>
      );
};

const styles = StyleSheet.create({
    containerinstalacion: {
        flexDirection: 'col', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        },
    container: {
        flexDirection: 'row', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        paddingHorizontal: 10,
        },
    imagen: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    text: {
        padding: 10,
        flex: 1,
    },
    boton: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
    },
});

export default Reserva;