import { defineStore } from "pinia";
import { ref } from "vue";
import ArtistService from "../services/ArtistService";

export const useArtistStore = defineStore(
  "artist",
  () => {
    const artist = ref({});

    async function fetchArtist(artistId) {
      try {
        const artistResponse = await ArtistService.get(artistId);
        artist.value = artistResponse;
        console.log(artistResponse); // See the artist via Console

        return Promise.resolve(artistResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function fetchAlbums(artistId) {
      try {
        const artistResponse = await ArtistService.getAlbums(artistId);
        artist.value = artistResponse;

        return Promise.resolve(artistResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function fetchTopTracks(artistId) {
      try {
        const artistResponse = await ArtistService.getTopTracks(artistId);
        artist.value = artistResponse;

        return Promise.resolve(artistResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async function fetchRelatedArtists(artistId) {
      try {
        const artistResponse = await ArtistService.getRelatedArtists(artistId);
        artist.value = artistResponse;

        return Promise.resolve(artistResponse);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    function $reset() {
      artist.value = {};
    }

    return {
      artist,
      fetchArtist,
      fetchAlbums,
      fetchTopTracks,
      fetchRelatedArtists,
      $reset,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  }
);
