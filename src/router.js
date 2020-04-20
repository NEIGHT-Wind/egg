import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './pages/Home.vue';

Vue.use(VueRouter);

const routes = [
  { path: '', component: Home },
  // { path: '/pic', component:  }
]

export default new VueRouter({
  routes
});