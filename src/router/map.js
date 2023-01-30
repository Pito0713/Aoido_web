const routes = [
  {
    path: "/",
    component: () => import("../pages/homePage/homePage.vue"),
    name: "/",
    meta: { requiresAuth: true },
  },
  {
    path: "/homePage",
    component: () => import("../pages/homePage/homePage.vue"),
    name: "homePage",
    meta: { requiresAuth: true },
  },
  {
    path: "/prodcutPage",
    component: () => import("../pages/prodcutPage/prodcutPage.vue"),
    name: "prodcutPage",
    meta: { requiresAuth: true },
  },
  {
    path: "/promotionPage",
    component: () => import("../pages/promotionPage/promotionPage.vue"),
    name: "promotionPage",
    meta: { requiresAuth: true },
  },
  {
    path: "/chartPage",
    component: () => import("../pages/chartPage/chartPage.vue"),
    name: "chartPage",
    meta: { requiresAuth: true },
  },
];

export { routes };
