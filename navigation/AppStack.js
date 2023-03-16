import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";

import InventoryHomeScreen from '../screens/InventoryHomeScreen';
import EmployeeHomeScreen from '../screens/EmployeeHomeScreen';
import ClientHomeScreen from '../screens/ClientHomeScreen';
import DocumentHomeScreen from '../screens/DocumentHomeScreen';
import HomeScreen from '../screens/HomeScreen';

import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: Colors.primary,
        drawerActiveTintColor: Colors.lightPrimary,
        drawerInactiveTintColor: Colors.darkText,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: Font['poppins-regular'],
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Employee"
        component={EmployeeHomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Client"
        component={ClientHomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="people-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Inventory"
        component={InventoryHomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="clipboard-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Document"
        component={DocumentHomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="documents-outline" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;