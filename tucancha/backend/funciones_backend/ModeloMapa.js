import React, { useEffect, useState, useContext, useRef } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import Parse from "./Conexion";
import { ClientContext } from "../../front_cliente/ClientContext";
import getUserLocation from "./GeoLocation";

const Mapa = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ubicacion, setUbication } = useContext(ClientContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const [miLocation, setMiLocation] = useState(null);
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

        const formattedData = results.map((item) => ({
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
          imagen_instalacion: item.get("imagen_instalacion")
            ? item.get("imagen_instalacion").url()
            : null,
        }));
        setData(formattedData);

        const userLocation = await getUserLocation();
        if (userLocation) {
          setLocation(userLocation);
          setMiLocation(userLocation); // Actualiza la ubicación del usuario
          if (mapRef.current) {
            mapRef.current.animateToRegion(userLocation, 1000); // Centra el mapa en la ubicación del usuario
          }
        }
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
          placeholder="Buscar ubicación" // Cambiado al español
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Buscar" onPress={searchLocation} />
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location?.latitude || 42.527284634963365, // Usa la ubicación del usuario si está disponible
          longitude: location?.longitude || -1.6732398052744084, // Usa la ubicación del usuario si está disponible
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {data.map((item) => {
          if (item.latitude && item.longitude) { // Verifica que las coordenadas sean válidas
            return (
              <Marker
                key={item.id_instalacion}
                coordinate={{ latitude: item.latitude, longitude: item.longitude }}
                title={item.nombre}
                description={item.descripcion}
                onPress={() => {
                  setUbication({
                    nombre: item.nombre,
                    precio: item.precio,
                    descripcion: item.descripcion,
                    imagen_instalacion: item.imagen_instalacion,
                    hora_inicio: item.hora_inicio,
                    hora_fin: item.hora_fin,
                    duracion: item.duracion,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    id_instalacion: item.id_instalacion,
                  });
                  console.log(item);
                }}
              >
                <Ionicons name={item.logo_instalacion} size={30} />
              </Marker>
            );
          }
          return null; // No renderiza el marcador si las coordenadas no son válidas
        })}
        {miLocation && miLocation.latitude && miLocation.longitude ? (
        <Marker
          coordinate={miLocation}
          title="Tu ubicación"
          description="Aquí estás"
        />
      ) : (
        <Marker
          coordinate={{
            latitude: 42.527284634963365,
            longitude: -1.6732398052744084,
          }}
          title="Ubicación por defecto"
          description="No se pudo obtener tu ubicación"
        />
      )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: "100%",
    height: "80%",
  },
});

export default Mapa;