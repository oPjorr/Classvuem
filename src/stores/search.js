import { defineStore } from "pinia";
import { ref } from "vue";
import SearchService from "../services/SearchService";

export const useSearchStore = defineStore(
  "search",
  () => {
    const results = ref({});

    async function performAllSearch(query) {
      try {
        const searchResponse = await SearchService.getAll(query);
        results.value = searchResponse;
        console.log(searchResponse); // See the results via Console

        return Promise.resolve(searchResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function performAlbumsSearch(query) {
      try {
        const searchResponse = await SearchService.getAlbums(query);
        results.value = searchResponse;
        console.log(searchResponse); // See the results via Console

        return Promise.resolve(searchResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function performArtistsSearch(query) {
      try {
        const searchResponse = await SearchService.getArtists(query);
        results.value = searchResponse;
        console.log(searchResponse); // See the results via Console

        return Promise.resolve(searchResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function performSongsSearch(query) {
      try {
        const searchResponse = await SearchService.getSongs(query);
        results.value = searchResponse;
        console.log(searchResponse); // See the results via Console

        return Promise.resolve(searchResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function performPlaylistsSearch(query) {
      try {
        const searchResponse = await SearchService.getPlaylists(query);
        results.value = searchResponse;
        console.log(searchResponse); // See the results via Console

        return Promise.resolve(searchResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function performShowsSearch(query) {
      try {
        const searchResponse = await SearchService.getShows(query);
        results.value = searchResponse;
        console.log(searchResponse); // See the results via Console

        return Promise.resolve(searchResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    function $reset() {
      results.value = {};
    }

    return {
      results,
      performAllSearch,
      performAlbumsSearch,
      performArtistsSearch,
      performSongsSearch,
      performPlaylistsSearch,
      performShowsSearch,
      $reset,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
