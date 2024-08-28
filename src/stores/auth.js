import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const code = ref(null);
  const token = ref(null);
  const refreshToken = ref(null);
  const expiration = ref(null);
  const tokenType = ref("Bearer");
  const redirectUri = ref("http://localhost:5173/callback");
  const scopes = ref([
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ]);

  function setCode(newCode) {
    code.value = newCode;
  }

  function getAuthUrl() {
    return `https://accounts.spotify.com/authorize?client_id=${
      import.meta.env.VITE_SPOTIFY_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri.value
    )}&scope=${encodeURIComponent(scopes.value.join(" "))}`;
  }

  async function fetchToken() {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            code: code.value,
            redirect_uri: redirectUri.value,
            grant_type: "authorization_code",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
            password: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
          },
        }
      );

      token.value = response.data.access_token;
      refreshToken.value = response.data.refresh_token;
      expiration.value = Date.now() + response.data.expires_in * 1000;
      tokenType.value = response.data.token_type;
    } catch (error) {
      console.error("Erro ao obter token:", error);
    }
  }

  async function fetchRefreshToken() {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        null,
        {
          params: {
            refresh_token: refreshToken.value,
            grant_type: "refresh_token",
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
            password: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
          },
        }
      );

      if (response.data.refresh_token) {
        refreshToken.value = response.data.refresh_token;
      }

      token.value = response.data.access_token;
      expiration.value = Date.now() + response.data.expires_in * 1000;
      tokenType.value = response.data.token_type;
    } catch (error) {
      console.error("Erro ao obter token:", error);
    }
  }

  async function isTokenValid() {
    if (Date.now() >= expiration.value) {
      await fetchRefreshToken();
    }
  }

  function $reset() {
    code.value = null;
    token.value = null;
    refreshToken.value = null;
    expiration.value = null;
    tokenType.value = "Bearer";
  }

  return {
    code,
    token,
    refreshToken,
    expiration,
    tokenType,
    setCode,
    getAuthUrl,
    fetchToken,
    fetchRefreshToken,
    isTokenValid,
    $reset,
  };
});
