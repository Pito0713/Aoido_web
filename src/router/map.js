const routes = [
  {
    path: '/',
    component: () => import('../pages/homePage/homePage.vue'),
    name: '/',
    meta: { requiresAuth: true },
  },
  {
    path: '/homePage',
    component: () => import('../pages/homePage/homePage.vue'),
    name: 'homePage',
    meta: { requiresAuth: true },
  },
  {
    path: '/prodcutPage',
    component: () => import('../pages/prodcutPage/prodcutPage.vue'),
    name: 'prodcutPage',
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
  },
];

export { routes };
