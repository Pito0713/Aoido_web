const routes = [
  {
    path: "/",
    component: () => import("../pages/index.vue"),
    name: "/",
    meta: { requiresAuth: true },
  },
  {
    path: "/product",
    component: () => import("../pages/product/productPage.vue"),
    name: "product",
    meta: { requiresAuth: true },
  },
  {
    path: "/setting",
    component: () => import("../pages/setting/settingPage.vue"),
    name: "setting",
    meta: { requiresAuth: true },
  },
];

export { routes };
