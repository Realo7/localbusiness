<template>
  <van-tabbar v-model="active" active-color="darkred" inactive-color="#666">
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/discover" icon="label-o">发现</van-tabbar-item>
    <van-tabbar-item to="/order" icon="cart-o">订单</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    active: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        switch (this.$route.path) {
          case '/home':
            return 0;
          case '/discover':
            return 1;
          case '/order':
            return 2;
          case '/user':
            return 3;
          default:
            break;
        }
      },
      set() {},
    },
  },
};
</script>

<style lang="less" scoped></style>
