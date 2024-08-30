import { defineStore } from "pinia";
import { ref } from "vue";
import CategoryService from "../services/CategoryService";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  async function fetchCategories() {
    try {
      const categoriesResponse = await CategoryService.get();
      categories.value = categoriesResponse.categories;
      console.log(categoriesResponse.categories);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  function $reset() {
    categories.value = [];
  }

  return { categories, fetchCategories, $reset };
});
