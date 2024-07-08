import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { LogContext } from "../../context/LogContext";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(LogContext);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields",
      });
      return;
    }

    dispatch({ type: "logStart" });

    try {
      setLoading(true);

      const loginData = {
        email,
        password,
      };

      // const response = await axios.post('http://localhost:3005/api/auth/register', registrationData);
      const response = await axios.post(
        "http://192.168.100.10:3005/api/auth/login",
        loginData
      );

      // console.log(response);

      dispatch({ type: "logComplete", payload: response.data });
      Toast.show({
        type: "success",
        text1: "Login Successful",
      });

      setTimeout(() => {
        navigation.navigate("Main");
      }, 1000);

      setLoading(false);
    } catch (err) {
      // console.log(err);

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
      }
      //  else {
      //   Toast.show({
      //     type: "error",
      //     text1: errorMessage,
      //   });
      //   setLoading(false);
      // }

      let errorMessage = "An unexpected error occurred";

      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      dispatch({ type: "logFail", payload: errorMessage });

      if (errorMessage.includes("password")) {
        Toast.show({
          type: "error",
          text1: "Invalid credentials. Please check your email and password.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login To Your Journal App</Text>
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
      <Button mode="contained" onPress={handleLogin} disabled={loading}>
        {loading ? "Signing-In..." : "Login"}
      </Button>
      <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
        Don't have an account? Register
      </Text>
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

export default Login;
