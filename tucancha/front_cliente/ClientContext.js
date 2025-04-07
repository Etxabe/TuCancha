import React, { createContext, useState } from "react";

// 1. Creamos el contexto
export const ClientContext = createContext();

// 2. Creamos el Provider que envolverá nuestra app
export const ClientProvider = ({ children }) => {
  const [contador, setContador] = useState(0); // Variable compartida
  const [ubicacion,setUbication] = useState({
    nombre: "",
    id_instalacion: "",
    precio: "",
    descripcion: "",
    imagen: "",
    imagen_instalacion: "",
    hora_ini: "",
    hora_fin: "",
    duracion: "",
    latitude: 0,
    longitude: 0,
  });
  const [reserva,setReserva] = useState({
    id_cliente: "",
    id_instalacion: "",
    tiempo_reserva: "",
    fecha_ini: "",
    hora_ini: "",
    fecha: new Date()
  });
  const [idCliente,setIdCliente] = useState("usuario.id_cliente");

  return (
    <ClientContext.Provider value={{ ubicacion,setUbication,reserva,setReserva,idCliente,setIdCliente}}>
      {children}
    </ClientContext.Provider>
  );
};