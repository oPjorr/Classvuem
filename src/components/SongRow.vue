<script setup>
import { ref, toRefs } from "vue";

import Heart from "vue-material-design-icons/Heart.vue";
import Play from "vue-material-design-icons/Play.vue";

let isHover = ref(false);

const props = defineProps({
  track: Object,
  artist: Object,
  index: Number,
});

const { track, artist, index } = toRefs(props);

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
</script>

<template>
  <li
    class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex items-center w-full py-1.5">
      <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
        <Play fillColor="#FFFFFF" :size="25" />
      </div>
      <div v-else class="text-white font-semibold w-[40px] ml-5">
        <span
          :class="{
            'text-green-500': track.name,
          }"
        >
          {{ index }}
        </span>
      </div>
      <div>
        <div
          :class="{
            'text-green-500': track.name,
          }"
          class="text-white font-semibold"
        >
          {{ track.name }}
        </div>
        <div class="text-sm font-semibold text-gray-400">{{ artist.name }}</div>
      </div>
    </div>
    <div class="flex items-center">
      <button type="button" v-if="isHover">
        <Heart fillColor="#1BD760" :size="22" />
      </button>
      <div class="text-xs mx-5 text-gray-400">
        {{ millisToMinutesAndSeconds(track.duration_ms) }}
      </div>
    </div>
  </li>
</template>
