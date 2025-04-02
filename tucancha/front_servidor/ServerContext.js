import React, { createContext, useState } from "react";

// 1. Creamos el contexto
export const ServerContext = createContext();

// 2. Creamos el Provider que envolverá nuestra app
export const ServerProvider = ({ children }) => {
  const [contador, setContador] = useState(0); // Variable compartida
  const [instalacion,setInstalacion] = useState({
    nombrePista: "",
    precio: "",
    descripcion: "",
    imagen_instalacion: "",
    hora_apertura: "",
    hora_cierre:"",
  });
  return (
    <ServerContext.Provider value={{ instalacion,setInstalacion}}>
      {children}
    </ServerContext.Provider>
  );
};