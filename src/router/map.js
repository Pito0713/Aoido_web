const routes = [
  {
    path: "/",
    redirect: { name: "welcome" },
    component: () => import("@/page"),
    children: [
      // == 首頁 ==
      {
        path: "/",
        component: () => import("@/page/templates/welcome"),
        name: "welcome",
        meta: { requiresAuth: true },
      },
      {
        path: "/",
        component: () => import("@/page/templates/product"),
        name: "product",
        meta: { requiresAuth: true },
      },
    ],
  },
];

export { routes };
