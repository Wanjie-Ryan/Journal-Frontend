import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { RegContextProvider } from "./src/context/RegContext";
import { LogContextProvider } from "./src/context/LogContext";
const App = () => {
  return (
    <RegContextProvider>
      <LogContextProvider>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </LogContextProvider>
    </RegContextProvider>
  );
};

export default App;
