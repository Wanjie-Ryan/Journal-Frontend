import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/dashboard/dash";

const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainStack;
