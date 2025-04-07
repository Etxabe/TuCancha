import React, { useContext, useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, TextInput} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Parse from "./Conexion";
import Reserva from "../../functions/Reserva";
import { ClientContext } from '../../front_cliente/ClientContext';

const App = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idCliente, setIdCliente } = useContext(ClientContext);

  const infoInstalacion = async (id_instalacion) => {
    try {
      const query = new Parse.Query("Instalacion");
      query.equalTo("objectId", id_instalacion); // Filtrar por ID de instalación
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


  const formatFecha = (fecha) => {
    const opciones = { day: "numeric", month: "long", year: "numeric" };
    return new Date(fecha).toLocaleDateString("es-ES", opciones); // Formato: 6 de abril de 2025
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const query = new Parse.Query("Reserva");
      query.equalTo("id_cliente",idCliente );
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
  
      const extraerHoraInicial = (horaRango) => {
        // Divide el rango por el separador " - " y toma la primera parte
        const [horaInicial] = horaRango.split(" - ");
        return horaInicial; // Devuelve la hora inicial (ejemplo: "10:00")
      };

      // Agrupar y ordenar los datos por fecha
      const groupedData = Object.entries(
        formattedData.reduce((groups, reserva) => {
          const group = groups[reserva.fecha_ini] || [];
          group.push(reserva);
          groups[reserva.fecha_ini] = group;
          return groups;
        }, {})
      )
      .sort(([fechaA], [fechaB]) => new Date(fechaA) - new Date(fechaB)) // Ordenar por fecha ascendente
      .flatMap(([fecha, reservas]) => [
        { type: "header", fecha }, // Encabezado de la sección
        ...reservas
          .sort((a, b) => {
            const horaA = extraerHoraInicial(a.hora_ini); // Extraer hora inicial
            const horaB = extraerHoraInicial(b.hora_ini); // Extraer hora inicial
            return horaA.localeCompare(horaB); // Ordenar alfabéticamente por hora
          })
          .map((reserva) => ({ ...reserva, type: "item" })), // Reservas de la sección
      ]);
  
      setData(groupedData);
      setFilteredData(groupedData);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);

    // Filtrar los datos en función del texto ingresado
    const filtered = data.filter((item) => {
      if (item.type === "header") {
        return formatFecha(item.fecha).toLowerCase().includes(text.toLowerCase());
      }
      return (
        item.id_reserva.toLowerCase().includes(text.toLowerCase()) || // Filtrar por ID de reserva
        item.hora_ini.toLowerCase().includes(text.toLowerCase()) || // Filtrar por hora de inicio
        item.tiempo_reserva.toLowerCase().includes(text.toLowerCase()) || // Filtrar por tiempo de reserva
        item.fecha_ini.toLowerCase().includes(text.toLowerCase()) || // Filtrar por fecha de inicio
        (item.id_instalacion && item.id_instalacion.toLowerCase().includes(text.toLowerCase())) || // Filtrar por ID de instalación
        (item.nombre_instalacion && item.nombre_instalacion.toLowerCase().includes(text.toLowerCase())) // Filtrar por nombre de instalación
      );
    });

    setFilteredData(filtered);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }


  const renderItem = ({ item }) => {
    if (item.type === "header") {
      // Renderizar encabezado de la sección
      return <Text style={styles.sectionHeader}>{formatFecha(item.fecha)}</Text>;
    }
    // Renderizar reserva
    return (
      <Reserva
        reserva={item}
        fetchInstalacion={() => infoInstalacion(item.id_instalacion)}
        onReservaAnulada={() => fetchData()}
      />
    );
  };

  return (
    <View>
      <TextInput
      style={styles.searchInput}
      placeholder="Buscar por ID, hora o fecha..."
      value={searchText}
      onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.containerinstalacion}
      />
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