import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Home from "../screens/Home";
import Bildirimler from "../screens/Bildirimler";
import Formlar from "../screens/Formlar";
import Islemler from "../screens/Islemler";
import Siparisler from "../screens/Siparisler";
import DrawerContent from "../components/Drawer";

const Drawer = createDrawerNavigator();

export default function DrawerTemplate() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#2D4295',
        },
        headerTitleStyle: {
          color: 'white'
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Anasayfa",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={'home'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Siparisler"
        component={Siparisler}
        options={{
          title: "Siparişler",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={'cart-plus'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Formlar"
        component={Formlar}
        options={{
          title: "Isıl İşlem Formları",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={'calendar-check'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Islemler"
        component={Islemler}
        options={{
          title: "Isıl İşlemler",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={'tachometer-alt'} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Bildirimler"
        component={Bildirimler}
        options={{
          title: "Bildirimler",
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name={'bell'} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}