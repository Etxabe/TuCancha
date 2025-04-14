import React, { useState,useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ServerContext } from '../front_servidor/ServerContext.js';

const Mapa = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { instalacion, setInstalacion } = useContext(ServerContext);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    // Actualizar la instalación con latitud y longitud
    setInstalacion((prev) => ({
      ...prev,
      latitud: latitude,
      longitud: longitude,
    }));

    // Muestra la latitud y longitud en un Alert
    Alert.alert("Ubicación seleccionada", `Lat: ${latitude}, Lng: ${longitude}`);
  };

  return (
    
      <MapView
        style={styles.map}
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
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%", // Mapa ocupa toda la pantalla
  },
});

export default Mapa;
