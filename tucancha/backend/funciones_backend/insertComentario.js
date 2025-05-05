import { Alert } from 'react-native';
import Parse from './Conexion.js';

export const insertComentario = async (comentario) => {
  try {

    const Reserva = Parse.Object.extend('Reservas');
    const query = new Parse.Query(Reserva);
    query.equalTo('idCliente', comentario.id_cliente);
    query.equalTo('idInstalacion', comentario.id_instalacion);

    const reservaExistente = await query.first();

    if (!reservaExistente) {
      Alert.alert('No autorizado', 'Debes realizar una reserva antes de comentar.');
      return false;
    }

    let Comentario = new Parse.Object('Comentarios');
    Comentario.set('idInstalacion', comentario.id_instalacion);
    Comentario.set('idCliente', comentario.id_cliente);
    Comentario.set('comentario', comentario.text);
    Comentario.set('puntuacion', comentario.rating);

    await Comentario.save();

    return true;
  } catch (error) {
    Alert.alert('Error al enviar comentario', error.message);
    console.error('Error al insertar el comentario:', error);
    return false;
  }
};
