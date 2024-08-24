import axios from "axios";

const musixmatchClient = axios.create({
  baseURL: "/api/musixmatch",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default musixmatchClient;
