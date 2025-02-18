import {StyleSheet, Image, Dimensions,View, Text}from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ScreenInicio from './screens_cliente/ScreenInicio';
import ScreenPerfil from './screens_cliente/ScreenPerfil';
import ScreenCercaDeMi from './screens_cliente/ScreenCercaDeMi';
import ScreenFavoritos from './screens_cliente/ScreenFavoritos';


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
      <Tab.Screen name="Search" component={ScreenPerfil} options={{
        title: "Search",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="search-outline" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name="Favourite" component={ScreenCercaDeMi} options={{
        title: "Favourite",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="star-outline" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name="Profile" component={ScreenFavoritos} options={{
        title: "Inicio",
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="search-outline" size={size} color={color} />
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


