import React, { createContext, useState } from "react";

// 1. Creamos el contexto
export const ServerContext = createContext();

// 2. Creamos el Provider que envolverá nuestra app
export const ServerProvider = ({ children }) => {
  const [contador, setContador] = useState(0); // Variable compartida
  const [instalacion,setInstalacion] = useState({
    nombrePista: "",
    precio: 0,
    duracion:0,
    descripcion: "",
    imagen_instalacion: "",
    horaApertura: "09:00",
    horaCierre: "18:00",
    latitud: 0,
    longitud: 0,
  });
  return (
    <ServerContext.Provider value={{ instalacion,setInstalacion}}>
      {children}
    </ServerContext.Provider>
  );
};