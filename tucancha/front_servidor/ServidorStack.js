import { StyleSheet, View, Button, TextInput, Dimensions } from 'react-native';
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenListadoInstalaciones from './screens_servidor/ScreenListadoInstalaciones';
import ScreenPerfil from './screens_servidor/ScreenPerfil';
import ScreenModificarInstalacion from './screens_servidor/ScreenModificarInstalacion';
import ScreenStats from './screens_servidor/ScreenStats';

import { NavigationContainer } from '@react-navigation/native';

import { ServerProvider } from './ServerContext';


const { width, height } = Dimensions.get("window");

// Definir el stack fuera de la función para evitar recreaciones innecesarias
const Stack = createNativeStackNavigator();

const ServidorFront = () => {
    return (
        <ServerProvider>
            <Stack.Navigator>
                <Stack.Screen name="1" component={ScreenListadoInstalaciones} />
                <Stack.Screen name="2" component={ScreenPerfil} />
                <Stack.Screen name="3" component={ScreenStats} />
                <Stack.Screen name="4" component={ScreenModificarInstalacion} />
            </Stack.Navigator>
        </ServerProvider>

    );
};

export default ServidorFront;
