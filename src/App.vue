<template>
  <div id="app">
    <router-view />
    <MyTabbar></MyTabbar>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import MyTabbar from '@/components/MyTabbar';
export default {
  name: 'App',
  components: { MyTabbar },
  created() {
    console.log(process.env.VUE_APP_BASE_URL);
  },
};
</script>

<style>
@import '../src/assets/css/resetcss.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #efefef;
  min-height: 100%;
}

html {
  height: 100%;
  font-size: 100px;
}
body {
  /* rem是相对于根元素html的大小 */
  font-size: 0.14rem;
  height: 100%;
}
</style>
