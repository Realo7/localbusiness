import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.use(Vuex);

Vue.config.productionTip = false;

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
