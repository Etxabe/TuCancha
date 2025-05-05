import iniciarPago from './iniciarPago';

function PantallaPrincipal({ navigation }) {
  return (
    <Button
      title="Pagar"
      onPress={() => iniciarPago(navigation)}
    />
  );
}