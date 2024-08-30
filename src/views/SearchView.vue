<script setup>
import { onMounted, ref } from "vue";

import { storeToRefs } from "pinia";

import CategorySelect from "../components/CategorySelect.vue";
import Player from "../components/Player.vue";

import { useArtistStore } from "../stores/artist";
import { useCategoryStore } from "../stores/category";
import { useSearchStore } from "../stores/search";
import { useTrackStore } from "../stores/track";

const categoryStore = useCategoryStore();

const { categories } = storeToRefs(categoryStore);
const { fetchCategories } = categoryStore;

onMounted(fetchCategories);

// Testing Spotify Search API Call
const searchStore = useSearchStore();

const query = ref("Meteo");
const { performAllSearch } = searchStore;

// Testing Spotify Artist API Call
const artistStore = useArtistStore();

const artistId = ref("6XyY86QOPPrYVGvF9ch6wz"); // Linkin Park
const { fetchArtist } = artistStore;

// Testing Spotify Track/Recommendations API Call
const trackStore = useTrackStore();

const trackId = ref("3CLSHJv5aUROAN2vfOyCOh"); // Close Eyes
const seed_track = ref("2OQJKTtrH482waGFmOfJni");
const seed_artists = ref(["17lzZA2AlOHwCwFALHttmp", "137W8MRPWKqSmrBGDBFSop"]);
const { fetchTrack, fetchRecommendations } = trackStore;
</script>

<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      <!-- @click="performAllSearch(query)" -->
      <!-- @click="fetchArtist(artistId)" -->
      <!-- @click="fetchTrack(trackId)" -->
      <!-- @click="fetchRecommendations(seed_track, seed_artists, 68)" -->

      Browse all
    </button>

    <div class="py-1.5"></div>
    <Player />
    <div class="py-1.5"></div>

    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6"
    >
      <div v-for="(category, i) in categories?.items" :key="i">
        <CategorySelect
          :category="category.name"
          :image="category.icons[0].url"
        />
      </div>
    </div>
  </div>
</template>
