import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ComentarModal = ({ visible, onClose, onSubmit }) => {
  const [comentario, setComentario] = useState('');
  const [rating, setRating] = useState(0);

  const handlePress = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (comentario.trim() && rating > 0) {
      onSubmit({ text: comentario.trim(), rating });
      setComentario('');
      setRating(0);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Escribe tu comentario</Text>

          <TextInput
            style={styles.input}
            placeholder="Comentario..."
            multiline
            value={comentario}
            onChangeText={setComentario}
          />

          <View style={styles.ratingContainer}>
            <Text style={styles.label}>Puntuación:</Text>
            <View style={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => handlePress(index + 1)}>
                  <Ionicons
                    name="star"
                    size={30}
                    color={index < rating ? 'gold' : '#ccc'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttons}>
            <Button title="Cancelar" onPress={onClose} color="gray" />
            <Button title="Enviar" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  stars: {
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ComentarModal;
