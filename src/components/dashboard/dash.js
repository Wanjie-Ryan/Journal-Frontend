import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Card } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const journalsPerPage = 10;

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        // console.log(token)

        const response = await axios.get(
          "http://192.168.100.10:3005/api/v1/getAllJournals",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(false);
        setJournals(response.data.Journals);
      } catch (error) {
        // console.error("Error fetching journals:", error);
        // Handle error state or show error message
      } finally {
        setLoading(false); // Update loading state regardless of success or failure
      }
    };

    fetchJournals();
  }, []);

  // Check if journals is empty or not yet fetched
  if (loading || journals.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const indexOfLastJournal = currentPage * journalsPerPage;
  const indexOfFirstJournal = indexOfLastJournal - journalsPerPage;
  const currentJournals = journals.slice(
    indexOfFirstJournal,
    indexOfLastJournal
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(journals.length / journalsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Journal App</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("CreateJournal")}
        >
          Create Journal
        </Button>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {currentJournals.map((journal) => (
          <TouchableOpacity
            key={journal.id}
            onPress={() =>
              navigation.navigate("JournalDetail", { journalId: journal.id })
            }
          >
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.contentTitle}>{journal.title}</Text>
                <Text style={styles.contentPreview}>
                  {journal.content.length > 100
                    ? `${journal.content.substring(0, 100)}...`
                    : journal.content}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <Button onPress={handlePrevPage} disabled={currentPage === 1}>
          {"<"}
        </Button>
        <Text style={styles.pageNumber}>{currentPage}</Text>
        <Button
          onPress={handleNextPage}
          disabled={
            currentPage === Math.ceil(journals.length / journalsPerPage)
          }
        >
          {">"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  contentContainer: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  contentPreview: {
    fontSize: 16,
    color: "#666",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  pageNumber: {
    marginHorizontal: 20,
    fontSize: 18,
  },
});

export default Dashboard;
