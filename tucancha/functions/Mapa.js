import React, { useState,useContext,useRef } from "react";
import { View, StyleSheet, Alert,TextInput,Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ServerContext } from '../front_servidor/ServerContext.js';

const Mapa = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { instalacion, setInstalacion } = useContext(ServerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    setInstalacion((prev) => ({
      ...prev,
      latitud: latitude,
      longitud: longitude,
    }));

    Alert.alert("Ubicación seleccionada", `Lat: ${latitude}, Lng: ${longitude}`);
  };

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
  return (
    <View>
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
        style={styles.map}
        ref={mapRef}
        initialRegion={{//quizas cojer la ubi del usuario, asi se centra en donde esta, ahora mismo se centra en tafalla
          latitude: 42.527284634963365,
          longitude: -1.6732398052744084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress} // Detecta toques en el mapa
      >
        {/* Muestra el marcador solo si se ha seleccionado una ubicación */}
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Ubicación seleccionada"
            description={`Lat: ${selectedLocation.latitude}, Lng: ${selectedLocation.longitude}`}
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
    width: "100%",
    height: "90%", // Mapa ocupa toda la pantalla
  },
});

export default Mapa;
