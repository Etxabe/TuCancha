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

export const horasPasadas = (hora_ini, intervalo) => {
  try {
    if (!hora_ini || typeof hora_ini !== "string") {
      console.error("Error: hora_ini no es válida:", hora_ini);
      return [];
    }

    if (!intervalo || typeof intervalo !== "number") {
      console.error("Error: intervalo no es válido:", intervalo);
      return [];
    }

    const ahora = new Date(); // Hora actual
    //const ahora = new Date(new Date().getTime() + intervalo * 60000);
    const horasPasadas = [];

    // Convierte `hora_ini` al formato de un objeto Date
    const [hora, minuto] = hora_ini.split(":").map(Number);
    let current = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hora, minuto);

    // Genera los intervalos desde `hora_ini` hasta la hora actual
    while (current < ahora) {
      const startHours = current.getHours().toString().padStart(2, "0");
      const startMinutes = current.getMinutes().toString().padStart(2, "0");

      const next = new Date(current.getTime() + intervalo * 60000); // Avanza al siguiente intervalo
      const endHours = next.getHours().toString().padStart(2, "0");
      const endMinutes = next.getMinutes().toString().padStart(2, "0");

      if (next <= ahora) {
        const range = `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
        horasPasadas.push(range); // Agrega el intervalo al array
      }

      current = next; // Avanza al siguiente intervalo
    }

    console.log("Intervalos de horas pasadas generados:", horasPasadas); // Muestra los intervalos generados
    return horasPasadas; // Devuelve los intervalos de horas pasadas
  } catch (error) {
    console.error("Error al calcular las horas pasadas:", error);
    throw error; // Lanza el error para manejarlo en otro lugar
  }
};