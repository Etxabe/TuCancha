import React, { createContext, useState } from "react";

// 1. Creamos el contexto
export const ServerContext = createContext();

// 2. Creamos el Provider que envolverá nuestra app
export const ServerProvider = ({ children }) => {
  const [contador, setContador] = useState(0); // Variable compartida
  const [ubicacion,setUbication] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: "",
    imagen_instalacion: ""
  });
  const [reserva,setReserva] = useState({
    nombre: "",
    precio: "",
    descripcion: ""
  });
  return (
    <ServerContext.Provider value={{ ubicacion,setUbication}}>
      {children}
    </ServerContext.Provider>
  );
};