<script setup>
import { onMounted, ref } from "vue";

import CategorySelect from "../components/CategorySelect.vue";
import apiClient from "../services/SpotifyService";

const categories = ref({});

onMounted(async () => {
  try {
    const categoriesResponse = await apiClient.get("/browse/categories", {
      params: { locale: "pt_BR" },
    });
    categories.value = categoriesResponse.data.categories;
  } catch (error) {
    console.error("Erro ao buscar dados das categorias:", error);
  }
});
</script>

<template>
  <div class="p-8">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
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
