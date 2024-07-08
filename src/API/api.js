// Import the axios library for making HTTP requests
import axios from "axios";

// Create an instance of axios with a custom configuration
const Requests = axios.create({
  // Set the base URL for all requests made using this instance
  // Replace 'http://192.168.100.10:3005/' with your local IP address if needed
  baseURL: "http://192.168.100.10:3005/",
});

// Export the configured axios instance for use throughout the application
export default Requests;
