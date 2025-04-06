import Parse from "./Conexion.js";

export const consultarHorario = async (id_instalacion, fecha) => {
  try {
    const query = new Parse.Query("Reserva");
    query.equalTo("id_instalacion", id_instalacion); // Filtra por instalación
    query.equalTo("fecha_ini", fecha); // Filtra por fecha

    const reservas = await query.find(); // Obtiene las reservas de la base de datos

    const horasReservadas = reservas.map((reserva) => reserva.get("hora_ini"));

    return horasReservadas; // Devuelve el array de horas reservadas
  } catch (error) {
    console.error("Error al consultar las reservas:", error);
    throw error; // Lanza el error para manejarlo en otro lugar
  }
};