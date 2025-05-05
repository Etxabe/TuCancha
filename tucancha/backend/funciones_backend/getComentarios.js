import Parse from "./Conexion.js";

export const getComentarios = async (id_instalacion) => {
  try {
    const query = new Parse.Query("Comentarios");
    query.equalTo("idInstalacion", id_instalacion);
    const comentarios = await query.find();

    if (comentarios.length === 0) {
      return []; 
    }

    const comentariosFormateados = [];

    for (let comentario of comentarios) {
      const idCliente = comentario.get("idCliente"); 

      const usuarioQuery = new Parse.Query("Usuarios"); 
      usuarioQuery.equalTo("objectId", idCliente);
      const usuario = await usuarioQuery.first();

      if (usuario) {
        comentariosFormateados.push({
          text: comentario.get("comentario"), 
          author: usuario.get("nombre"), 
          rating: comentario.get("puntuacion"), 
        });
      }
    }

    return comentariosFormateados;

  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error;
  }
};
