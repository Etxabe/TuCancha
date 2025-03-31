import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Button, View, Text, FlatList, ActivityIndicator ,TouchableOpacity} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Cancha from "./ModeloCancha";
import Parse from "./Conexion";


const Mapa = ({ onSelectUbicacion }) => {
    
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
        

      useEffect(() => {
        const fetchData = async () => {
          try {
            const query = new Parse.Query("Instalacion");
            query.limit(100);
            const results = await query.find();
            
            const formattedData = results.map(item => ({
              id: item.id,
              descripcion: item.get("descripcion"),
              nombre: item.get("nombre"),
              latitude: item.get("latitude"),
              longitude: item.get("longitude"),
              logo_instalacion: item.get("logo_instalacion"),
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
    
  const { ubicacion } = useLocation();

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
          >
            <TouchableOpacity onPress={() => {
              seleccionarUbicacion(item.id, item.nombre, item.latitude, item.longitude); 
              onSelectUbicacion(item);
            }}
            >
              <Ionicons
                name={item.logo_instalacion} // Aquí seleccionas el nombre del ícono de FontAwesome
                size={30} // Tamaño del ícono
              />
            </TouchableOpacity>
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
    height: "50%",
  },
});

export default Mapa;
