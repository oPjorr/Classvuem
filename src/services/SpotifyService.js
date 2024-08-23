import axios from "axios";

import { useApiStore } from "../stores/api.js";

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const apiStore = useApiStore();
  await apiStore.refreshToken();

  config.headers.Authorization = `Bearer ${apiStore.token}`;

  return config;
});

export default apiClient;
