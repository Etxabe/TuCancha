import { Alert } from "react-native";
import Parse from './Conexion.js';
import 'react-native-get-random-values';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const insertInstalacion = async(nombrePista,infoExtra,image) => {
    try {

        if (image && image.uri) {
            console.log("🖼 Imagen recibida en insertInstalacion:", image.uri);

            // Si la URI es válida, vamos a intentar cargarla
            const response = await fetch(image.uri);
            const blob = await response.blob();
            const archivo = new Parse.File(`instalacion_${Date.now()}.jpg`, blob);

            // Guardar el archivo en Parse
            await archivo.save();
            console.log("🎉 Imagen subida correctamente");

            // Crear la instalación con los demás datos
            let Instalacion = new Parse.Object('Instalacion');
            Instalacion.set('nombre', nombrePista);
            Instalacion.set('descripcion', infoExtra);
            Instalacion.set('imagen_instalacion', archivo);

            // Guardar la instalación
            await Instalacion.save();
            Alert.alert('¡Éxito!', 'Instalación creada correctamente.');
        } else {
            // Si no hay imagen, lo notificamos
            console.log("❌ No hay imagen para subir.");
            Alert.alert("Error", "No se ha seleccionado ninguna imagen o la imagen no tiene URI.");
        }
    } catch(error) {
        Alert.alert('Error!', error.message);
        console.error('Error al insertar la instalación:', error); 
    }
}