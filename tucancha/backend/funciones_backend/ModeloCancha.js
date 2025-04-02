import React, { useEffect, useState } from "react";
import {StyleSheet,Image,Button, View, Text, FlatList, ActivityIndicator } from "react-native";
import 'react-native-get-random-values';
import Parse from "./Conexion";

const App = ($id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reemplaza 'NombreDeTuClase' con el nombre de tu clase en Back4App
        const query = new Parse.Query("Instalacion");
        query.limit(100);
        const results = await query.find();
        
        console.log(`ParseObjects found: ${JSON.stringify(results)}`);
        console.log(`Total registros encontrados: ${results.length}`);
        // Mapear resultados a objetos más limpios
        const formattedData = results.map(item => ({
          id: item.id,
          nombre: item.get("nombre"),  // Reemplaza con el campo de tu base de datos
          descripcion: item.get("descripcion"),
          tiempo_reserva: item.get("tiempo_reserva"),
          imagen: item.get("imagen"),
          propietario: item.get("propietario"),
          precio: item.get("precio"),
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

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View>
        
    <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <View style={styles.containerinstalacion}>
            <View style={styles.container}>
                <Image source={{ uri: item.imagen }} style={styles.imagen} />
                <Text style={styles.text}>
                {item.nombre} {item.descripcion}
                </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Precio: {item.precio}€/h</Text>
                <Button title='Reservar' style={styles.boton} onPress={() => alert('Reservar cancha')}></Button>
            </View>
        </View>
        )}
    />
    </View>
  );
};

const styles = StyleSheet.create({
    containerinstalacion: {
        flexDirection: 'col', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        },
    container: {
        flexDirection: 'row', // Organiza los elementos en una fila
        alignItems: 'center', // Centra verticalmente la imagen y el texto
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
        backgroundColor: 'orange',
        borderRadius: 10,
        padding: 10,
    },
});

export default App;