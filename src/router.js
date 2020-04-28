import Vue from 'vue';
import VueRouter from 'vue-router';
import {
  home,
  login,
  introduce,
  photoIntroduce,
  photoModule,
  videoIntroduce,
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
    redirect: '/home/introduce',
    children: [
      {
        path: 'introduce',
        name: 'introduce',
        component: introduce,
      },
      {
        path: 'photoIntroduce',
        name: 'photoIntroduce',
        component: photoIntroduce,
      }, {
        path: 'photoModule/:id',
        name: 'photoModule',
        component: photoModule,
      }, {
        path: 'videoIntroduce',
        name: 'videoIntroduce',
        component: videoIntroduce,
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