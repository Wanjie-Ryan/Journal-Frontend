import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../components/Auth/login";
import Register from "../components/Auth/register";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Register"
      component={Register}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthStack;
