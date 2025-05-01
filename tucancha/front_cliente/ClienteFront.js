import {StyleSheet, Image, Dimensions,View, Text}from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenInicio from './screens_cliente/ScreenInicio';
import ScreenPerfil from './screens_cliente/ScreenPerfil';
import ScreenCercaDeMi from './screens_cliente/ScreenCercaDeMi';
import ScreenFavoritos from './screens_cliente/ScreenFavoritos';
import ScreenEditarPerfil from './screens_cliente/ScreenEditarPerfil';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ClientProvider,ClientContext } from './ClientContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="home" component={ScreenInicio} options={{
            title: "Inicio",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            )
          }}/>
        <Tab.Screen name="Search" component={ScreenCercaDeMi} options={{
          title: "Cerca de mí",
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="location-outline" size={size} color={color} />
          )
          }}/>
        <Tab.Screen name="Favourite" component={ScreenFavoritos} options={{
          title: "Mis Reservas",
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="clipboard-outline" size={size} color={color} />
          )
          }}/>
        <Tab.Screen name="Profile" component={ScreenPerfil} options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
          )
          }}/>
      </Tab.Navigator>
  );
};

export default function App({ id }) {
  return (
    <ClientProvider id={id}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={Tabs} />
        <Stack.Screen name="EditarPerfil" component={ScreenEditarPerfil} />
      </Stack.Navigator>
    </ClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


