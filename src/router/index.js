import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/home/home.vue';
import discover from '@/components/discover/discover.vue';
import order from '@/components/order/order.vue';
import user from '@/components/user/user.vue';
import mallslist from '@/components/home/mallslist/mallslist.vue';
import shopslist from '@/components/home/shopslist/shopslist.vue';
import shopdetail from '@/components/home/shopdetail/shopdetail.vue';
import Goods from '@/components/goods/Goods.vue';
import Ratings from '@/components/ratings/Ratings.vue';
import Seller from '@/components/seller/Seller.vue';
import amap from '@/components/base/amap/amap.vue';
import Shopregist from '@/components/user/shopregist.vue';
import Mallregist from '@/components/user/mallregist.vue';
Vue.use(VueRouter);
// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    path: '/',
    // 路由重定向
    redirect: '/home',
  },
  {
    path: '/home',
    name: '主页',
    meta: {
      ifShowTabbar: true,
    },
    component: Home,
  },
  {
    path: '/mallslist',
    name: 'mallslist',
    component: mallslist,
    meta: {
      ifShowTabbar: true,
    },
  },
  {
    path: '/amap',
    name: 'amap',
    component: amap,
    meta: {
      ifShowTabbar: true,
    },
  },
  {
    path: '/discover',
    name: '发现',
    meta: {
      ifShowTabbar: true,
    },
    component: discover,
  },
  {
    path: '/order',
    name: '订单',
    meta: {
      ifShowTabbar: true,
    },
    component: order,
  },
  {
    path: '/user',
    name: '我的',
    meta: {
      ifShowTabbar: true,
    },
    component: user,
    children: [],
  },
  {
    path: '/mallregist',
    component: Mallregist,
    meta: {
      ifShowTabbar: false,
    },
  },
  {
    path: '/shopregist',
    component: Shopregist,
    meta: {
      ifShowTabbar: false,
    },
  },
  {
    path: '/shopslist',
    name: 'shopslist',
    component: shopslist,
    meta: {
      ifShowTabbar: true,
    },
  },
  {
    path: '/shopdetail',
    name: 'shopdetail',
    component: shopdetail,
    meta: {
      ifShowTabbar: true,
    },
  },
  {
    path: '/goods',
    component: Goods,
    meta: {
      ifShowTabbar: false,
    },
  },
  {
    path: '/ratings',
    component: Ratings,
    meta: {
      ifShowTabbar: false,
    },
  },
  {
    path: '/seller',
    component: Seller,
    meta: {
      ifShowTabbar: false,
    },
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
