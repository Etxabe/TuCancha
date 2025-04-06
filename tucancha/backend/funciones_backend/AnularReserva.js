import  Parse  from "./Conexion.js";

export const anularReserva = async (id_reserva) => {
  const query = new Parse.Query("Reserva");
  try {
    const object = await query.get(id_reserva); // Busca el objeto por su objectId
    const response = await object.destroy(); // Elimina el objeto
    console.log("Deleted ParseObject", response);
    return { success: true, message: "Reserva anulada correctamente" };
  } catch (error) {
    console.error("Error al anular la reserva:", error);
    throw error; // Lanza el error para manejarlo en otro lugar
  }
};