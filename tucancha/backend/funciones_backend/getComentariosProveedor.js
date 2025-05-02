import Parse from "./Conexion.js";

export const getComentarios = async (idInstalacion) => {
  try {
    // Creamos la consulta para obtener los comentarios que coinciden con el idInstalacion
    const query = new Parse.Query("Comentarios");
    query.equalTo("idInstalacion", idInstalacion);  // Filtra solo por idInstalacion

    // Realizamos la consulta y obtenemos los comentarios
    const comentarios = await query.find();

    if (comentarios.length === 0) {
      return [];  // Si no hay comentarios, devolvemos un array vacío
    }

    const comentariosFormateados = [];

    // Recorremos cada comentario y obtenemos el nombre del autor (usuario)
    for (let comentario of comentarios) {
      const idCliente = comentario.get("idCliente");  // Obtenemos el idCliente

      // Hacemos una consulta para obtener los datos del usuario (autor del comentario)
      const usuarioQuery = new Parse.Query("Usuarios");
      usuarioQuery.equalTo("objectId", idCliente);
      const usuario = await usuarioQuery.first();

      if (usuario) {
        comentariosFormateados.push({
          text: comentario.get("comentario"),  // Comentario en texto
          author: usuario.get("nombre"),  // Nombre del autor
          rating: comentario.get("puntuacion"),  // Puntuación del comentario
        });
      }
    }

    return comentariosFormateados;  // Devolvemos los comentarios formateados

  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error;  // Si ocurre un error, lo lanzamos
  }
};
