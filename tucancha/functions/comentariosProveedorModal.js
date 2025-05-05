import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

const ComentariosProveedorModal = ({ comentarios }) => {
  const [visibleCount, setVisibleCount] = useState(5);

  const mostrarMas = () => {
    setVisibleCount((prev) => Math.min(prev + 5, comentarios.length));
  };

  const comentariosVisibles = comentarios.slice(0, visibleCount);

  return (
    <View style={styles.modalContainer}>
    <Text style={styles.listaHeader}>Comentarios:</Text>
    <ScrollView contentContainerStyle={styles.listaContainer}>
      {comentarios.length === 0 ? (
        <Text style={styles.noComentarios}>Aún no hay comentarios para esta instalación.</Text>
      ) : (
        <>
          {comentariosVisibles.map((comentario, index) => (
            <View key={index} style={styles.comentarioContainer}>
              <Text style={styles.comentarioText}>{comentario.text}</Text>
              <Text style={styles.comentarioAuthor}>- {comentario.author}</Text>
              <View style={styles.starsContainer}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons
                    key={i}
                    name="star"
                    size={18}
                    color={i < comentario.rating ? 'gold' : '#ccc'}
                    style={{ marginRight: 4 }}
                  />
                ))}
              </View>
            </View>
          ))}

          {visibleCount < comentarios.length && (
            <TouchableOpacity onPress={mostrarMas} style={styles.botonMas}>
              <Text style={styles.botonTexto}>Mostrar más</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
    width: '100%',
  },
  listaContainer: {
    width: '100%',
    paddingHorizontal: 0, // Elimina padding lateral si deseas más espacio
  },
  listaHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  comentarioContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  comentarioText: {
    fontSize: 14,
    marginBottom: 4,
  },
  comentarioAuthor: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  botonMas: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noComentarios: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 30,
  },
});

export default ComentariosProveedorModal;
