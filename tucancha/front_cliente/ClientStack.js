import { StyleSheet, View, Button, TextInput, Dimensions } from 'react-native';
import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import ScreenInicio from './screens_cliente/ScreenInicio';
import ScreenPerfil from './screens_cliente/ScreenPerfil';
import ScreenCercaDeMi from './screens_cliente/ScreenCercaDeMi';
import ScreenFavoritos from './screens_cliente/ScreenFavoritos';
import ScreenEditarPerfil from './screens_cliente/ScreenEditarPerfil';

import { ClientProvider } from './ClientContext';

const { width, height } = Dimensions.get("window");

// Definir el stack fuera de la función para evitar recreaciones innecesarias
const Stack = createNativeStackNavigator();

const ClienteStack = () => {
    return (
        <ClientProvider>
            <Stack.Navigator>
                <Stack.Screen name="1" component={ScreenInicio} />
                <Stack.Screen name="2" component={ScreenCercaDeMi} />
                <Stack.Screen name="3" component={ScreenFavoritos} />
                <Stack.Screen name="4" component={ScreenPerfil} />
                <Stack.Screen name="EditarPerfil" component={ScreenEditarPerfil} />
            </Stack.Navigator>
        </ClientProvider>
    );
};

export default ClienteStack;
