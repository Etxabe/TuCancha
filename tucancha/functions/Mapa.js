import React, { useState, useContext, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, TextInput, Button,ActivityIndicator,Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ServerContext } from '../front_servidor/ServerContext.js';
import getUserLocation from '../backend/funciones_backend/GeoLocation.js';

const Mapa = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { instalacion, setInstalacion } = useContext(ServerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
  
      if (instalacion.latitud !== 0 && instalacion.longitud !== 0) {
        const customLocation = {
          latitude: instalacion.latitud,
          longitude: instalacion.longitud,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
  
        setSelectedLocation({ latitude: instalacion.latitud, longitude: instalacion.longitud });
        if (mapRef.current) {
          mapRef.current.animateToRegion(customLocation, 1000);
        }
        setLoading(false);
      } else {
        const loc = await getUserLocation();
        if (loc) {
          setUserLocation(loc);
          setSelectedLocation({ latitude: loc.latitude, longitude: loc.longitude });
          if (mapRef.current) {
            mapRef.current.animateToRegion(loc, 1000);
          }
        }
        setLoading(false);
      }
    };
  
    fetchLocation();
  }, []);
  
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
          "User-Agent": "TuCanchaApp/1.0 (tuemail@ejemplo.com)", // Cambia esto por tu info
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
          placeholder="Buscar ubicación"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Buscar" onPress={searchLocation} />
      </View>

      {loading && (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Cargando ubicacion del usuario...</Text>
      </View>
      )}

      <MapView
        style={styles.map}
        ref={mapRef}
        region={{
          latitude: userLocation?.latitude || 42.527284634963365,
          longitude: userLocation?.longitude || -1.6732398052744084,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
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
    height: "90%",
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  
});

export default Mapa;
