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
import Header from '@/components/header/Header';
import Nav from './components/nav/Nav';
export default {
  components: {
    'app-header': Header,
    'app-nav': Nav,
  },
  data() {
    return {
      poiInfo: {},
      commentNum: 0,
      detailParams: { shopid: '', pageNum: 1, pageSize: 20 },
    };
  },
  created() {
    this.getshopid();
    fetch('/api/goods')
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 0) {
          this.poiInfo = response.data.poi_info;
        }
      });

    fetch('/api/ratings')
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 0) {
          this.commentNum = response.data.comment_num;
        }
      });
  },
  methods: {
    getshopid() {
      this.detailParams.shopid = this.$route.query.shopid;
    },
  },
};
</script>

<style></style>
