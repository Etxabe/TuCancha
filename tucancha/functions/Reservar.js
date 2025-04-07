import React, { useContext ,useState,useEffect} from "react";
import { Modal, View, Text, Button, StyleSheet, Image,TouchableOpacity ,ScrollView } from "react-native";
import { ClientContext } from '../front_cliente/ClientContext';
import { Calendar } from 'react-native-calendars';
import { insertReserva } from "../backend/funciones_backend/InsertarReserva"; 
import ElTiempo from "../backend/funciones_backend/ElTiempo";
import { consultarHorario, horasPasadas } from "../backend/funciones_backend/HorarioDisponible";


const MyModal = ({ visible, onClose }) => {
  const { ubicacion, setUbicacion, reserva, setReserva } = useContext(ClientContext);

  
  const [selectedHour, setSelectedHour] = useState(null);
  const [dataSelected, hasBeenSelectedData] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false); // Estado para el modal de confirmación


  const formatDate = (date) => {
    if (!(date instanceof Date)) {
      date = new Date(date); // Convertir a objeto Date si no lo es
    }
    const year = date.getFullYear(); // Año
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Mes con dos dígitos
    const day = date.getDate().toString().padStart(2, "0"); // Día con dos dígitos
    return `${year}-${month}-${day}`; // Formato YYYY-MM-DD
  };
  const [selectedDate, setSelectedDate] = useState(
    reserva.fecha ? formatDate(reserva.fecha) : formatDate(new Date())
  );
  const [horasOcupadas, setHorasOcupadas] = useState([]); 

  useEffect(() => {
    const fetchHorasOcupadas = async () => {
      try {

        if (!ubicacion.hora_inicio || !ubicacion.duracion) {
          console.error("hora_ini o duracion no están definidos en ubicacion.", ubicacion);
          return;
        }
        const horas = await consultarHorario(ubicacion.id_instalacion, selectedDate);
        const hoy = new Date().toISOString().split("T")[0];
        const horasPasadasHoy = selectedDate === hoy ? horasPasadas(ubicacion.hora_inicio, ubicacion.duracion) : [];
        const todasLasHorasOcupadas = [...horas, ...horasPasadasHoy];
        setHorasOcupadas(todasLasHorasOcupadas); // Actualiza el estado con las horas ocupadas
        console.log("Horas ocupadas hoy:", horasOcupadas);
        console.log("Horas ocupadas:", horas);
      } catch (error) {
        console.error("Error al consultar las horas ocupadas:", error);
      }
    };

    fetchHorasOcupadas();
  }, [visible,selectedDate]); // Ejecuta el efecto cuando cambia la fecha seleccionada


  const handleHourSelect = (hour) => {
    setSelectedHour(hour);

    setSelectedDate(selectedDate);
    const newReserva = {
      fecha_ini: selectedDate,
      id_instalacion: ubicacion.id_instalacion,
      id_cliente: "usuario.id_cliente",
      hora_ini: hour,
      tiempo_reserva: ubicacion.duracion + "",
    };

    setReserva(newReserva); 
    console.log("Reserva actualizada:", reserva);
  };

  const handleDateSelect = (day) => {
    console.log("Fecha seleccionada:", day.dateString); // Verifica el valor recibido
    const formattedDate = formatDate(day.dateString); // Formatear la fecha seleccionada
    setSelectedDate(formattedDate);
    hasBeenSelectedData(true); // Indicar que se ha seleccionado una fecha
  };


  const generateHoursArray = (start, end, interval) => {
  // Validar que start y end sean cadenas válidas
  if (!start || !end || typeof start !== "string" || typeof end !== "string") {
    return [];
  }


  const hoursArray = [];
  let [startHour, startMinute] = start.split(":").map(Number); // Convertir hora inicial a números
  let [endHour, endMinute] = end.split(":").map(Number); // Convertir hora final a números

  let current = new Date(1970, 0, 1, startHour, startMinute); // Crear fecha inicial
  const endTime = new Date(1970, 0, 1, endHour, endMinute); // Crear fecha final


  while (current < endTime) {
    const startHours = current.getHours().toString().padStart(2, "0"); // Formato HH
    const startMinutes = current.getMinutes().toString().padStart(2, "0"); // Formato mm

    const next = new Date(current.getTime() + interval * 60000); // Incrementar por interval minutos
    const endHours = next.getHours().toString().padStart(2, "0"); // Formato HH
    const endMinutes = next.getMinutes().toString().padStart(2, "0"); // Formato mm

    if (next <= endTime) {
      hoursArray.push(`${startHours}:${startMinutes} - ${endHours}:${endMinutes}`); // Agregar rango al array
    }
    current = next; // Avanzar al siguiente intervalo
  }
  
    return hoursArray;
  };

  const availableHours = generateHoursArray(
    ubicacion.hora_inicio, // Hora inicial (formato "5:00")
    ubicacion.hora_fin, // Hora final (formato "17:00")
    ubicacion.duracion  // Duración en minutos (55)
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <ScrollView>

      <View style={[styles.overlay,selectedHour && { marginBottom: 63 },]}>
        <View style={styles.modalContainer}>
          <View style={styles.tituloResreva}>
            <Text style={styles.textHeader}>¿Cuando deseas reservar?</Text>
            <Text style={styles.text}>{ubicacion.nombre}</Text>
          </View>
          

        <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' }
            }}
            monthFormat={'yyyy MM'}
            minDate={new Date().toISOString().split("T")[0]}
        />
          
        <View style={styles.hoursContainer}>
          {availableHours.map((hour) => (
            horasOcupadas.includes(hour) ? (
              <Text
                key={hour}
                style={[
                  styles.reservado,
                  styles.textAlignContent = "center",
                ]}
              >
                {hour}
              </Text>
            ) : (
              <TouchableOpacity
                key={hour}
                onPress={() => handleHourSelect(hour)}
                style={[
                  styles.hourOption,
                  selectedHour === hour && styles.selectedHourOption,
                ]}
              >
                <Text style={styles.hours}>{hour || "Hora no disponible"}</Text>
              </TouchableOpacity>
            )
          ))}
        </View>
        </View>
      </View>
      </ScrollView>
      <View style={
            selectedHour
              ? styles.buttonsContainerHourSelected // Aplica este estilo si hay una hora seleccionada
              : styles.buttonsContainer // Aplica este estilo por defecto
          }>
          <TouchableOpacity title="Cerrar" 
            onPress={onClose} 
            style={styles.closeButton}>
            <Text style={styles.textButton} >Cerrar</Text>
            </TouchableOpacity>
          <TouchableOpacity title="Reservar" 
            onPress={() => {
              insertReserva(reserva);
              setSelectedHour(null);
              hasBeenSelectedData(false);

              setConfirmationVisible(true);
            }} 
            style={styles.bookButton}>
            <Text style={styles.textButton} >Reservar</Text>
          </TouchableOpacity>
        </View>

      {confirmationVisible && (
        <Modal
          visible={confirmationVisible}
          animationType="fade"
          transparent={true}
          onRequestClose={() => setConfirmationVisible(false)}
        >
          <View style={styles.confirmationOverlay}>
            <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationTitle}>¡Reserva Confirmada!</Text>
                <Text style={styles.confirmationText}>
                  Has reservado para el <Text style={styles.confirmationHighlight}>{selectedDate}</Text> a las{" "}
                  <Text style={styles.confirmationHighlight}>{selectedHour}</Text> en{" "}
                  <Text style={styles.confirmationHighlight}>{ubicacion.nombre}</Text>.
                </Text>
                <View style={styles.confirmationWeatherContainer}>
                  <ElTiempo />
                </View>
              </View>
              <TouchableOpacity
                style={styles.confirmationButton}
                onPress={() => {
                  setConfirmationVisible(false);
                  onClose();
                }}
              >
                <Text style={styles.confirmationButtonText}>Aceptar</Text>
              </TouchableOpacity>
          </View>
        </Modal>
      )}

    </Modal>
  );
};

