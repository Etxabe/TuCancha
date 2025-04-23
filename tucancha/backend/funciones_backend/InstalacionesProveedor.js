import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ServerContext } from '../../front_servidor/ServerContext';
import Parse from './Conexion';
import InstalacionEnLista from '../../functions/InstalacionEnLista';

export default function InstalacionesProveedor() {
  const { idProveedor } = useContext(ServerContext); // Obtener el ID del usuario desde el contexto
  const { instalacion } = useContext(ServerContext);
  const [instalaciones, setInstalaciones] = useState([]); // Estado para almacenar las instalaciones
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    const fetchInstalaciones = async () => {
      try {
        const query = new Parse.Query('Instalacion');
        query.equalTo('idPropietario', idProveedor); // Filtrar por el ID del proveedor
        const results = await query.find();

        console.log("ID de usuario en InsPro:", idProveedor); // Log para verificar el ID del usuario

        const instalacionesData = results.map((instalacion) => ({
          id: instalacion.id,
          nombre: instalacion.get('nombre'),
          precio: instalacion.get('precio'),
          descripcion: instalacion.get('descripcion'),
          imagen: instalacion.get('imagen_instalacion') ? instalacion.get('imagen_instalacion').url() : null,
        }));

        console.log('Instalaciones obtenidas:', instalacionesData); // Log para verificar los datos
        setInstalaciones(instalacionesData);
      } catch (error) {
        console.error('Error al obtener las instalaciones:', error);
        Alert.alert('Error', 'No se pudieron cargar las instalaciones.');
      } finally {
        setIsLoading(false); // Finalizar la carga
      }
    };

    fetchInstalaciones();
  }, [idProveedor]);

  const renderItem = ({ item }) => (
    <InstalacionEnLista
      nombre={item.nombre}
      precio={item.precio}
      descripcion={item.descripcion}
      imagen={item.imagen}
    />
  );

  if (!idProveedor) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (instalaciones.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.texto}>No tienes instalaciones registradas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Tus canchas</Text>
      <FlatList
        data={instalaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  texto: {
    fontSize: 20,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    paddingVertical: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});