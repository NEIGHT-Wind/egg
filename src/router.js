import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  Home,
  Login
} from '@/pages';
import { getCookies } from '@/util';

Vue.use(VueRouter);

const routes = [
  { path: '*', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/home', name: 'home', component: Home }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  const { token } = getCookies();
  if (to.name === 'login') {
    next();
    return;
  }
  if (token) {
    next();
    return;
  }
  next({ name: 'login' });
});

export default router;