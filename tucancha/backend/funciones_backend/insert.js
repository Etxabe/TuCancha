import { Alert } from "react-native";
import Parse from './Conexion.js';
import 'react-native-get-random-values';    

const insertInstalacion = async(instalacion) => {
    /*try {
        
        let Instalacion = new Parse.Object('Instalacion');
            Instalacion.set('nombre', instalacion.nombrePista);
            Instalacion.set('descripcion', instalacion.infoExtra);
            Instalacion.set('idPropietario', 1);
            Instalacion.set('idDeporte1', 1);
            if (instalacion.imagen_instalacion) {
                // Convierte la imagen en un archivo
                const response = await fetch(instalacion.imagen_instalacion);
                const blob = await response.blob();  // Convierte el URI en un blob
          
                const file = new Parse.File('imagen_instalacion.jpg', blob);  // El nombre del archivo y el blob
          
                // Asocia la imagen al objeto Instalacion
                Instalacion.set('imagen_instalacion', file);
            }

            // Guardar la instalación
            await Instalacion.save();
            Alert.alert('¡Éxito!', 'Instalación creada correctamente.');
    } catch(error) {
        Alert.alert('Error!', error.message);
        console.error('Error al insertar la instalación:', error); 
    }*/
}

export default insertInstalacion;