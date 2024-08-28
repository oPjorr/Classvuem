<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { usePlayerStore } from "../stores/player";

const playerStore = usePlayerStore();
const { initializePlayer } = playerStore;
const { player, track, isPaused } = storeToRefs(playerStore);

onMounted(initializePlayer);
</script>

<template>
  <main v-if="track" class="grid place-items-center p-5">
    <section class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-gray-900 shadow-lg rounded p-3">
        <div class="group relative">
          <img
            v-if="track && track.album && track.album.images"
            class="w-full md:w-72 block rounded"
            :src="track.album.images[0].url"
            alt="Album Cover"
          />
          <div
            class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly"
          >
            <button
              class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
              @click="player.previousTrack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-skip-backward-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5"
                />
              </svg>
            </button>

            <button
              class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
              @click="player.togglePlay"
            >
              <div v-if="isPaused">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-play-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
                  />
                </svg>
              </div>

              <div v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  fill="currentColor"
                  class="bi bi-pause-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"
                  />
                </svg>
              </div>
            </button>

            <button
              class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
              @click="player.nextTrack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                class="bi bi-skip-forward-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-5">
          <h3 v-if="track && track.name" class="text-white text-lg">
            {{ track.name }}
          </h3>
          <p v-if="track && track.artists" class="text-gray-400">
            {{ track.artists[0].name }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
