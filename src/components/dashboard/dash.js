import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text, Card, Menu, Divider, TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const journalsPerPage = 10;

  // States for filtering
  const [filterCategory, setFilterCategory] = useState("All");
  const [periodFilter, setPeriodFilter] = useState("daily");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // States for menu visibility
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [periodMenuVisible, setPeriodMenuVisible] = useState(false);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
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
        console.error("Error fetching journals:", error);
        // Handle error state or show error message
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // Filter journals by category
  const filterByCategory = async (category) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.100.10:3005/api/v1/filterJournalsByCategory/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJournals(response.data.filteredJournals);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering journals by category:", error);
      // Handle error state or show error message
      setLoading(false);
    }
  };

  // Filter journals by period
  const filterByPeriod = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.100.10:3005/api/v1/filterJournalsByPeriod/${periodFilter}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJournals(response.data.filteredJournals);
      setLoading(false);
    } catch (error) {
      console.error("Error filtering journals by period:", error);
      // Handle error state or show error message
      setLoading(false);
    }
  };

  // Reset filters and fetch all journals
  const resetFilters = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.100.10:3005/api/v1/getAllJournals",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJournals(response.data.Journals);
      setLoading(false);
    } catch (error) {
      console.error("Error resetting filters:", error);
      // Handle error state or show error message
      setLoading(false);
    }
  };

  // Pagination logic
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

      {/* Filter by Category */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Category:</Text>
        <Menu
          visible={categoryMenuVisible}
          onDismiss={() => setCategoryMenuVisible(false)}
          anchor={
            <Button onPress={() => setCategoryMenuVisible(true)}>
              {filterCategory === "All" ? "All Categories" : filterCategory}
            </Button>
          }
        >
          <Menu.Item onPress={() => { setFilterCategory("All"); setCategoryMenuVisible(false); }} title="All Categories" />
          <Divider />
          <Menu.Item onPress={() => { filterByCategory("Work"); setCategoryMenuVisible(false); }} title="Work" />
          <Menu.Item onPress={() => { filterByCategory("Travel"); setCategoryMenuVisible(false); }} title="Travel" />
          <Menu.Item onPress={() => { filterByCategory("Personal"); setCategoryMenuVisible(false); }} title="Personal" />
        </Menu>
      </View>

      {/* Filter by Period */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter by Period:</Text>
        <TextInput
          mode="outlined"
          label="Start Date"
          value={startDate}
          onChangeText={setStartDate}
          style={styles.dateInput}
        />
        <TextInput
          mode="outlined"
          label="End Date"
          value={endDate}
          onChangeText={setEndDate}
          style={styles.dateInput}
        />
        <Menu
          visible={periodMenuVisible}
          onDismiss={() => setPeriodMenuVisible(false)}
          anchor={
            <Button onPress={() => setPeriodMenuVisible(true)}>
              {periodFilter === "daily" ? "Daily" : 
              periodFilter === "weekly" ? "Weekly" : 
              periodFilter === "monthly" ? "Monthly" : 
              "Select Period"
            }
            </Button>
          }
        >
          <Menu.Item onPress={() => { setPeriodFilter("daily"); setPeriodMenuVisible(false); }} title="Daily" />
          <Divider />
          <Menu.Item onPress={() => { setPeriodFilter("weekly"); setPeriodMenuVisible(false); }} title="Weekly" />
          <Divider />
          <Menu.Item onPress={() => { setPeriodFilter("monthly"); setPeriodMenuVisible(false); }} title="Monthly" />
        </Menu>
        <Button mode="contained" onPress={filterByPeriod} style={styles.filterButton}>
          Apply Filter
        </Button>
        <Button onPress={resetFilters} style={styles.clearButton}>
          Clear Filters
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
  filterContainer: {
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  dateInput: {
    marginBottom: 10,
  },
  filterButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  clearButton: {
    marginBottom: 10,
    backgroundColor: "lightgray",
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
