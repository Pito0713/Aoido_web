import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./map";

// 建立
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
