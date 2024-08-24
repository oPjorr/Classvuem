import { defineStore } from "pinia";
import { ref } from "vue";
import LyricService from "../services/LyricService";

export const useLyricStore = defineStore(
  "lyric",
  () => {
    const lyrics = ref(null);

    async function fetchLyrics(track, artist) {
      try {
        const lyricsResponse = await LyricService.get(track, artist);
        lyrics.value = lyricsResponse;
        console.log(lyrics.value); // See the Lyrics via Console

        return Promise.resolve(lyricsResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    function $reset() {
      lyrics.value = null;
    }

    return { lyrics, fetchLyrics, $reset };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
