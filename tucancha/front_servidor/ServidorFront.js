import {StyleSheet, Image, Dimensions,View, Text}from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScreenListadoInstalaciones from './screens_servidor/ScreenListadoInstalaciones';
import ScreenPerfil from './screens_servidor/ScreenPerfil';

import ScreenAddInstalacion1 from './screens_servidor/ScreenAddInstalacion1';


const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={ScreenListadoInstalaciones} options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }}/>
      <Tab.Screen name="Add" component={ScreenAddInstalacion1} options={{
        title: "Añadir",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="add-circle-outline" size={size} color={color} />
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
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


