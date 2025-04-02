import React, { createContext, useState } from "react";

// 1. Creamos el contexto
export const ClientContext = createContext();

// 2. Creamos el Provider que envolverá nuestra app
export const ClientProvider = ({ children }) => {
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
    <ClientContext.Provider value={{ ubicacion,setUbication}}>
      {children}
    </ClientContext.Provider>
  );
};