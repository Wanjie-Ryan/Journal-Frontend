import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Button,
  Text,
  RadioButton,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const CreateJournal = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("work");
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleCreateJournal = async () => {
    try {

      if(!title || !content || !date || !category){

        Toast.show({
          type: "error",
          text1: "Please fill in all fields",
        });
        return;

      }


      setLoading(true); // Start loading indicator

      const token = await AsyncStorage.getItem("token"); // Retrieve token from AsyncStorage
      const journalData = {
        title,
        content,
        date,
        category,
      };

      const response = await axios.post(
        "http://192.168.100.10:3005/api/v1/createjournal",
        journalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Journal created:", response.data);
      navigation.navigate("Dashboard");
    } catch (error) {
      console.error("Error creating journal:", error);
      // Handle error state or show error message
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Journal</Text>
      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        label="Content"
        mode="outlined"
        multiline
        numberOfLines={4}
        value={content}
        onChangeText={setContent}
        style={styles.input}
      />
      <Button onPress={() => setShowDatePicker(true)}>Select Date</Button>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <RadioButton.Group
        onValueChange={(newValue) => setCategory(newValue)}
        value={category}
      >
        <RadioButton.Item label="Work" value="work" />
        <RadioButton.Item label="Travel" value="travel" />
        <RadioButton.Item label="Personal" value="personal" />
      </RadioButton.Group>
      <Button
        mode="contained"
        onPress={handleCreateJournal}
        style={styles.button}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Loading..." : "Create Journal"} {/* Toggle button text based on loading state */}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CreateJournal;
