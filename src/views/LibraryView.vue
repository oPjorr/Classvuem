<script setup>
import { onMounted, ref } from "vue";

import ClockTimeThreeOutline from "vue-material-design-icons/ClockTimeThreeOutline.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import Play from "vue-material-design-icons/Play.vue";
import SongRow from "../components/SongRow.vue";

import apiClient from "../services/SpotifyService";

const album = ref({});
const albumIds = ref([
  "6hPkbAV3ZXpGZBGUvL6jVM", // Linkin Park
  "5TG8nNzWlr4lsL6XBURDs0", // Skrillex
  "07KAoy7racDNRDQEmpQOkN", // Rita Lee
  "1l8K5fgYz4J0ZZyjMVd6Q1", // Charlie Brown Jr.
  "2rKJHBwHEuztGQqjBkDDAK", // Gloria Groove
  "4HcPzKyKVtcZCwJgesoZWn", // Racionais MC's
  "7aJuG4TFXa2hmE4z1yxc3n", // Billie Eilish
  "4yP0hdKOZPNshxUOjY0cZj", // The Weeknd
  "3yVqF1TOg60hk9ehgMj3na", // Taylor Swift
  "3bhFoH4PFnY4ifK4981U8X", // *NSYNC
]);

function formatDate(value) {
  if (value.length === 4) return value;
  return new Date(value).toLocaleDateString();
}

onMounted(async () => {
  try {
    const albumResponse = await apiClient.get(
      `/albums/${albumIds.value[Math.floor(Math.random() * 10)]}`,
      {
        params: { market: "BR" },
      }
    );
    album.value = albumResponse.data;
  } catch (error) {
    console.error("Erro ao buscar dados do album:", error);
  }
});
</script>

<template>
  <div class="p-8 overflow-x-hidden">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      {{ album.name }}
    </button>

    <div class="py-1.5"></div>
    <div class="flex items-center w-full relative h-full">
      <div v-if="album.images">
        <img width="140" :src="album.images[0].url" />
      </div>

      <div class="w-full ml-5">
        <div
          v-if="album.artists"
          style="font-size: 33px"
          class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bosemiboldld"
        >
          {{ album.artists[0].name }}
        </div>

        <div class="text-gray-300 text-[13px] flex">
          <div class="flex">Album</div>
          <div v-if="album.release_date" class="ml-2 flex">
            <div class="circle mt-2 mr-2" />
            <span class="-ml-0.5">{{ formatDate(album.release_date) }}</span>
          </div>
          <div v-if="album.tracks" class="ml-2 flex">
            <div class="circle mt-2 mr-2" />
            <span class="-ml-0.5">{{ album.tracks.items.length }} songs</span>
          </div>
        </div>

        <div
          class="absolute flex gap-4 items-center justify-start bottom-0 mb-1.5"
        >
          <button class="p-1 rounded-full bg-white" @click="playFunc()">
            <Play fillColor="#181818" :size="25" />
          </button>
          <button type="button">
            <Heart fillColor="#1BD760" :size="30" />
          </button>
          <button type="button">
            <DotsHorizontal fillColor="#FFFFFF" :size="25" />
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6"></div>
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <div class="mr-7">#</div>
        <div class="text-sm">Title</div>
      </div>
      <div><ClockTimeThreeOutline fillColor="#FFFFFF" :size="18" /></div>
    </div>
    <div class="border-b border-b-[#2A2A2A] mt-2"></div>
    <div class="mb-4"></div>
    <div v-if="album.tracks">
      <ul
        class="w-full"
        v-for="(track, index) in album.tracks.items"
        :key="track"
      >
        <SongRow :artist="track.artists[0]" :track="track" :index="++index" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.circle {
  width: 4px;
  height: 4px;
  background-color: rgb(189, 189, 189);
  border-radius: 100%;
}
</style>
