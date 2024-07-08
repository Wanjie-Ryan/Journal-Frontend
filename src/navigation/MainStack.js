import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "../components/dashboard/dash";
import CreateJournal from "../components/createJournal/createJournal";
import JournalDetail from "../components/dashboard/singleJournal";
import Settings from "../components/settings/settings";
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="CreateJournal"
      component={CreateJournal}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="JournalDetail"
      component={JournalDetail}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MainStack;
