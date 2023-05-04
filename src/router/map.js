const routes = [
  {
    path: '/',
    component: () => import('../pages/homePage/homePage.vue'),
    name: '/',
    meta: { requiresAuth: false },
  },
  {
    path: '/homePage',
    component: () => import('../pages/homePage/homePage.vue'),
    name: 'homePage',
    meta: { requiresAuth: false },
  },
  {
    path: '/prodcutPage',
    component: () => import('../pages/prodcutPage/prodcutPage.vue'),
    name: 'prodcutPage',
    meta: { requiresAuth: false },
  },
  {
    path: '/prodcutPage_Detail/:id',
    component: () => import('../pages/prodcutPage/prodcutPage_Detail.vue'),
    name: 'prodcutPage_Detail',
    props: true, // 啟用 props
  },
  {
    path: '/memberPage',
    component: () => import('../pages/memberPage/memberPage.vue'),
    name: 'memberPage',
    meta: { requiresAuth: true },
  },
  {
    path: '/chartPage',
    component: () => import('../pages/chartPage/chartPage.vue'),
    name: 'chartPage',
    meta: { requiresAuth: true },
  },
  {
    path: '/loginPage',
    component: () => import('../pages/loginPage/loginPage.vue'),
    name: 'loginPage',
    meta: { requiresAuth: false },
  },
];

export { routes };
