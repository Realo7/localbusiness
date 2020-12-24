<template>
  <div>
    <!--头部-->
    <app-header :poiInfo="poiInfo"></app-header>

    <!--导航-->
    <app-nav :commentNum="commentNum"></app-nav>

    <!--内容-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Nav from '@/components/nav/Nav.vue';
import { GetGoods, GetRating } from '@/request/api';
export default {
  components: {
    'app-header': Header,
    'app-nav': Nav,
  },
  data() {
    return {
      poiInfo: {},
      commentNum: 0,
      detailParams: { shopid: '', pageNum: 1, pageSize: 50 },
    };
  },
  created() {
    this.getshopid();
    this.getgoods();
  },
  methods: {
    getshopid() {
      this.detailParams.shopid = this.$route.query.shopid;
    },
    // 获取评价信息

    // 获取商铺的商品
    getgoods() {
      GetGoods(this.detailParams)
        .then((response) => {
          console.log(response);
          if (response.code === 0) {
            this.poiInfo = response.data.poi_info;
          }
        })
        .catch(() => {});
    },
    getrating() {
      GetRating()
        .then((response) => {
          console.log(response);
          if (response.code === 0) {
            this.commentNum = response.data.comment_num;
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
