import Parse from "./Conexion.js";

export const consultarPuntuacion = async (id_instalacion) => {
  try {
    const query = new Parse.Query("Comentarios");
    query.equalTo("idInstalacion", id_instalacion);
    const comentarios = await query.find();

    
    if (comentarios.length === 0) {
      return 0; // No hay comentarios
    }

    const suma = comentarios.reduce((total, comentario) => {
        const puntuacion = comentario.get("puntuacion");
  
        // Aseguramos que puntuacion sea un número
        if (typeof puntuacion === 'number') {
          return total + puntuacion;
        }
        return total;
    }, 0);

    // Calculamos la media
    const media = suma / comentarios.length;
    console.log("marhmedia:  ",Math.round(media * 10) / 10)
    // Retorna la media redondeada a un decimal
    return 0 + Math.round(media * 10) / 10;

  } catch (error) {
    console.error("Error al consultar la puntuación:", error);
    throw error;
  }
};
