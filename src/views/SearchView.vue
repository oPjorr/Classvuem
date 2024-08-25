<script setup>
import { onMounted, ref } from "vue";

import { storeToRefs } from "pinia";

import CategorySelect from "../components/CategorySelect.vue";

import { useCategoryStore } from "../stores/category";
import { useSearchStore } from "../stores/search";

const categoryStore = useCategoryStore();

const { categories } = storeToRefs(categoryStore);
const { fetchCategories } = categoryStore;

onMounted(fetchCategories);

// Testing Spotify Search API Call
const query = ref("Meteo");
const searchStore = useSearchStore();

const { performAllSearch } = searchStore;
</script>

<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
      @click="performAllSearch(query)"
    >
      Browse all
    </button>

    <div class="py-1.5"></div>

    <div
      class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6"
    >
      <div v-for="(category, i) in categories.items" :key="i">
        <CategorySelect
          v-if="category.icons"
          :category="category.name"
          :image="category.icons[0].url"
        />
      </div>
    </div>
  </div>
</template>
