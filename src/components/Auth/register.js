import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import Toast from "react-native-toast-message";
import { RegContext } from "../../context/RegContext";
import Requests from "../../API/api";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(RegContext);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }

    dispatch({ type: "regStart" });

    try {
      setLoading(true);

      const registrationData = {
        username,
        email,
        password,
      };

      // const response = await axios.post('http://localhost:3005/api/auth/register', registrationData);
      const response = await Requests.post(
        "api/auth/register",
        registrationData
      );

      // console.log(response);

      dispatch({ type: "regComplete", payload: response.data });
      Toast.show({
        type: "success",
        text1: "Registration Successful",
      });

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);

      setLoading(false);
    } catch (err) {
      // console.log(err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred";
      dispatch({ type: "regFail", payload: err });

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (password.length < 5) {
        Toast.show({
          type: "error",
          text1: "Password is too short. Please enter at least 5 characters.",
        });
        setLoading(false);
        return;
      } else if (!emailRegex.test(email)) {
        Toast.show({
          type: "error",
          text1: "Invalid email address. Please enter a valid email.",
        });
        setLoading(false);
        return;
      } else {
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Your Journal Application</Text>
      <TextInput
        label="Username"
        mode="outlined"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        label="Email"
        mode="outlined"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={handleRegister} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </Button>
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
      </Text>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: "blue",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default Register;
