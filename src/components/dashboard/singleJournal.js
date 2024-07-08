import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const JournalDetail = ({ route, navigation }) => {
  const { journalId } = route.params;
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournal = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(
          `http://192.168.100.10:3005/api/v1/getSingleJournal/${journalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJournal(response.data.journal);
      } catch (error) {
        console.error("Error fetching journal:", error);
        // Handle error state or show error message
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
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

  if (loading || !journal) {
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
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
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
