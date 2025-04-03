import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Parse from "./Conexion";
import Reserva from "../../functions/Reserva"; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const infoInstalacion = async (id_instalacion) => {
    try {
      const query = new Parse.Query("Instalacion");
      query.equalTo("objectId", id_instalacion); // Filtrar por el ID de la instalación
      const result = await query.first(); // Obtener el primer resultado

      if (result) {
        return {
          id_instalacion: result.id,
          nombre: result.get("nombre"),
          precio: result.get("precio"),
          descripcion: result.get("descripcion"),
        };
      } else {
        console.warn(`No se encontró la instalación con ID: ${id_instalacion}`);
        return null; // Si no se encuentra la instalación
      }
    } catch (error) {
      console.error("Error al obtener la instalación:", error);
      return null; // En caso de error, retornar null
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Mostrar indicador de carga
      const query = new Parse.Query("Reserva");
      query.limit(100);
      const results = await query.find();

      const formattedData = results.map((item) => ({
        id_reserva: item.id,
        id_usuario: item.get("id_cliente"),
        id_instalacion: item.get("id_instalacion"),
        tiempo_reserva: item.get("tiempo_reserva"),
        fecha_ini: item.get("fecha_ini"),
        hora_ini: item.get("hora_ini"),
      }));
      setData(formattedData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  // Actualizar los datos cada vez que el screen se abre
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  const groupedData = data.reduce((groups, reserva) => {
    const group = groups[reserva.fecha_ini] || [];
    group.push(reserva);
    groups[reserva.fecha_ini] = group;
    return groups;
  }, {});

  return (
    <View style={styles.containerinstalacion}>
      {Object.keys(groupedData).map((fecha) => (
        <View key={fecha}>
          <Text style={styles.sectionHeader}>{fecha}</Text>
          <FlatList
            data={groupedData[fecha]}
            keyExtractor={(item) => item.id_reserva}
            renderItem={({ item }) => (
              <Reserva
                reserva={item}
                fetchInstalacion={() => infoInstalacion(item.id_instalacion)}
              />
            )}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  containerinstalacion: {
    alignItems: "left", // Centra verticalmente la imagen y el texto
    padding: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f4f4f4",
    padding: 10,
    marginBottom: 5,
  },
  container: {
    flexDirection: "row", // Organiza los elementos en una fila
    alignItems: "center", // Centra verticalmente la imagen y el texto
    paddingHorizontal: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    marginRight: 10,
    resizeMode: "cover",
  },
  text: {
    padding: 10,
    flex: 1,
  },
  boton: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 10,
  },
});

export default App;