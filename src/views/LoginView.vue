<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { getAuthUrl } = authStore;

function login() {
  window.location.href = getAuthUrl();
}

onMounted(authStore.$reset);
</script>

<template>
  <div class="text-white mt-10">
    <h1>Spotify Auth</h1>
    <button @click="login">Login with Spotify</button>
  </div>
</template>
