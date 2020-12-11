import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // 路由重定向
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      ifShowTabbar: true,
    },
    component: Home,
    children: [
      // {
      //   // 子路由的路径要么把/去掉，要么加上父级路由地址
      //   path: 'popup',
      //   name: 'MyPopup',
      //   component: () => import(/* webpackChunkName: "popup" */ '../views/MyPopup.vue'),
      // },
    ],
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
