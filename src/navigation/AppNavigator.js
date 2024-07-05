import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack />
      {/* <MainStack /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
