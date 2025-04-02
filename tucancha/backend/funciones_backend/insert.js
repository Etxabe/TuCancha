import { Alert } from "react-native";
import Parse from './Conexion.js';
import 'react-native-get-random-values';    

const insertInstalacion = async(instalacion) => {
    try {

        let Instalacion = new Parse.Object('Instalacion');
            Instalacion.set('nombre', instalacion.nombrePista);
            Instalacion.set('descripcion', instalacion.infoExtra);
            Instalacion.set('idPropietario', 1);
            
            //Instalacion.set('imagen_instalacion', archivo);

            // Guardar la instalación
            await Instalacion.save();
            Alert.alert('¡Éxito!', 'Instalación creada correctamente.');
    } catch(error) {
        Alert.alert('Error!', error.message);
        console.error('Error al insertar la instalación:', error); 
    }
}

export default insertInstalacion;