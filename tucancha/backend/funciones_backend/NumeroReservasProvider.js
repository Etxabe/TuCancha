import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { ServerContext } from '../../front_servidor/ServerContext';
import Parse from './Conexion';
import { BarChart, PieChart } from 'react-native-chart-kit';

export default function ReservasGraficas() {
  const { idProveedor } = useContext(ServerContext);
  const [reservasPorMes, setReservasPorMes] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        setIsLoading(true);

        if (!idProveedor) {
          console.error('El ID del propietario no está definido.');
          return;
        }

        const queryInstalaciones = new Parse.Query('Instalacion');
        queryInstalaciones.equalTo('idPropietario', idProveedor);
        const instalaciones = await queryInstalaciones.find();

        if (!instalaciones || instalaciones.length === 0) {
          console.warn('No se encontraron instalaciones para el propietario.');
          setReservasPorMes([]);
          setPieChartData([]);
          return;
        }

        const instalacionesIds = instalaciones.map((instalacion) => instalacion.id);
        const instalacionesNombres = instalaciones.map((instalacion) => ({
          id: instalacion.id,
          nombre: instalacion.get('nombre'),
        }));

        const queryReservas = new Parse.Query('Reserva');
        queryReservas.containedIn('id_instalacion', instalacionesIds);
        const reservas = await queryReservas.find();

        const hoy = new Date();
        const meses = Array(hoy.getMonth() + 1).fill(0);
        const reservasPorInstalacion = {};

        reservas.forEach((reserva) => {
          const fechaRaw = reserva.get('fecha_ini');
          const idInstalacion = reserva.get('id_instalacion');
          const fecha = new Date(fechaRaw);

          if (fecha && fecha.getFullYear() === hoy.getFullYear()) {
            const mes = fecha.getMonth();
            if (mes <= hoy.getMonth()) {
              meses[mes]++;
            }
          }

          if (idInstalacion) {
            reservasPorInstalacion[idInstalacion] = (reservasPorInstalacion[idInstalacion] || 0) + 1;
          }
        });

        // Formateo para el gráfico de pastel
        const dataPie = instalacionesNombres.map((inst, index) => {
          const value = reservasPorInstalacion[inst.id] || 0;
          return {
            name: inst.nombre,
            value,
            color: getRandomColor(index),
            legendFontColor: '#000000',
            legendFontSize: 15,
          };
        }).filter(item => item.value > 0);

        setReservasPorMes(meses);
        setPieChartData(dataPie);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
        setReservasPorMes([]);
        setPieChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, [idProveedor]);

  const getRandomColor = (index) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <View style={styles.graficas}>
            <Text style={styles.titulo}>Reservas por mes</Text>
            <BarChart
                data={{
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].slice(0, reservasPorMes.length),
                datasets: [{ data: reservasPorMes }],
                }}
                width={screenWidth}
                height={screenHeight / 3}
                chartConfig={chartConfig}
                verticalLabelRotation={30}
                fromZero={true}
            />
        </View>
        <View style={styles.graficas}>
        <Text style={styles.titulo}>Distribución de reservas por instalación</Text>
        {pieChartData.length === 0 ? (
            <Text>No hay reservas registradas.</Text>
        ) : (
            <PieChart
            data={pieChartData}
            width={screenWidth}
            height={screenHeight / 4}
            chartConfig={chartConfig}
            accessor="value"
            backgroundColor="transparent"
            />
        )}    
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    graficas: {
        flex: 1,
    }
});
