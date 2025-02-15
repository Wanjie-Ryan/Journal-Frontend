import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import Requests from "../../API/api";
const Settings = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await Requests.put(
        `api/auth/updateProfile`,
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Toast.show({
        type: "success",
        text1: "User Details Updated Successfully",
      });

      setLoading(false);
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error updating user details:", error);
      // Handle error state or show error message
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={handleUpdate}
        style={styles.updateButton}
      >
        {loading ? "Updating..." : "Update"}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  updateButton: {
    width: "100%",
  },
});

export default Settings;
