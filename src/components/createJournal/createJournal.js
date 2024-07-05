import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, Text, RadioButton, Menu } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateJournal = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("work");

  const handleCreateJournal = () => {
    // Placeholder for journal creation logic
    console.log("Journal created:", { title, content, date, category });
    navigation.navigate("Dashboard");
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
        onValueChange={newValue => setCategory(newValue)}
        value={category}
      >
        <RadioButton.Item label="Work" value="work" />
        <RadioButton.Item label="Travel" value="travel" />
        <RadioButton.Item label="Personal" value="personal" />
      </RadioButton.Group>
      <Button mode="contained" onPress={handleCreateJournal} style={styles.button}>
        Create Journal
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
