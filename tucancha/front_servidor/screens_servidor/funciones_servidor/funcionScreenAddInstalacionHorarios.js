import {
    StyleSheet,
    View,
    Button,
    Text,
    Dimensions,
    TouchableOpacity,
    Modal,
    FlatList,
} from 'react-native';
import React from 'react';
import { useState,useContext } from 'react';
import { ServerContext } from '../../ServerContext';

const { width, height } = Dimensions.get('window');

export const MostrarHorarios = () => {

  const { instalacion, setInstalacion } = useContext(ServerContext);
  
  const [modalAperturaVisible, setModalAperturaVisible] = useState(false);
  const [modalCierreVisible, setModalCierreVisible] = useState(false);

  const horas = Array.from({ length: 24 }, (_, index) =>
    `${index.toString().padStart(2, '0')}:00`
  );

  const handleSelectHoraApertura = (hora) => {
    setInstalacion({...instalacion,horaApertura: hora});
    setModalAperturaVisible(false);
  };

  const handleSelectHoraCierre = (hora) => {
    setInstalacion({...instalacion,horaCierre: hora});
    setModalCierreVisible(false);
  };

  return (
      <View>
      <Text style={styles.title}>Horarios disponibles:</Text>
      {/* Hora Apertura */}
      <Text style={styles.label}>Hora apertura:</Text>
      <TouchableOpacity
          onPress={() => setModalAperturaVisible(true)}
          style={styles.selector}
      >
          <Text style={styles.selectorText}>{instalacion.horaApertura}</Text>
      </TouchableOpacity>

      <Modal
          visible={modalAperturaVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalAperturaVisible(false)}
      >
      <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Seleccionar hora de apertura</Text>
              <FlatList
                  data={horas}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleSelectHoraApertura(item)}
                      >
                      <Text style={styles.modalItemText}>{item}</Text>
                      </TouchableOpacity>
                  )}
              />
              <Button title="Cancelar" onPress={() => setModalAperturaVisible(false)} />
          </View>
      </View>
      </Modal>

      {/* Hora Cierre */}
      <Text style={styles.label}>Hora cierre:</Text>
      <TouchableOpacity
          onPress={() => setModalCierreVisible(true)}
          style={styles.selector}
      >
          <Text style={styles.selectorText}>{instalacion.horaCierre}</Text>
      </TouchableOpacity>

      <Modal
          visible={modalCierreVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalCierreVisible(false)}
      >
      <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Seleccionar hora de cierre</Text>
              <FlatList
                  data={horas}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => handleSelectHoraCierre(item)}
                      >
                      <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                  )}
              />
              <Button title="Cancelar" onPress={() => setModalCierreVisible(false)} />
          </View>
      </View>
      </Modal>
  </View>
  )
}      

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      marginTop: 15,
      color: '#333',
      alignSelf: 'flex-start',
    },
    selector: {
      width: width * 0.8,
      height: 40,
      backgroundColor: '#f0f0f0',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    selectorText: {
      fontSize: 16,
      color: '#000',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: width * 0.8,
      height: height * 0.6,
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15,
    },
    modalItem: {
      paddingVertical: 10,
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
    },
    modalItemText: {
      fontSize: 16,
      color: '#333',
    },
});