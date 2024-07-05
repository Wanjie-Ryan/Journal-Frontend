import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName="Auth">
    <Stack.Screen
      name="Auth"
      component={AuthStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Main"
      component={MainStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default RootStack;
