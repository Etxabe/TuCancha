import React, { useContext ,useState} from "react";
import { Modal, View, Text, Button, StyleSheet, Image,TouchableOpacity  } from "react-native";
import { ClientContext } from '../front_cliente/ClientContext';
import { Calendar } from 'react-native-calendars';

const MyModal = ({ visible, onClose }) => {
  const { ubicacion, setUbicacion, reserva, setReserva } = useContext(ClientContext);
  const [selectedDate, setSelectedDate] = useState((reserva.fecha).toLocaleDateString());

  const [selectedHour, setSelectedHour] = useState(null);
  const [dataSelected, hasBeenSelectedData] = useState(false);

  const handleHourSelect = (hour) => {
    setSelectedHour(hour);
    setReserva({ ...reserva, fecha: selectedDate, hora: hour });
    onClose(); // Cerrar el modal principal
  };

  const handleDateSelect = (day) => {
    setSelectedDate(day.dateString);
    hasBeenSelectedData(true);
  };


  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.text}>¿Cuando deseas reservar?</Text>
          <Text style={styles.text}>{ubicacion.nombre}</Text>

          {/* Verificar si la URL de la imagen es válida */}
          <Image
            source={{
              uri: ubicacion.imagen_instalacion
                ? ubicacion.imagen_instalacion
                : 'ruta/a/imagen/default.jpg', // Imagen predeterminada si no existe la URL
            }}
            style={styles.imagen}
          />

        <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
            [selectedDate]: { selected: true, selectedColor: 'blue' }
            }}
            monthFormat={'yyyy MM'}
        />

        {dataSelected && (
        <View style={styles.hoursContainer}>
        <Text style={styles.text}>Selecciona una hora</Text>
        {/* Lista de horas disponibles */}
        {["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((hour) => (
            <TouchableOpacity
            key={hour}
            onPress={() => handleHourSelect(hour)}
            style={[
                styles.hourOption,
                selectedHour === hour && styles.selectedHourOption,
            ]}
            >
            <Text>{hour}</Text>
            </TouchableOpacity>
        ))}
        </View>
        )}




        <Text style={styles.text}>{(reserva.fecha).toLocaleDateString()}</Text>
        <Button title="Cerrar" onPress={onClose} />
        </View>
      </View>
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
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      alignItems: "center",
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    imagen: {
      width: 150,
      height: 150,
      marginBottom: 20,
      borderRadius: 10, // Agregar bordes redondeados
    },
    hoursContainer: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
      },
  });
  
  export default MyModal;