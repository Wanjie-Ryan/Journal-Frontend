import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Card } from "react-native-paper";

const Dashboard = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const journalsPerPage = 10;

  useEffect(() => {
    // Fetch journals from the backend and set them in the state
    // This is a placeholder for the API call
    const fetchedJournals = [
      { id: 1, title: "Journal 1", content: "Content of journal 1" },
      { id: 2, title: "Journal 2", content: "Content of journal 2" },
      { id: 3, title: "Journal 3", content: "Content of journal 3" },
      { id: 4, title: "Journal 4", content: "Content of journal 4" },
      { id: 5, title: "Journal 5", content: "Content of journal 5" },
      { id: 6, title: "Journal 6", content: "Content of journal 6" },
      { id: 7, title: "Journal 7", content: "Content of journal 7" },
      { id: 8, title: "Journal 8", content: "Content of journal 8" },
      { id: 9, title: "Journal 9", content: "Content of journal 9" },
      { id: 10, title: "Journal 10", content: "Content of journal 10" },
      // Add more journals as needed
    ];
    setJournals(fetchedJournals);
  }, []);

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
            onPress={() => console.log(`Navigate to journal ${journal.id}`)}
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
