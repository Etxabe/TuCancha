import { Alert } from "react-native";
import Parse from './Conexion.js';
import 'react-native-get-random-values';    

const insertInstalacion = async(instalacion,setInstalacion) => {

    console.log("Datos recibidos para insertar instalación:", instalacion);

    if(instalacion.nombrePista &&
        instalacion.descripcion &&
        instalacion.horaApertura &&
        instalacion.horaCierre &&
        instalacion.precio > 0 &&
        instalacion.duracion > 0 &&
        instalacion.latitud !== 0 &&
        instalacion.longitud !== 0){
            try {
                let Instalacion = new Parse.Object('Instalacion');
                    Instalacion.set('nombre', instalacion.nombrePista);
                    Instalacion.set('descripcion', instalacion.descripcion);
                    Instalacion.set('hora_inicio', instalacion.horaApertura);
                    Instalacion.set('hora_fin', instalacion.horaCierre);
                    Instalacion.set('precio', parseInt(instalacion.precio));
                    Instalacion.set('tiempo_reserva', parseInt(instalacion.duracion));
                    Instalacion.set('latitude', parseFloat(instalacion.latitud));
                    Instalacion.set('longitude', parseFloat(instalacion.longitud));
                    Instalacion.set('idPropietario', 1);//coger de serverContext
                    Instalacion.set('idDeporte1', 1);//cojer de algun lado
                    Instalacion.set('logo_instalacion','football-outline');//cojer de algun lado
                    if (instalacion.imagen_instalacion) {
                        // Convierte la imagen en un archivo
                        const response = await fetch(instalacion.imagen_instalacion);
                        const blob = await response.blob();  // Convierte el URI en un blob
                
                        const file = new Parse.File('imagen_'+instalacion.nombrePista+ '.jpg', blob);

                        Instalacion.set('imagen_instalacion', file);
                    }

                    await Instalacion.save();

                    
                    Alert.alert('¡Éxito!', 'Instalación creada correctamente.');
            } catch(error) {
                Alert.alert('Error!', error.message);
                console.error('Error al insertar la instalación:', error); 
            }
    }else{
        Alert.alert("Datos de instalacion INCOMPLETOS","Por favor, rellene todos los campos y seleccione una ubicacion en el mapa");
    }
}

export default insertInstalacion;