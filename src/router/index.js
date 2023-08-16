import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from './map';
import Cookies from 'js-cookie';

// 建立
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get('token');
  const isAuthenticatedId = Cookies.get('id');
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/loginPage'); // 如果需要驗證權限但未通過驗證，則跳轉到登入頁面
  } else if (to.meta.requiresAuth && !isAuthenticatedId) {
    return next('/loginPage'); // 如果需要驗證權限但未通過驗證，則跳轉到登入頁面
  } else {
    return next();
  }
});

export default router;
