import axios from "axios";

import { useTokenStore } from "../stores/token.js";

const spotifyClient = axios.create({
  baseURL: "/api/spotify",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

spotifyClient.interceptors.request.use(async (config) => {
  const tokenStore = useTokenStore();
  await tokenStore.refreshToken();

  config.headers.Authorization = `Bearer ${tokenStore.token}`;

  return config;
});

export default spotifyClient;
