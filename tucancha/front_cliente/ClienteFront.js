import {StyleSheet, Image, Dimensions,View, Text}from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScreenInicio from './screens_cliente/ScreenInicio';
import ScreenPerfil from './screens_cliente/ScreenPerfil';
import ScreenCercaDeMi from './screens_cliente/ScreenCercaDeMi';
import ScreenFavoritos from './screens_cliente/ScreenFavoritos';
import ScreenReserva from './screens_cliente/ScreenReserva';

import { ClientProvider } from './ClientContext';

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
          title: "Favoritos",
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="star-outline" size={size} color={color} />
          )
          }}/>
        <Tab.Screen name="Reserva" component={ScreenReserva} options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
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

export default function App() {
  return (
    <ClientProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ClientProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


