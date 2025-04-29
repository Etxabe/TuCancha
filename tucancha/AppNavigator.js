import React, { useEffect, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Parse from './backend/funciones_backend/Conexion';

import { obtenerInfoPerfil } from './backend/funciones_backend/InfoPerfil';
import LoginScreen from './InicioDeSesion';
import RegistroScreen from './Registro';
import ClienteNavigator from './front_cliente/ClienteFront';
import ProveedorNavigator from './front_servidor/ServidorFront';
import { AuthContext } from './AuthContext';

export default function AppNavigator() {
  const {isLoggedIn, setIsLoggedIn, userType, setUserType, id, setId} = useContext(AuthContext);

  const [credentials, setCredentials] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCorrect, setIsNotCorrect] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!credentials) return;

      try {
        const { usuario, contrasena } = credentials;

        const query = new Parse.Query("Usuarios");
        query.equalTo("nombre", usuario);
        query.equalTo("contrasenia", contrasena);

        const result = await query.first();

        if (result) {
          setIsLoggedIn(true);
          setUserType(result.get("esProveedor") ? "proveedor" : "cliente");
          setId(result.id);
          
          console.log("Usuario autenticado:", result.get("username"));
        } else {
          console.warn("Usuario o contraseña incorrectos");
          setIsLoggedIn(false);
          setIsNotCorrect(true);
        }
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [credentials]);

  if (isRegistering) {
    return <RegistroScreen onNavigateToLogin={() => setIsRegistering(false)} />;
  }

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={(usuario, contrasena) => setCredentials({ usuario, contrasena })}
        onNavigateToRegister={() => setIsRegistering(true)}
        error={isCorrect}
      />
    );
  }

  return (
    <NavigationContainer>
      {userType === 'cliente' && <ClienteNavigator id={id} />}
      {userType === 'proveedor' && <ProveedorNavigator id={id} />}
    </NavigationContainer>
  );
}
