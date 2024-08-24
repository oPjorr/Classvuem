import { defineStore } from "pinia";
import { ref } from "vue";
import AlbumService from "../services/AlbumService";

export const useAlbumStore = defineStore(
  "album",
  () => {
    const album = ref({});

    async function fetchAlbum(albumId) {
      try {
        const albumResponse = await AlbumService.get(albumId);
        album.value = albumResponse;

        return Promise.resolve(albumResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    function $reset() {
      album.value = {};
    }

    return { album, fetchAlbum, $reset };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
