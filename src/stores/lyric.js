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
        lyrics.value = lyricsResponse.message.body.lyrics.lyrics_body;

        if (lyrics.value) {
          lyrics.value = lyrics.value.split(/(?<=\.\.\.)\n/g)[0];
        } else {
          lyrics.value = "Lyrics is unavailable";
        }

        return Promise.resolve(lyricsResponse);
      } catch (error) {
        lyrics.value = "Lyrics is unavailable";

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
