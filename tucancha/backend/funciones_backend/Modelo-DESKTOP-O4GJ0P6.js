import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import 'react-native-get-random-values';
import Parse from "./Conexion";

const App = () => {
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
    <View style={{ padding: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.nombre}</Text>
            <Text>{item.descripcion}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
