// src/AppNavigator.js

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Parse from './backend/funciones_backend/Conexion';

//import LoginScreen from './screens/LoginScreen';
import ClienteNavigator from './front_cliente/ClienteFront';
import ProveedorNavigator from './front_servidor/ServidorFront';

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ¿Está logueado?
  const [userType, setUserType] = useState(null);       // "cliente" o "proveedor"

  // Simulación de verificación de login (normalmente sería una petición a tu API)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Simulación: usuario y contraseña que llegan desde el inicio de sesión
        const usuario = "proveedor"; // Reemplaza con el valor real
        const contrasena = "1234"; // Reemplaza con el valor real
  
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
  }, []);

  // Si NO está logueado → Muestro Login
  /*if (!isLoggedIn) {
    return (
      <LoginScreen 
        onLoginSuccess={(tipoUsuario) => {
          setUserType(tipoUsuario);
          setIsLoggedIn(true);
        }}
      />
    );
  }*/

  return (
    <NavigationContainer>
      {userType === 'cliente' && <ClienteNavigator />}
      {userType === 'proveedor' && <ProveedorNavigator />}
    </NavigationContainer>
  );
}
