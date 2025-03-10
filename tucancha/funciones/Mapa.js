import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Mapa = () => {
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
        {/* Marcador en el mapa */}
        <Marker
            coordinate={{ latitude: 42.527284634963365, longitude: -1.6732398052744084 }}
            title="Ubicación Ejemplo"
            description="Este es un marcador de prueba"
        />
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
