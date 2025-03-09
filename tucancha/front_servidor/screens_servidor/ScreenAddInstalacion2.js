import { StyleSheet, View,Button,Input, Dimensions,Text,TextInput}from 'react-native';
import React, { useState } from "react";
import Checkbox from 'expo-checkbox';
import { Picker } from "@react-native-picker/picker";  

const { width, height } = Dimensions.get("window");


export default function ScreenAddInstalacion2() {
  const [isSelected, setSelection] = useState(false);

  const [horaApertura, setHoraApertura] = useState("09:00");
  const [horaCierre, setHoraCierre] = useState("18:00");
  return (
    
      <View style={styles.container}>
        
        <Text style={styles.title}>Horarios disponibles:</Text>

        <Text style={styles.label} >Hora apertura:</Text>

        <TextInput style={styles.input} placeholder="Nombre de pista" />

        <Text style={styles.label} >Hora cierre:</Text>

        <Picker
        selectedValue={horaCierre}
        onValueChange={(itemValue) => setHoraCierre(itemValue)}
        style={styles.picker}
      >
        {/* Rango de horas */}
        {Array.from({ length: 24 }, (_, index) => {
          const hour = index < 10 ? `0${index}:00` : `${index}:00`;
          return (
            <Picker.Item key={index} label={hour} value={hour} />
          );
        })}
      </Picker>

        
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>Abrir en festivos?</Text>
          <Checkbox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
      </View>
      
        

        <Text style={styles.label} >Duracion de reserva:</Text>

        <Text style={styles.label} >Precio:</Text>

        <TextInput style={styles.input} placeholder="Ej: 24 €" />
        <Button title="Añadir" onPress={()=> alert("Comprobar campos que esten llenos y alert de añadida pista y redirecion a inicio")}></Button>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      padding: height*0.07
    },
    input: {
      
      width: width * 0.6, // Todos los inputs tienen el mismo ancho
      height: 40, // Misma altura para todos
      color: '#555',
      backgroundColor: '#fff',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginBottom: height * 0.03, // Espaciado uniforme entre inputs
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15, 
      alignSelf: 'flex-start', // Alineado a la izquierda sin absolute
      marginLeft: width * 0, // Separado del borde izquierdo
      marginTop: height * 0.005, // Más arriba
    },
    label: {
      alignSelf: 'stretch',
      marginLeft: width * 0.1, // Para alinear con los inputs
      marginBottom: 10, // Espacio entre el texto y el input
      fontSize: 16,
      fontWeight: '500',
    },
    checkboxContainer: {
      flexDirection: "row",  // Esto pone los elementos en una fila
      alignItems: "center",  // Alinea los elementos verticalmente
      marginTop: 10, // Espaciado entre checkbox y el siguiente elemento
    },
    checkboxLabel: {
      marginRight: 10, // Espacio entre el texto y el checkbox
      fontSize: 16,
      fontWeight: "500",
    },
});  