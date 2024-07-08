import React, {useState, useContext} from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { RegContext } from "../../context/RegContext";
const Register = ({ navigation }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (e)=>{
    setUsername(e.target.value)
  }

  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }

  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }

  const handleRegister = (e)=>{


  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome To Your Journal Application </Text>
      <TextInput label="Username" mode="outlined" style={styles.input} value={username} onChangeText={setUsername} />
      <TextInput label="Email" mode="outlined" style={styles.input} value={email} onChangeText={setEmail}/>
      <TextInput
        label="Password"
        mode="outlined"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Already have an account? Login
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

export default Register;
