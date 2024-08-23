import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useApiStore = defineStore(
  "api",
  () => {
    const token = ref(null);
    const expiration = ref(null);

    async function fetchToken() {
      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          null,
          {
            params: {
              grant_type: "client_credentials",
              client_id: import.meta.env.VITE_CLIENT_ID,
              client_secret: import.meta.env.VITE_CLIENT_SECRET,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        token.value = response.data.access_token;
        expiration.value = Date.now() + response.data.expires_in * 1000;
      } catch (error) {
        console.error("Erro ao obter token:", error);
      }
    }

    async function refreshToken() {
      if (Date.now() >= expiration.value) {
        await fetchToken();
      }
    }

    const isTokenValid = computed(() => {
      return token.value && Date.now() < expiration.value;
    });

    function $reset() {
      isPlaying.value = false;
      audio.value = null;
      currentArtist.value = null;
      currentTrack.value = null;
    }

    return {
      token,
      expiration,
      fetchToken,
      refreshToken,
      isTokenValid,
      $reset,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
