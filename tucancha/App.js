import React, { useState } from 'react';
import AppNavigator from './AppNavigator';
import { ClientProvider } from './front_cliente/ClientContext';
import { ServerProvider } from './front_servidor/ServerContext';
import { AuthContext } from './AuthContext';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [id, setId] = useState('');

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userType, setUserType, id, setId }}>
      <ClientProvider id={id}>
        <ServerProvider id={id}>
          <AppNavigator />
        </ServerProvider>
      </ClientProvider>
    </AuthContext.Provider>
  );
}
