import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  home,
  login,
  photoHome,
  photoModule,
  videoHome,
  videoModule
} from '@/pages';
import { getCookies } from '@/util';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/home',
    name: 'home',
    component: home,
    children: [
      {
        path: 'photoHome',
        name: 'photoHome',
        component: photoHome,
      }, {
        path: 'photoModule/:id',
        name: 'photoModule',
        component: photoModule,
      }, {
        path: 'videoHome',
        name: 'videoHome',
        component: videoHome,
      }, {
        path: 'videoModule/:id',
        name: 'videoModule',
        component: videoModule,
      },
    ]
  }
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