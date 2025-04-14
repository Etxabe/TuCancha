import { Alert } from "react-native";
import Parse from './Conexion.js';
import 'react-native-get-random-values';

export const insertReserva = async(reserva) => {
    try {
        console.log('Reserva:', reserva); // Verifica que la reserva tenga los datos correctos
        let Reserva = new Parse.Object('Reserva');
        Reserva.set('id_instalacion', reserva.id_instalacion);
        Reserva.set('id_cliente', reserva.id_cliente);
        Reserva.set('fecha_ini', reserva.fecha_ini);
        Reserva.set('hora_ini', reserva.hora_ini);
        Reserva.set('tiempo_reserva', reserva.tiempo_reserva);
        

        await Reserva.save();

    } catch(error) {
        Alert.alert('Error!', error.message);
        console.error('Error al insertar la instalación:', error); 
    }
}