import React, { useContext ,useState} from "react";
import { Modal, View, Text, Button, StyleSheet, Image,TouchableOpacity ,ScrollView } from "react-native";
import { ClientContext } from '../front_cliente/ClientContext';
import { Calendar } from 'react-native-calendars';
import { insertReserva } from "../backend/funciones_backend/InsertarReserva"; 


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

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);

    const formattedDate = formatDate(reserva.fecha);


    const newReserva = {
      fecha_ini: formattedDate,
      id_instalacion: ubicacion.id_instalacion,
      id_cliente: "aritz",
      hora_ini: hour,
      tiempo_reserva: ubicacion.duracion + "",
    };
    console.log("Reserva111:", newReserva);
    insertReserva(newReserva);
    setConfirmationVisible(true); // Mostrar el modal de confirmación
  };

  const handleDateSelect = (day) => {
    console.log("Fecha seleccionada:", day.dateString); // Verifica el valor recibido
    const formattedDate = formatDate(day.dateString); // Formatear la fecha seleccionada
  
    // Actualizar el estado de la fecha seleccionada
    setSelectedDate(formattedDate);
  
    // Actualizar el estado global de reserva
    setReserva((prevReserva) => ({
      ...prevReserva,
      fecha: new Date(day.dateString), // Guardar como objeto Date
    }));
  
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

      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.text}>¿Cuando deseas reservar?</Text>
          <Text style={styles.text}>{ubicacion.nombre}</Text>

        <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' }
            }}
            monthFormat={'yyyy MM'}
        />
          
        <View style={styles.hoursContainer}>
          {availableHours.map((hour) => (
            <TouchableOpacity
              key={hour}
              onPress={() => handleHourSelect(hour)}
              style={[
                styles.hourOption,
                selectedHour === hour && styles.selectedHourOption,
              ]}
            >
              <Text>
              <Text style={styles.hours}>{hour || "Hora no disponible"}</Text> {/* Mostrar solo el intervalo */}
              </Text>
              </TouchableOpacity>
          ))}
        </View>
        <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
      </ScrollView>

      {confirmationVisible && (
          <Modal
            visible={confirmationVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setConfirmationVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.confirmationContainer}>
                <Text style={styles.confirmationTitle}>¡Reserva Confirmada!</Text>
                <Text style={styles.confirmationText}>
                  Has reservado para el <Text style={styles.highlight}>{selectedDate}</Text> a las{" "}
                  <Text style={styles.highlight}>{selectedHour}</Text> en{" "}
                  <Text style={styles.highlight}>{ubicacion.nombre}</Text>.
                </Text>
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
            </View>
          </Modal>
        )}

    </Modal>
  );
};

const styles = StyleSheet.create({
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
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 5,
    alignItems: "center",
  },
  selectedHourOption: {
    backgroundColor: "#2ecc71",
  },
  hours: {
    color: "black",
    fontWeight: "bold",
  },
});

export default MyModal