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
    path: '/memberPage_handPassWord',
    component: () => import('../pages/memberPage/memberPage_handPassWord.vue'),
    name: 'memberPage_handPassWord',
    meta: { requiresAuth: true },
    props: true, // 啟用 props
  },
  {
    path: '/cartPage',
    component: () => import('../pages/cartPage/cartPage.vue'),
    name: 'cartPage',
    meta: { requiresAuth: true },
  },
  {
    path: '/loginPage',
    component: () => import('../pages/loginPage/loginPage.vue'),
    name: 'loginPage',
    meta: { requiresAuth: false },
  },
  {
    path: '/createMember',
    component: () => import('../pages/loginPage/createMember.vue'),
    name: 'createMember',
    meta: { requiresAuth: false },
  },
];

export { routes };
