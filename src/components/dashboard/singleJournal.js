import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

const JournalDetail = ({ route, navigation }) => {
  const { journalId } = route.params;
  const [journal, setJournal] = useState(null);

  useEffect(() => {
    // Fetch the journal details from the backend using the journalId
    // This is a placeholder for the API call
    const fetchedJournal = {
      id: journalId,
      title: `Journal ${journalId}`,
      content: `Full content of journal ${journalId}`,
      date: "2024-07-05",
      category: "work",
    };
    setJournal(fetchedJournal);
  }, [journalId]);

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log("Edit journal:", journalId);
  };

  const handleDelete = () => {
    // Placeholder for delete functionality
    console.log("Delete journal:", journalId);
    navigation.navigate("Dashboard");
  };

  if (!journal) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{journal.title}</Text>
      <Text style={styles.date}>{journal.date}</Text>
      <Text style={styles.category}>{journal.category}</Text>
      <Text style={styles.content}>{journal.content}</Text>
      <Button mode="contained" onPress={handleEdit} style={styles.editButton}>
        Edit
      </Button>
      <Button
        mode="contained"
        onPress={handleDelete}
        style={styles.deleteButton}
      >
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    marginBottom: 20,
  },
  editButton: {
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default JournalDetail;
