import axios from "axios";

import { useTokenStore } from "../stores/token.js";

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const tokenStore = useTokenStore();
  await tokenStore.refreshToken();

  config.headers.Authorization = `Bearer ${tokenStore.token}`;

  return config;
});

export default apiClient;
