import { Alert } from "react-native";
import Parse from 'parse/react-native.js';
import 'react-native-get-random-values';


export const insertInstalacion = async(nombrePista) => {
    try {
        let Instalacion = new Parse.Object('Instalacion');
        Instalacion.set('nombre', nombrePista);
    
        await Instalacion.save();
        Alert.alert('¡Éxito!', 'Instalación creada correctamente.');
    } catch(error) {
        console.error('Error al insertar la instalación:', error); 
    }
}