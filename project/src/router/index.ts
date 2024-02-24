import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/meal/:id",
      name: "meal",
      component: () => import("../views/MealView.vue"),
    },
    {
      path: "/ingrediant/:id",
      name: "ingrediant",
      component: () => import("../views/IngrediantView.vue"),
    },
    {
      path: "/categories/",
      name: "categories",
      component: () => import("../views/CategoriesView.vue"),
    },
    {
      path: "/category/:id",
      name: "category",
      component: () => import("../views/CategoryView.vue"),
    },
    {
      path: "/ui-kit",
      name: "ui-kit",
      component: () => import("../views/UiKitView.vue"),
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
