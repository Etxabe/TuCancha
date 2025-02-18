import {StyleSheet, Image, Dimensions,View, Text}from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScreenListadoInstalaciones from './screens_servidor/ScreenListadoInstalaciones';
import ScreenPerfil from './screens_servidor/ScreenPerfil';
import ScreenModificarInstalacion from './screens_servidor/ScreenModificarInstalacion';


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
      <Tab.Screen name="Search" component={ScreenPerfil} options={{
        title: "Search",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="search-outline" size={size} color={color} />
        )
        }}/>
      <Tab.Screen name="Favourite" component={ScreenModificarInstalacion} options={{
        title: "Favourite",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="star-outline" size={size} color={color} />
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


