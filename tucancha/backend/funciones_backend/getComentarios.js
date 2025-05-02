import Parse from "./Conexion.js";

export const getComentarios = async (id_instalacion) => {
  try {
    const query = new Parse.Query("Comentarios");
    query.equalTo("idInstalacion", id_instalacion);
    const comentarios = await query.find();

    if (comentarios.length === 0) {
      return []; // Si no hay comentarios, retorna un array vacío
    }

    // Para almacenar los comentarios con el nombre del autor
    const comentariosFormateados = [];

    for (let comentario of comentarios) {
      const idCliente = comentario.get("idCliente"); // El ID del autor

      // Ahora consulta el nombre del autor en la tabla de usuarios (o lo que corresponda)
      const usuarioQuery = new Parse.Query("Usuarios"); // Suponiendo que la clase de usuarios se llama _User
      usuarioQuery.equalTo("objectId", idCliente);
      const usuario = await usuarioQuery.first();

      // Si encontramos el autor, añadimos los comentarios con el nombre del autor
      if (usuario) {
        comentariosFormateados.push({
          text: comentario.get("comentario"), // Suponiendo que el campo es "texto"
          author: usuario.get("nombre"), // Suponiendo que el nombre del usuario está en "username"
          rating: comentario.get("puntuacion"), // Suponiendo que el campo es "puntuacion"
        });
      }
    }

    // Retorna los comentarios formateados con el nombre del autor
    return comentariosFormateados;

  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw error;
  }
};
