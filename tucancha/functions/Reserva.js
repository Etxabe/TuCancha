import { StyleSheet, Text, View,Button,Image,Input, Dimensions, PRe}from 'react-native';
import React, { useState,useContext,useEffect } from "react";
import { ClientContext } from '../front_cliente/ClientContext';

const { width, height } = Dimensions.get("window"); // Obtiene el tamaño de la pantalla

const Reserva = ({reserva,fetchInstalacion}) => {
    const [instalacion, setInstalacion] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchInstalacion();
        setInstalacion(data); // Guardar los datos de la instalación en el estado
      };
    fetchData();
    }, [fetchInstalacion]);
    
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
              onPress={() => alert(`Reserva ${reserva.id_reserva} anulada`)}
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