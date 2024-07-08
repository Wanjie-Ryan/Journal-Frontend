import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { RegContextProvider } from "./src/context/RegContext";
import { LogContextProvider } from "./src/context/LogContext";
import Toast from "react-native-toast-message";
const App = () => {
  return (
    <>
      <RegContextProvider>
        <LogContextProvider>
          <PaperProvider>
            <AppNavigator />
          </PaperProvider>
        </LogContextProvider>
      </RegContextProvider>
      <Toast />
    </>
  );
};

export default App;
