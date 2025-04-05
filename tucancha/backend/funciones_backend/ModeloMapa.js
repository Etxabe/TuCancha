import React, { useEffect, useState,useContext,useRef } from "react";
import {StyleSheet,View,TextInput,Button} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Parse from "./Conexion";
import { ClientContext } from "../../front_cliente/ClientContext";


const Mapa = () => {
    
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const { ubicacion, setUbication } = useContext(ClientContext);


      const [searchQuery, setSearchQuery] = useState("");
      const [location, setLocation] = useState(null);
      const mapRef = useRef(null);
    
      const searchLocation = async () => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`;
      
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": "TuCanchaApp/1.0 (tuemail@ejemplo.com)", // Cambia esto por tu información
            },
          });
          const data = await response.json();
      
          if (data.length > 0) {
            const { lat, lon } = data[0];
            const newRegion = {
              latitude: parseFloat(lat),
              longitude: parseFloat(lon),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            };
            setLocation(newRegion);
            mapRef.current.animateToRegion(newRegion, 1000);
          } else {
            console.warn("No se encontraron resultados para la búsqueda.");
          }
        } catch (error) {
          console.error("Error en la búsqueda:", error);
        }
      };




      useEffect(() => {
        const fetchData = async () => {
          try {
            const query = new Parse.Query("Instalacion");
            query.limit(100);
            const results = await query.find();
            
            const formattedData = results.map(item => ({
              id_instalacion: item.id,
              descripcion: item.get("descripcion"),
              precio: item.get("precio"),
              nombre: item.get("nombre"),
              latitude: item.get("latitude"),
              longitude: item.get("longitude"),
              logo_instalacion: item.get("logo_instalacion"),
              hora_inicio: item.get("hora_inicio"),
              hora_fin: item.get("hora_fin"),
              duracion: item.get("tiempo_reserva"),
              imagen_instalacion: item.get("imagen_instalacion") ? item.get("imagen_instalacion").url() : null
            }));
            setData(formattedData);
            
          } catch (error) {
            console.error("Error al obtener datos:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar ubicación"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Buscar" onPress={searchLocation} />
      </View>


      <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
              latitude: 42.527284634963365,  // Latitud inicia, 
              longitude:  -1.6732398052744084, // Longitud inicial
              latitudeDelta: 0.0922, // Nivel de zoom
              longitudeDelta: 0.0421,
          }}
          >
          
          {data.map((item) => (
          <Marker
              key={item.id_instalacion}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              title={item.nombre}
              description={item.descripcion}
              onPress={() => setUbication({
                nombre: item.nombre,
                precio: item.precio,
                descripcion: item.descripcion,
                imagen_instalacion: item.imagen_instalacion,
                hora_inicio: item.hora_inicio,
                hora_fin: item.hora_fin,
                duracion: item.duracion,
                latitude: item.latitude,
                longitude: item.longitude,
                id_instalacion: item.id_instalacion})}
          >
          <Ionicons
            name={item.logo_instalacion} // Aquí seleccionas el nombre del ícono de FontAwesome
            size={30} // Tamaño del ícono
          />
          </Marker>
          ))}
      </MapView>
      {location && <Marker coordinate={location} />}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
});

export default Mapa;
