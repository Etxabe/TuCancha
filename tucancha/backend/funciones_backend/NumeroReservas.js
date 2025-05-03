import React, { useState, useEffect, useContext } from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Parse from './Conexion';
import { ClientContext } from '../../front_cliente/ClientContext';
import { BarChart } from 'react-native-chart-kit'; // Importamos el gráfico de barras

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
               'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const ReservasPorMes = () => {
  const { idCliente } = useContext(ClientContext);
  const [conteo, setConteo] = useState([]);
  const [conteoHoras, setConteoHoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [horas, setHoras] = useState(false);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        setLoading(true);
        const query = new Parse.Query("Reserva");
        query.equalTo("id_cliente", idCliente);
        const reservas = await query.find();

        const hoy = new Date();
        const añoActual = hoy.getFullYear();
        const conteoMeses = new Array(hoy.getMonth() + 1).fill(0); // Inicializa el conteo para todos los meses hasta el actual
        const conteoMesesHoras = new Array(hoy.getMonth() + 1).fill(0);

        reservas.forEach((reserva) => {
          const fechaRaw = reserva.get("fecha_ini"); // Cambié a fecha_ini

          if (!fechaRaw) return; // Si no tiene fecha, lo saltamos

          // Convertimos el string en una fecha válida
          const fecha = new Date(fechaRaw);

          if (!isNaN(fecha) && fecha.getFullYear() === añoActual) {
            const mes = fecha.getMonth(); // 0 = Enero
            if (mes <= hoy.getMonth()) {
              conteoMeses[mes]++;
              conteoMesesHoras[mes] += parseInt(reserva.get("tiempo_reserva")) / 60;
            }
          } else {
          }
        });

        setConteo(conteoMeses);
        setConteoHoras(conteoMesesHoras);
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

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: meses.slice(0, conteo.length), // Solo mostramos los meses hasta el actual
    datasets: [
      {
        data: conteo,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color de las barras
        strokeWidth: 2, // Ancho de las barras
      },
    ],
  };

  const dataH = {
    labels: meses.slice(0, conteoHoras.length), // Solo mostramos los meses hasta el actual
    datasets: [
      {
        data: conteoHoras,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color de las barras
        strokeWidth: 2, // Ancho de las barras
      },
    ],
  };




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
    fontSize: 12, // Tamaño de fuente para los labels
    fontWeight: 'bold',
    color: 'black', // Color negro para los labels
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#000000', // Borde negro para los puntos
  },
  // Cambiar color de las barras y su borde
  datasets: [
    {
      data: conteo,
      color: (opacity = 1) => `rgba(255, 165, 38, ${opacity})`, // Barra naranja
      strokeWidth: 2, // Ancho de las barras
      borderColor: '#000000', // Borde negro en las barras
    },
  ],
};


  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
        Numero de reservas por mes ({new Date().getFullYear()})
      </Text>
      <TouchableOpacity onPress={() => setHoras(!horas)} style={{backgroundColor: "rgb(255, 255, 255)", padding: 10}}>
        {horas ?
            ( <Text>Ver numero de reservas</Text> ) :
            ( <Text>Ver horas totales</Text> )
        }
      </TouchableOpacity>
      {loading ? (
        <Text>Cargando reservas...</Text>
      ) : (
        
        <View style={{paddingBottom: 20}}>
            <View style={{backgroundColor: "rgb(255, 255, 255)", padding: 15,alignContent: "center"}}>
                {horas ?
                ( <Text style={{textAlign: "center", fontSize: 19}}>Numero de reservas por mes</Text> ) :
                ( <Text style={{textAlign: "center", fontSize: 19}}>Horas de reserva por mes</Text> )
            }
            </View>
          <BarChart
            data={horas ? (dataH) : (data)}
            width={screenWidth - 40} // Ancho del gráfico
            height={250}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero={true}
          />
        </View>
      )}
    </View>
  );
};

export default ReservasPorMes;

