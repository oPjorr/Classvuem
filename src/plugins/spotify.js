import axios from "axios";
import { useAuthStore } from "../stores/auth";

const spotifyClient = axios.create({
  baseURL: "/api/spotify",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

spotifyClient.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();

  !authStore.token && (await authStore.fetchToken());
  await authStore.isTokenValid();

  config.headers.Authorization = `${authStore.tokenType} ${authStore.token}`;

  return config;
});

export default spotifyClient;
