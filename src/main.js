import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import Vant from 'vant';
import 'vant/lib/index.css';
import VueAMap from 'vue-amap';

Vue.use(VueAMap);
Vue.use(Vant);
Vue.use(Vuex);

Vue.config.productionTip = false;

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德key
  key: 'f0ef6489abee374ff29947827711e473',
  // 插件集合 （插件按需引入）
  plugin: [
    'AMap.Autocomplete',

    'AMap.PlaceSearch',

    'AMap.Scale',

    'AMap.OverView',

    'AMap.ToolBar',

    'AMap.MapType',

    'AMap.PolyEditor',

    'AMap.CircleEditor',

    'AMap.Geolocation',

    'Amap.Geocoder',

    'AMap.MarketClusterer',
  ],
  v: '1.4.15',
  uiVersion: '1.0.11',
});

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
