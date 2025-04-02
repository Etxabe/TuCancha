import React, { useEffect, useState,useContext } from "react";
import {StyleSheet} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Parse from "./Conexion";
import { ClientContext } from "../../front_cliente/ClientContext";


const Mapa = ({ onSelectUbicacion }) => {
    
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
      const { ubicacion, setUbication } = useContext(ClientContext);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const query = new Parse.Query("Instalacion");
            query.limit(100);
            const results = await query.find();
            
            const formattedData = results.map(item => ({
              id: item.id,
              descripcion: item.get("descripcion"),
              precio: item.get("precio"),
              nombre: item.get("nombre"),
              latitude: item.get("latitude"),
              longitude: item.get("longitude"),
              logo_instalacion: item.get("logo_instalacion"),
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
      <MapView
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
              key={item.id}
              coordinate={{ latitude: item.latitude, longitude: item.longitude }}
              title={item.nombre}
              description={item.descripcion}
              onPress={() => setUbication({nombre: item.nombre,precio: item.precio,descripcion: item.descripcion,imagen_instalacion: item.imagen_instalacion})}
          >
          <Ionicons
            name={item.logo_instalacion} // Aquí seleccionas el nombre del ícono de FontAwesome
            size={30} // Tamaño del ícono
          />
          </Marker>
          ))}
      </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "60%",
  },
});

export default Mapa;
