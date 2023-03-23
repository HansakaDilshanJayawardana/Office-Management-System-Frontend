/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import AppStack from "./AppStack";
import AddInventory from "../screens/AddInventory";
import ViewInventory from "../screens/ViewInventory";
import InventoryHomeScreen from "../screens/InventoryHomeScreen";
import AddEmployee from "../screens/AddEmployee";
import EmployeeHomeScreen from "../screens/EmployeeHomeScreen";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="HomeScreen"
        component={AppStack}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AddInventory" component={AddInventory}/>
      <Stack.Screen name="ViewInventory" component={ViewInventory}/>
      <Stack.Screen name="InventoryHomeScreen" component={InventoryHomeScreen}/>
      <Stack.Screen name="AddEmployee" component={AddEmployee}/>
      <Stack.Screen name="EmployeeHomeScreen" component={EmployeeHomeScreen}/>
    </Stack.Navigator>
  );
}
