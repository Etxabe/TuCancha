import React, { useState } from 'react';
import { View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PagoScreen() {
  const [urlPago, setUrlPago] = useState(null);
  const [loading, setLoading] = useState(false);

  const iniciarPago = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://34.175.56.30/API/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2000, orderId: '12345678' }),
      });

      const { urlDePago } = await res.json();

      if (urlDePago) {
        setUrlPago(urlDePago); // Cambia la vista al WebView
      } else {
        alert("Error: no se recibió una URL de pago.");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al iniciar el pago.");
    } finally {
      setLoading(false);
    }
  };

  if (urlPago) {
    return (
      <WebView
        source={{ uri: urlPago }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" style={styles.loader} />
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Iniciar pago" onPress={iniciarPago} disabled={loading} />
      {loading && <ActivityIndicator style={styles.loader} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 20,
  },
});
