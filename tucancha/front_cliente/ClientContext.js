import React, { createContext, useState } from "react";

// 1. Creamos el contexto
export const ClientContext = createContext();

// 2. Creamos el Provider que envolverá nuestra app
export const ClientProvider = ({ children }) => {
  const [contador, setContador] = useState(0); // Variable compartida

  return (
    <ClientContext.Provider value={{ contador, setContador }}>
      {children}
    </ClientContext.Provider>
  );
};