import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import AppNavigator from "./src/navigation/AppNavigator";
import { RegContextProvider } from "./src/context/RegContext";
const App = () => {
  return (
    <RegContextProvider>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </RegContextProvider>
  );
};

export default App;
