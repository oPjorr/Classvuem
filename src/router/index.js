import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import LibraryView from "../views/LibraryView.vue";
import SearchView from "../views/SearchView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/library",
    name: "library",
    component: LibraryView,
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
