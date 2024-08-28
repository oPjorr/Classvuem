<script setup>
import { ref } from "vue";

import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import ChevronLeft from "vue-material-design-icons/ChevronLeft.vue";
import ChevronRight from "vue-material-design-icons/ChevronRight.vue";
import ChevronUp from "vue-material-design-icons/ChevronUp.vue";

import { RouterLink, RouterView } from "vue-router";
import MenuItem from "./components/MenuItem.vue";

const openMenu = ref(false);

const username = ref("Ricardo André");
const profilePicture = ref(
  "https://avatars.githubusercontent.com/u/80722562?s=96&v=4"
);

const playlists = ref([
  "My Playlist",
  "My Playlist",
  "My Playlist",
  "My Playlist",
]);

const menuItems = ref([
  {
    name: "Home",
    iconString: "home",
    pageUrl: "/",
    to: "/",
  },
  {
    name: "Search",
    iconString: "search",
    pageUrl: "/search",
    to: "/search",
  },
  {
    name: "Your Library",
    iconString: "library",
    pageUrl: "/library",
    to: "/library",
  },
]);
</script>

<template>
  <div>
    <div id="TopNav" class="w-[calc(100%-240px)] h-[72px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between px-6">
      <!-- Ícone de Home e Campo de Pesquisa -->
      <div class="flex items-center flex-grow justify-center space-x-2">
        <router-link to="/" class="flex items-center justify-center bg-[#2E2E2E] rounded-full w-[50px] h-[45px] transition-colors duration-300 hover:bg-[#3E3E3E]">
          <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="#D3D3D3" class="flex-shrink-0 m-auto">
            <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"></path>
          </svg>
        </router-link>

        <div class="flex items-center bg-[#2E2E2E] rounded-full w-[450px] h-[53px] px-3 transition-colors duration-300 hover:bg-[#3E3E3E]">
          <div class="flex-grow flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#A0A0A0" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </div>
          <input type="text" placeholder="O que você quer ouvir?" class="bg-transparent text-white w-full ml-2 focus:outline-none placeholder-opacity-70" />

          <div class="flex items-center border-l border-white pl-2">
            <svg data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="#A0A0A0">
              <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"></path>
              <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Perfil -->
      <button @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'" class="bg-black hover:bg-[#282828] rounded-full p-0.5 cursor-pointer flex items-center">
        <img class="rounded-full" width="27" :src="profilePicture" />
        <div class="text-white text-[14px] ml-1.5 font-semibold">
          {{ username }}
        </div>
        <ChevronDown v-if="!openMenu" @click="openMenu = true" fillColor="#FFFFFF" :size="25" />
        <ChevronUp v-else @click="openMenu = false" fillColor="#FFFFFF" :size="25" />
      </button>
      
      <!-- Menu Dropdown -->
      <span v-if="openMenu" class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">
            Profile
          </li>
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
        </ul>
      </span>
    </div>
  </div>

  <!-- SideNav e Conteúdo Principal -->
  <div id="SideNav" class="h-[100%] p-6 w-[240px] fixed z-50 bg-black">
    <RouterLink to="/">
      <img width="125" src="/icons/spotify-logo.png" />
    </RouterLink>

    <div class="my-8"></div>

    <ul v-for="(item, i) in menuItems" :key="i">
      <RouterLink :to="item.to">
        <MenuItem class="ml-[1px]" :iconSize="23" :name="item.name" :iconString="item.iconString" :pageUrl="item.pageUrl" />
      </RouterLink>
    </ul>

    <div class="py-3.5"></div>

    <ul>
      <MenuItem :iconSize="24" name="Create Playlist" iconString="playlist" pageUrl="/playlist" />
      <MenuItem class="-ml-[1px]" :iconSize="27" name="Liked Songs" iconString="liked" pageUrl="/liked" />
    </ul>

    <div class="border-b border-b-gray-700"></div>

    <ul v-for="(playlist, i) in playlists" :key="i">
      <li class="font-semibold text-[13px] mt-3 text-gray-300 hover:text-white">
        {{ playlist }} #{{ i + 1 }}
      </li>
    </ul>
  </div>

  <!-- Conteúdo -->
  <div class="fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black">
    <div class="mt-[70px]"></div>
    <RouterView />
    <div class="mb-[100px]"></div>
  </div>
</template>

