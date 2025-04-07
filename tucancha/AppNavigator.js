import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Parse from './backend/funciones_backend/Conexion';

import LoginScreen from './InicioDeSesion.js';
import ClienteNavigator from './front_cliente/ClienteFront';
import ProveedorNavigator from './front_servidor/ServidorFront';

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ¿Está logueado?
  const [userType, setUserType] = useState(null);       // "cliente" o "proveedor"
  const [credentials, setCredentials] = useState(null); // Guardar usuario y contraseña

  useEffect(() => {
    const checkAuth = async () => {
      if (!credentials) return; // Esperar hasta que se reciban las credenciales

      try {
        const { usuario, contrasena } = credentials;

        // Crear una consulta en la tabla "Usuario"
        const query = new Parse.Query("Usuarios");
        query.equalTo("nombre", usuario); // Filtrar por nombre de usuario
        query.equalTo("contrasenia", contrasena); // Filtrar por contraseña

        // Ejecutar la consulta
        const result = await query.first(); // Obtener el primer resultado

        if (result) {
          // Usuario encontrado, actualizar estado
          setIsLoggedIn(true);
          setUserType(result.get("esProveedor") ? "proveedor" : "cliente");
          console.log("Usuario autenticado:", result.get("username"));
        } else {
          // Usuario no encontrado
          console.warn("Usuario o contraseña incorrectos");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [credentials]); // Ejecutar cuando cambien las credenciales

  // Si NO está logueado → Muestro Login
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={(usuario, contrasena) => setCredentials({ usuario, contrasena })}
      />
    );
  }

  return (
    <NavigationContainer>
      {userType === 'cliente' && <ClienteNavigator />}
      {userType === 'proveedor' && <ProveedorNavigator />}
    </NavigationContainer>
  );
}