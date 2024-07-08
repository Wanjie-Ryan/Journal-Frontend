import axios from "axios";

const Requests = axios.create({
  baseURL: "http://192.168.100.10:3005",
});

export default Requests;
