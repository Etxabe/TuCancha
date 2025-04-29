import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Dimensions } from 'react-native';
import Parse from './Conexion';
import { ClientContext } from '../../front_cliente/ClientContext';
import { PieChart } from 'react-native-chart-kit';

const ReservasPorInstalacion = () => {
  const { idCliente } = useContext(ClientContext);
  const [conteo, setConteo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        setLoading(true);
        const query = new Parse.Query("Reserva");
        query.equalTo("id_cliente", idCliente); // Filtramos por cliente
        const reservas = await query.find();
        const conteoInstalaciones = {};

        // Recorremos las reservas para contar las instalaciones
        reservas.forEach((reserva) => {
          const idInstalacion = reserva.get("id_instalacion"); // Obtenemos el id_instalacion

          if (idInstalacion) {
            // Si ya existe el id_instalacion en el conteo, incrementamos, si no lo agregamos
            conteoInstalaciones[idInstalacion] = (conteoInstalaciones[idInstalacion] || 0) + 1;
          }
        });

        // Creamos el array de datos para el gráfico de pie
        const data = Object.keys(conteoInstalaciones).map((idInstalacion) => {
          const population = conteoInstalaciones[idInstalacion];

          // Validamos que population sea un número válido
          if (isNaN(population) || population <= 0) {
            console.error(`Invalid population value for installation ${idInstalacion}:`, population);
            return null; // Filtramos cualquier entrada no válida
          }

          return {
            name: idInstalacion, // Usamos el id de la instalación como nombre
            value: population, // Contamos las reservas
            color: getRandomColor(), // Asignamos un color aleatorio
            legendFontColor: "#000000", // Color de la leyenda
            legendFontSize: 15,
          };
        });

        // Filtramos los elementos nulos o inválidos
        const validData = data.filter((item) => item !== null);

        setConteo(validData);

      } catch (error) {
        console.error("Error al obtener reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idCliente) {
      obtenerReservas();
    }
  }, [idCliente]);

  // Función para generar colores aleatorios
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: '#ffffff', // Fondo blanco
    backgroundGradientFrom: '#ffffff', // Fondo blanco en el gradiente
    backgroundGradientTo: '#ffffff', // Fondo blanco en el gradiente
    decimalPlaces: 0, // Número de decimales
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de los textos (negro)
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de los labels (negro)
    style: {
      borderRadius: 16,
    },
    propsForLabels: {
      fontSize: 10, // Tamaño de fuente para los labels
      fontWeight: 'bold',
      color: 'black', // Color negro para los labels
    },
  };

  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Distribución de reservas por instalación
      </Text>
      {loading ? (
        <Text>Cargando reservas...</Text>
      ) : conteo.length === 0 ? (
        <Text>No hay datos disponibles.</Text>
      ) : (
        <View style={{ paddingBottom: 20}}>
        <PieChart
          data={conteo}
          width={screenWidth - 80}
          height={150}
          chartConfig={chartConfig}
          accessor={"value"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
        />
        </View>
      )}
    </View>
  );
};

export default ReservasPorInstalacion;
