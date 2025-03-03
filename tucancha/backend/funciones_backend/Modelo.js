import Parse from './Conexion';

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

const App = () => {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const MiClase = Parse.Object.extend('Instalacion');
    const query = new Parse.Query(MiClase);

    try {
      const results = await query.find();
      console.log('Datos obtenidos:', results);
      results.forEach(obj => console.log(obj.get('nombre'))); // Muestra cada nombre en la consola
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  return (
    <View>
      <Text>Consulta en Back4App</Text>
    </View>
  );
};

export default App;
