import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/auth";

import HomeView from "../views/HomeView.vue";
import LibraryView from "../views/LibraryView.vue";
import LoginView from "../views/LoginView.vue";
import SearchView from "../views/SearchView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/callback" && to.query.code) {
    authStore.setCode(to.query.code);
    next("/");
  } else if (to.path !== "/login" && !authStore.code) {
    next("/login");
  } else {
    next();
  }
});

export default router;
