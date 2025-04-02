import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Mapa = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    // Muestra la latitud y longitud en un Alert
    Alert.alert("Ubicación seleccionada", `Lat: ${latitude}, Lng: ${longitude}`);
  };

  return (
    
      <MapView
        style={styles.map}
        initialRegion={{
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
    width: "70%",
    height: "70%", // Mapa ocupa toda la pantalla
  },
});

export default Mapa;
