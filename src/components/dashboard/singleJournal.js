import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, ScrollView } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
const JournalDetail = ({ route, navigation }) => {
  const { journalId } = route.params;
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editContent, setEditContent] = useState("");

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
        setLoading(false);
        setJournal(response.data.journal);
        setEditTitle(response.data.journal.title);
        setEditCategory(response.data.journal.category);
        setEditContent(response.data.journal.content);
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
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.put(
        `http://192.168.100.10:3005/api/v1/updateJournal/${journalId}`,
        {
          title: editTitle,
          category: editCategory,
          content: editContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Journal Updated Successfully",
      });
      setLoading(false);
      setIsModalVisible(false);
      setJournal({
        ...journal,
        title: editTitle,
        category: editCategory,
        content: editContent,
      });
    } catch (error) {
      console.error("Error updating journal:", error);
      // Handle error state or show error message
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      await axios.delete(
        `http://192.168.100.10:3005/api/v1/deleteJournal/${journalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Journal Deleted Successfully",
      });
      setLoading(false);
      // console.log("Journal deleted:", journalId);
      setTimeout(() => {
        navigation.navigate("Dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error deleting journal:", error);
      // Handle error state or show error message
      setLoading(false);
    }
  };

  if (loading || !journal) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Journal</Text>
            <TextInput
              label="Title"
              value={editTitle}
              onChangeText={setEditTitle}
              style={styles.input}
            />
            <Picker
              selectedValue={editCategory}
              onValueChange={(itemValue) => setEditCategory(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Travel" value="Travel" />
              <Picker.Item label="Personal" value="Personal" />
              <Picker.Item label="Work" value="Work" />
            </Picker>
            <TextInput
              label="Content"
              value={editContent}
              onChangeText={setEditContent}
              multiline
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.saveButton}
            >
              Save
            </Button>
            <Button
              mode="contained"
              onPress={() => setIsModalVisible(false)}
              style={styles.cancelButton}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  saveButton: {
    width: "100%",
    marginBottom: 10,
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "gray",
  },
});

export default JournalDetail;
