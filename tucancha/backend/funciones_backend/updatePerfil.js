// backend/funciones_backend/updatePerfil.js
import { Alert } from "react-native";
import Parse from "./Conexion.js"; // Ajusta la ruta si es necesario

const updatePerfil = async (idUsuario, nombre, descripcion, fotoPerfil) => {
  try {
    const query = new Parse.Query("Usuarios");
    const usuario = await query.get(idUsuario);

    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }

    // Actualizar campos
    if(nombre !== '') usuario.set("nombre", nombre);
    if(descripcion !== '') usuario.set("descripcion", descripcion);

    // Si hay una nueva foto, la subimos
    if (fotoPerfil) {
      const response = await fetch(fotoPerfil);
      const blob = await response.blob();
      const file = new Parse.File("foto_perfil.jpg", blob);
      usuario.set("imagen_perfil", file);
    }

    await usuario.save();

    Alert.alert("Éxito", "Perfil actualizado correctamente.");
    return true;
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    Alert.alert("Error", "No se pudo actualizar el perfil.");
    return false;
  }
};

export default updatePerfil;
