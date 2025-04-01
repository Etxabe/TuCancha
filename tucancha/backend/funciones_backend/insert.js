import { Alert } from "react-native";
import Parse from './Conexion.js';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const insertInstalacion = async(nombrePista) => {
    try {

        let Instalacion = new Parse.Object('Instalacion');
        Instalacion.set('nombre', nombrePista);
        Instalacion.set('idDeporte1','1');
        Instalacion.set('idPropietario','1');
    
        await Instalacion.save();
        Alert.alert('¡Éxito!', 'Instalación creada correctamente.');
    } catch(error) {
        Alert.alert('Error!', error.message);
        console.error('Error al insertar la instalación:', error); 
    }
}