const styles = StyleSheet.create({
  tituloResreva: {
    flexDirection: "column", 
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
    backgroundColor: "rgb(255, 255, 255)",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  confirmationContainer: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
    marginBottom: 10,
  },
  confirmationText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#34495e",
  },
  highlight: {
    fontWeight: "bold",
    color: "#2ecc71",
  },
  confirmationButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  confirmationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  hoursContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  hourOption: {
    width: "48%",
    padding: 12.5,
    marginBottom: 10,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 5,
    alignItems: "center",
  },
  reservado: {
    width: "48%",
    padding: 12.5,
    marginBottom: 10,
    backgroundColor: "rgb(182, 176, 176)",
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
  },
  selectedHourOption: {
    backgroundColor: "#2ecc71",
  },
  hours: {
    color: "black",
    fontWeight: "bold",
  },

  confirmationOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  
  confirmationWeatherContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    borderBlockColor: "black",
    borderWidth: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "rgb(255, 255, 255)",
  },
  buttonsContainerHourSelected: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "rgb(255, 255, 255)",
    zIndex: 10,
    marginTop: 40,
  },
  bookButton: {
    borderWidth: 1,
    borderColor: "#2ecc71",
    backgroundColor: "#84ffb5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "48%",
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "#e74c3c",
    backgroundColor: "rgb(255, 134, 134)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "48%",
  },
  textButton: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});

export default MyModal