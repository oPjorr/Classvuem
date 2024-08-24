import axios from "axios";

const musixmatchClient = axios.create({
  baseURL: "/api/musixmatch",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    apikey: import.meta.env.VITE_MUSIXMATCH_API_KEY,
  },
});

export default musixmatchClient;
