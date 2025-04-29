import Parse from './Conexion'; // Ajusta el path si hace falta

export const obtenerInfoPerfil = async (id) => {
  try {
    const Usuarios = new Parse.Query("Usuarios");
    const user = await Usuarios.get(id); // Buscar por ID directamente

    if (!user) throw new Error("Usuario no encontrado");

    console.log("Se llega a obtener la info del perfil");

    return {
      nombre: user.get("nombre") || "",
      descripcion: user.get("descripcion") || "",
      email: user.get("email") || "",
      imagen_perfil: user.get("imagen_perfil") || "",
    };
  } catch (error) {
    console.error("Error al obtener la info del perfil:", error);
    return null;
  }
};
